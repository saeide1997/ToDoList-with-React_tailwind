import { useState } from "react";
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function TodoItem({ todo }) {
    const [statusChecked, setStatusChecked] =useState(todo.status);
    console.log(todo);
    let priority, color, border
    if (todo.priority === 1) {
        priority = "کم"
        color = 'text-white bg-blue-600'
        border = 'border-blue-800'
    } else if (todo.priority === 2) {
        priority = "متوسط"
        color = 'text-white bg-yellow-500'
        border = 'border-yellow-500'
    } else if (todo.priority === 3) {
        priority = "زیاد"
        color = 'text-white bg-red-500'
        border = 'border-red-500'
    }
    return (
        <div className={`border rounded-2xl  p-4 flex flex-col w-96 gap-2 m-4 shadow-lg ${border}`}>
            <div className="flex justify-start items-center">
                <input type="checkbox" name="" checked={statusChecked} onChange={(e) => setStatusChecked(e.target.checked)} id="statusChecked" className="min-w-4 min-h-4 ml-2" />
                <h2 className="text-xl font-semibold">{todo.name}</h2>
            </div>
            <div className="flex flex-row justify-between">
                <div className="flex flex-col gap-1">
                    <p className="text-gray-600">{todo.description}</p>
                    <p className="text-gray-500">وضعیت: {todo.status === true ? "انجام شده" : "انجام نشده"}</p>
                    <p className={`text-gray-500 `}>اولویت: <span className={`font-semibold py-1 px-4 rounded-lg ${color}`}>{priority}</span></p>
                </div>
                <div className="flex flex-col justify-center gap-2">
                    <button className="text-green-500"><AutoFixHighOutlinedIcon /></button>
                    <button className="text-red-500"><DeleteOutlineIcon /></button>
                </div>
            </div>
        </div>
    );
}

export default TodoItem;
