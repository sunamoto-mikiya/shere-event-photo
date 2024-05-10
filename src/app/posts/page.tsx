"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Post {
  id: number;
  imageUrl: string;
  link: string;
  hashtagId: number;
  createdBy: number;
}

async function fetchPosts() {
  const res = await fetch("http://localhost:3000/api/post", {
    cache: "no-store",
  });

  const data = await res.json();
  return data.posts;
}
const PostsPage = async () => {
  const posts = await fetchPosts();

  return (
    console.log(posts),
    (
      <div className="container mt-5">
        <h1>投稿一覧</h1>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image URL</th>
              <th>Link</th>
              <th>Hashtag ID</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post: Post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.imageUrl}</td>
                <td>
                  <a href={post.link} target="_blank" rel="noopener noreferrer">
                    {post.link}
                  </a>
                </td>
                <td>{post.hashtagId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
};

export default PostsPage;
