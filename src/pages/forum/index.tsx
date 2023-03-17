import { Button } from "@mantine/core";
import { NextLink } from "@mantine/next";
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
          Discussion ({getQuery.data.length})
        </h2>
      </div>
      <Button component={NextLink} href="/forum/new" legacyBehavior>
        Add Post
      </Button>
      <ul>
        {getQuery.data.map((comment) => (
          <li key={comment.id}>
            <Link href={`/forum/${comment.id}`}>{comment.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ForumIndexPage;
