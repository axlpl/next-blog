import { fetchPostBySlug } from '@/api/post'
import { fetchCategories } from '@/api/categories'

import PostItem from '@/components/PostItem'
import HeroText from '@/components/HeroText'

import useGetCategoryNames from '@/composable/useGetCategoryNames'

export async function getServerSideProps(context) {
  try {
    const post = await fetchPostBySlug(context.params.slug)
    const categories = await fetchCategories()
    return {
      props: {
        post,
        categories,
      },
    }
  } catch (error) {
    console.error('Error fetching server side props:', error)
    return { props: { post: null, categories: null } }
  }
}

export default function PostPage({ post, categories }) {
  const getCategoryNames = useGetCategoryNames(categories)

  return (
    <div className="container mx-auto mt-">
      <HeroText title={post.title} />
      <PostItem
        key={post.id}
        post={post}
        categoryNames={getCategoryNames(post.categories).join(', ')}
      />
    </div>
  )
}
