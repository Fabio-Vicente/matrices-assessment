import { messages } from "@/common/mock/messages";
import { Message } from "@/interfaces";
import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

interface AdditionalState {
  viewingMessageId: string | null;
}

type MessagesState = ReturnType<
  typeof messagesAdapter.getInitialState<AdditionalState>
>;

const messagesAdapter = createEntityAdapter<Message>({
  sortComparer: (a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime(),
});

const initialState = messagesAdapter.getInitialState<AdditionalState>(
  {
    viewingMessageId: null,
  },
  messages,
);

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    messagesSet: messagesAdapter.setAll,
    messagesFolderMoved: (
      state,
      {
        payload: { messageId, newFolder },
      }: PayloadAction<{ messageId: string; newFolder: Message["folder"] }>,
    ) => {
      messagesAdapter.updateOne(state, {
        id: messageId,
        changes: {
          folder: newFolder,
          ...(newFolder === "trash" && { isStarred: false }),
        },
      });
    },
    messagesReadToggled: (
      state,
      { payload: messageId }: PayloadAction<string>,
    ) => {
      const message = state.entities[messageId];
      if (message) {
        message.isRead = !message.isRead;
      }
    },
    messagesStarToggled: (
      state,
      { payload: messageId }: PayloadAction<string>,
    ) => {
      const message = state.entities[messageId];
      if (message) {
        message.isStarred = !message.isStarred;
      }
    },
    threadStarToggled: (
      state,
      { payload: threadId }: PayloadAction<string>,
    ) => {
      const threadMessages = Object.values(state.entities).filter(
        (message) => message.threadId === threadId,
      );
      const isStarred = threadMessages.some((message) => message.isStarred);

      if (isStarred) {
        threadMessages.forEach((message) => {
          message.isStarred = false;
        });
      } else {
        threadMessages[0].isStarred = true;
      }
    },
    messageViewingStarted: (
      state,
      { payload: messageId }: PayloadAction<string>,
    ) => {
      state.viewingMessageId = messageId;
    },
    messageViewingEnded: (state) => {
      state.viewingMessageId = null;
    },
  },
});

export const {
  messagesSet,
  messagesFolderMoved,
  messagesReadToggled,
  messagesStarToggled,
  threadStarToggled,
  messageViewingStarted,
  messageViewingEnded,
} = messagesSlice.actions;

export const {
  selectAll: selectAllMessages,
  selectById: selectMessageById,
  selectIds: selectMessageIds,
} = messagesAdapter.getSelectors();

export const selectMessagesByThreadId = (
  state: MessagesState,
  threadId: Message["threadId"],
) => {
  if (!threadId) {
    return null;
  }
  return selectAllMessages(state).filter(
    (message) => message.threadId === threadId,
  );
};

export const selectCounterByFolder = (
  state: MessagesState,
  folder: Message["folder"],
) => {
  return selectAllMessages(state).filter(
    (message) =>
      message.folder === folder &&
      (!message.threadId || message.isLastMessageInThread),
  ).length;
};

export const selectIsThreadStarred = (
  state: MessagesState,
  threadId: Message["threadId"],
) => {
  return selectMessagesByThreadId(state, threadId)?.some(
    (message) => message.isStarred,
  );
};

export const selectCounterByStarred = (state: MessagesState) => {
  return selectAllMessages(state).filter((message) => message.isStarred).length;
};

export const selectViewingMessageId = (state: MessagesState) => {
  return state.viewingMessageId;
};

export default messagesSlice.reducer;
