import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  messagesStarToggled,
  selectMessageById,
  selectMessagesByThreadId,
  threadStarToggled,
} from "@/store/messagesSlice";
import { classNames } from "@/utils/classes";
import Image from "next/image";
import React, { memo, useCallback } from "react";

type PropTypes = React.HTMLAttributes<HTMLButtonElement> &
  (
    | {
        messageId: string;
      }
    | {
        threadId: string;
      }
  );

export default memo(function StarButton({ className, ...props }: PropTypes) {
  const { messageId, threadId, ...restProps } = {
    messageId: undefined,
    threadId: undefined,
    ...props,
  };
  const dispatch = useAppDispatch();
  const isStarred = useAppSelector((state) =>
    messageId
      ? selectMessageById(state.messages, messageId).isStarred
      : selectMessagesByThreadId(state.messages, threadId)?.some(
          (message) => message.isStarred,
        ),
  );

  const handleToggleStarred = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      (event.target as HTMLElement).dataset.clickTrapped = "Y";
      if (messageId) {
        dispatch(messagesStarToggled(messageId));
      } else {
        dispatch(threadStarToggled(threadId!));
      }
    },
    [isStarred, dispatch, messageId, threadId],
  );

  return (
    <button
      className={classNames("p-1 hover:bg-gray-100", className)}
      onClick={handleToggleStarred}
      {...restProps}
    >
      {isStarred ? (
        <Image
          src="/icons/icon-star-filled-yellow.webp"
          alt="unfavorite"
          width={20}
          height={20}
        />
      ) : (
        <Image
          src="/icons/icon-star.webp"
          alt="favorite"
          width={20}
          height={20}
        />
      )}
    </button>
  );
});
