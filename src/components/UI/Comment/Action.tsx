import React from "react";
import { IActiveComment, IComment } from "@/common/type/comment";
import { FaPen, FaReply, FaTrash } from "react-icons/fa";
import Space from "../Space";
import Button from "../Button";

interface CommentItemActionProps {
  comment: IComment;
  canReply: boolean;
  canEdit: boolean;
  canRemove: boolean;
  onRemove: () => void;
  setActiveComment: React.Dispatch<React.SetStateAction<IActiveComment>>;
}

const CommentItemAction: React.FC<CommentItemActionProps> = ({
  comment,
  canReply,
  canEdit,
  canRemove,
  onRemove,
  setActiveComment,
}) => {
  const onReply = () =>
    setActiveComment((prev) => ({
      ...prev,
      type: "reply",
      commentId: comment.id,
    }));

  const onEdit = () =>
    setActiveComment((prev) => ({
      ...prev,
      type: "edit",
      commentId: comment.id,
    }));

  return (
    <Space size={20}>
      {canReply && (
        <Button size="sm" rootClass="comment-action" onClick={onReply}>
          <FaReply />
        </Button>
      )}

      {canEdit && (
        <Button size="sm" rootClass="comment-action" onClick={onEdit}>
          <FaPen />
        </Button>
      )}

      {canRemove && (
        <Button size="sm" rootClass="comment-action" onClick={onRemove}>
          <FaTrash />
        </Button>
      )}
    </Space>
  );
};

export default CommentItemAction;
