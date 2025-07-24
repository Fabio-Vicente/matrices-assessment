"use client";

import React, { memo } from "react";
import {
  selectCounterByFolder,
  selectCounterByStarred,
  selectMessageIds,
} from "@/store/messagesSlice";
import { useAppSelector } from "@/store/hooks";
import { useNavigation } from "@/hooks";
import MessageItem from "./MessageItem";
import EmptyState from "./EmptyState";

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
