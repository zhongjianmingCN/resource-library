import './globals.css'
import { Inter } from 'next/font/google'
import AuthButton from '@/components/AuthButton'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '资源库',
  description: '多媒体资源管理系统',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <header className="bg-slate-900 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">资源总库</h1>
            <AuthButton />
          </div>
        </header>
        {children}
      </body>
    </html>
  )
}