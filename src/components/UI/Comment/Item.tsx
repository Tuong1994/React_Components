import React from "react";
import { Paragraph } from "../Typography";
import {
  IActiveComment,
  IComment,
  ICommentAuthor,
} from "@/common/type/comment";
import Space from "../Space";
import Avatar from "../Avatar";
import Image from "../Image";
import CommentList from "./List";
import CommentControl from "./Control";
import CommentItemAction from "./Action";

interface CommentItemProps {
  comment: IComment;
  mainComments: IComment[];
  author?: ICommentAuthor;
  loading: boolean;
  handleCreate: (text: string, parentId?: string) => void;
  handleUpdate: (comment: IComment, text: string) => void;
  handleRemove: (commentId: string) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  mainComments,
  author,
  loading,
  handleCreate,
  handleUpdate,
  handleRemove,
}) => {
  const [activeComment, setActiveComment] = React.useState<IActiveComment>({
    type: "",
    commentId: "",
  });

  const canReply = React.useMemo(
    () => Boolean(comment.id) && Boolean(author?.id),
    [comment, author]
  );

  const canEdit = React.useMemo(
    () => Boolean(comment.authorId === author?.id),
    [comment, author]
  );

  const canRemove = React.useMemo(
    () => Boolean(comment.authorId === author?.id),
    [comment, author]
  );

  const isReply = React.useMemo(
    () =>
      activeComment &&
      activeComment.type === "reply" &&
      activeComment.commentId === comment.id,
    [activeComment, comment]
  );

  const isEdit = React.useMemo(
    () =>
      activeComment &&
      activeComment.type === "edit" &&
      activeComment.commentId === comment.id,
    [activeComment, comment]
  );

  const isShowAction = React.useMemo(
    () => !isReply && !isEdit,
    [isReply, isEdit]
  );

  const childComments = React.useCallback(
    () =>
      mainComments.filter((mainComment) => mainComment.parentId === comment.id),
    [mainComments]
  );

  const onCreate = (text: string) => handleCreate(text, comment.parentId ?? "");

  const onUpdate = (text: string) => handleUpdate(comment, text);

  const onRemove = () => handleRemove(comment.id);

  const onCancel = () =>
    setActiveComment((prev) => ({ ...prev, type: "", commentId: "" }));

  return (
    <li className="list-item-comment">
      <Space>
        <Avatar>
          <Image />
        </Avatar>

        <Paragraph weight="bold" size={12}>
          {comment.authorName}
        </Paragraph>
      </Space>

      <div className="comment-body">
        {!isEdit ? (
          <Paragraph size={12}>{comment.bodyText}</Paragraph>
        ) : (
          <CommentControl
            loading={loading}
            text={comment.bodyText}
            onSave={onUpdate}
            onCancel={onCancel}
          />
        )}
      </div>

      {isShowAction && (
        <CommentItemAction
          comment={comment}
          canReply={canReply}
          canEdit={canEdit}
          canRemove={canRemove}
          onRemove={onRemove}
          setActiveComment={setActiveComment}
        />
      )}

      {isReply && (
        <CommentControl
          loading={loading}
          onSave={onCreate}
          onCancel={onCancel}
        />
      )}

      <div className="comment-child">
        <div className="child-collapse"></div>
        <CommentList
          author={author}
          loading={loading}
          mainComments={mainComments}
          comments={childComments()}
          handleCreate={handleCreate}
          handleUpdate={handleUpdate}
          handleRemove={handleRemove}
        />
      </div>
    </li>
  );
};

export default CommentItem;
