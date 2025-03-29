'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AuthAVSection() {
  const [user, setUser] = useState(null)
  const [avData, setAVData] = useState([])

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      if (user) fetchAVData()
    }
    checkAuth()
  }, [])

  const fetchAVData = async () => {
    const { data } = await supabase
      .from('resources')
      .select('*')
      .eq('type', 'av')
    setAVData(data)
  }

  if (!user) return (
    <div className="text-center py-12">
      <button 
        onClick={() => supabase.auth.signInWithOAuth({ provider: 'github' })}
        className="bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700"
      >
        登录查看成人内容
      </button>
    </div>
  )

  return (
    <CategorySection type="av" />
  )
}