import type { NextPage } from "next";
import { useRouter } from "next/router";
import Comment from "../../components/forum/Comment";

export const ForumCommentPage: NextPage = () => {
  const {
    query: { id },
  } = useRouter();

  if (typeof id !== "string") return <h1>Invalid ID</h1>;

  return <Comment id={id} />;
};

export default ForumCommentPage;
