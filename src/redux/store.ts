import { configureStore } from "@reduxjs/toolkit";
import pdfReducer from "./pdfSlice";

export default configureStore({
  reducer: {
    pdf: pdfReducer,
  },
});
