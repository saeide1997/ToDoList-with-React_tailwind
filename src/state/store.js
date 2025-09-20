import { configureStore } from "@reduxjs/toolkit";
import { todoListSlice } from "./todoListSilce";

export const store = configureStore({
    reducer: {
        todos: todoListSlice.reducer,
    },
});

