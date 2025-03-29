'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function TagManager() {
  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState('')

  useEffect(() => { loadTags() }, [])

  const loadTags = async () => {
    const { data } = await supabase.from('tags').select('*')
    setTags(data)
  }

  const handleCreate = async () => {
    const { data } = await supabase
      .from('tags')
      .insert({ name: newTag })
      .select()
    setTags([...tags, ...data])
    setNewTag('')
  }

  const handleUpdate = async (id, newName) => {
    await supabase
      .from('tags')
      .update({ name: newName })
      .eq('id', id)
    loadTags()
  }

  const handleDelete = async (id) => {
    await supabase
      .from('tags')
      .delete()
      .eq('id', id)
    loadTags()
  }

  return (
    <div className="max-w-3xl">
      <div className="flex gap-4 mb-8">
        <input
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          className="flex-1 bg-slate-800 px-4 py-2 rounded"
          placeholder="输入新标签名称"
        />
        <button
          onClick={handleCreate}
          className="bg-green-600 px-6 py-2 rounded hover:bg-green-700"
        >
          添加标签
        </button>
      </div>

      <div className="space-y-2">
        {tags.map(tag => (
          <div key={tag.id} className="flex items-center gap-4 bg-slate-800 p-4 rounded">
            <input
              defaultValue={tag.name}
              onBlur={(e) => handleUpdate(tag.id, e.target.value)}
              className="bg-transparent flex-1"
            />
            <button
              onClick={() => handleDelete(tag.id)}
              className="text-red-400 hover:text-red-300"
            >
              删除
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}