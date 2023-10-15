import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

// Define a type for the slice state
export interface UserState {
  userInfo: number;
}

// Define the initial state using that type
const initialState: UserState = {
  userInfo: 0,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUser: (state, action: PayloadAction<any>) => {
      state.userInfo = action.payload;
    },
  },
});

export const actionUser = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.users.userInfo;

export default userSlice.reducer;
