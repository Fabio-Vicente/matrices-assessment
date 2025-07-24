import { useNavigation } from "@/hooks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  messagesFolderMoved,
  messageViewingEnded,
  selectViewingMessageId,
} from "@/store/messagesSlice";
import { useCallback } from "react";
import BackButton from "./BackButton";
import DeleteButton from "./DeleteButton";
import RestoreButton from "./RestoreButton";
import SpamButton from "./SpamButton";

export default function Header() {
  const dispatch = useAppDispatch();
  const messageId = useAppSelector((state) =>
    selectViewingMessageId(state.messages),
  );
  const { currentPage } = useNavigation();

  const handleBack = useCallback(() => {
    dispatch(messageViewingEnded());
  }, [dispatch]);

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

  const handleRestore = () => {
    if (messageId) {
      dispatch(messagesFolderMoved({ messageId, newFolder: "inbox" }));
    }
    handleBack();
  };

  return (
    <div className="flex gap-2 px-4">
      <BackButton className="mr-2 -ml-2" onClick={handleBack} />
      {currentPage !== "spam" && currentPage !== "trash" ? (
        <>
          <SpamButton onClick={handleSpam} />
          <DeleteButton onClick={handleDelete} />
        </>
      ) : (
        <RestoreButton onClick={handleRestore}>
          {currentPage === "spam" ? "Not spam" : "Move to Inbox"}
        </RestoreButton>
      )}
    </div>
  );
}
