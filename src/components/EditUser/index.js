import { useState } from 'react';
import { useLocalStorage } from 'react-use';
import IconClose from '../../assets/icon-close.svg';
import EyeClose from '../../assets/icon-eye-off.svg';
import EyeOpen from '../../assets/icon-eye-open.svg';
import RegisterSuccessfull from '../../assets/image-successfull.svg';
import api from '../../services/api';
import { getItem, removeItem } from '../../utils/storage';
import CustomBackdrop from '../CustomBackdrop';
import MessageBox from '../MessageBox';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { formatCurrentCpf, formatCurrentTelephone } from '../../utils/formatter';

const EditUser = ({ setOpenModalEditUser }) => {
  document.documentElement.style.overflow = 'hidden';
  const navigate = useNavigate();
  const token = getItem('token');
  const [localUser, setLocalUser, removeLocalUser] = useLocalStorage('user', {});
  const [openEye, setOpenEye] = useState(false);
  const [form, setForm] = useState({
    name: localUser.name,
    email: localUser.email,
    cpf: localUser.cpf,
    telephone: localUser.telephone,
    password: "",
    againstPassword: "",
  });

  const [erroName, setErroName] = useState('');
  const [erroEmail, setErroEmail] = useState('');
  const [erroCpf, setErroCpf] = useState('');
  const [erroTelephone, setErroTelephone] = useState('');
  const [erroPassword, setErroPassword] = useState('');
  const [erroAginstPassword, setErroagainstPassword] = useState('');
  const [responseSuccess, setResponseSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invalidToken, setInvalidToken] = useState(false);

  const arrayWordsEmail = ['email', 'E-mail'];
  const arrayWordsCpf = ['cpf', 'CPF'];
  const arrayWordsTelephone = ['Telefone', 'telefone', 'telephone'];
  const arrayWordsPassword = ['Senha', 'senha'];

  function handlechangeInputs(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (form.name) { setErroName('') }
    if (form.email) { setErroEmail('') }
    if (form.cpf) { setErroCpf('') }
    if (form.telephone) { setErroTelephone('') }
    if (form.password) { setErroPassword('') }
    if (form.againstPassword) { setErroagainstPassword('') }

    if (e.target.name == 'cpf') {
      setForm({ ...form, cpf: e.target.value.replace(/[^\w\s]|\s|[A-Z]/gi, '') });
      return;
    }
    if (e.target.name == 'telephone') {
      setForm({ ...form, telephone: e.target.value.replace(/[^\w\s]|\s|[A-Z]/gi, '') });
      return;
    }
  }

  const clearForm = () => {
    setForm({
      name: '',
      email: '',
      cpf: '',
      telephone: '',
      password: '',
      againstPassword: ''
    });
  }

  const clearSpansError = () => {
    setErroName('');
    setErroEmail('');
    setErroCpf('');
    setErroTelephone('');
    setErroPassword('');
    setErroagainstPassword('');
  }

  function clearErroSpanAndCloseModal() {
    document.documentElement.style.overflow = 'auto';
    clearForm();
    clearSpansError();
    setOpenModalEditUser(false);
  }

  async function confirmEditUser() {
    setResponseSuccess(true);
    setTimeout(() => {
      document.documentElement.style.overflow = 'auto';
      setResponseSuccess(false);
      setOpenModalEditUser(false);
    }, 2500);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // if (!form.name && form.email) {
    //   setErroName('Este campo deve ser preenchido');
    // }

    if (!form.name || !form.email || form.password !== form.againstPassword) {
      !form.name ? setErroName('Este campo deve ser preenchido') : '';
      !form.email ? setErroEmail('Este campo deve ser preenchido') : '';
      form.password !== form.againstPassword ? setErroagainstPassword('As senhas não coincidem') : ''
      return;
    }

    // if (form.password !== form.againstPassword) {
    //   setErroPassword('');
    //   setErroagainstPassword('As senhas não coincidem')
    //   return;
    // }

    const headers = {
      headers: {
        authorization: `Bearer ${token}`
      }
    }

    try {
      setLoading(true);
      const response = await api.put('/editar-usuario', {
        name: form.name,
        email: form.email,
        cpf: form.cpf ? form.cpf : '',
        telephone: form.telephone ? form.telephone : '',
        password: form.password,
      }, headers);

      setLoading(false);

      if (response.status > 204) {
        setLoading(false);
        return;
      }

      const { password, againstPassword, ...dataUser } = form;
      clearForm();
      setLocalUser(dataUser);
      confirmEditUser();

    } catch (error) {
      setLoading(false);
      const message = error.response.data;
      if (erroName && erroCpf && erroEmail && erroTelephone) {
        return;
      }
      if (error.response.status > 204) {
        if (message.includes('invalid token') || message.includes('jwt expired')) {
          removeItem('token');
          removeLocalUser();
          setOpenModalEditUser(false);
          navigate('/');

        }
        for (let word of arrayWordsEmail) {
          if (message.includes(word)) {
            setErroEmail(message[0].toUpperCase() + message.substr(1, message.length));
            return;
          }
        }
        for (let word of arrayWordsCpf) {
          if (message.includes(word)) {
            setErroCpf(message[0].toUpperCase() + message.substr(1, message.length));
            return;
          }
        }
        for (let word of arrayWordsTelephone) {
          if (message.includes(word)) {
            setErroTelephone(message[0].toUpperCase() + message.substr(1, message.length));
            return;
          }
        }
        for (let word of arrayWordsPassword) {
          if (message.includes(word)) {
            setErroPassword(message[0].toUpperCase() + message.substr(1, message.length));
            return;
          }
        }
      }
      return;
    }
  }

  return (
    <div className="modal">
      <CustomBackdrop open={loading} />
      {responseSuccess ?
        <MessageBox
          image={RegisterSuccessfull}
          message='Cadastro Alterado com sucesso!'
          backgroundColor='#FFFFFF'
        />
        :
        <div className="container-modal animation-in-scale">
          <div className="close-icon" onClick={() => clearErroSpanAndCloseModal(false)}>
            <img src={IconClose} alt=" icon close" />
          </div>
          <h2>Edite seu cadastro</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-groups">
              <div className="input-group relative">
                <label htmlFor="name">Nome*</label>
                <input
                  id='name'
                  className={erroName ? "inputs input-error" : "inputs "}
                  type="text"
                  name='name'
                  placeholder='Digite seu nome'
                  value={form.name}
                  onChange={handlechangeInputs}
                  onFocus={() => setErroName('')}
                />
                {erroName && <span className='feedback-error absolute'>{erroName}</span>}
              </div>
              <div className="input-group relative">
                <label htmlFor="email">Email*</label>
                <input
                  id='email'
                  className={erroEmail ? "inputs input-error" : "inputs "}
                  type="text"
                  name='email'
                  placeholder='Digite seu e-mail'
                  value={form.email}
                  onChange={handlechangeInputs}
                  onFocus={() => setErroEmail('')}
                />
                {erroEmail && <span className='feedback-error absolute'>{erroEmail}</span>}
              </div>

              <div className="row-inputs">
                <div className="input-group small-input">
                  <div className="flex-column relative">
                    <label htmlFor="cpf">CPF</label>
                    <input
                      id='cpf'
                      className={erroCpf ? "inputs input-error" : "inputs "}
                      type="text"
                      name='cpf'
                      placeholder='Digite seu CPF'
                      maxLength={11}
                      value={formatCurrentCpf(form.cpf)}
                      onChange={handlechangeInputs}
                    />
                    {erroCpf && <span className='feedback-error absolute'>{erroCpf}</span>}
                  </div>
                </div>

                <div className="input-group small-input">
                  <div className="flex-column relative">
                    <label htmlFor="telephone">Telefone</label>
                    <input
                      id='telephone'
                      className={erroTelephone ? "inputs input-error" : "inputs "}
                      type="text"
                      name='telephone'
                      placeholder='Digite seu Telefone'
                      maxLength={15}
                      value={formatCurrentTelephone(form.telephone)}
                      onChange={handlechangeInputs}
                    />
                    {erroTelephone && <span className='feedback-error absolute'>{erroTelephone}</span>}
                  </div>
                </div>
              </div>

              <div className="input-group relative">
                <div className="flex-column">
                  <label htmlFor="password">Nova Senha*</label>
                  <input
                    type={openEye ? 'text' : 'password'}
                    name="password"
                    value={form.password.trim()}
                    placeholder="Digite sua nova senha"
                    maxLength={15}
                    className={erroPassword ? "inputs input-error" : "inputs "}
                    onChange={handlechangeInputs}
                  />
                  <img
                    className={!openEye ? "eye-off" : "eye-open"}
                    src={!openEye ? EyeClose : EyeOpen}
                    alt='eyeoff'
                    onClick={() => setOpenEye(!openEye)}
                  />
                </div>
                {erroPassword && <span className='feedback-error absolute'>{erroPassword}</span>}
              </div>

              <div className="input-group relative">
                <div className="flex-column">
                  <label htmlFor="againstPassword">Confirmar Senha*</label>
                  <input
                    type={openEye ? 'text' : 'password'}
                    name="againstPassword"
                    value={form.againstPassword.trim()}
                    placeholder="Digite novamente sua nova senha"
                    maxLength={15}
                    className={erroAginstPassword ? "inputs input-error" : "inputs "}
                    onChange={handlechangeInputs}
                  />
                  <img
                    className={!openEye ? "eye-off" : "eye-open"}
                    src={!openEye ? EyeClose : EyeOpen}
                    alt='eyeoff'
                    onClick={() => setOpenEye(!openEye)}
                  />
                </div>
                {erroAginstPassword && <span className='feedback-error absolute'>{erroAginstPassword}</span>}
              </div>
            </div>
            <button className='btn-confirm medium-btn'>Aplicar</button>
          </form>
        </div>
      }

    </div>
  );
}

export default EditUser;
