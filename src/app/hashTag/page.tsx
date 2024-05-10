"use client";

import React from "react";
import Link from "next/link";

interface HashTag {
  id: number;
  tag: string;
}

async function fetchHashTags() {
  const res = await fetch("http://localhost:3000/api/hashTag", {
    cache: "no-store",
  });

  const data = await res.json();
  return data.posts;
}
const HashTagsPage = async () => {
  const hashTags = await fetchHashTags();

  return (
    <>
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="h3">ハッシュタグ一覧</h1>
          <Link href={"http://localhost:3000/hashTag/create"}>新規作成</Link>
        </div>
        <table className="table table-hover">
          <thead className="thead-light">
            <tr>
              <th>ID</th>
              <th>Hash Tag</th>
            </tr>
          </thead>
          <tbody>
            {hashTags.map((hashTag: HashTag) => (
              <tr key={hashTag.id}>
                <td>{hashTag.id}</td>
                <td>{hashTag.tag}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HashTagsPage;
