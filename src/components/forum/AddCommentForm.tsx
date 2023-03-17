import { ActionIcon, Textarea } from "@mantine/core";
import { api } from "../../utils/api";
import type { FC } from "react";
import { useState } from "react";
import { PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/24/outline";

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

export default AddCommentForm;
