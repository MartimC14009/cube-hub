export default function Theory() {
  const methods = [
    { name: 'CFOP', steps: ['Cross', 'F2L', 'OLL', 'PLL'], color: 'text-cyan-400' },
    { name: 'Roux', steps: ['First Block', 'Second Block', 'CMLL', 'LSE'], color: 'text-purple-400' }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {methods.map(m => (
        <div key={m.name} className="bg-slate-800 p-6 rounded-2xl">
          <h2 className={`text-2xl font-bold mb-4 ${m.color}`}>{m.name}</h2>
          <div className="flex gap-2">
            {m.steps.map(s => <span key={s} className="bg-slate-900 px-3 py-1 rounded text-xs border border-slate-700">{s}</span>)}
          </div>
        </div>
      ))}
    </div>
  );
}