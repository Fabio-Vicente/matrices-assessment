import { useNavigation } from "@/hooks";
import { useAppSelector } from "@/store/hooks";
import {
  selectMessageById,
  selectMessagesByThreadId,
} from "@/store/messagesSlice";
import ThreadItem from "../ThreadItem";
import Header from "./Header";

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
  const { currentPage } = useNavigation();

  return (
    <div className="pt-2">
      <Header />
      <div className="pt-6">
        {(currentPage !== "starred" || viewingMail.isStarred) && (
          <h2 className="ml-[52px] px-4 text-[22px]">{viewingMail.subject}</h2>
        )}
        {threads
          ?.reverse()
          .map((thread, index, { length }) => (
            <ThreadItem
              key={thread.id}
              messageId={thread.id}
              divider={index !== length - 1}
              defaultOpened={index === length - 1}
            />
          )) ?? <ThreadItem messageId={viewingMailId} />}
      </div>
    </div>
  );
}
