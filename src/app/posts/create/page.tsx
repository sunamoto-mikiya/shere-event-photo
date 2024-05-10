"use client";

import { useRouter } from "next/navigation";
import React, { Fragment, useRef } from "react";

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
  const hashtagIdRef = useRef<HTMLInputElement | null>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (imageUrlRef.current && linkRef.current && hashtagIdRef.current) {
      await postPost({
        imageUrl: imageUrlRef.current?.value,
        link: linkRef.current?.value,
        hashtagId: parseInt(hashtagIdRef.current?.value),
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
            Add a Wonderful Blog 🚀
          </p>
          <form onSubmit={handleSubmit}>
            <input
              ref={imageUrlRef}
              placeholder="Enter Title"
              type="text"
              className="rounded-md px-4 w-full py-2 my-2"
            />
            <input
              ref={hashtagIdRef}
              placeholder="Enter Title"
              type="text"
              className="rounded-md px-4 w-full py-2 my-2"
            />
            <textarea
              ref={linkRef}
              placeholder="Enter Description"
              className="rounded-md px-4 py-2 w-full my-2"
            ></textarea>

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
