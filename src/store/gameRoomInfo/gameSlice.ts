import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { GameRoomInfo } from "../../pages/GameRoom/GameRoom";

// Define a type for the slice state

export interface GameState {
  gameRoomInfo?: GameRoomInfo;
}

// Define the initial state using that type
const initialState: GameState = {
  gameRoomInfo: undefined,
};

export const gameSlice = createSlice({
  name: "game",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setGameRoomInfo: (state, action: PayloadAction<GameRoomInfo>) => {
      state.gameRoomInfo = action.payload;
    },
  },
});

export const actionGame = gameSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const currentGameRoomInfo = (state: RootState) =>
  state.game.gameRoomInfo;

export default gameSlice.reducer;
