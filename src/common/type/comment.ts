export interface IComment {
  id: string;
  authorId: string;
  authorName: string;
  avatarUrl: string;
  bodyText: string;
  parentId: string | null;
  createdAt: Date | string;
}

export type CommentData = Omit<IComment, "id">;

export interface ICommentAuthor {
  id: string;
  name?: string;
  avatarUrl?: string;
}

export interface IActiveComment {
  type: string;
  commentId: string;
}
