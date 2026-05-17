import { IoIosArrowDropleft } from 'react-icons/io'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Subheading1 } from './Text'

const Layout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    console.log(location);

    return (
        <div className="h-screen overflow-y-auto overflow-x-hidden bg-mist-950 text-white py-10 px-5">
            {
                location.pathname === "/" ? "":
                <div className={"w-1/3 py-2 flex items-center justify-start"}>
                    <IoIosArrowDropleft className='fill-emerald-400 w-8 h-8' onClick={() => navigate("/")} />
                    <Subheading1>Back</Subheading1>
                </div>
            }
            <Outlet></Outlet>
        </div>
    )
}

export default Layout