import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div className="h-screen overflow-y-auto overflow-x-hidden bg-mist-950 text-white py-10 px-5">
            <Outlet></Outlet>
        </div>
    )
}

export default Layout