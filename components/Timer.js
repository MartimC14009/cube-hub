"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient'

export default function Timer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [scramble, setScramble] = useState("A carregar...");
  const [history, setHistory] = useState([]);

  const generateScramble = () => {
    const moves = ["R", "L", "U", "D", "F", "B"];
    const modifiers = ["", "'", "2"];
    let res = [];
    let lastMove = "";
    while (res.length < 20) {
      let m = moves[Math.floor(Math.random() * moves.length)];
      if (m !== lastMove) {
        res.push(m + modifiers[Math.floor(Math.random() * modifiers.length)]);
        lastMove = m;
      }
    }
    return res.join(" ");
  };

  useEffect(() => {
    setScramble(generateScramble());
  }, []);

  const handleKeyDown = useCallback(async (e) => {
    if (e.code === 'Space') {
      e.preventDefault();
      if (isRunning) {
        setIsRunning(false);
        const newSolve = { t: time, s: scramble, date: new Date().toLocaleString() };
        setHistory(prev => [newSolve, ...prev]);
        setScramble(generateScramble());
        // Enviar para o Supabase opcionalmente aqui
      } else {
        setTime(0);
        setIsRunning(true);
      }
    }
  }, [isRunning, time, scramble]);
  // Dentro do componente Timer.js
const saveSolve = async (timeInMs, currentScramble) => {
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    const { error } = await supabase
      .from('solves')
      .insert([
        { 
          user_id: user.id, 
          time_ms: timeInMs, 
          scramble: currentScramble 
        }
      ]);

    if (error) console.error("Erro ao guardar na nuvem:", error);
  } else {
    // Se não estiver logado, continua a usar o localStorage
    const localHistory = JSON.parse(localStorage.getItem('cube-history') || '[]');
    localStorage.setItem('cube-history', JSON.stringify([{t: timeInMs, s: currentScramble}, ...localHistory]));
  }
};
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    let interval;
    if (isRunning) interval = setInterval(() => setTime(t => t + 10), 10);
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="text-center p-10 bg-slate-900 rounded-3xl shadow-2xl">
      <div className="text-xl font-mono text-cyan-400 mb-8 uppercase tracking-widest">{scramble}</div>
      <div className="text-9xl font-mono font-bold mb-10">{(time / 1000).toFixed(2)}</div>
      <div className="text-slate-500">Pressione Espaço para {isRunning ? 'Parar' : 'Começar'}</div>
    </div>
  );
  
}