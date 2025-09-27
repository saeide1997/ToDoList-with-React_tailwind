// src/pages/Login.jsx
import { useContext, useState } from "react";
import { login } from "../api/data";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function Login() {
    const { setUser } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    const handleLogin = async () => {
        try {
            const { res, data } = await login(username, password);

            if (!res.ok) {
                setError(data.err || "ورود با خطا مواجه شد")
            }
            // ثبت نام موفق، می‌توان user را در context ذخیره کرد
            setUser({ username });

            // نمایش alert قبل از هدایت
            toast.success("ورود با موفقیت انجام شد!");

            // کمی تاخیر بده تا toast دیده شود
            setTimeout(() => {
                navigate("/"); // هدایت به صفحه اصلی
            }, 3000); // یک ثانیه تا toast ظاهر شود
        } catch (err) {
            setError(err.message || "ورود با خطا مواجه شد")
        }

    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-stone-300 to-yellow-600 px-4">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">ورود به حساب کاربری</h2>

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
                <button
                    onClick={handleLogin}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg shadow-md transition transform hover:scale-105"
                >
                    ورود
                </button>

                <p className="text-center text-gray-500 text-sm mt-4">
                    حساب کاربری ندارید؟ <span className="text-yellow-500 font-medium cursor-pointer"><Link to="/register">ثبت نام</Link></span>
                </p>
            </div>
        </div>

    )
}