import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import IconEditUser from '../../assets/icon-edit-user-frame.svg';
import IconLogoutUser from '../../assets/icon-logout-frame.svg';
import { clear } from '../../utils/storage';
import './styles.css';

let leftEdit = '0';
let leftLogout = '0';
let botEdit = '0';
let botLogout = '4';
let backgEdit = 'transparent';
let backgLogout = 'transparent';

const MenuMobi = ({
  userLogged, logout, handleModalEdit,
  setOpenModalEditUser, openModalEditUser
}) => {

  const navigate = useNavigate();
  const { id } = useParams();

  const [openMenuMobile, setOpenMenuMobile] = useState(false);

  function handleModalEdit() {
    setOpenModalEditUser(!openModalEditUser);
    setOpenMenuMobile(!openMenuMobile);
  }

  function logout() {
    clear();
    setTimeout(() => {
      navigate('/')
    }, 100)
  }

  if (openMenuMobile !== true) {
    setTimeout(() => {
      backgEdit = 'transparent';
      backgLogout = 'transparent';
    }, 300);
  }

  if (id && openMenuMobile) {
    leftEdit = '-8rem';
    botLogout = '8.5rem';
    leftLogout = '0';
    botEdit = '0';
    backgEdit = '#0E8750';
    backgLogout = '#1FA7AF';
  }

  if (openMenuMobile && !id) {
    leftLogout = '-8rem';
    leftEdit = '-16rem';
    backgEdit = '#0E8750';
    backgLogout = '#1FA7AF';
  }

  if (!openMenuMobile) {
    leftLogout = '0';
    leftEdit = '0';
    botLogout = '4px';
    botEdit = '0';
  }

  return (
    <div className="container-menu-mobi">
      <div
        className='menu-mobi'
        onClick={() => setOpenMenuMobile(!openMenuMobile)}
      >{userLogged}</div>
      <div
        onClick={handleModalEdit}
        className='btn-edit-user-menu animation-in-scale'
        style={{
          left: `${leftEdit}`,
          top: 4,
          backgroundColor: `${backgEdit}`
        }}
      >
        <img src={IconEditUser} alt='edit-user' />
      </div>
      <div
        onClick={logout}
        className='logout-user-menu animation-in-scale'
        style={{
          left: !id ? `${leftLogout}` : '4px',
          top: !id ? 4 : `${botLogout}`,
          backgroundColor: `${backgLogout}`,
          transition: id ? 'all 0.4s' : 'all 0.2s'
        }}
      >
        <img src={IconLogoutUser} alt='logout-user' />
      </div>
    </div>
  );
}

export default MenuMobi;
