import React from "react";
import { IComment, ICommentAuthor } from "@/common/type/comment";
import CommentItem from "./Item";

interface CommentListProps {
  comments: IComment[];
  mainComments: IComment[];
  author?: ICommentAuthor;
  loading: boolean;
  handleCreate: (text: string, parentId?: string) => void;
  handleUpdate: (comment: IComment, text: string) => void;
  handleRemove: (commentId: string) => void;
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  mainComments,
  author,
  loading,
  handleCreate,
  handleUpdate,
  handleRemove,
}) => {
  const [limit, setLimit] = React.useState<number>(3);

  const onLoadMore = () => setLimit(limit + 3);

  return (
    <ul className={`comment-list ${limit > 3 ? 'comment-list-scroll' : ''}`}>
      {comments.slice(0, limit).map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          author={author}
          loading={loading}
          mainComments={mainComments}
          handleCreate={handleCreate}
          handleUpdate={handleUpdate}
          handleRemove={handleRemove}
        />
      ))}
      {limit < comments.length && (
        <button type="button" className="list-action" onClick={onLoadMore}>
          See more
        </button>
      )}
    </ul>
  );
};

export default CommentList;
