import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';

function Posts() {
  const [posts, setPosts] = useState();

  useEffect(() => {
    axios
      .get('https://lambda-mw-starter.herokuapp.com/api/posts')
      .then(res => {
        setPosts(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  console.log('posts', posts);
  if (!posts) return <h2>Loading...</h2>;
  return (
    <>
      <h2>Posts</h2>
      {posts.map(post => {
        return <Post key={post.id} title={post.title} />;
      })}
    </>
  );
}
export default Posts;
