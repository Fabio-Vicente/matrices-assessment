"use client";

import { useNavigation } from "@/hooks";
import { useAppSelector } from "@/store/hooks";
import {
  selectCounterByFolder,
  selectCounterByStarred,
  selectMessageIds,
} from "@/store/messagesSlice";
import { memo } from "react";
import EmptyState from "./EmptyState";
import MessageItem from "./MessageItem";

export default memo(function MailList() {
  const messagesIds = useAppSelector((state) =>
    selectMessageIds(state.messages),
  );
  const { currentPage } = useNavigation();
  const messagesCounter = useAppSelector((state) => {
    if (
      currentPage === "inbox" ||
      currentPage === "spam" ||
      currentPage === "trash"
    ) {
      return selectCounterByFolder(state.messages, currentPage);
    }

    if (currentPage === "starred") {
      return selectCounterByStarred(state.messages);
    }

    return messagesIds.length;
  });

  if (messagesCounter === 0) {
    return <EmptyState />;
  }

  return (
    <>
      {messagesIds.map((id) => (
        <MessageItem key={id} id={id} />
      ))}
    </>
  );
});
