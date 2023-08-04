import React from "react";
import { TextArea } from "@/components/Form/ReactHookForm/Basic";
import { Paragraph } from "../Typography";
import { ICommentAuthor } from "@/common/type/comment";
import Avatar from "../Avatar";
import Image from "../Image";
import Space from "../Space";
import Button from "../Button";

interface CommentControlProps {
  text?: string;
  author?: ICommentAuthor;
  hasAuthor?: boolean;
  hasCancel?: boolean;
  loading?: boolean;
  onSave?: (text: string) => void;
  onCancel?: () => void;
}

const CommentControl: React.FC<CommentControlProps> = ({
  text = "",
  author,
  hasAuthor = false,
  hasCancel = true,
  loading,
  onCancel,
  onSave,
}) => {
  const [bodyText, setBodyText] = React.useState<string>(text);

  return (
    <div className="comment-control">
      {hasAuthor && (
        <Space>
          <Avatar shape="circle" size={35}>
            <Image src={author?.avatarUrl} />
          </Avatar>

          <Paragraph size={12} weight="bold">
            {author?.name}
          </Paragraph>
        </Space>
      )}

      <TextArea value={bodyText} onChange={(text) => setBodyText(text)} />

      <Space justify="end">
        {hasCancel && (
          <Button size="sm" onClick={onCancel}>
            Cancel
          </Button>
        )}

        <Button
          variant="info"
          size="sm"
          disabled={loading}
          loading={loading}
          onClick={() => onSave && onSave(bodyText)}
        >
          Save
        </Button>
      </Space>
    </div>
  );
};

export default CommentControl;
