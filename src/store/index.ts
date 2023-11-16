import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modal/modalSlice";
import userSlice from "./user/userSlice";
// ...

export const store = configureStore({
  reducer: {
    users: userSlice,
    modal: modalSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        // ignoredActions: [""],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["payload.handleClose"],
        // // Ignore these paths in the state
        // ignoredPaths: ["items.dates"],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
