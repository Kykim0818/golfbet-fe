import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ModalParam } from "../../components/modals/type";

// Define a type for the slice state
type SliceModalParam = ModalParam & {
  handleClose: (result?: any) => void;
};
export interface ModalState {
  status: SliceModalParam | null;
}

// Define the initial state using that type
const initialState: ModalState = {
  status: null,
};

export const modalSlice = createSlice({
  name: "modal",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setModalStatus: (state, action: PayloadAction<SliceModalParam | null>) => {
      state.status = action.payload;
    },
  },
});

export const actionModal = modalSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const currentModal = (state: RootState) => state.modal.status;

export default modalSlice.reducer;
