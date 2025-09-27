import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateTodoAsync } from "../../state/todoListSilce";
import { AuthContext } from "../../context/AuthContext";

function TodoItem({ todo, onEdit }) {
    
    const dispatch = useDispatch();

    const handleStatusChange = async (e) => {
        const newStatus = e.target.checked;
        try {
            await dispatch(updateTodoAsync({ id: todo.id, updates: { status: newStatus } })).unwrap();
        } catch (err) {
            console.error("Update failed:", err);
        }
    };
// console.log('todo', todo);

    // تعیین کلاس‌های priority
    let border, chbg, chborder 
    if (todo.priority === 1) { 
        border = 'border-purple-800' 
        chborder = 'checked:border-purple-700' 
        chbg = 'checked:bg-purple-500' 
    } else if (todo.priority === 2) { 
        border = 'border-pink-500' 
        chborder = 'checked:border-pink-600' 
        chbg = 'checked:bg-pink-500' 
    } else if (todo.priority === 3) { 
        border = 'border-cyan-500' 
        chborder = 'checked:border-cyan-600' 
        chbg = 'checked:bg-cyan-500' 
    } else { 
        border = 'border-gray-300' 
        chborder = 'checked:border-gray-400' 
        chbg = 'checked:bg-gray-400' 
    }

    return (
        <div className="flex items-center  gap-2" >
            <input
                type="checkbox"
                checked={todo.status}
                onChange={handleStatusChange}
                className={`appearance-none flex items-center justify-center w-8 h-12 border-2 ${border} rounded-md ${chbg} ${chborder} relative checked:before:content-['✔'] checked:before:text-white checked:before:top-[-2px] checked:before:left-[2px] ml-2`}
            />
            <div style={{ background: todo.color }}
                className={` rounded-lg px-4 py-3 flex flex-col w-full gap-2 shadow-lg cursor-pointer  ${todo.status && 'opacity-50'}`}
                onClick={onEdit} // کلیک روی تسک -> باز شدن Modal برای ویرایش
            >
                <h2 className={`${todo.status && 'line-through'} font-semibold`}>{todo.name}</h2>
            </div>
        </div>
    );
}

export default TodoItem;
