import { Button } from "@mantine/core";
import { NextLink } from "@mantine/next";
import Link from "next/link";
import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "../server/api/root";

type ForumPreviewProps = {
  forumComments: inferProcedureOutput<
    AppRouter["forum"]["comments"]["getRootComments"]
  >;
};

const ForumPreview: React.FC<ForumPreviewProps> = ({ forumComments }) => {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white lg:text-2xl">
          Discussion ({forumComments.length})
        </h2>
      </div>
      <Button component={NextLink} href="/forum/new" legacyBehavior>
        Add Post
      </Button>
      <ul>
        {forumComments.map((comment) => (
          <li key={comment.id}>
            <Link href={`/forum/${comment.id}`}>{comment.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ForumPreview;
