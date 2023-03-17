import { Button, Loader } from "@mantine/core";
import { api } from "../../utils/api";
import Comment from "./Comment";

const CommentChildrenList = ({ id }: { id: string }) => {
  const getChildrenQuery = api.forum.comments.getChildrenBatch.useInfiniteQuery(
    {
      parentId: id,
      limit: 5,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  if (getChildrenQuery.isFetching) return <Loader />;

  return (
    <ul>
      {getChildrenQuery.data?.pages.map((page) =>
        page.items.map((comment) => (
          <Comment key={comment.id} id={comment.id} />
        ))
      )}
      {getChildrenQuery.isFetchingNextPage && <Loader />}
      {getChildrenQuery.hasNextPage && (
        <Button
          variant="subtle"
          compact
          onClick={() => getChildrenQuery.fetchNextPage()}
        >
          Load More
        </Button>
      )}
    </ul>
  );
};

export default CommentChildrenList;
