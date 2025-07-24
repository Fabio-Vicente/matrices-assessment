import React, { memo, useCallback, useMemo } from "react";
import moment from "moment";
import { classNames } from "@/utils/classes";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectMessageById,
  selectMessagesByThreadId,
  messageViewingStarted,
} from "@/store/messagesSlice";
import { useNavigation } from "@/hooks";
import { StarButton } from "@/components/shared";
import { localUserEmail } from "@/common/mock/user";
import { currentTime } from "@/common/mock/time";

interface PropTypes {
  id: string;
}

export default memo(function Message({ id }: PropTypes) {
  const dispatch = useAppDispatch();
  const message = useAppSelector((state) =>
    selectMessageById(state.messages, id)
  );
  const threadMessages = useAppSelector((state) =>
    selectMessagesByThreadId(state, message.threadId)
  );
  const { currentPage } = useNavigation();

  const sender = useMemo(() => {
    return threadMessages?.length
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

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if ((event.target as HTMLElement).dataset.clickTrapped === "Y") {
        return;
      }
      dispatch(messageViewingStarted(message.id));
    },
    [dispatch, message.id]
  );

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
      className={classNames(
        "px-4 border-gray-200 h-10 flex gap-3 items-center text-sm border-b hover:shadow-md",
        {
          "bg-gray-50": message.isRead,
        }
      )}
      onClick={handleClick}
    >
      {message.folder !== "trash" && <StarButton messageId={message.id} />}
      <div className={classNames("max-w-[200px] truncate flex-1")}>
        <span className={classNames({ "font-bold": !message.isRead })}>
          {Array.isArray(sender) ? `${sender.join(", ")}` : sender}
        </span>
        <span className="text-xs text-gray-500">
          {Array.isArray(sender) ? ` (${sender.length})` : ""}
        </span>
      </div>
      <div className="flex truncate flex-1">
        <span className={classNames({ "font-semibold": !message.isRead })}>
          {message.subject}
        </span>
        <span className="text-gray-500 truncate flex-1">
          ​ -​ {message.content}
        </span>
      </div>
      <span className="text-xs text-gray-500">
        {moment(message.date).calendar(currentTime, {
          sameDay: "h:mm A",
          lastDay: "MMM D",
          lastWeek: "MMM D",
          nextDay: "MMM D",
          nextWeek: "MMM D",
          sameElse: "MMM D",
        })}
      </span>
    </div>
  );
});
