import './styles.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const ForgotPassword = () => {
  const [card1, setCard1] = useState({
    dispCard1: 'flex',
    opcCard1: 1
  });

  const [card2, setCard2] = useState({
    dispCard2: 'flex',
    opcCard2: 0
  });

  function resetStates() {
    setCard2({ ...card2, opcCard2: 0 });
    setTimeout(() => {
      setCard1({ ...card1, dispCard1: 'flex', opcCard1: 1 });
    }, 1000);
  }

  function handleCard() {
    setCard1({ ...card1, opcCard1: 0 });
    setTimeout(() => {
      setCard1({ ...card1, dispCard1: 'none' });
      setCard2({ ...card2, opcCard2: 1 });
    }, 1000);
  }

  return (
    <div className="container-require-password">
      <Link to='/'>
        <div className='icon-return'>
          <ArrowBackIosNewIcon
            sx={{ width: 30, height: 30, color: '#000' }}
          />
        </div>
      </Link>
      <div className='container-content-password'>
        <div className='card-forgot-password'>
          <button
            onClick={() => resetStates()}
          >
            <ArrowBackIcon
              sx={
                {
                  height: 25,
                  width: 25,
                  color: '#667085',
                  position: 'absolute',
                  top: 20,
                  left: 20,
                  cursor: 'pointer',
                  opacity: card2.opcCard2,
                  transition: 'opacity 1s',
                  zIndex: 2
                }
              }
            />
          </button>
          <div
            className='card-forgot-password-content'
            style={
              {
                display: card1.dispCard1,
                opacity: card1.opcCard1
              }
            }
          >
            <h1 className='font-mont-serrat-bold-18-700'>Redefinição de senha</h1>
            <span
              className='mr-btom font-nunito-regular-16-weigth-600'
            >Será enviado um código de confirmação para o email informado abaixo
            </span>
            <div className='inputs-label-forgot-password width-100-pcnt'>
              <label className='font-nunito-regular-16-weight-400'>Informe seu e-mail de usuário</label>
              <input
                className='inputs'
              />
            </div>
            <button
              onClick={() => handleCard()}
              className='font-nunito-regular-14 btn-confirm medium-btn'
            >Receber código
            </button>
          </div>
          <div className='card-forgot-password-code'
            style={
              {
                display: card2.dispCard2,
                opacity: card2.opcCard2
              }
            }
          >
            <h1 className='font-mont-serrat-bold-18-700'>Insira o código recebido</h1>
            <div className='inputs-label-forgot-password-code width-100-pcnt'>
              <input
                className='inputs small-btn'
              />
            </div>
            <button
              className='font-nunito-regular-14 btn-confirm medium-btn'
            >Confirmar
            </button>
            <span
              className='font-nunito-regular-14-weigth-600'>
              <strong>Não esqueça de redefinir sua senha após o login.</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
