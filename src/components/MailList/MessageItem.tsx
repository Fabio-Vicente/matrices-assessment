import { currentTime } from "@/common/mock/time";
import { localUserEmail } from "@/common/mock/user";
import { StarButton } from "@/components/shared";
import { useNavigation } from "@/hooks";
import { User } from "@/interfaces";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  messageViewingStarted,
  selectIsThreadStarred,
  selectMessageById,
  selectMessagesByThreadId,
} from "@/store/messagesSlice";
import { classNames } from "@/utils/classes";
import moment from "moment";
import React, { memo, useCallback, useMemo } from "react";

interface PropTypes {
  id: string;
}

export default memo(function Message({ id }: PropTypes) {
  const dispatch = useAppDispatch();
  const message = useAppSelector((state) =>
    selectMessageById(state.messages, id),
  );
  const threadMessages = useAppSelector((state) =>
    selectMessagesByThreadId(state.messages, message.threadId),
  );
  const isThreadStarred = useAppSelector((state) =>
    selectIsThreadStarred(state.messages, message.threadId),
  );
  const { currentPage } = useNavigation();

  const threadUsers = useMemo(() => {
    return (threadMessages ?? [message])
      .reduce<User[]>(
        (threadUsers, message) =>
          message.sender.email === localUserEmail
            ? [...threadUsers, ...message.recipients]
            : [...threadUsers, message.sender],
        [],
      ) // include all users in the thread
      .filter((user, index, self) =>
        self
          .slice(index + 1)
          .every((slicedUser) => slicedUser.email !== user.email),
      ) // remove duplicates
      .map((user) => user.name) // get names
      .concat(
        ((threadMessages ?? [message]).some(
          (message) => message.sender.email === localUserEmail,
        ) &&
          "you") ||
          [],
      ); // include yourself if you are in the thread
  }, [message, threadMessages]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if ((event.target as HTMLElement).dataset.clickTrapped === "Y") {
        return;
      }
      dispatch(messageViewingStarted(message.id));
    },
    [dispatch, message.id],
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
    (!message.isStarred || message.folder !== "inbox") &&
    !isThreadStarred
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
        "flex h-10 items-center gap-3 border-b border-gray-200 px-4 text-sm hover:shadow-md",
        {
          "bg-gray-50": message.isRead,
        },
      )}
      onClick={handleClick}
    >
      {message.folder !== "trash" && (
        <StarButton
          {...(message.threadId
            ? { threadId: message.threadId }
            : { messageId: message.id })}
        />
      )}
      <div className={classNames("max-w-[200px] flex-1 truncate")}>
        <span className={classNames({ "font-bold": !message.isRead })}>
          {`${threadUsers.join(", ")}`}
        </span>
        <span className="ml-1 text-xs text-gray-500">
          {threadMessages && threadUsers.length > 1
            ? `(${threadUsers.length})`
            : ""}
        </span>
      </div>
      <div className="flex flex-1 truncate">
        <span className={classNames({ "font-semibold": !message.isRead })}>
          {message.subject}
        </span>
        <span className="flex-1 truncate text-gray-500">
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
