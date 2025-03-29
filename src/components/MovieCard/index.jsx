import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function MovieCard({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative overflow-hidden rounded-lg hover:transform hover:scale-105 transition-all duration-300"
    >
      <Link href={`/movie/${data.id}`}>
        <div className="aspect-[2/3] relative">
          <Image
            src={data.poster_url}
            alt={data.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity">
          <h3 className="text-white font-semibold line-clamp-2">{data.title}</h3>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-300">
            <span>{data.metadata.year}</span>
            <span>•</span>
            <span className="flex items-center">
              <StarIcon className="w-4 h-4 mr-1 text-yellow-400" />
              {data.metadata.rating}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  )
}