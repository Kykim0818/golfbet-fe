import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

// Define a type for the slice state

export interface LoadingState {
  status: boolean;
}

// Define the initial state using that type
const initialState: LoadingState = {
  status: false,
};

export const loadingSlice = createSlice({
  name: "loading",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.status = action.payload;
    },
  },
});

export const actinoLoading = loadingSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const currentLoading = (state: RootState) => state.loading.status;

export default loadingSlice.reducer;
