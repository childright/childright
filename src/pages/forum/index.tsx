/* eslint-disable @next/next/no-img-element */
import {
  Avatar,
  Button,
  Group,
  Paper,
  Text,
  TypographyStylesProvider,
} from "@mantine/core";
import type { NextPage } from "next";
import { api } from "../../utils/api";
import type { ForumComment } from "@prisma/client";
import { useState } from "react";

const ForumCommentPage: NextPage = () => {
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
      <AddCommentForm />
      {getQuery.data.map((comment) => (
        <Comment key={comment.id} id={comment.id} initialData={comment} />
      ))}
    </>
  );
};

const Comment = ({
  id,
  initialData,
}: {
  id: string;
  initialData?: ForumComment;
}) => {
  const getQuery = api.forum.comments.get.useQuery(
    { id },
    { placeholderData: initialData, enabled: !initialData }
  );

  const [subCommentOpen, setSubCommentOpen] = useState(false);

  if (getQuery.isLoading) return <p>Loading...</p>;

  if (getQuery.isError) return <p>Error: {getQuery.error.message}</p>;

  if (!getQuery.data) return <p>Not Found</p>;

  const postTime = getQuery.data.createdAt.toLocaleString();

  return (
    <>
      <Paper withBorder radius="md">
        <Group>
          <Avatar
            src={getQuery.data.user?.profileStep?.avatarSeed ?? ""}
            alt={getQuery.data.user?.profileStep?.username}
            radius="xl"
          />
          <div>
            <Text size="sm">{getQuery.data.user?.profileStep?.username}</Text>
            <Text size="xs" color="dimmed">
              {getQuery.data?.createdAt.toLocaleString("de-DE")}
            </Text>
          </div>
          <Text>{getQuery.data.message}</Text>
        </Group>
      </Paper>
      <article className="mb-6 rounded-lg bg-white p-6 text-base dark:bg-gray-900">
        <footer className="mb-2 flex items-center justify-between">
          <div className="flex items-center">
            <p className="mr-3 inline-flex items-center text-sm text-gray-900 dark:text-white">
              <img
                className="mr-2 h-6 w-6 rounded-full"
                src={getQuery.data.user?.profileStep?.avatarSeed ?? ""}
                alt="Michael Gough"
              />
              {getQuery.data.user?.profileStep?.username}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <time dateTime={postTime} title={postTime}>
                {postTime}
              </time>
            </p>
          </div>
          <button
            id="dropdownComment1Button"
            data-dropdown-toggle="dropdownComment1"
            className="inline-flex items-center rounded-lg bg-white p-2 text-center text-sm font-medium text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            type="button"
          >
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
            </svg>
            <span className="sr-only">Comment settings</span>
          </button>
        </footer>
        <p className="text-gray-500 dark:text-gray-400">
          {getQuery.data.message}
        </p>
        {subCommentOpen ? (
          <AddCommentForm />
        ) : (
          <Button onClick={() => setSubCommentOpen(true)}>Reply</Button>
        )}

        <CommentChildrenList id={id} initialData={getQuery.data.children} />
      </article>
    </>
  );
};

const CommentChildrenList = ({
  id,
  initialData,
}: {
  id: string;
  initialData?: ForumComment[];
}) => {
  const getChildrenQuery = api.forum.comments.getChildren.useQuery(
    { id },
    { placeholderData: initialData, enabled: false }
  );

  return (
    <ul>
      {getChildrenQuery.data === undefined && (
        <Button onClick={() => void getChildrenQuery.refetch()}>
          Kommentare laden
        </Button>
      )}
      {getChildrenQuery.data?.map((comment) => (
        <Comment key={comment.id} id={comment.id} initialData={comment} />
      ))}
    </ul>
  );
};

const AddCommentForm = () => {
  return (
    <div>
      <form className="mb-6">
        <div className="mb-4 rounded-lg rounded-t-lg border border-gray-200 bg-white py-2 px-4 dark:border-gray-700 dark:bg-gray-800">
          <label htmlFor="comment" className="sr-only">
            Your comment
          </label>
          <textarea
            id="comment"
            rows={6}
            className="w-full border-0 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
            placeholder="Write a comment..."
            required
            defaultValue={""}
          />
        </div>
        <button
          type="submit"
          className="bg-primary-700 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 inline-flex items-center rounded-lg py-2.5 px-4 text-center text-xs font-medium text-white focus:ring-4"
        >
          Post comment
        </button>
      </form>
    </div>
  );
};
export default ForumCommentPage;
