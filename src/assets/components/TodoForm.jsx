import { useState } from "react"

function TodoForm() {

    const[status,setStatus]=useState("todo")
    const[priority,setPriority]=useState("low")
    const[name,setName]=useState("")
    const[description,setDescription]=useState("") 

    const handleSubmit=(e)=>{
        e.preventDefault()
        const todo={
            name,
            status,
            description,
            priority
        }
        console.log(todo);
    }

  return (
    <div className="max-w-md mx-auto  bg-gray-100 p-4 rounded  mt-16">
        <h1 className="text-3xl flex items-center justify-center font-medium text-gray-700 p-2 w-full">افزودن تسک</h1>
      <form onSubmit={handleSubmit} className="flex  mb-4 items-start flex-col gap-4">
        <label htmlFor="name" className="text-lg font-medium text-gray-700 px-2 ">نام</label>
        <input type="text" onChange={(e) => setName(e.target.value)} id="name" 
               className="border border-blue-600 -mt-3 bg-white p-2 rounded w-full" />
        <label htmlFor="status" className="text-lg font-medium text-gray-700 px-2 ">وضعیت</label>
        <select name="status" id="status" onChange={(e) => setStatus(e.target.value)} className="border -mt-3 border-blue-600 bg-white p-2 rounded w-full">
          <option value="todo">در حال انجام</option>
          <option value="done">انجام شده</option>
        </select>
        <label htmlFor="description" className="text-lg font-medium text-gray-700 px-2 ">توضیحات</label>
        <input type="text" onChange={(e) => setDescription(e.target.value)} id="description" className="border -mt-3 border-blue-600 bg-white p-2 rounded w-full" />
        <label htmlFor="priority" className="text-lg font-medium text-gray-700 px-2 ">اولویت</label>
        <select name="priority" id="priority" onChange={(e) => setPriority(e.target.value)} className="border -mt-3 border-blue-600 bg-white p-2 rounded w-full">
          <option value="low">کم</option>
          <option value="medium">متوسط</option>
          <option value="high">زیاد</option>
        </select>
        <label htmlFor="dueDate" className="text-lg font-medium text-gray-700 px-2 ">تاریخ اتمام </label>
        <input type="date" id="dueDate" className="border -mt-3 border-blue-600 bg-white p-2 rounded w-full" />
        <button type="submit"  className="bg-blue-500 hover:bg-gray-300 text-white hover:text-black  p-2 w-full rounded ">افزودن</button>
      </form>
    </div>
  )
}

export default TodoForm;
