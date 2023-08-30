import data from '@/blog.json'

export function fetchPostBySlug(slug) {
  const { posts } = data
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    throw new Error('Post not found')
  }
  return post
}
