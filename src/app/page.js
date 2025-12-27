'use client';
import React, { useState } from 'react';
import Timer from '../components/Timer';
import Forum from '../components/Forum';
import Theory from '../components/Theory';
import AlgoLibrary from '../components/AlgoLibrary';

export default function CubeHub() {
  const [activeTab, setActiveTab] = useState('timer');

  // Dados simulados para o fórum (depois virão do Supabase)
  const mockPosts = [
    { id: 1, title: "Como melhorar o Finger Trick no algoritmo T-Perm?", author: "CuberPT", category: "Métodos" },
    { id: 2, title: "Review do GAN 14 MagLev: Vale a pena?", author: "Speedy", category: "Hardware" },
    { id: 3, title: "Novo Recorde Nacional de 3x3!", author: "WCA_News", category: "Competições" }
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Barra de Navegação Superior */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            CUBEHUB
          </h1>
          <div className="flex gap-6">
            {['timer', 'algos', 'teoria', 'forum'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                  activeTab === tab ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Conteúdo Dinâmico */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {activeTab === 'timer' && (
          <div className="animate-in fade-in duration-500">
            <Timer />
          </div>
        )}

        {activeTab === 'algs' && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <AlgoLibrary />
          </div>
        )}

        {activeTab === 'teoria' && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <Theory />
          </div>
        )}

        {activeTab === 'forum' && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <Forum posts={mockPosts} />
          </div>
        )}
      </div>

      {/* Rodapé Simples */}
      <footer className="border-t border-slate-900 py-8 mt-20 text-center text-slate-600 text-xs">
        &copy; 2025 CubeHub - A tua plataforma de Speedcubing
      </footer>
    </main>
  );}