'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import MovieCard from '@/components/MovieCard'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    const search = async () => {
      if (!query.trim()) return

      const { data } = await supabase
        .from('resources')
        .select('*')
        .textSearch('title', query, {
          type: 'websearch',
          config: 'chinese'
        })
        .limit(50)

      setResults(data || [])
    }

    const timer = setTimeout(search, 500)
    return () => clearTimeout(timer)
  }, [query])

  return (
    <div className="container mx-auto px-4 py-12">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜索电影、剧集、书籍..."
        className="w-full px-6 py-3 text-lg bg-slate-800 text-white rounded-lg mb-8 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {results.map(item => (
          <MovieCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  )
}