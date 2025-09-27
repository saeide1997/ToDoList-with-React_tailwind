// src/pages/Register.jsx
import { useContext, useState } from "react";
import { login, register } from "../api/data";
import { AuthContext } from "../../context/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
    const { setUser } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const { res, data } = await register(username, password, phone);
            console.log('res, data', res, data);

            if (!res.ok) {
                setError(data.error || "ثبت نام با خطا مواجه شد");
                return;
            }

            // ثبت نام موفق، می‌توان user را در context ذخیره کرد
            setUser({ username });

            // نمایش alert قبل از هدایت
            toast.success("ثبت نام با موفقیت انجام شد!");

            // کمی تاخیر بده تا toast دیده شود
            setTimeout(() => {
                navigate("/"); // هدایت به صفحه اصلی
            }, 3000); // یک ثانیه تا toast ظاهر شود


        } catch (err) {
            setError(err.message || "ثبت نام با خطا مواجه شد");
        }

    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-stone-300 to-yellow-600 px-4">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">ایجاد حساب کاربری</h2>

                {error && (
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
                    </motion.div>)}


                <input
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="نام کاربری"
                    className="w-full mb-4 px-4 py-3 bg-stone-100/50 shadow-md rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                />

                <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="رمز عبور"
                    type="password"
                    className="w-full mb-4 px-4 py-3 bg-stone-100/50 shadow-md rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                />

                <input
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="شماره تلفن"
                    className="w-full mb-6 px-4 py-3 bg-stone-100/50 shadow-md rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg shadow-md transition transform hover:scale-105"
                >
                    ثبت‌نام
                </button>

                <p className="text-center text-gray-500 text-sm mt-4">
                    حساب کاربری دارید؟ <span className="text-yellow-500 font-medium cursor-pointer"><Link to='/login'>ورود</Link></span>
                </p>
            </div>
        </div>

    )
}