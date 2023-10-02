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
		updateDocSelector: (
			state,
			action: PayloadAction<{ index: number; data: DocSelectorData }>
		) => {
			const { index, data } = action.payload;
			const updatedSelectors = [...state.selectors];
			updatedSelectors[index] = data;
			state.selectors = updatedSelectors;
		},
		clearDocSelectors: (state) => {
			state.selectors = [];
		},
	},
});

export const {
	addDocSelector,
	removeDocSelector,
	updateDocSelector,
	clearDocSelectors,
} = docSlice.actions;

export default docSlice.reducer;
