import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'

export default async function MovieDetail({ params }) {
  const { data: movie } = await supabase
    .from('resources')
    .select(`
      *,
      tags!resource_tags(*),
      persons!resource_persons(*)
    `)
    .eq('id', params.id)
    .single()

  const directors = movie.persons.filter(p => p.role === 'director')
  const actors = movie.persons.filter(p => p.role === 'actor')

  return (
    <div className="bg-slate-900 min-h-screen text-white">
      <div className="container mx-auto px-4 py-12">
        {/* 海报区 */}
        <div className="relative aspect-[3/1] rounded-2xl overflow-hidden mb-8">
          <Image
            src={movie.poster_url}
            alt={movie.title}
            fill
            className="object-cover"
          />
        </div>

        {/* 元数据区 */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* 主要信息 */}
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
            <div className="flex gap-4 mb-6 text-lg">
              <span className="bg-indigo-600 px-3 py-1 rounded-full">
                {movie.metadata.year}
              </span>
              <div className="flex items-center gap-2">
                <StarIcon className="w-6 h-6 text-yellow-400" />
                <span>{movie.metadata.rating}/10</span>
              </div>
            </div>

            {/* 标签 */}
            <div className="flex flex-wrap gap-2 mb-8">
              {movie.tags.map(tag => (
                <span
                  key={tag.id}
                  className="px-3 py-1 rounded-full bg-slate-800 text-sm"
                >
                  {tag.name}
                </span>
              ))}
            </div>

            {/* 简介 */}
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
              {movie.metadata.description}
            </p>
          </div>

          {/* 演职人员 */}
          <div className="space-y-8">
            <PersonSection title="导演" data={directors} />
            <PersonSection title="演员" data={actors} />
          </div>
        </div>
      </div>
    </div>
  )
}

function PersonSection({ title, data }) {
  if (!data.length) return null

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <div className="grid gap-4">
        {data.map(person => (
          <Link
            key={person.id}
            href={`/person/${person.id}`}
            className="flex items-center gap-4 p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <Image
                src={person.avatar_url}
                alt={person.name}
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <span className="font-medium">{person.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}