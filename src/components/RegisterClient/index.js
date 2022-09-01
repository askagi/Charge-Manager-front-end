import { useState } from 'react';
import { useParams } from 'react-router-dom';
import IconCliente from '../../assets/icon-client-black.svg';
import IconClose from '../../assets/icon-close.svg';
import ContextMain from '../../hook/ContextHook';
import api from '../../services/api';
import viaCepApi from '../../services/viaCep';
import { formatCurrentCep, formatCurrentCpf, formatCurrentTelephone } from '../../utils/formatter';
import './styles.css';

const RegisterClient = ({ title, detailClient, listClients }) => {
  document.documentElement.style.overflow = 'hidden';
  const { id } = useParams();
  const { erroName, setErroName, erroEmail, setOpenModalRegisterClient, erroCep, setErroCep,
    setErroEmail, erroCpf, setErroCpf, erroTelephone, setResponseSuccessRegisterClient,
    setErroTelephone, clientCurrent, headers, setResponseSuccessEditClient
  } = ContextMain();

  const arrayWordsEmail = ['email', 'E-mail'];
  const arrayWordsCpf = ['cpf', 'CPF'];
  const arrayWordsTelephone = ['Telefone', , 'telefone', 'caracteres'];

  const [form, setForm] = useState({
    name: title === 'Editar Cliente' ? clientCurrent.name : '',
    email: title === 'Editar Cliente' ? clientCurrent.email : '',
    cpf: title === 'Editar Cliente' ? clientCurrent.cpf.replace(/[^\w\s]|\s|[A-Z]/gi, '') : '',
    telephone: title === 'Editar Cliente' ? clientCurrent.telephone.replace(/[^\w\s]|\s|[A-Z]/gi, '') : '',
    address: title === 'Editar Cliente' ? clientCurrent.address : '',
    compliment: title === 'Editar Cliente' ? clientCurrent.compliment : '',
    cep: title === 'Editar Cliente' ? clientCurrent.cep : '',
    district: title === 'Editar Cliente' ? clientCurrent.district : '',
    city: title === 'Editar Cliente' ? clientCurrent.city : '',
    state: title === 'Editar Cliente' ? clientCurrent.state : ''
  });

  const clearFormDependenceCep = () => {
    setForm({
      ...form,
      address: '',
      compliment: '',
      cep: '',
      district: '',
      city: '',
      state: ''
    });
  }

  const handleGetAddress = async () => {
    try {

      const response = await viaCepApi(form.cep);

      if (response.data.erro) {
        setErroCep('Cep inválido.');
        clearFormDependenceCep();
        return;
      }

      setErroCep('');
      const {
        logradouro,
        complemento,
        bairro,
        localidade,
        uf
      } = response.data;

      if (title === 'Editar Cliente') {
        setForm({
          ...form,
          address: !logradouro ? form.address : logradouro,
          compliment: !complemento ? form.compliment : complemento,
          district: !bairro ? form.district : bairro,
          city: !localidade ? form.city : localidade,
          state: !uf ? form.state : uf
        });
      } else {
        setForm({
          ...form,
          address: logradouro,
          compliment: complemento,
          district: bairro,
          city: localidade,
          state: uf
        });
      }

    } catch (error) {
      return
    }
  }

  const clearForm = () => {
    setForm({
      name: '',
      email: '',
      cpf: '',
      telephone: '',
      address: '',
      compliment: '',
      cep: '',
      district: '',
      city: '',
      state: ''
    });
  }

  const clearErroSpanAndCloseModal = () => {
    document.documentElement.style.overflow = 'auto';
    setErroName('');
    setErroEmail('');
    setErroCpf('');
    setErroTelephone('');
    setOpenModalRegisterClient(false);
    setErroCep('');
  }

  function handleChangeInputValue(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (form.name) { setErroName('') }
    if (form.email) { setErroEmail('') }
    if (e.target.name == 'cpf') {
      setErroCpf('');
      setForm({ ...form, cpf: e.target.value.replace(/[^\w\s]|\s|[A-Z]/gi, '') });
    }
    if (form.telephone) { setErroTelephone('') }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name) {
      setErroName('Este campo deve ser preenchido');
    }
    try {
      if (!form.email) {
        setErroEmail('Este campo deve ser preenchido');
      }
      if (!form.cpf) {
        setErroCpf('Este campo deve ser preenchido');
      }
      if (!form.telephone) {
        setErroTelephone('Este campo deve ser preenchido');
      }
      setResponseSuccessEditClient(false);
      if (title === 'Editar Cliente') {

        const response = await api.put(`atualizar-cliente/${id}`, {
          ...form,
          telephone: form.telephone.replace(/[^\w\s]|\s|[A-Z]/gi, ''),
          cep: form.cep.replace(/[^\w\s]|\s|[A-Z]/gi, '')
        }, headers);
        detailClient();
        setTimeout(() => {
          document.documentElement.style.overflow = 'auto';
          setResponseSuccessEditClient(true);
          setOpenModalRegisterClient(false);
        }, 900);
        clearForm();
      }
      setResponseSuccessRegisterClient(false);
      if (title === 'Cadastro de Cliente') {
        const response = await api.post('/cadastrar-cliente', {
          ...form,
          telephone: form.telephone.replace(/[^\w\s]|\s|[A-Z]/gi, ''),
          cep: form.cep.replace(/[^\w\s]|\s|[A-Z]/gi, '')
        }, headers);
        listClients();
        setTimeout(() => {
          document.documentElement.style.overflow = 'auto';
          setResponseSuccessRegisterClient(true);
          setOpenModalRegisterClient(false);
        }, 900);
        clearForm();
      }

    } catch (error) {
      document.documentElement.style.overflow = 'auto';
      setResponseSuccessRegisterClient(false);
      setResponseSuccessEditClient(false);
      const message = error.response.data

      if (erroName && erroCpf && erroEmail && erroTelephone) {
        return
      }
      if (!form.name && !form.email && !form.cpf && !form.telephone) {
        return
      }

      if (error.response.status > 204) {
        for (let word of arrayWordsEmail) {
          if (message.includes(word)) {
            setErroEmail(message[0].toUpperCase() + message.substr(1, message.length))
            return
          }
        }
        for (let word of arrayWordsCpf) {
          if (message.includes(word)) {
            setErroCpf(message[0].toUpperCase() + message.substr(1, message.length))
            return
          }
        }
        for (let word of arrayWordsTelephone) {
          if (message.includes(word)) {
            setErroTelephone(message[0].toUpperCase() + message.substr(1, message.length))
            return
          }
        }
      }
      return console.log(error.response)
    }
  }

  return (
    <div className="container-register-client">
      <div className='form-register-client animation-in-scale'>
        <div className='title-form'>
          <img src={IconCliente} alt='icon client' />
          <h1 className='font-mont-serrat-semi-bold-26'>{title}</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <img
            className='icon-close'
            src={IconClose}
            alt='icon close'
            onClick={() => clearErroSpanAndCloseModal()}
          />
          <div className='form-register-inputs-label relative margin-top'>
            <label className='font-nunito-regular-14'>Nome*</label>
            <input
              type='text'
              name='name'
              value={form.name}
              className={`inputs ${erroName ? 'input-error' : ''}`}
              placeholder='Digite o nome'
              onChange={handleChangeInputValue}
            />
            {erroName && <span className='feedback-error absolute'>{erroName}</span>}
          </div>

          <div className='form-register-inputs-label relative'>
            <label className='font-nunito-regular-14'>E-mail*</label>
            <input
              type='text'
              name='email'
              value={form.email}
              className={`inputs ${erroEmail ? 'input-error' : ''}`}
              placeholder='Digite o e-mail'
              onChange={handleChangeInputValue}
            />
            {erroEmail && <span className='feedback-error absolute'>{erroEmail}</span>}
          </div>

          <div className='form-register-double-inputs-label'>
            <div className='form-register-inputs-label relative'>
              <label className='font-nunito-regular-14'>CPF*</label>
              <input
                type='text'
                name='cpf'
                value={formatCurrentCpf(form.cpf)}
                maxLength={11}
                className={`inputs ${erroCpf ? 'input-error' : ''}`}
                placeholder='Digite o CPF'
                onChange={handleChangeInputValue}
              />
              {erroCpf && <span className='feedback-error absolute'>{erroCpf}</span>}
            </div>

            <div className='form-register-inputs-label relative'>
              <label className='font-nunito-regular-14'>Telefone*</label>
              <input
                type='text'
                name='telephone'
                value={formatCurrentTelephone(form.telephone)}
                maxLength={15}
                className={`inputs ${erroTelephone ? 'input-error' : ''}`}
                placeholder='Digite o telefone'
                onChange={handleChangeInputValue}
              />
              {erroTelephone && <span className='feedback-error absolute'>{erroTelephone}</span>}
            </div>
          </div>
          <div className='form-register-double-inputs-label relative'>
            <div className='form-register-inputs-label'>
              <label className='font-nunito-regular-14'>CEP</label>
              <input
                type='text'
                name='cep'
                value={formatCurrentCep(form.cep)}
                maxLength={9}
                className={`inputs ${erroCep ? 'input-error' : ''}`}
                placeholder='Digite o CEP'
                onChange={handleChangeInputValue}
                onBlur={handleGetAddress}
              />
              {erroCep && <span className='feedback-error absolute'>{erroCep}</span>}
            </div>
            <div className='form-register-inputs-label'>
              <label className='font-nunito-regular-14'>Bairro</label>
              <input
                type='text'
                name='district'
                value={form.district}
                className='inputs'
                placeholder='Digite o bairro'
                onChange={handleChangeInputValue}
              />
            </div>
          </div>
          <div className='form-register-inputs-label'>
            <label className='font-nunito-regular-14'>Endereço</label>
            <input
              type='text'
              name='address'
              value={form.address}
              className='inputs'
              placeholder='Digite o endereço'
              onChange={handleChangeInputValue}
            />
          </div>
          <div className='form-register-inputs-label'>
            <label className='font-nunito-regular-14'>Complemento</label>
            <input
              type='text'
              name='compliment'
              value={form.compliment}
              className='inputs'
              placeholder='Digite o complemento'
              onChange={handleChangeInputValue}
            />
          </div>

          <div className='form-register-double-inputs-label'>
            <div className='form-register-inputs-label-city'>
              <label className='font-nunito-regular-14'>Cidade</label>
              <input
                type='text'
                name='city'
                value={form.city}
                className='inputs'
                placeholder='Digite a cidade'
                onChange={handleChangeInputValue}
              />
            </div>
            <div className='form-register-inputs-label-uf'>
              <label className='font-nunito-regular-14'>UF</label>
              <input
                type='text'
                name='state'
                value={form.state}
                maxLength={2}
                className='inputs'
                placeholder='Digite a UF'
                onChange={handleChangeInputValue}
              />
            </div>
          </div>
          <div className='form-register-btn'>
            <button
              type='button'
              className='high-midle-btn btn-cancel'
              onClick={() => clearErroSpanAndCloseModal()}
            >Cancelar</button>
            <button
              type='submit'
              className='high-midle-btn btn-confirm'>Aplicar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterClient;
