export default function Forum({ posts }) {
  return (
    <div className="space-y-4 w-full max-w-4xl">
      <h2 className="text-2xl font-bold text-white mb-6">Fórum da Comunidade</h2>
      {posts.map(post => (
        <div key={post.id} className="bg-slate-800 p-5 rounded-xl border border-slate-700 hover:border-cyan-500 cursor-pointer transition">
          <span className="text-xs text-cyan-500 font-bold uppercase">{post.category}</span>
          <h3 className="text-xl font-semibold text-white">{post.title}</h3>
          <p className="text-slate-400 text-sm">Por @{post.author}</p>
        </div>
      ))}
    </div>
  );
}