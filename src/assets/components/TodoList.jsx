import { useContext, useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { useDispatch, useSelector } from "react-redux";
import TodoModal from "./TodoModal.jsx";
import { fetchTodos } from "../../state/todoListSilce.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import { motion } from "framer-motion";


function TodoList() {
    const dispatch = useDispatch();
    const { todos, loading, error } = useSelector((state) => state.todos);
    const { user } = useContext(AuthContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    // console.log(todos);

    const handleEdit = (todo) => {
        setSelectedTodo(todo); // مقداردهی فرم با داده‌های موجود
        setModalOpen(true);
    };
    const userTodos = todos.filter(todo => todo.userID === user?.id);
    const allDone = userTodos.length > 0 && userTodos.every(todo => todo.status);
    if (loading) return (
        <div className="flex justify-center items-center min-h-[50vh]">
            <div className="relative w-16 h-16">
                <div className="absolute w-full h-full rounded-full bg-yellow-400 opacity-75 animate-ping"></div>
                <div className="absolute w-full h-full rounded-full bg-yellow-500"></div>
            </div>
        </div>
    );
    if (error) return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center gap-3 justify-center w-[90%] mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl shadow-md"
            role="alert"
        >
            {/* آیکن هشدار */}
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" />
            </svg>

            {/* متن خطا */}
            <span className="font-bold">خطا:</span>
            <span>{error}</span>
        </motion.div>
    );
    return (
        <div className=" ">


            {todos.length > 0 ? (<></>
            ) : (
                <div className=" flex flex-col gap-4 items-center justify-center  h-[50vh] z-0">
                    <p className="text-yellow-500 font-bold text-2xl">کاری واسه امروز نداری؟</p>
                    <img src="/images/NoTasks.webp" alt="No Tasks" className="object-cover w-32 h-32" />
                </div>
            )}  {allDone ? (
                <div className="pointer-events-none flex flex-col items-center">
                    <p className="text-yellow-500 font-bold text-center my-4">
                        دمت گرم! همه کاراتو انجام دادی.
                    </p>
                    <img src="/images/Congratulations.png" alt="Congratulations" className="object-cover w-16 h-16" />
                </div>
            ) : (
                <>
                    <div className="max-w-3/4 grid md:grid-cols-2 grid-cols-1 items-center m-4 mx-auto gap-4 z-20 relative ">
                        {[...todos]
                            .sort((a, b) => a.priority - b.priority)
                            .map((todo) => (
                                (!todo.status && todo.userID == user?.id) && <TodoItem key={todo.id} todo={todo} onEdit={() => handleEdit(todo)} />
                            ))}
                    </div></>)}
            <div className="pointer-events-none absolute left-0 inset-x-0 bottom-0 z-0 h-[50vh] overflow-hidden">
                <img
                    src="/images/todoList.png"
                    alt="illustration"
                    className="object-cover w-full h-full"
                />
                {/* گرادیانت که روی تصویر از بالا محو کنه */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/50 to-white/30" />
            </div>
            {todos.length > 0 && <div className="h-[1px] w-[90vw] bg-gray-400 shadow-xl my-10 items-center justify-center mx-auto" />}
            <div className="max-w-3/4 grid md:grid-cols-2 grid-cols-1 items-center m-4 mx-auto gap-4 z-20 relative ">
                {[...todos]
                    .sort((a, b) => a.priority - b.priority)
                    .map((todo) => (
                        (todo.status && todo.userID == user?.id) && <TodoItem key={todo.id} todo={todo} onEdit={() => handleEdit(todo)} />
                    ))}
            </div>

            {/* Modal */}
            <TodoModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                existingTodo={selectedTodo}
            />
        </div>
    );
}

export default TodoList;
