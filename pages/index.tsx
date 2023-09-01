import HomePosts, { Post } from "@/components/HomePosts";

export default function Home({ posts }: any) {
  return (
    <main>
      <HomePosts posts={posts} />
    </main>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts: Post[] = await res.json();

  return {
    props: {
      posts,
    },
  };
}
