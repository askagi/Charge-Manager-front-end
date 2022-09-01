import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-use';
import ChargeSideBar from '../../assets/icon-charge-sidebar.svg';
import IconClientSideBar from '../../assets/icon-client-sidebar.svg';
import LittleHouse from '../../assets/icon-home-sidebar.svg';
import './styles.css';

let topMarkerHome = '5rem';
let rightMarkerHome = '-22%';

const SideBar = () => {
  const { pathname } = useLocation();

  if (pathname == '/home') {
    setTimeout(() => {
      topMarkerHome = '5rem'
    }, 0);
  }

  if (pathname == '/clients') {
    setTimeout(() => {
      topMarkerHome = '20rem'
    }, 0);
  }

  if (pathname == '/charges') {
    setTimeout(() => {
      topMarkerHome = '34.6rem'
    }, 0);
  }

  if (pathname == '/home') {
    setTimeout(() => {
      rightMarkerHome = '-22%'
    }, 0);
  }

  if (pathname == '/clients') {
    setTimeout(() => {
      rightMarkerHome = '44.6%'
    }, 0);
  }

  if (pathname == '/charges') {
    setTimeout(() => {
      rightMarkerHome = '76.7%'
    }, 0);
  }

  return (
    <aside className="container-sidebar">
      <nav className='box-icons-sidebar'>
        <ul>
          <li>
            <NavLink
              className={({ isActive }) => isActive ? 'active-section' : ''}
              to='/home'
            >
              <div id='icon-home'>
                {pathname == '/home' &&
                  <div
                    className="marker-up"></div>
                }
                <img src={LittleHouse} alt='icon little house' />
                <span className='font-nunito-regular-16'>Home</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => isActive ? 'active-section' : ''}
              to='/clients'
            >
              <div id='icon-clients'>
                {pathname == '/clients' &&
                  <div
                    className="marker-up">
                  </div>
                }
                <img src={IconClientSideBar} alt='icon little house' />
                <span className='font-nunito-regular-16'>Clientes</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => isActive ? 'active-section' : ''}
              to='/charges'
            >
              <div id='icon-charge'>
                {pathname == '/charges' &&
                  <div
                    className="marker-up"></div>
                }
                <img src={ChargeSideBar} alt='icon little house' />
                <span className='font-nunito-regular-16'>Cobranças</span>
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div
        style={{
          top: `${topMarkerHome}`
        }}
        className="marker"></div>
    </aside>
  );
}

export default SideBar;
