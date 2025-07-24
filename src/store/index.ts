import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "./messagesSlice";

const store = configureStore({
  reducer: {
    messages: messagesReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
