import React from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  messagesFolderMoved,
  messageViewingEnded,
  selectViewingMessageId,
} from "@/store/messagesSlice";
import BackButton from "./BackButton";
import SpamButton from "./SpamButton";
import DeleteButton from "./DeleteButton";

export default function Header() {
  const dispatch = useAppDispatch();
  const messageId = useAppSelector(selectViewingMessageId);

  const handleBack = () => {
    dispatch(messageViewingEnded());
  };

  const handleSpam = () => {
    if (messageId) {
      dispatch(messagesFolderMoved({ messageId, newFolder: "spam" }));
      handleBack();
    }
  };

  const handleDelete = () => {
    if (messageId) {
      dispatch(messagesFolderMoved({ messageId, newFolder: "trash" }));
      handleBack();
    }
  };

  return (
    <div className="flex gap-2 px-4">
      <BackButton className="mr-2 -ml-2" onClick={handleBack} />
      <SpamButton onClick={handleSpam} />
      <DeleteButton onClick={handleDelete} />
    </div>
  );
}
