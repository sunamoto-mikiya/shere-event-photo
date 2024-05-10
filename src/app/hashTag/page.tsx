"use client";

import React from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

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
          <Button asChild className="m-2">
            <Link href={"http://localhost:3000/hashTag/create"}>新規作成</Link>
          </Button>
          <Button asChild className="m-2">
            <Link href={"http://localhost:3000/hashTag/regiFav"}>
              お気に入り登録
            </Link>
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Hash Tag</TableHead>
            <TableHead>お気に入り登録</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hashTags.map((hashTag: HashTag) => (
            <TableRow key={hashTag.id}>
              <TableCell className="font-medium">{hashTag.id}</TableCell>
              <TableCell>{hashTag.tag}</TableCell>
              <TableCell>
                <Checkbox />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default HashTagsPage;
