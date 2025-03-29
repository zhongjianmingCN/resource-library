'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import MovieCard from '@/components/MovieCard'
import Pagination from './Pagination'

export default function CategorySection({ type }) {
  const [currentPage, setPage] = useState(1)
  const [data, setData] = useState([])
  const [totalPages, setTotalPages] = useState(0)

  const fetchData = async () => {
    const pageSize = 20
    const from = (currentPage - 1) * pageSize

    const { data: res, count } = await supabase
      .from('resources')
      .select('*', { count: 'exact' })
      .eq('type', type)
      .range(from, from + pageSize - 1)
      .order('created_at', { ascending: false })

    setData(res || [])
    setTotalPages(Math.ceil(count / pageSize))
  }

  useEffect(() => {
    fetchData()
  }, [currentPage])

  return (
    <section>
      <h2 className="text-2xl font-bold text-white mb-6 capitalize">{type}</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data.map(item => (
          <MovieCard key={item.id} data={item} />
        ))}
      </div>

      <Pagination 
        current={currentPage}
        total={totalPages}
        onChange={setPage}
      />
    </section>
  )
}