'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import MovieCard from '@/components/Card/MovieCard'

export default function CategorySection({ type }) {
  const [currentPage, setPage] = useState(1)
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)

  const fetchData = async (page) => {
    const from = (page - 1) * 20
    const { data: res, count } = await supabase
      .from('resources')
      .select('*', { count: 'exact' })
      .eq('type', type)
      .range(from, from + 19)
      .order('created_at', { ascending: false })

    setData(res)
    setTotal(Math.ceil(count / 20))
  }

  useEffect(() => { fetchData(currentPage) }, [currentPage])

  return (
    <section className="mb-20">
      <h2 className="text-3xl text-white mb-8 font-bold">{type.toUpperCase()}</h2>
      
      {/* 卡片网格 */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
        {data.map(item => <MovieCard key={item.id} data={item} />)}
      </div>

      {/* 分页器 */}
      <Pagination current={currentPage} total={total} onChange={setPage} />
    </section>
  )
}