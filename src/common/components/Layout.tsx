import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div className="h-screen bg-mist-950 text-white pt-20 py-10 px-5">
            <Outlet></Outlet>
        </div>
    )
}

export default Layout