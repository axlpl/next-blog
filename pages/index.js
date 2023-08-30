import { useState, useEffect } from 'react'
import Link from 'next/link'

import { fetchPosts } from '@/api/posts'
import { fetchCategories } from '@/api/categories'

import PaginationButton from '@/components/PaginationButton'
import SearchField from '@/components/SearchField'
import PostItem from '@/components/PostItem'
import HeroText from '@/components/HeroText'
import CategoryDropdown from '@/components/CategoryDropdown'

import useGetCategoryNames from '@/composable/useGetCategoryNames'

export async function getServerSideProps() {
  try {
    const { posts, total } = await fetchPosts(1, '')
    const categories = await fetchCategories()

    return {
      props: {
        initialPosts: posts,
        initialTotal: total,
        categories,
      },
    }
  } catch (error) {
    console.error('Error fetching server side props:', error)
    return { props: {} }
  }
}

export default function HomePage({ initialPosts, initialTotal, categories }) {
  const getCategoryNames = useGetCategoryNames(categories)

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(null)
  const [posts, setPosts] = useState(initialPosts)
  const [total, setTotal] = useState(initialTotal)

  const handleCategoryChange = (categoryID) => {
    setCategory(categoryID)
  }

  useEffect(() => {
    const fetchNewData = async () => {
      try {
        const { posts, total } = await fetchPosts(page, search, category)
        setPosts(posts)
        setTotal(total)
      } catch (error) {
        console.error('Error fetching new data:', error)
      }
    }

    fetchNewData()
  }, [page, search, category])

  return (
    <>
      <div className="container mx-auto">
        <HeroText
          title="From the blog"
          text="Vivamus ornare sem vel nisl facilisis, eu faucibus metus hendrerit. Etiam scelerisque dolor sed placerat pulvinar."
        />
        <div className="grid grid-cols-5 gap-6 mb-6">
          <div className="col-span-3">
            <div className="flex relative">
              <CategoryDropdown
                category={category}
                categories={categories}
                handleCategoryChange={handleCategoryChange}
                getCategoryNames={getCategoryNames}
              />
              <div className="relative w-full">
                <SearchField
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="col-span-2 flex justify-end">
            <PaginationButton
              className="rotate-180 mr-2"
              disabled={page === 1}
              onClick={() => setPage((prevPage) => prevPage - 1)}
            />
            <PaginationButton
              disabled={page * 3 >= total}
              onClick={() => setPage((prevPage) => prevPage + 1)}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <PostItem
                key={post.id}
                post={post}
                categoryNames={getCategoryNames(post.categories).join(', ')}
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
