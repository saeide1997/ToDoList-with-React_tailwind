import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggleTodoStatus, updateTodo, updateTodoAsync } from "../../state/todoListSilce";

function TodoItem({ todo }) {
    // const [statusChecked, setStatusChecked] = useState(todo.status);
    const dispatch = useDispatch();
    const handleStatusChange = async (e) => {
        const newStatus = e.target.checked;
        try {
            const result =await dispatch(updateTodoAsync({ id: todo.id, updates: { status: newStatus } })).unwrap();
            console.log('newStatus', newStatus);
            console.log('update result payload:', result);
            // بعد از موفقیت، فقط local state و یا reducer را آپدیت کن
            // setStatusChecked(newStatus);
            // اگر extraReducers در fulfilled آیتم را جایگزین می‌کند، لازم نیست dispatch دیگری بزنی
        } catch (err) {
            console.error("Update failed:", err);
            // نمایش پیام خطا
        }
    };
    let border, chbg, chborder
    if (todo.priority === 1) {
        border = 'border-blue-800'
        chborder = 'checked:border-blue-700'
        chbg = 'checked:bg-blue-500'
    } else if (todo.priority === 2) {
        border = 'border-yellow-500'
        chborder = 'checked:border-yellow-600'
        chbg = 'checked:bg-yellow-500'
    } else if (todo.priority === 3) {
        border = 'border-red-500'
        chborder = 'checked:border-red-600'
        chbg = 'checked:bg-red-500'
    }

    return (
        <div className="flex items-center ">
            <input type="checkbox" name="" checked={todo.status} onChange={handleStatusChange} id="statusChecked"
                className={`appearance-none flex items-center justify-center w-8 h-12 border-2 border-gray-400 rounded-md ${chbg} ${chborder} relative
             checked:before:content-['✔'] checked:before:text-white  checked:before:top-[-2px] checked:before:left-[2px] ml-2 `} />
            <div className={`border rounded-2xl min-h-20 p-4 flex flex-col w-full gap-2 my-2 shadow-lg ${border} ${todo.status && 'opacity-50 '}`}>
                <Link to={'/new'}>
                    <div className="flex justify-start items-center">
                        <h2 className={`text - xl font-semibold ${todo.status && 'line-through'}`}>{todo.name}</h2>
                    </div>
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col gap-1">
                            <p className="text-gray-600">{todo.discription}</p>
                        </div>

                    </div>
                </Link>
            </div>
        </div>
    );
}

export default TodoItem;
