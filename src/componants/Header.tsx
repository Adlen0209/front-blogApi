import { NavLink } from 'react-router-dom';
import { CategoryType } from 'src/service/categories';
import './header.scss';




type HeaderProps = {
  categories: CategoryType[];
}
const Header: React.FC<HeaderProps> = ({ categories }) => {
    return <header className="header">
      <nav className="header-nav" >
        <ul className="header-ulNav">
          {categories.map(({route, label}) => (
       <li key={route} className="header-liNav">   <NavLink  className={({ isActive }) =>
       isActive ? 'header-links header-links--active' : 'header-links'} to={route}>
            {label}
          </NavLink></li>
          ))}
         
        </ul>
        <div className="header-links--login">

<NavLink className={'header-links--loginPage'} to={'/login'}> Login </NavLink>
<NavLink className={'header-links--signup'} to={'/signup'}> SignUp </NavLink>
   </div>
      </nav>
    </header>;
  };
 


export default Header;


            