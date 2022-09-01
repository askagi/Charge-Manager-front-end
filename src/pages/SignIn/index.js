import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import CustomBackdrop from '../../components/CustomBackdrop';
import api from '../../services/api';
import { getItem, setItem } from '../../utils/storage';
import './styles.css';

const SignIn = () => {
  const navigate = useNavigate();
  const [value, setValue, remove] = useLocalStorage('user', {});

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [erroEmail, setErroEmail] = useState('');
  const [erroPassword, setErroPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangeInput = ({ target }) => {
    if (target.name === 'email') {
      setErroEmail('');
      setEmail(target.value)
    }
    if (target.name === 'password') {
      setErroPassword('');
      setPassword(target.value);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email && !password) {
      setErroEmail('Este campo deve ser preenchido');
      setErroPassword('Este campo deve ser preenchido');
      return;
    };

    if (!email) {
      setErroEmail('Este campo deve ser preenchido');
      return;
    }

    if (!password) {
      setErroPassword('Este campo deve ser preenchido');
      return;
    }

    try {
      setLoading(true);
      const response = await api.post('/login', {
        email,
        password
      });
      setLoading(false);

      const { user, token } = response.data;

      setValue(user);
      setItem('token', token);
      navigate('/home');

    } catch (error) {
      setLoading(false);
      const message = error.response.data
      return setError(message[0].toUpperCase() + message.substr(1, message.length))
    }
  }

  useEffect(() => {
    if (getItem('token')) {
      navigate('/home');
    }
  }, []);

  return (
    <div className="container-sign-in">

      <CustomBackdrop open={loading} />

      <div className="sign-in-left">
        <div className='content-text'>
          <h3>Gerencie todos os pagamentos da sua empresa em um só lugar.</h3>
        </div>
      </div>
      <div className="sign-in-right">
        <h2>Faça seu login!</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-groups">
            <div className="input-group">
              <label htmlFor="email">E-mail</label>
              <input
                className={`inputs ${erroEmail ? 'input-error' : ''}`}
                name='email'
                id='email'
                type="text"
                placeholder='Digite seu e-mail'
                value={email}
                onChange={handleChangeInput}
              />
              {
                erroEmail &&
                <span className='feedback-error'>{erroEmail}</span>
              }
            </div>
            <div className="input-group">
              <div className="row-space-between">
                <label htmlFor="password">Senha</label>
                <Link to='/forgot-password'>Esqueceu a senha?</Link>
              </div>
              <input
                className={`inputs ${erroPassword ? 'input-error' : ''}`}
                name='password'
                id='password'
                type="password"
                placeholder='Digite sua senha'
                value={password}
                onChange={handleChangeInput}
              />
              {
                erroPassword &&
                <span className='feedback-error'>{erroPassword}</span>
              }
            </div>
            <div className="box-error">
            </div>
          </div>
          <div className="row-column-center">
            <div className="box-error">
              {
                error &&
                <span className='feedback-error'>{error}</span>
              }
            </div>
          </div>
          <div className="row-column-center">
            <button className='btn-confirm medium-btn'>Entrar</button>
          </div>
        </form>
        <div className="register-link">
          <span>Ainda não possui uma conta?</span><Link to="/sign-up">Cadastre-se</Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
