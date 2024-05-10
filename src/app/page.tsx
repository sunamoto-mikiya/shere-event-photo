import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
export default async function Home() {
  const posts = await fetchPosts();

  return (
    <>
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="h3">投稿一覧</h1>
          <Button asChild className="m-2">
            <Link href={"http://localhost:3000/posts/create"}>新規作成</Link>
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Image URL</TableHead>
              <TableHead>Link</TableHead>
              <TableHead>Hashtag ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post: Post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.id}</TableCell>
                <TableCell>{post.imageUrl}</TableCell>
                <TableCell>
                  <Link href={post.link}>{post.link}</Link>
                </TableCell>
                <TableCell>{post.hashtagId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
