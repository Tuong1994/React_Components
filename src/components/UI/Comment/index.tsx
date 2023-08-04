import React from "react";
import { CommentData, IComment, ICommentAuthor } from "@/common/type/comment";
import Divider from "../Divider";
import CommentControl from "./Control";
import CommentList from "./List";

interface CommentProps {
  rootClass?: string;
  comments?: IComment[];
  style?: React.CSSProperties;
  author?: ICommentAuthor;
  loading?: boolean;
  onCreate?: (comment: CommentData) => void;
  onUpdate?: (commentId: string, comment: IComment) => void;
  onRemove?: (commentId: string) => void;
}

const Comment: React.ForwardRefRenderFunction<HTMLDivElement, CommentProps> = (
  {
    rootClass = "",
    author,
    comments = [],
    loading = false,
    style,
    onCreate,
    onUpdate,
    onRemove,
  },
  ref
) => {
  const commentData = React.useMemo<CommentData>(() => {
    return {
      authorId: author?.id ?? '',
      authorName: author?.name ?? "",
      avatarUrl: author?.avatarUrl ?? "",
      bodyText: "",
      parentId: null,
      createdAt: new Date(),
    };
  }, []);

  const rootComments = React.useCallback(
    () => comments.filter((comment) => !comment.parentId),
    [comments]
  );

  const handleCreate = (bodyText: string, parentId?: string) => {
    const data = { ...commentData, bodyText, parentId: parentId ?? "" };
    onCreate && onCreate(data);
  };

  const handleUpdate = (comment: IComment, bodyText: string) => {
    const data = { ...comment, bodyText };
    onUpdate && onUpdate(comment.id, data);
  };

  const handleRemove = (commentId: string) => onRemove && onRemove(commentId);

  return (
    <div ref={ref} style={style} className={`comment ${rootClass}`}>
      <CommentControl hasAuthor author={author} loading={loading} onSave={handleCreate} />

      {comments.length && (
        <React.Fragment>
          <Divider />

          <CommentList
            author={author}
            mainComments={comments}
            loading={loading}
            comments={rootComments()}
            handleCreate={handleCreate}
            handleUpdate={handleUpdate}
            handleRemove={handleRemove}
          />
        </React.Fragment>
      )}
    </div>
  );
};

export default React.forwardRef(Comment);
