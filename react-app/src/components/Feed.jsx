import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MasonryLayout from './MasonryLayout';
import Post from './Post'

import Spinner from './Spinner';

const Feed = () => {
  const [posts, setPosts] = useState();
  const { categoryId } = useParams();

  useEffect(() => {
    if (categoryId){
      console.log(categoryId)
      getCategoryPosts(categoryId)
    } else {
      getCategoryPosts("627d9cd32d8b0a33806dc66f")
    }
  }, [categoryId])

  async function getCategoryPosts(c_id){
    let url = new URL(`https://finalproject-links.azurewebsites.net/api/category-getallposts`)
    const params = {
      id: c_id
      }
    url.search = new URLSearchParams(params)
    console.log(url)
    const r = await fetch(url)
    const p = await r.json()
    console.log(p.posts)
    setPosts(p.posts)
  }

  if (!posts) {
    return (
      <div>Loading</div>
    );
  }
  return (
    <div>
      {posts && (
      <MasonryLayout posts={posts}/>
      )}
    </div>
  );
};

export default Feed;