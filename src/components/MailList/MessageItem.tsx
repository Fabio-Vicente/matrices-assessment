import React, { memo, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectMessageById,
  messagesStarredToggled,
  selectMessagesByThreadId,
} from "@/store/messagesSlice";
import { useNavigation } from "@/hooks";
import Image from "next/image";
import moment from "moment";
import { localUserEmail } from "@/common/mock/user";
import clsx from "clsx";

interface PropTypes {
  id: string;
}

export default (function Message({ id }: PropTypes) {
  const dispatch = useAppDispatch();
  const message = useAppSelector((state) =>
    selectMessageById(state.messages, id)
  );
  const threadMessages = useAppSelector((state) =>
    selectMessagesByThreadId(state, message.threadId)
  );
  const { currentPage } = useNavigation();

  const sender = useMemo(() => {
    return threadMessages.length
      ? threadMessages
          .filter((message) => message.sender.email !== localUserEmail)
          .map((message) => message.sender.name)
          .concat(
            (threadMessages.some(
              (message) => message.sender.email === localUserEmail
            ) &&
              "you") ||
              []
          )
      : message.sender.name;
  }, [threadMessages, message.sender.name]);

  const handleToggleStarred = useCallback(() => {
    dispatch(messagesStarredToggled(message.id));
  }, [dispatch, message.id]);

  if (!message) return null;

  if (message.threadId && !message.isLastMessageInThread) {
    return null;
  }

  if (currentPage === "inbox" && message.folder !== "inbox") {
    return null;
  }

  if (currentPage === "spam" && message.folder !== "spam") {
    return null;
  }

  if (currentPage === "trash" && message.folder !== "trash") {
    return null;
  }

  if (currentPage === "starred" && !message.isStarred) {
    return null;
  }

  if (currentPage === "all" && message.folder === "trash") {
    return null;
  }

  return (
    <div
      role="button"
      className={clsx(
        "px-4 border-gray-200 h-10 flex gap-3 items-center text-sm border-b hover:shadow-md",
        {
          "bg-gray-50": message.isRead,
        }
      )}
    >
      <button className="p-1 hover:bg-gray-100" onClick={handleToggleStarred}>
        {message.isStarred ? (
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
      <div className={clsx("max-w-[200px] truncate flex-1")}>
        <span className={clsx({ "font-bold": !message.isRead })}>
          {Array.isArray(sender) ? `${sender.join(", ")}` : sender}
        </span>
        <span className="text-xs text-gray-500">
          {Array.isArray(sender) ? ` (${sender.length})` : ""}
        </span>
      </div>
      <div className="flex truncate flex-1">
        <span className={clsx({ "font-semibold": !message.isRead })}>
          {message.subject}
        </span>
        <span className="text-gray-500 truncate flex-1">
          ​ -​ {message.content}
        </span>
      </div>
      <span className="text-xs text-gray-500">
        {moment(message.date).calendar(null, {
          sameDay: "h:mm A",
          sameElse: "MMM D",
        })}
      </span>
    </div>
  );
});
