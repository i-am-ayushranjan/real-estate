import React, { Suspense, useState, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import { useUserContext } from '../Context/UserContext';

const apiUrl = import.meta.env.VITE_API_URL;

const Layout = () => {
    const{login} = useUserContext();
    const [loading, setLoading] = useState(true)

    // Get user info when the component mounts.
    const getUser = async () => {
        try {
            const res = await fetch(`${apiUrl}/user/me`, {
                credentials: 'include',
            });
            const data = await res.json();
            if (data.success && res.ok) {
                login({ id:data.user.id, name:data.user.name, email:data.user.email})
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getUser();
    }, []);
    return (
        <div className='flex flex-col min-h-screen w-screen'>
            {loading ? <div>Loading...</div> :<>
            <Header />
            <div className='w-full flex-grow'>
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet />
                </Suspense>
            </div>
            <Footer />
            </>
            }
        </div>
    )
}

export default Layout
