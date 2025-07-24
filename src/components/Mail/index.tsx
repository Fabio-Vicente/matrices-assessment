import React from "react";
import {
  selectMessageById,
  selectMessagesByThreadId,
} from "@/store/messagesSlice";
import { useAppSelector } from "@/store/hooks";
import Header from "./Header";
import ThreadItem from "../ThreadItem";

interface PropTypes {
  viewingMailId: string;
}

export default function Mail({ viewingMailId }: PropTypes) {
  const viewingMail = useAppSelector((state) =>
    selectMessageById(state.messages, viewingMailId),
  );
  const threads = useAppSelector((state) =>
    selectMessagesByThreadId(state.messages, viewingMail.threadId),
  );

  return (
    <div className="pt-2">
      <Header />
      <div className="pt-6">
        <h2 className="ml-[52px] px-4 text-[22px]">{viewingMail.subject}</h2>
        {threads
          ?.reverse()
          .map((thread, index, { length }) => (
            <ThreadItem
              key={thread.id}
              message={thread}
              divider={index !== length - 1}
              defaultOpened={index === length - 1}
            />
          )) ?? <ThreadItem message={viewingMail} />}
      </div>
    </div>
  );
}
