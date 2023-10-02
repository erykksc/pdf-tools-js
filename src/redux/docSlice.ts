import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import DocSelectorData from "../DocSelectorData";

const initialState: { selectors: DocSelectorData[] } = {
	selectors: [],
};

export const docSlice = createSlice({
	name: "pdf",
	initialState,
	reducers: {
		addDocSelector: (state, action: PayloadAction<DocSelectorData>) => {
			state.selectors.push(action.payload);
		},
		removeDocSelector: (state, action: PayloadAction<DocSelectorData>) => {
			state.selectors = state.selectors.filter(
				(selector) => selector !== action.payload
			);
		},
		clearDocSelectors: (state) => {
			state.selectors = [];
		},
	},
});

export const { addDocSelector, removeDocSelector, clearDocSelectors } =
	docSlice.actions;

export default docSlice.reducer;
