import React from 'react'
import { useUserContext } from '../src/Context/UserContext';

const apiUrl = import.meta.env.VITE_API_URL;

const LogoutBtn = () => {
    const {logout} = useUserContext();
    const logoutUser = async () => {
        try {
            const res = await fetch(`${apiUrl}/user/logout`, {
                method: 'POST',
                credentials: 'include',
            });
            const data = await res.json();
            console.log(data);
            if (res.ok) {
                logout();
                console.log("logout successfully");
            } else {
                // Handle error, show error message, .
                toast.error("Logout failed");
                console.error("Logout failed:", data.message);
            }
        } catch (error) {
            toast.info("Error during logout")
            console.log("Error during logout:", error);
        }
    }
  return (
    <button type='button' className="px-3 py-1 hover:bg-green-300 rounded" onClick={logoutUser}>Logout</button>
  )
}

export default LogoutBtn