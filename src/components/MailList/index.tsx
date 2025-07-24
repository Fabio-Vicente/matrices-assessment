"use client";

import { useAppSelector } from "@/store/hooks";
import { selectMessageIds } from "@/store/messagesSlice";
import React from "react";
import MessageItem from "./MessageItem";

export default function Mail() {
  const messagesIds = useAppSelector((state) =>
    selectMessageIds(state.messages)
  );
  return (
    <>
      {messagesIds.map((id) => (
        <MessageItem key={id} id={id} />
      ))}
    </>
  );
}
