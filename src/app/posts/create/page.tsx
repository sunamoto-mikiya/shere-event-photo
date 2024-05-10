"use client";

import { useRouter } from "next/navigation";
import React, { Fragment, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const postPost = async ({
  imageUrl,
  link,
  hashtagId,
  createdBy,
}: {
  imageUrl: string;
  link: string;
  hashtagId: number;
  createdBy: number;
}) => {
  const res = fetch("http://localhost:3000/api/post", {
    method: "POST",
    body: JSON.stringify({ imageUrl, link, hashtagId, createdBy: 1 }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (await res).json();
};

const AddPost = () => {
  const router = useRouter();
  const imageUrlRef = useRef<HTMLInputElement | null>(null);
  const linkRef = useRef<HTMLTextAreaElement | null>(null);
  const [hashtagId, setHashtagId] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (imageUrlRef.current && linkRef.current) {
      await postPost({
        imageUrl: imageUrlRef.current?.value,
        link: linkRef.current?.value,
        hashtagId: parseInt(hashtagId),
        createdBy: 1,
      });

      router.push("/");
      router.refresh();
    }
  };
  return (
    <>
      <div className="w-full m-auto  my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">
            Share Your Images!!
          </p>
          <form onSubmit={handleSubmit}>
            <Label htmlFor="ImageURL">Image URL</Label>
            <Input
              type="text"
              ref={imageUrlRef}
              id="ImageURL"
              placeholder="Enter Image URL"
              className="rounded-md px-4 w-full py-2 my-2"
            />
            <Label htmlFor="ShareLink">ハッシュタグを選択</Label>
            <Select
              value={hashtagId}
              onValueChange={(value) => setHashtagId(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="選択してください" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">wekfest</SelectItem>
                <SelectItem value="2">stanceNation</SelectItem>
                <SelectItem value="5">fendelist</SelectItem>
              </SelectContent>
            </Select>
            <Label htmlFor="ShareLink">Share Link</Label>
            <Textarea
              ref={linkRef}
              placeholder="Enter Share Link"
              className="rounded-md px-4 py-2 w-full my-2"
            />

            <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddPost;
