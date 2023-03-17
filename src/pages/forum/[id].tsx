/* eslint-disable @next/next/no-img-element */
import {
  ActionIcon,
  Avatar,
  Button,
  Group,
  Loader,
  Paper,
  Text,
  Title,
  Textarea,
} from "@mantine/core";
import type { NextPage } from "next";
import { api } from "../../utils/api";
import type { ForumComment } from "@prisma/client";
import type { FC } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  ChatBubbleLeftRightIcon,
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  PaperAirplaneIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export const ForumCommentPage: NextPage = () => {
  const {
    query: { id },
  } = useRouter();

  if (typeof id !== "string") return <h1>Invalid ID</h1>;

  return <Comment id={id} />;
};

const Comment = ({ id }: { id: string }) => {
  const getQuery = api.forum.comments.get.useQuery({ id });

  const [showCommentForm, setShowCommentForm] = useState(false);
  const [showSubComments, setShowSubComments] = useState(false);

  if (getQuery.isLoading) return <p>Loading...</p>;

  if (getQuery.isError) return <p>Error: {getQuery.error.message}</p>;

  if (!getQuery.data) return <p>Not Found</p>;

  const postTime = getQuery.data.createdAt.toLocaleString("de-DE");

  console.log(getQuery.data);
  return (
    <>
      <Paper withBorder radius="md" className="p-4">
        <div>
          <div className="flex items-center gap-1">
            <Avatar
              src={getQuery.data.user?.profileStep?.avatarSeed ?? ""}
              alt={getQuery.data.user?.profileStep?.username}
              radius="xl"
            />
            <Text>
              {getQuery.data.user?.profileStep?.username ?? "unnamed user"}
            </Text>
            <Text color="dimmed">{postTime}</Text>
          </div>
          <div className="p-4">
            <Title order={3}>{getQuery.data.title}</Title>
            <Text>{getQuery.data.message}</Text>
          </div>
        </div>
        <Group>
          <ActionIcon onClick={() => setShowCommentForm((v) => !v)}>
            <ChatBubbleLeftRightIcon />
          </ActionIcon>
          {getQuery.data._count.children > 0 && (
            <ActionIcon onClick={() => setShowSubComments((v) => !v)}>
              {showSubComments ? (
                <ChevronDoubleUpIcon />
              ) : (
                <ChevronDoubleDownIcon />
              )}
            </ActionIcon>
          )}
        </Group>
      </Paper>

      {showCommentForm && (
        <AddCommentForm
          parentId={id}
          onClose={(success: boolean) => {
            setShowCommentForm(false);
            if (success) setShowSubComments(true);
          }}
        />
      )}

      {showSubComments && <CommentChildrenList id={id} />}
    </>
  );
};

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

type AddCommentProps = {
  parentId: string;
  onClose: (success: boolean) => void;
};

const AddCommentForm: FC<AddCommentProps> = ({ parentId, onClose }) => {
  const [content, setContent] = useState("");

  const utils = api.useContext();

  const postComment = api.forum.comments.create.useMutation({
    onSuccess: () => {
      utils.forum.comments.get.invalidate({ id: parentId });
      utils.forum.comments.getChildrenBatch.invalidate({
        parentId,
        limit: 5,
      });
    },
  });

  const submit = async () => {
    await postComment.mutateAsync({ message: content, parentId: parentId });
    onClose(true);
  };

  return (
    <div className="mb-4 flex py-2 px-4">
      <div className="flex flex-col">
        <ActionIcon>
          <XMarkIcon onClick={() => onClose(false)} />
        </ActionIcon>
        <ActionIcon>
          <PaperAirplaneIcon onClick={submit} />
        </ActionIcon>
      </div>

      <div className=" flex-1">
        <Textarea
          id="comment"
          rows={6}
          className=""
          placeholder="Write a comment..."
          required
          value={content}
          onChange={(e) => setContent(e.currentTarget.value)}
        />
      </div>
    </div>
  );
};

export default ForumCommentPage;
