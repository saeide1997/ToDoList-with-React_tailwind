import { createContext, use, useEffect, useState } from "react"
const BASE_URL = "http://localhost:5000/api"; // آدرس سرور Node.js
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // بررسی خودکار لاگین هنگام mount (مثلاً fetch از /protected)
        const checkAuth = async () => {
            try{
                const res = await fetch(`${BASE_URL}/protected`, {
                    credentials: 'include' // ارسال کوکی‌ها

                })
                if(res.ok){
                    const data = await res.json()
                    setUser(data.user)
                    // console.log('Authenticated user:', data.user);
                    

                }else{
                    setUser(null)
                }
            }
            catch(err){
                setUser(null)
                console.error("Error checking auth:", err)
            }finally{
                setLoading(false)
            }
        }
        checkAuth()
    },[])

    return(
        <AuthContext.Provider value={{user, setUser, loading}}>
            {children}
        </AuthContext.Provider>
    )
}