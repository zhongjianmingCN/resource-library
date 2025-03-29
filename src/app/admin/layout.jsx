export default function AdminLayout({ children }) {
    return (
      <div className="min-h-screen bg-slate-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">管理后台</h1>
          <nav className="flex gap-6 mb-8 border-b border-slate-700 pb-4">
            <a href="/admin" className="hover:text-indigo-400">资源管理</a>
            <a href="/admin/tags" className="hover:text-indigo-400">标签管理</a>
          </nav>
          {children}
        </div>
      </div>
    )
  }