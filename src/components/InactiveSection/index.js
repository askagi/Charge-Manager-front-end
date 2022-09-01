import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clear } from '../../utils/storage';
import './styles.css';

const style = {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 5,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#F8F8F9',
  border: '2px solid #DA0175',
  boxShadow: 24,
  p: 5,
};

export default function InactiveSection({ openInactive, setOpenInactive }) {
  let timer;
  const navigate = useNavigate();
  const handleOpen = () => setOpenInactive(true);
  const handleClose = () => setOpenInactive(false);
  const [alert, setAlert] = useState('Até logo!');
  const [totalSeconds, settotalSeconds] = useState(30);

  useEffect(() => {
    if (totalSeconds === 0) {
      setTimeout(() => {
        clearTimeout(timer);
        clear();
        navigate('/');
      }, 2000);
    }
    timer = setTimeout(() => {
      settotalSeconds(totalSeconds - 1)
    }, 1000);

  }, [totalSeconds]);

  return (
    <div>
      <Modal
        open={openInactive}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className='font-mont-serrat-bold-24'
            sx={{
              fontSize: 28,
              textAlign: 'center',
              marginBottom: 3
            }}
          >
            Alerta de inatividade
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{
              marginBottom: 2, fontSize: 18,
              textAlign: 'center',
              letterSpacing: 0.5
            }}
          >
            Por favor, você precisa confirmar se ainda deseja permanecer logado.
          </Typography>
          <span id='timer'
            style={{
              fontSize: 24,
              letterSpacing: 0.5,
              marginBottom: 14,
              color: '#DA0175'
            }}
          >{totalSeconds > 0 ? totalSeconds.toString().padStart(2, "0") : alert}</span>
          <button
            style={{
              marginTop: 6,
              fontSize: 16,
              width: '50%',
              color: '#fff',
              backgroundColor: '#DA0175',
              borderRadius: 10
            }}
            onClick={() => setOpenInactive(false)}
          >
            <strong>OK</strong>
          </button>
        </Box>
      </Modal>
    </div>
  );
}

