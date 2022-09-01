import { Divider, Skeleton } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ArrowIcon from '../../assets/icon-arrowdown-green.svg';
import EditUseIcon from '../../assets/icon-edit-user.svg';
import LogoutIcon from '../../assets/icon-logout.svg';
import { clear, getItem } from '../../utils/storage';
import EditUser from '../EditUser';
import MenuMobi from '../MenuMobi';
import './styles.css';

let dataUser = '';

const Header = ({ title, subtitle, detail, arrowRight, subtitleDetail, load }) => {
  const navigate = useNavigate();
  const [openSettings, setOpenSettings] = useState(false);
  const [openModalEditUser, setOpenModalEditUser] = useState(false);
  const token = getItem('token');

  if (token) {
    dataUser = JSON.parse(getItem('user')).name;
    dataUser = dataUser.trim().split(' ');
    if (dataUser.length > 1) {
      dataUser = `${dataUser[0].substring(0, 1)
        .toUpperCase()}${dataUser[0].substring(1, dataUser[0].length)} ${dataUser[1].substring(0, 1)
          .toUpperCase()}${dataUser[1].substring(1, dataUser[1].length)}`;
      dataUser = dataUser.replace(/,/g, " ");
    }
    if (dataUser.length < 2) {
      dataUser = `${dataUser[0].substring(0, 1)
        .toUpperCase()}${dataUser[0].substring(1, dataUser[0].length)}`
    }
  }

  function logout() {
    clear();
    setTimeout(() => {
      navigate('/')
    }, 100)
  }

  function stringAcronym(name) {
    const hasSpacing = name.trim().includes(' ');
    if (hasSpacing) {
      return `${name.split(' ')[0][0].toUpperCase()}${name.split(' ')[1][0].toUpperCase()}`
    }

    return `${name[0].toUpperCase()}`
  }

  function handleModalEdit() {
    setOpenModalEditUser(!openModalEditUser);
    setOpenSettings(!openSettings);
  }

  return (
    <header>
      <div className="container-header">
        <div className='menu-mobile'>
          <MenuMobi
            logout={logout}
            openModalEditUser={openModalEditUser}
            setOpenModalEditUser={setOpenModalEditUser}
            userLogged={stringAcronym(dataUser)}
          />
        </div>

        <div className="title-box">
          <h2 className='title'>{title && title}</h2>
          {
            detail &&
            <Link to='/clients'>
              <h4 className='subtitle'>{subtitle && subtitle}</h4>
            </Link>
          }
          {
            detail &&
            <Link to='/clients'>
              {
                load ?
                  <Skeleton
                    sx={{ bgcolor: '#f2f2f2' }}
                    animation="wave"
                    width={190}
                    height={30}
                    variant='h1'
                    component="h1" />
                  :
                  <h4 className='subtitle-768px'>{subtitleDetail}</h4>
              }
              <h4 className='subtitle'>{subtitle && subtitle}</h4>
            </Link>
          }
          {
            !detail &&
            <h4 className='subtitle' style={{ display: 'flex' }}>{subtitle && subtitle}</h4>
          }
          <Link to='/clients'>
            <span className='arrow-right'>{arrowRight}</span>
          </Link>
          <span className='detail'>{detail}</span>

        </div>

        <div className="item-group">
          <div className='circle'>
            <span className='color-green acronym'>{stringAcronym(dataUser)}</span>
          </div>
          <div className="settings" onClick={() => setOpenSettings(!openSettings)}>
            <span className='username'>{dataUser}</span>
            <img className={openSettings ? 'arrow-rotate settings-btn' : 'settings-btn'} src={ArrowIcon} alt="arrow icon" />
          </div>
          {
            openSettings &&
            <div className="actions-box">
              <div className="square"></div>
              <div className="item-actions">
                <div className='action action-edit' onClick={handleModalEdit}>
                  <img src={EditUseIcon} alt="edit icon" />
                  <span>Editar</span>
                </div>
                <div className='action action-logout'>
                  <img
                    src={LogoutIcon}
                    alt="logout icon"
                    onClick={() => logout()}
                  />
                  <span>Sair</span>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
      <Divider color='#ACD9C5' />
      {
        openModalEditUser &&
        <EditUser setOpenModalEditUser={setOpenModalEditUser} />
      }
    </header>
  );
}

export default Header;
