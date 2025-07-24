"use client";

import { selectViewingMessageId } from "@/store/messagesSlice";
import { useAppSelector } from "@/store/hooks";
import { Mail, MailList } from "@/components";
import { classNames } from "@/utils/classes";

export default function Home() {
  const messageViewingId = useAppSelector(selectViewingMessageId);

  return (
    <div
      className={classNames("bg-white rounded-2xl h-full", {
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
