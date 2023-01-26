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
       <li key={route} className="header-liNav">   <NavLink  className="header-links" to={route}>
            {label}
          </NavLink></li>
          ))}
        </ul>
      </nav>
    </header>;
  };
 

export default Header;