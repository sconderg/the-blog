import { Post } from "@/components/HomePosts";

const PostPage = ({ post }: any) => {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-3xl lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
      <p className="mt-2 text-gray-600">{post.body}</p>
    </div>
  );
};

export default PostPage;

export async function getStaticProps({ params }: any) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params?.id}`
  );
  const post: Post = await res.json();
  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/`);
  const posts: Post[] = await res.json();
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));
  return { paths, fallback: false };
}
