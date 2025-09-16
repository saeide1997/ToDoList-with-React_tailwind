import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { useLocation, useNavigate } from "react-router-dom";

function TodoList() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch("/todoList.json")
            .then((res) => res.json())
            .then((data) => setTodos(data.todoList));
    }, []);

    const navigate = useNavigate();   

    const clickHandler = () => {
        navigate("/new");
    }

    return (
        <div className="">
            <button className="bg-blue-500 flex justify-end items-end mx-auto cursor-pointer hover:bg-cyan-800 text-white my-2 py-2 px-4 rounded" onClick={clickHandler}>افزودن کار جدید</button>
            <div className="max-w-3/4 grid md:grid-cols-2 grid-cols-1 items-center m-4 mx-auto">
                {todos.map((todo, index) => (
                    <TodoItem key={index} todo={todo} />
                ))}
            </div>
        </div>
    );
}

export default TodoList;
