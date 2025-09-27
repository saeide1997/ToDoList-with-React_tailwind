import { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";
import Select from "react-select";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { addTodoAsync, deleteTodoAsync, removeTodo, updateTodoAsync } from "../../state/todoListSilce";
import { AuthContext } from "../../context/AuthContext";

export default function TodoModal({ isOpen, onClose, existingTodo }) {
      const {user} = useContext(AuthContext);
    console.log('todouser',user?.id);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [color, setColor] = useState("#f3f4f6");
  const [dueDate, setDueDate] = useState(new DateObject({ calendar: persian, locale: persian_fa }));
  const [dueTime, setDueTime] = useState('00:00');
  const [status, setStatus] = useState(null);
  const [priority, setPriority] = useState(null);
  const [repeat, setRepeat] = useState(null);

  const repeatOptions = [
    { value: "daily", label: "روزانه" },
    { value: "weekly", label: "هفتگی" },
    { value: "monthly", label: "ماهانه" },
  ];
  const priorityOptions = [
    { value: 3, label: "کم" },
    { value: 2, label: "متوسط" },
    { value: 1, label: "زیاد" },
  ];
  const statusOptions = [
    { value: false, label: "در حال انجام" },
    { value: true, label: "انجام شده" },
  ];

  useEffect(() => {
    if (existingTodo) {
      setName(existingTodo.name || "");
      setColor(existingTodo.color || "#f3f4f6");
      setDueDate(
        existingTodo.dueDate
          ? new DateObject({ date: existingTodo.dueDate, calendar: persian, locale: persian_fa })
          : new DateObject({ calendar: persian, locale: persian_fa })
      );
      setStatus(statusOptions.find(s => s.value === existingTodo.status) || null);
      setPriority(priorityOptions.find(p => p.value === existingTodo.priority) || null);
      setRepeat(repeatOptions.find(r => r.value === existingTodo.repeat) || null);
    } else {
      // reset if adding new
      setName("");
      setColor("#f3f4f6");
      setDueDate(new DateObject({ calendar: persian, locale: persian_fa }));
      setStatus(null);
      setPriority(null);
      setRepeat(null);
    }
  }, [existingTodo, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const todo = {
      userID: user?.id,
      name,
      color,
      status: status?.value,
      priority: priority?.value,
      repeat: repeat?.value,
      dueDate: dueDate ? dueDate.toDate() : null,
    };
    console.log('submittodo', todo);

    if (existingTodo) {
      dispatch(updateTodoAsync({ id: existingTodo.id, updates: todo }));
    } else {
      dispatch(addTodoAsync(todo));
    }

    onClose(); // close modal after submit
  };

  const handleDelete = () => {
    if (existingTodo) {
      dispatch(deleteTodoAsync(existingTodo.id));
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* بکگراند تار و بلور */}
      <div
        className="absolute inset-0  backdrop-blur-sm"
        onClick={onClose} // کلیک روی بکگراند -> بستن Modal
      ></div>
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 font-bold"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">{existingTodo ? "ویرایش تسک" : "افزودن تسک"}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="نام تسک"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-xl text-gray-700 bg-gray-100 p-2 w-full"
            style={{ backgroundColor: color }}
          />

          <div className="flex gap-3 flex-wrap">
            {[{ code: "rgba(255,0,0,0.2)", class: "bg-red-400", ring: "ring-red-400" },
            { code: "rgba(0,255,0,0.2)", class: "bg-green-400", ring: "ring-green-400" },
            { code: "rgba(0,0,255,0.2)", class: "bg-blue-400", ring: "ring-blue-400" },
            { code: "rgba(255,255,0,0.2)", class: "bg-yellow-400", ring: "ring-yellow-400" },
            { code: "rgba(255,0,255,0.2)", class: "bg-pink-400", ring: "ring-pink-400" },
            { code: "rgba(0,255,255,0.2)", class: "bg-cyan-400", ring: "ring-cyan-400" },
            { code: "rgba(255,165,0,0.2)", class: "bg-orange-400", ring: "ring-orange-400" },
            { code: "rgba(128,0,128,0.2)", class: "bg-purple-400", ring: "ring-purple-400" },
            { code: "rgba(128,128,128,0.2)", class: "bg-gray-400", ring: "ring-gray-400" },
            { code: "rgba(0,0,0,0.2)", class: "bg-black", ring: "ring-black" },
            ].map((c) => (
              <div
                key={c.code}
                onClick={() => setColor(c.code)}
                className={`w-6 h-6 rounded-full cursor-pointer transition-transform duration-200 ${c.class} ${color === c.code ? "scale-125 ring-2 ring-offset-2 " + c.ring : ""
                  }`}
              ></div>
            ))}
          </div>

          {/* <Select value={status} onChange={setStatus} options={statusOptions} placeholder="وضعیت" classNamePrefix="selectBox" /> */}
          <Select value={priority} onChange={setPriority} options={priorityOptions} placeholder="اولویت" classNamePrefix="selectBox" />
          <Select value={repeat} onChange={setRepeat} options={repeatOptions} placeholder="تکرار" classNamePrefix="selectBox" />
          <div className="flex gap-5">
            <DatePicker
              value={dueTime}
              onChange={setDueTime}
              locale={persian_fa}
              plugins={[<TimePicker position="bottom" />]}
              format="HH:mm:ss"
              inputClass="custom-input"
            />
            <DatePicker
              value={dueDate}
              onChange={setDueDate}
              calendar={persian}
              locale={persian_fa}
              format="YYYY/MM/DD"
              inputClass="custom-input"
            />

          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className={`bg-gray-700  rounded-xl text-yellow-300 font-bold text-lg  p-2 ${existingTodo ? "w-3/4" : "w-full"}`}
            >
              {existingTodo ? "ویرایش" : "افزودن"}
            </button>
            {existingTodo ? <button className="bg-amber-500 rounded-xl text-white font-bold text-lg p-2 w-1/4" onClick={handleDelete}><DeleteOutlineIcon /></button> : null}

          </div>
        </form>
      </div>
    </div>
  );
}
