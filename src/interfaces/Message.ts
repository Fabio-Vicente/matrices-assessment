import { Sender } from "./Sender";

export default interface Message {
  id: string;
  subject: string;
  sender: Sender;
  date: Date;
  isRead: boolean;
  isStarred: boolean;
  folder: "inbox" | "spam" | "trash";
  content: string;
}
