import data from '@/blog.json'

export function fetchPosts(page = 1, search = '', category = null) {
  const pageSize = 3

  let filteredPosts = data.posts

  if (search) {
    filteredPosts = filteredPosts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase()),
    )
  }

  if (category) {
    filteredPosts = filteredPosts.filter((post) =>
      post.categories.includes(Number(category)),
    )
  }

  const offset = (page - 1) * pageSize
  const paginatedPosts = filteredPosts.slice(offset, offset + pageSize)

  return {
    total: filteredPosts.length,
    posts: paginatedPosts,
  }
}
