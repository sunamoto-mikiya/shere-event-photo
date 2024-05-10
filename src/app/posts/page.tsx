"use client";

import React from "react";
import Link from "next/link";

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
    <>
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="h3">投稿一覧</h1>
          <Link href={"http://localhost:3000/posts/create"}>新規作成</Link>
        </div>
        <table className="table table-hover">
          <thead className="thead-light">
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
    </>
  );
};

export default PostsPage;
