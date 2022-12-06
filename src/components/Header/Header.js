import { Link } from 'react-router-dom';
import './Header.css';
import Searchbar from '../Searchbar/Searchbar';

const Header = () => {
  return (
    <header className="header shadow-lg">
      <div className="d-flex justify-content-around align-items-center">
        <div className="d-flex justify-content-center align-items-center">
          <div className="headerLogo"></div>
          <Link to="/" exact>
            <h1 className="header-title d-none d-md-block">Welcome to PokeFight</h1>
          </Link>
        </div>
        <Searchbar />
      </div>
    </header>
  );
};

export default Header;
