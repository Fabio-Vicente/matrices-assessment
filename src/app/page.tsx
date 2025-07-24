"use client";

import { selectViewingMessageId } from "@/store/messagesSlice";
import { useAppSelector } from "@/store/hooks";
import { Mail, MailList } from "@/components";
import { classNames } from "@/utils/classes";

export default function Home() {
  const messageViewingId = useAppSelector((state) =>
    selectViewingMessageId(state.messages),
  );

  return (
    <div
      className={classNames("h-full rounded-2xl bg-white", {
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
