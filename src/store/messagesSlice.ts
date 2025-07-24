import { Message } from "@/interfaces";
import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from ".";
import { messages } from "@/common/mock/messages";

const messagesAdapter = createEntityAdapter<Message>({
  sortComparer: (a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime(),
});

const initialState = messagesAdapter.getInitialState({}, messages);

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    messagesSet: messagesAdapter.setAll,
    messagesFolderMoved: (
      state,
      {
        payload: { messageId, newFolder },
      }: PayloadAction<{ messageId: string; newFolder: Message["folder"] }>
    ) => {
      messagesAdapter.updateOne(state, {
        id: messageId,
        changes: {
          folder: newFolder,
        },
      });
    },
    messagesReadToggled: (
      state,
      { payload: messageId }: PayloadAction<string>
    ) => {
      const message = state.entities[messageId];
      if (message) {
        message.isRead = !message.isRead;
      }
    },
    messagesStarredToggled: (
      state,
      { payload: messageId }: PayloadAction<string>
    ) => {
      const message = state.entities[messageId];
      if (message) {
        message.isStarred = !message.isStarred;
      }
    },
  },
});

export const {
  messagesSet,
  messagesFolderMoved,
  messagesReadToggled,
  messagesStarredToggled,
} = messagesSlice.actions;

export const {
  selectAll: selectAllMessages,
  selectById: selectMessageById,
  selectIds: selectMessageIds,
} = messagesAdapter.getSelectors();

export const selectMessagesByThreadId = (
  state: RootState,
  threadId: Message["threadId"]
) => {
  if (!threadId) {
    return [];
  }
  return selectAllMessages(state.messages).filter(
    (message) => message.threadId === threadId
  );
};

export const selectCounterByFolder = (
  state: RootState,
  folder: Message["folder"]
) => {
  return selectAllMessages(state.messages).filter(
    (message) =>
      message.folder === folder &&
      (!message.threadId || message.isLastMessageInThread)
  ).length;
};

export const selectCounterByStarred = (state: RootState) => {
  return selectAllMessages(state.messages).filter(
    (message) => message.isStarred
  ).length;
};

export default messagesSlice.reducer;
