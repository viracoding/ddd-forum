import { PostsList } from '../components/postsList'
import { PostsViewSwitcher } from '../components/postsViewSwitcher'
import { api } from '@/api'
import { useState, useEffect } from 'react'

export const MainPage = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    let mounted = true
    api.posts.getPosts().then((response) => {
      if (mounted) {
        setPosts(response.data.data.posts)
      }
    })
    return () => {
      mounted = false
    }
  }, [])

  return (
    <>
      <PostsViewSwitcher />
      <PostsList posts={posts} />
    </>
  )
}
