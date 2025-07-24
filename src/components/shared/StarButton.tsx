import React, { memo, useCallback } from "react";
import Image from "next/image";
import { classNames } from "@/utils/classes";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  messagesStarredToggled,
  selectMessageById,
} from "@/store/messagesSlice";

interface PropTypes extends React.HTMLAttributes<HTMLButtonElement> {
  messageId: string;
}

export default memo(function StarButton({
  messageId,
  className,
  ...props
}: PropTypes) {
  const dispatch = useAppDispatch();
  const isStarred = useAppSelector(
    (state) => selectMessageById(state.messages, messageId).isStarred
  );

  const handleToggleStarred = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      (event.target as HTMLElement).dataset.clickTrapped = "Y";
      dispatch(messagesStarredToggled(messageId));
    },
    [dispatch, messageId]
  );

  return (
    <button
      className={classNames("p-1 hover:bg-gray-100", className)}
      onClick={handleToggleStarred}
      {...props}
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
