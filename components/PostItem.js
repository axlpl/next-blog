import Image from 'next/image'

export default function PostItem({ post, categoryNames }) {
  return (
    <div className="shadow-lg rounded-xl bg-white">
      <div className="relative h-40 w-full">
        <Image
          src={post.imageUrl}
          alt={post.title}
          layout="fill"
          objectFit="cover"
          className="absolute z-0 rounded-t-xl"
        />
      </div>
      <div className="px-6 py-4">
        <p className="text-base text-purple-500">{categoryNames}</p>
        <h2 className="text-lg font-medium mb-3">{post.title}</h2>
        <p className="text-base text-gray-500">{post.excerpt}</p>
      </div>
    </div>
  )
}
