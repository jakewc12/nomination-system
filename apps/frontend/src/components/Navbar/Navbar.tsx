import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import { NAVBAR_MENUS } from './constants';
import senateLogo from '../../assets/senate-logo.png';

import { NavbarLink, StyledToolbar } from './styles';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static" color="secondary">
      <StyledToolbar>
        <img
          src={senateLogo}
          alt="Senate Logo"
          style={{
            height: '80px',
          }}
        />

        <div>
          {NAVBAR_MENUS.map((menu) => (
            <Button key={menu.text}>
              <NavbarLink to={menu.path}>{menu.text}</NavbarLink>
            </Button>
          ))}
        </div>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
