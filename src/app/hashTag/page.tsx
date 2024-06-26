"use client";
import React, { useState, useEffect } from "react";
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

const HashTagsPage = () => {
  const [hashTags, setHashTags] = useState<HashTag[]>([]);
  const [selectedHashTags, setSelectedHashTags] = useState<{
    [key: number]: boolean;
  }>({});

  useEffect(() => {
    const fetchHashTags = async () => {
      const res = await fetch("http://localhost:3000/api/hashTag", {
        cache: "no-store",
      });
      const data = await res.json();
      setHashTags(data.posts);
    };
    fetchHashTags();
  }, []);

  const handleFavoriteRegistration = async () => {
    const key = Object.keys(selectedHashTags);

    // 選択された各IDに対して個別のPOSTリクエストを送信
    await fetch("http://localhost:3000/api/hashTag/regiFav", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: 1, hashtagId: parseInt(key[0]) }),
    });
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedHashTags((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="h3">ハッシュタグ一覧</h1>
          <Button onClick={handleFavoriteRegistration} className="m-2">
            お気に入り登録
          </Button>
          <Button asChild className="m-2">
            <Link href={"http://localhost:3000/hashTag/create"}>新規作成</Link>
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
          {hashTags.map((hashTag) => (
            <TableRow key={hashTag.id}>
              <TableCell className="font-medium">{hashTag.id}</TableCell>
              <TableCell>{hashTag.tag}</TableCell>
              <TableCell>
                <Checkbox
                  checked={!!selectedHashTags[hashTag.id]}
                  onCheckedChange={() => handleCheckboxChange(hashTag.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default HashTagsPage;
