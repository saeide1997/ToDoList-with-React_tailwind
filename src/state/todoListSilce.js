import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addItem, deleteItem, getItems, updateItem } from "../assets/api/data";

export const fetchTodos = createAsyncThunk(
    "todos/fetchTodos",
    async (_, { rejectWithValue }) => {
        try {
            const data = await getItems(); // فرض: API آرایه‌ی تسک‌ها رو برمی‌گردونه
            return data; // return array
        } catch (err) {
            return rejectWithValue(err.message || "Failed to fetch");
        }
    }
);

// 2) thunk برای افزودن آیتم جدید
export const addTodoAsync = createAsyncThunk(
    "todos/addTodoAsync",
    async (newTodo, { rejectWithValue }) => {
        try {
            const created = await addItem(newTodo); // API آیتم ساخته شده را برمی‌گرداند
            console.log('created', created);
            return created;
        } catch (err) {
            return rejectWithValue(err.message || "Failed to add");
        }
    }
);

// thunk برای آپدیت
export const updateTodoAsync = createAsyncThunk(
    "todos/updateTodoAsync",
    async ({ id, updates }, { rejectWithValue }) => {
        try {
            const updated = await updateItem(id, updates);
            return updated; // API باید آیتم آپدیت شده را برگرداند
        } catch (err) {
            return rejectWithValue(err.message || "Failed to update");
        }
    }
);

export const deleteTodoAsync = createAsyncThunk(
    "todos/deleteTodoAsync",
    async (id, { rejectWithValue }) => {
        try {
            await deleteItem(id);
            return id;
        } catch (err) {
            return rejectWithValue(err.message || "Failed to delete");
        }
    }
);

export const todoListSlice = createSlice({
    name: "todos",
    initialState: {
        todos: [],
        loading: false,
        error: null,
    },
    reducers: {
        // اگر هنوز می‌خوای reducerهای محلی داشته باشی میتونی حفظشون کنی:
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((t) => t.id !== action.payload);
        },
        toggleTodoStatus: (state, action) => {
            const todo = state.todos.find((t) => t.id === action.payload);
            if (todo) {
                console.log('kkkk', todo.status);
                todo.status = !todo.status;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchTodos
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loading = false;
                const items = Array.isArray(action.payload)
                    ? action.payload
                    : action.payload?.todoList ?? [];

                // normalize: add id = _id for client convenience
                state.todos = items.map(item => ({ ...item, id: item._id ?? item.id }));
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error?.message;
            })

            // addTodoAsync
            .addCase(addTodoAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addTodoAsync.fulfilled, (state, action) => {
                state.loading = false;
                // فرض می‌کنیم API آیتم ساخته شده را برمی‌گرداند
                state.todos.push(action.payload);
            })
            .addCase(addTodoAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error?.message;
            })
            // updateTodoAsync
            .addCase(updateTodoAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTodoAsync.fulfilled, (state, action) => {
                state.loading = false;
                const updatedTodo = action.payload;
                const rawId = updatedTodo._id ?? updatedTodo.id;
                const id = rawId ? String(rawId) : undefined;

                const index = state.todos.findIndex(t => (t.id ?? t._id ?? '') === id);
                if (index !== -1) {
                    // مطمئن شو value ای که داخل state ذخیره می‌کنی id به صورت string داشته باشه
                    state.todos[index] = { ...updatedTodo, id };
                    console.log('updated in store:', state.todos[index], 'id:', id);
                } else {
                    console.log('updatedTodo not found in state.todos, id:', id);
                }
            })
            .addCase(updateTodoAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error?.message;
            })
            .addCase(deleteTodoAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTodoAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = state.todos.filter(t => t.id !== action.payload);
            })
            .addCase(deleteTodoAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error?.message;
            });

    },
});

export const { addTodo, removeTodo, toggleTodoStatus, updateTodo } = todoListSlice.actions;
export default todoListSlice.reducer;