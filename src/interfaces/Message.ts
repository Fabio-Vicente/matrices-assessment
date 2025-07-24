import { User } from "./User";

export default interface Message {
  id: string;
  subject: string;
  sender: User;
  recipients: User[];
  date: Date;
  isRead: boolean;
  isStarred: boolean;
  folder: "inbox" | "spam" | "trash";
  content: string;
  threadId?: string;
}
