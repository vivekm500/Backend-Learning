// UI LAYER

import React from 'react'
import "../style/feed.scss"
import Post from '../components/Post';
import { usePost } from '../hooks/usePost';
import { useEffect } from 'react';



const Feed = () => {

  const { feed, loading, handleGetFeed } = usePost();

  useEffect(() => {
    handleGetFeed();
  }, []);

  if (loading || !feed) {
    return (
      <main>
        <h1>feed is Loading...</h1>
      </main>
    );
  }

  console.log(feed)

  return (
    <main className="feed-page">
      <div className="feed">
        <div className="posts">
         {feed.map((post)=>{
          return <Post key={post._id} user={post.user} post={post}/>
         })}
        </div>
      </div>
    </main>
  );
}

export default Feed
