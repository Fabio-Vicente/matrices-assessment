import { Message } from "@/interfaces";
import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from ".";
import { messages } from "@/common/mock/messages";

const messagesAdapter = createEntityAdapter<Message>({
  sortComparer: (a, b) => b.date.getTime() - a.date.getTime(),
});

const initialState = messagesAdapter.getInitialState({}, messages);

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    messagesSet: messagesAdapter.setAll,
    messagesFolderMoved: (
      state,
      action: PayloadAction<{ id: string; newFolder: Message["folder"] }>
    ) => {
      messagesAdapter.updateOne(state, {
        id: action.payload.id,
        changes: {
          folder: action.payload.newFolder,
        },
      });
    },
    messagesReadToggled: (state, action: PayloadAction<string>) => {
      const message = state.entities[action.payload];
      if (message) {
        message.isRead = !message.isRead;
      }
    },
    messagesStarredToggled: (state, action: PayloadAction<string>) => {
      const message = state.entities[action.payload];
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

export const selectMessagesByFolder = (
  state: RootState,
  folder: Message["folder"]
) => {
  return selectAllMessages(state.messages).filter(
    (message) => message.folder === folder
  );
};

export const selectStarredMessages = (state: RootState) => {
  return selectAllMessages(state.messages).filter(
    (message) => message.isStarred
  );
};

export const selectCounterByFolder = (
  state: RootState,
  folder: Message["folder"]
) => {
  return selectAllMessages(state.messages).filter(
    (message) => message.folder === folder && !message.threadId
  ).length;
};

export default messagesSlice.reducer;
