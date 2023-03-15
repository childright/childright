import type { NextPage } from "next";
import Link from "next/link";
import { api } from "../../utils/api";

const ForumIndexPage: NextPage = () => {
  const getQuery = api.forum.comments.getRootComments.useQuery();

  if (getQuery.isLoading) return <p>Loading...</p>;

  if (getQuery.isError) return <p>Error: {getQuery.error.message}</p>;

  if (!getQuery.data) return <p>Not Found</p>;

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white lg:text-2xl">
          Discussion (20)
        </h2>
      </div>
      {getQuery.data.map((comment) => (
        <Link href={`/forum/${comment.id}`} key={comment.id}>
          {comment.title}
        </Link>
      ))}
    </>
  );
};

export default ForumIndexPage;
