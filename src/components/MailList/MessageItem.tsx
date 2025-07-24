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
import { User } from "@/interfaces";

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

  const threadUsers = useMemo(() => {
    return (threadMessages ?? [message])
      .reduce<User[]>(
        (threadUsers, message) =>
          message.sender.email === localUserEmail
            ? [...threadUsers, ...message.recipients]
            : [...threadUsers, message.sender],
        []
      ) // include all users in the thread
      .filter((user, index, self) =>
        self
          .slice(index + 1)
          .every((slicedUser) => slicedUser.email !== user.email)
      ) // remove duplicates
      .map((user) => user.name) // get names
      .concat(
        ((threadMessages ?? [message]).some(
          (message) => message.sender.email === localUserEmail
        ) &&
          "you") ||
          []
      ); // include yourself if you are in the thread
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

  if (
    currentPage === "starred" &&
    (!message.isStarred || message.folder !== "inbox")
  ) {
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
          {`${threadUsers.join(", ")}`}
        </span>
        <span className="text-xs text-gray-500">
          {threadMessages && threadUsers.length > 1
            ? ` (${threadUsers.length})`
            : ""}
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
