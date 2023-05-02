import type { NextPage } from "next";
import ForumPreview from "../../ui/ForumPreview";
import { api } from "../../utils/api";

const ForumIndexPage: NextPage = () => {
  const getQuery = api.forum.comments.getRootComments.useQuery();

  if (getQuery.isLoading) return <p>Loading...</p>;

  if (getQuery.isError) return <p>Error: {getQuery.error.message}</p>;

  if (!getQuery.data) return <p>Not Found</p>;

  return <ForumPreview forumComments={getQuery.data} />;
};

export default ForumIndexPage;
