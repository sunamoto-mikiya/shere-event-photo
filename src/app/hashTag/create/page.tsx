"use client";

import { useRouter } from "next/navigation";
import React, { Fragment, useRef } from "react";

const postHashTag = async ({ tag }: { tag: string }) => {
  const res = fetch("http://localhost:3000/api/hashTag", {
    method: "POST",
    body: JSON.stringify({ tag }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (await res).json();
};

const AddHashTag = () => {
  const router = useRouter();
  const tagRef = useRef<HTMLInputElement | null>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (tagRef.current) {
      await postHashTag({
        tag: tagRef.current?.value,
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
            Add New HashTag!!
          </p>
          <form onSubmit={handleSubmit}>
            <input
              ref={tagRef}
              placeholder="Enter HashTag"
              type="text"
              className="rounded-md px-4 w-full py-2 my-2"
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

export default AddHashTag;
