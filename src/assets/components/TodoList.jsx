import { useEffect } from "react";
import TodoItem from "./TodoItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../../state/todoListSilce.js";

function TodoList() {
    const dispatch = useDispatch();
    const { todos, loading, error } = useSelector((state) => state.todos);

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    if (loading) return <p>در حال بارگذاری...</p>;
    if (error) return <p className="text-red-500">خطا: {error}</p>;


    return (
        <div className="">
            <div className='flex gap-4 justify-center items-center w-full'>
                <div className='text-white border border-blue-800 bg-blue-600 rounded-xl shadow-lg px-3 py-2'>کم اهمیت</div>
                <div className='text-white border border-yellow-600 bg-yellow-500 rounded-xl shadow-lg px-3 py-2'>متوسط</div>
                <div className='text-white border border-red-600 bg-red-500 rounded-xl shadow-lg px-3 py-2'>ضروری</div>
            </div>
            <div className="max-w-3/4 grid md:grid-cols-2 grid-cols-1 items-center m-4 mx-auto">
                {todos.map((todo, index) => (
                    <TodoItem key={index} todo={todo} />
                ))}
            </div>
        </div>
    );
}

export default TodoList;
