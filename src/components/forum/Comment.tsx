import { ActionIcon, Avatar, Group, Paper, Text, Title } from "@mantine/core";
import { api } from "../../utils/api";
import { useState } from "react";
import {
  ChatBubbleLeftRightIcon,
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
} from "@heroicons/react/24/outline";
import CommentChildrenList from "./CommentChildrenList";
import AddCommentForm from "./AddCommentForm";

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

export default Comment;
