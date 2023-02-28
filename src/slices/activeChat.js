import { createSlice } from "@reduxjs/toolkit";

export const activeChatSlice = createSlice({
  name: "activeChat",
  initialState: {
    value: null,
  },
  reducers: {
    activeChat: (state, actions) => {
      state.value = actions.payload;
    },
  },
});

export const { activeChat } = activeChatSlice.actions;

export default activeChatSlice.reducer;
