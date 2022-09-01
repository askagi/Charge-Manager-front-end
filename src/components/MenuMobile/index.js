import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { clear } from '../../utils/storage';
import { useState } from 'react';
import './styles.css';

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: 'absolute',
  '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

const actions = [
  { icon: <LogoutIcon />, name: 'SAIR' },
  { icon: <BorderColorOutlinedIcon />, name: 'EDITAR' }
];

export default function MenuMobile({
  logout, handleModalEdit,
  setOpenModalEditUser, openModalEditUser
}) {

  const navigate = useNavigate();
  const [direction, setDirection] = useState('left');
  const [hidden, setHidden] = useState(false);

  function handleModalEdit() {
    setOpenModalEditUser(!openModalEditUser);
  }

  function logout() {
    clear();
    setTimeout(() => {
      navigate('/')
    }, 100)
  }

  return (
    <div className="display-none">
      <Box
        sx={{
          transform: 'translateZ(0px)',
          flexGrow: 1,
          position: 'fixed',
          top: '9.8rem',
          right: '2.66rem',
          zIndex: 2
        }}>
        <Box sx={{ position: 'relative', mt: 3 }}>
          <StyledSpeedDial
            ariaLabel="SpeedDial playground example"

            icon={<SpeedDialIcon />}
            direction={direction}
          >
            <SpeedDialAction
              onClick={logout}
              icon={actions[0].icon}
              tooltipTitle={actions[0].name}
            />
            <SpeedDialAction
              onClick={handleModalEdit}
              icon={actions[1].icon}
              tooltipTitle={actions[1].name}
            />
          </StyledSpeedDial>
        </Box>
      </Box>
    </div>
  );
}