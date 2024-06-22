import { NavLink } from 'react-router-dom';
import Logout from "../../components/ui/Logout.jsx";

const Header = () => {
    return(
        <header className="app-header d-flex align-center justify-space-between">
            <div className="app-logo">
                my messenger
            </div>
            <nav className="app-navigation">
                <ul className="app-navigation_list d-flex">
                    <li className="app-navigation_list-item">
                        <NavLink to="/chat" className={({ isActive }) => (isActive ? 'active' : '')}>Chat</NavLink>
                    </li>
                    <li className="app-navigation_list-item">
                        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Network</NavLink>
                    </li>
                    <li className="app-navigation_list-item user">
                        <Logout/>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;