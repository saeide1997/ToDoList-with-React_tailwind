import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { useDispatch, useSelector } from "react-redux";
import TodoModal from "./TodoModal.jsx";
import { fetchTodos } from "../../state/todoListSilce.js";


function TodoList() {
    const dispatch = useDispatch();
    const { todos, loading, error } = useSelector((state) => state.todos);

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    console.log(todos);

    const handleAdd = () => {
        setSelectedTodo(null); // فرم خالی برای افزودن
        setModalOpen(true);
    };

    const handleEdit = (todo) => {
        setSelectedTodo(todo); // مقداردهی فرم با داده‌های موجود
        setModalOpen(true);
    };
    const allDone = todos.length > 0 && todos.every(todo => todo.status);
    if (loading) return <p>در حال بارگذاری...</p>;
    if (error) return <p className="text-red-500">خطا: {error}</p>;

    return (
        <div className=" ">

           
        {todos.length > 0 ? (<></>
                // <div className='flex gap-4 justify-center items-center w-full mb-4'>
                //     <div className='text-white border border-purple-800 bg-purple-600 rounded-xl shadow-lg px-3 py-2'>ضروری</div>
                //     <div className='text-white border border-pink-600 bg-pink-500 rounded-xl shadow-lg px-3 py-2'>متوسط</div>
                //     <div className='text-white border border-cyan-600 bg-cyan-500 rounded-xl shadow-lg px-3 py-2'>کم اهمیت</div>
                // </div>
            ) : (
                <div>
                <p className="text-gray-500">تسکی واسه امروز نداری؟</p>
                <img src="/images/NoTasks.webp" alt="No Tasks" className="object-cover w-16 h-16" />
                </div>
            )}  {allDone ? (
                <div className="flex flex-col items-center">
      <p className="text-yellow-500 font-bold text-center my-4">
        دمت گرم! همه کاراتو انجام دادی.
      </p>
      <img src="/images/Congratulations.png" alt="Congratulations" className="object-cover w-16 h-16"/>
      </div>
    ) : (
      <>
            <div className="max-w-3/4 grid md:grid-cols-2 grid-cols-1 items-center m-4 mx-auto gap-4 z-20 relative ">
                {todos.map((todo) => (
                    !todo.status && <TodoItem key={todo.id} todo={todo} onEdit={() => handleEdit(todo)} />
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
            <div className="h-[1px] w-[90vw] bg-gray-400 shadow-xl my-10 items-center justify-center mx-auto" />
            <div className="max-w-3/4 grid md:grid-cols-2 grid-cols-1 items-center m-4 mx-auto gap-4 z-20 relative ">
                {todos.map((todo) => (
                    todo.status && <TodoItem key={todo.id} todo={todo} onEdit={() => handleEdit(todo)} />
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
