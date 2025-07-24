"use client";

import { selectViewingMessageId } from "@/store/messagesSlice";
import { useAppSelector } from "@/store/hooks";
import { Mail, MailList } from "@/components";
import clsx from "clsx";

export default function Home() {
  const messageViewingId = useAppSelector(selectViewingMessageId);

  return (
    <div
      className={clsx("bg-white rounded-2xl h-full", {
        "pt-12": !messageViewingId,
      })}
    >
      {messageViewingId ? (
        <Mail viewingMailId={messageViewingId} />
      ) : (
        <MailList />
      )}
    </div>
  );
}
