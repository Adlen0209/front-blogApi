import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { CategoryType } from '../service/categories';

import './header.scss';

type HeaderProps = {
  categories: CategoryType[];
};
const Header: React.FC<HeaderProps> = ({ categories }) => {
  const { loggedIn, toggleLoggedIn } = useContext(UserContext);

  const removeToken = () => {
    localStorage.removeItem('token');
    toggleLoggedIn(false);
  };

  return (
    <header className='header'>
      <nav className='header-nav'>
        <ul className='header-ulNav'>
          {categories.map(({ route, label }) => (
            <li key={route} className='header-liNav'>
              {' '}
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'header-links header-links--active' : 'header-links'
                }
                to={route}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className='header-links--login'>
          {!loggedIn ? (
            <>
              <NavLink className={'header-links--loginPage'} to={'/login'}>
                {' '}
                Login{' '}
              </NavLink>
              <NavLink className={'header-links--signup'} to={'/signup'}>
                {' '}
                SignUp{' '}
              </NavLink>
            </>
          ) : (
            <>
            <NavLink className={'header-links--edit'}  to='/create'> Edit new article</NavLink>
            <NavLink className={'header-links--logout'} onClick={removeToken} to='/'>
              Logout{' '}
              </NavLink>
            
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
