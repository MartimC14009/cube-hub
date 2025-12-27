import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Leaderboard() {
  const [topSolves, setTopSolves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      // Esta query pega no melhor tempo (mínimo) de cada utilizador
      const { data, error } = await supabase
        .from('solves')
        .select(`
          time_ms,
          user_id,
          profiles ( username )
        `)
        .order('time_ms', { ascending: true })
        .limit(10);

      if (!error) setTopSolves(data);
      setLoading(false);
    }

    fetchLeaderboard();
  }, []);

  if (loading) return <div className="text-center py-10">A carregar ranking...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
      <div className="bg-gradient-to-r from-yellow-500/20 to-transparent p-6 border-b border-slate-800">
        <h2 className="text-xl font-bold text-yellow-500 flex items-center gap-2">
          🏆 Top 10 Global (Single)
        </h2>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="text-slate-500 text-xs uppercase tracking-widest border-b border-slate-800">
            <th className="px-6 py-4">Posição</th>
            <th className="px-6 py-4">Cuber</th>
            <th className="px-6 py-4 text-right">Tempo</th>
          </tr>
        </thead>
        <tbody>
          {topSolves.map((solve, index) => (
            <tr key={index} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
              <td className="px-6 py-4 font-mono text-slate-400">#{index + 1}</td>
              <td className="px-6 py-4 font-bold text-white">
                {solve.profiles?.username || 'Anónimo'}
              </td>
              <td className="px-6 py-4 text-right font-mono text-cyan-400 font-bold">
                {(solve.time_ms / 1000).toFixed(2)}s
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}