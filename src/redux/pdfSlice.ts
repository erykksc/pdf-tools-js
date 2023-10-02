import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import ISelector from "./selector";

const initialState: { selectors: ISelector[] } = {
  selectors: [],
};

export const pdfSlice = createSlice({
  name: "pdf",
  initialState,
  reducers: {
    addSelector: (state, action: PayloadAction<ISelector>) => {
      state.selectors.push(action.payload);
    },
    removeSelector: (state, action: PayloadAction<ISelector>) => {
      state.selectors = state.selectors.filter(
        (selector) => selector !== action.payload
      );
    },
    clearSelectors: (state) => {
      state.selectors = [];
    },
  },
});

export const { addSelector, removeSelector, clearSelectors } = pdfSlice.actions;

export default pdfSlice.reducer;
