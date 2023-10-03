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
		updateDocSelector: (state, action: PayloadAction<DocSelectorData>) => {
			// change the selector with the same id without mutating the state
			const index = state.selectors.findIndex(
				(selector) => selector.id === action.payload.id
			);
			const selectors = state.selectors.slice();
			selectors[index] = action.payload;
			state.selectors = selectors;
		},
		clearDocSelectors: (state) => {
			state.selectors = [];
		},
		reorderDocSelectors: (
			state,
			action: PayloadAction<{ oldIndex: number; newIndex: number }>
		) => {
			const { oldIndex, newIndex } = action.payload;
			const updatedSelectors = [...state.selectors];
			updatedSelectors.splice(
				newIndex,
				0,
				updatedSelectors.splice(oldIndex, 1)[0]
			);
			state.selectors = updatedSelectors;
		},
	},
});

export const {
	addDocSelector,
	removeDocSelector,
	updateDocSelector,
	clearDocSelectors,
	reorderDocSelectors,
} = docSlice.actions;

export default docSlice.reducer;
