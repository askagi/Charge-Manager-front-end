import { useState } from "react";
import { Link } from 'react-router-dom';
import EyeClose from '../../assets/icon-eye-off.svg';
import EyeOpen from '../../assets/icon-eye-open.svg';
import RegisterSuccessfull from '../../assets/image-successfull.svg';
import MessageBox from "../../components/MessageBox";
import Progress from "../../components/Progress";
import ReasonSignUp from "../../components/ReasonSignUp";
import api from '../../services/api';
import "./styles.css";

function SignUp() {

  const [activeStep, setActiveStep] = useState({
    section1: true,
    section2: false,
    section3: false
  });
  const [openEye, setOpenEye] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    againstpassword: ''
  });

  const [erroName, setErroName] = useState('');
  const [erroEmail, setErroEmail] = useState('');
  const [erroPassword, setErroPassword] = useState('');
  const [progress, setProgress] = useState(false);
  const [erroAginstPassword, setErroagainstPassword] = useState('');

  function returnAddData() {
    if (activeStep.section3 === true) {
      return;
    }
    setActiveStep({ ...activeStep, section2: false });
    setErroPassword('');
    setErroagainstPassword('');
    setForm({ ...form, password: '', againstpassword: '' });
  }

  function handlechangeInputs(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (form.name) { setErroName('') }
    if (form.email) { setErroEmail('') }
    if (form.password) { setErroPassword('') }
    if (form.password.length >= 8) { setErroPassword('') }
    if (form.againstpassword) { setErroagainstPassword('') }
    if (form.againstpassword.length >= 8) { setErroagainstPassword('') }
  }

  async function nextProgressRegisterFirstSection(e) {
    e.preventDefault();

    if (!form.name && form.email) {
      setErroName('Este campo deve ser preenchido');
      return
    }
    if (!form.email && form.name) {
      setErroEmail('Este campo deve ser preenchido');
      return
    }
    if (!form.name && !form.email) {
      setErroName('Este campo deve ser preenchido');
      setErroEmail('Este campo deve ser preenchido');
      return
    }

    try {
      const response = await api.post('/email', {
        email: form.email
      });

      if (response) {
        document.querySelector('.riht-sign-up').style.opacity = '0';
        setTimeout(() => {
          document.querySelector('.riht-sign-up').style.opacity = '1';
          setActiveStep({ ...activeStep, section2: true });
        }, 800);
      }
    } catch (error) {
      const message = error.response.data;
      return setErroEmail(message[0].toUpperCase() + message.substr(1, message.length));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.password && form.againstpassword) {
      setErroPassword('Este campo deve ser preenchido');
    }
    if (form.password && !form.againstpassword) {
      setErroagainstPassword('Este campo deve ser preenchido');
    }
    if (!form.password && !form.againstpassword) {
      setErroPassword('Este campo deve ser preenchido');
      setErroagainstPassword('Este campo deve ser preenchido');
    }

    if (!form.password || !form.againstpassword) {
      return
    }

    if (form.password.length < 6) {
      setErroPassword('A senha deve ter no mínimo 6 caracteres.');
      return
    }
    if (form.againstpassword.length < 6) {
      setErroagainstPassword('A senha deve ter no mínimo 6 caracteres.');
      return
    }

    if (form.password.length >= 6) { setErroPassword('') }

    if (form.againstpassword.length >= 6) { setErroagainstPassword('') }

    if (form.password !== form.againstpassword) {
      setErroPassword(' ');
      setErroagainstPassword('As senhas não coincidem')
      return
    }

    try {
      setProgress(true);
      const response = await api.post('/cadastrar', {
        name: form.name,
        email: form.email,
        password: form.password
      });

      if (response) {
        document.querySelector('.form-sign-up-1').style.opacity = '0';
        setTimeout(() => {
          setProgress(false);
          setActiveStep({ ...activeStep, section3: true });
        }, 2600);
      }

    } catch (error) {
      const message = error.response.data;
      return setErroagainstPassword(message[0].toUpperCase() + message.substr(1, message.length));
    }
  }

  return (
    <div className="container-sign-up">
      <div className="left-sign-up">
        <ReasonSignUp
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      </div>
      <div className="riht-sign-up">
        {(activeStep.section1 && !activeStep.section2 && !activeStep.section3) &&
          <form className="form-sign-up-1" onSubmit={nextProgressRegisterFirstSection}>
            <h2 className="font-mont-serrat-bold-24">Adicione seus dados</h2>
            <div className="label-input-name-sign-up relative">
              <label className="font-nunito-regular-14">Nome*</label>
              <input
                type="text"
                name="name"
                value={form.name}
                placeholder="Digite seu nome"
                className={erroName ? "inputs input-error" : "inputs "}
                onChange={handlechangeInputs}
              />
              {erroName && <span className="feedback-error absolute">{erroName}</span>}
            </div>
            <div className="label-input-email-sign-up relative">
              <label className="font-nunito-regular-14">E-mail*</label>
              <input
                type="text"
                name="email"
                value={form.email}
                placeholder="Digite seu e-mail"
                className={erroEmail ? "inputs input-error" : "inputs"}
                onChange={handlechangeInputs}
              />
              {erroEmail && <span className="feedback-error absolute">{erroEmail}</span>}
            </div>
            <button
              className="btn-confirm medium-btn"
            >
              Continuar
            </button>
            <span
              className=".font-nunito-bold-16">
              Já possui uma conta? Faça seu <Link id='link-for-login' to='/'>Login</Link>
            </span>
          </form>
        }

        {(activeStep.section1 && activeStep.section2 && !activeStep.section3) &&
          <form className="form-sign-up-1" onSubmit={handleSubmit}>
            <h2 className="font-mont-serrat-bold-24">Escolha uma senha</h2>
            <div className="label-input-name-sign-up relative">
              <label className="font-nunito-regular-14">Senha*</label>
              <div className="input-relative">
                <input
                  type={openEye ? 'text' : 'password'}
                  name="password"
                  value={form.password.trim()}
                  placeholder=""
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
              {erroPassword && <span className="feedback-error absolute">{erroPassword}</span>}
            </div>

            <div className="label-input-email-sign-up relative">
              <label className="font-nunito-regular-14">Repita a senha*</label>
              <div className="input-relative">
                <input
                  type={openEye ? 'text' : 'password'}
                  name="againstpassword"
                  value={form.againstpassword.trim()}
                  placeholder=""
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
              {erroAginstPassword && <span className="feedback-error absolute">{erroAginstPassword}</span>}
            </div>

            <button
              type="submit"
              className="btn-confirm medium-btn"
            >
              Entrar
            </button>
            <span
              className="font-nunito-bold-16">
              Já possui uma conta? Faça seu <Link id='link-for-login' to='/'>Login</Link>
            </span>
          </form>
        }
        {progress &&
          <div className="card-successfull-progress">
            <Progress />
          </div>
        }

        {(activeStep.section1 && activeStep.section2 && activeStep.section3) &&
          <div className="card-successfull">
            <MessageBox
              image={RegisterSuccessfull}
              message='Cadastro realizado com sucesso!'
              backgroundColor={'#F0F0F5'}
            />
            <Link
              to='/'
              style={{ textDecoration: 'none' }}
            >
              <button
                type="button"
                className="btn-confirm medium-btn"
              >
                Ir para Login
              </button>
            </Link>
          </div>
        }

        <div className="status-progress-register-sign-up">
          <div
            onClick={() => returnAddData()}
            style={{
              cursor: 'pointer',
              backgroundColor:
                (activeStep.section1 && !activeStep.section2 && !activeStep.section3)
                  ? '#0E8750' : '#DEDEE9'
            }}
          ></div>
          <div
            style={{
              backgroundColor:
                (activeStep.section1 && activeStep.section2 && !activeStep.section3)
                  ? '#0E8750' : '#DEDEE9'
            }}
          ></div>
          <div
            style={{
              backgroundColor:
                (activeStep.section1 && activeStep.section2 && activeStep.section3)
                  ? '#0E8750' : '#DEDEE9'
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
