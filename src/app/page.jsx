import CategorySection from '@/components/CategorySection'
import SearchBar from '@/components/SearchBar'
import { supabase } from '@/lib/supabase'

export default async function Home() {
  const { data: categories } = await supabase
    .from('resources')
    .select('type')
    .neq('type', 'av')
    .group('type')

  return (
    <main className="bg-slate-900 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <SearchBar />
        
        {/* 常规分类展示 */}
        <div className="space-y-20">
          {categories.map(({ type }) => (
            <CategorySection key={type} type={type} />
          ))}
        </div>

        {/* AV专区 */}
        <section className="mt-20 border-t border-slate-700 pt-20">
          <h2 className="text-3xl text-white mb-8 font-bold">成人专区</h2>
          <div className="bg-slate-800 p-8 rounded-xl">
            <p className="text-gray-400 mb-6">请登录后查看成人内容</p>
            <AuthButton showLogout={false} />
          </div>
        </section>
      </div>
    </main>
  )
}