import { Message } from "@/interfaces";
import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from ".";

const messagesAdapter = createEntityAdapter<Message>({
  sortComparer: (a, b) => b.date.getTime() - a.date.getTime(),
});

const initialState = messagesAdapter.getInitialState({
  isLoading: false,
  error: null as string | null,
});

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    messagesSet: messagesAdapter.setAll,
    messagesLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    messagesError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
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
  messagesLoading,
  messagesError,
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
  const allMessages = selectAllMessages(state.messages);
  return allMessages.filter((message) => message.folder === folder);
};

export const selectStarredMessages = (state: RootState) => {
  return selectAllMessages(state.messages).filter(
    (message) => message.isStarred
  );
};

export const selectInboxCount = (state: RootState) => {
  return selectAllMessages(state.messages).filter(
    (message) => message.folder === "inbox"
  ).length;
};

export const selectSpamCount = (state: RootState) => {
  return selectAllMessages(state.messages).filter(
    (message) => message.folder === "spam"
  ).length;
};

export const selectIsLoading = (state: RootState) => {
  return state.messages.isLoading;
};

export const selectError = (state: RootState) => {
  return state.messages.error;
};

export default messagesSlice.reducer;
