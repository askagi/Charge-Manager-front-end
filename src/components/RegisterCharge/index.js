import { useEffect, useState } from 'react';
import IconCharge from '../../assets/icon-charge-sidebar.svg';
import IconChecked from '../../assets/icon-checked-green.svg';
import IconClose from '../../assets/icon-close.svg';
import IconUnChecked from '../../assets/icon-unchecked.svg';
import ContextMain from '../../hook/ContextHook';
import { formatEditDate, money } from '../../utils/formatter';
import { getItem } from '../../utils/storage';
import CustomBackdrop from '../CustomBackdrop';
import './styles.css';

const RegisterCharge = ({ title }) => {
  document.documentElement.style.overflow = 'hidden';

  const {
    api,
    setOpenModalRegisterCharge,
    refresh, setRefresh,
    currentCharge, setCurrentCharge,
    clientCurrent, setClientCurrent,
    loading,
    setLoading,
    setResponseSuccessRegisterCharge,
    setResponseSuccessEditCharge,
    typeAction, setTypeAction 
  } = ContextMain();


  const [errorCustomer, setErrorCustomer] = useState('');
  const [errorExpiration, setErrorExpiration] = useState('');
  const [errorDescription, setErrorDescription] = useState('');
  const [errorAmount, setErrorAmount] = useState('');

  const arrayWordsExpiration = ['expiration', 'Expiration', 'Data'];
  const arrayWordsDescription = ['description', 'Description'];
  const arrayWordsAmount = ['amount', 'Amount', 'Valor'];

  const [form, setForm] = useState({
    customer: '',
    name: '',
    description: '',
    expiration: '',
    amount: '0,00',
    status: 'pendente',
  });

  const handleChangeInputValue = ({ target }) => {
    setForm({ ...form, [target.name]: target.value });
    if (target.name === 'amount') {
      !target.value ? setForm({ ...form, amount: '0,00' }) : setForm({ ...form, amount: target.value });
    }
  }

  const clearForm = () => {
    setForm({
      customer: '',
      name: '',
      description: '',
      expiration: '',
      amount: '0,00',
      status: 'pendente',
    })
  }

  function CloseModalRegisterCharge() {
    document.documentElement.style.overflow = 'auto';
    clearForm();
    setOpenModalRegisterCharge(false);
  }

  const validateData = (error) => {
    const message = error.response.data;
    if (error.response.status > 204) {

      for (let word of arrayWordsDescription) {
        if (message.includes(word)) {
          setErrorDescription(message.replace(word, 'Descrição'));
          return;
        }
      }

      for (let word of arrayWordsExpiration) {
        if (message.includes(word)) {
          setErrorExpiration(message.replace(word, 'Vencimento'));
          return;
        }
      }
      for (let word of arrayWordsAmount) {
        if (message.includes(word)) {
          setErrorAmount(message.replace(word, 'Valor'));
          return;
        }
      }
      return;
    }
    return;
  }

  const registerCharge = async () => {
    try {
      setResponseSuccessRegisterCharge(false);
      setLoading(true);
      const response = await api.post('/cadastrar-cobranca', {
        ...form,
        amount: form.amount.replace(/[^\w\s]|\s|[A-Z]/gi, ''),
      },
        {
          headers: {
            authorization: `Bearer ${getItem('token')}`
          }
        });

      if (response.status > 204) {
        return;
      }
      setLoading(false);
      CloseModalRegisterCharge(false);
      setResponseSuccessRegisterCharge(true);
      setRefresh(!refresh);

    } catch (error) {
      setLoading(false);
      setResponseSuccessRegisterCharge(false);
      validateData(error);
    }
  }

  const updateCharge = async () => {
    setResponseSuccessEditCharge(false);
    setLoading(true);
    try {
      const response = await api.put(`/atualizar-cobranca/${currentCharge.id}`, {
        ...form,
        amount: form.amount.replace(/[^\w\s]|\s|[A-Z]/gi, ''),
      },
        {
          headers: {
            authorization: `Bearer ${getItem('token')}`
          }
        });
      if (response.status > 204) {
        return;
      }
      setLoading(false);
      CloseModalRegisterCharge(false);
      setResponseSuccessEditCharge(true);
      setRefresh(!refresh);

    } catch (error) {
      setLoading(false);
      setResponseSuccessEditCharge(false);
      validateData(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errorMessage = 'Este campo deve ser preenchido'
    if (!form.customer || !form.description || !form.expiration || !form.amount || form.amount.replace(/[^\w\s]|\s|[A-Z]/gi, '') == 0) {
      !form.customer ? setErrorCustomer(errorMessage) : '';
      !form.description ? setErrorDescription(errorMessage) : '';
      !form.expiration ? setErrorExpiration(errorMessage) : '';
      !form.amount ? setErrorAmount(errorMessage) : '';
      form.amount.replace(/[^\w\s]|\s|[A-Z]/gi, '') == 0 ? setErrorAmount('O valor tem que ser maior que zero') : '';
      Number(form.amount.replace(/[^\w\s]|\s|[A-Z]/gi, '')) == 0 ? setErrorAmount(errorMessage) : '';
      return;
    }

    if (typeAction === 'register') {
      await registerCharge();
      return;
    }

    if (typeAction === 'edit') {
      await updateCharge();
      return;
    }
    return;
  }

  useEffect(() => {

    if (typeAction === 'edit') {
      clearForm();
      setForm({
        customer: currentCharge.customer_id,
        name: currentCharge.name,
        description: currentCharge.description,
        amount: String(currentCharge.amount),
        status: currentCharge.status,
        expiration: formatEditDate(currentCharge.expiration)
      });
      return;
    }

    if (typeAction === 'register') {
      clearForm();
      setForm({
        ...form,
        customer: clientCurrent.id,
        name: clientCurrent.name
      });
      return;
    }

    return (() => {
      clearForm();
      setTypeAction('');
      setClientCurrent({});
      setCurrentCharge({});
    })
  }, []);

  return (
    <div className="container-register-charge">
      <CustomBackdrop open={loading} />

      <form onSubmit={handleSubmit} className='form-register-charge animation-in-scale'>
        <img
          className='icon-close-charge'
          src={IconClose}
          alt='icon close'
          onClick={() => CloseModalRegisterCharge()}
        />
        <div className='title-form-charge'>
          <img src={IconCharge} alt='' />
          <h1 className='font-mont-serrat-semi-bold-26'>{title}</h1>
        </div>

        <div className='form-register-inputs-label name relative'>
          <label className='font-nunito-regular-14'>Nome*</label>

          <input
            className="inputs"
            name='customer'
            disabled
            value={form.name}
          />

          {errorCustomer && <span className='feedback-error absolute'>{errorCustomer}</span>}
        </div>
        <div className='form-register-inputs-label-description relative'>
          <label className='font-nunito-regular-14'>Descrição*</label>
          <textarea
            className={errorDescription ? "inputs input-error" : "inputs "}
            placeholder='Digite a descrição'
            name="description"
            rows="3"
            cols="50"
            maxLength={250}
            value={form.description}
            onChange={handleChangeInputValue}
            onFocus={() => setErrorDescription('')}
          >
          </textarea>
          <span className='number-of-characters'>{form.description.length}/250</span>
          {errorDescription && <span className='feedback-error absolute'>{errorDescription}</span>}
        </div>

        <div className='form-register-double-inputs-label'>
          <div className='form-register-inputs-label relative'>
            <label className='font-nunito-regular-14'>Vencimento:*</label>
            <input
              className={errorExpiration ? "inputs input-error" : "inputs "}
              type='date'
              placeholder='Digite a data de vencimento'
              name='expiration'
              value={form.expiration}
              onChange={handleChangeInputValue}
              onFocus={() => setErrorExpiration('')}
            />
            {errorExpiration && <span className='feedback-error absolute'>{errorExpiration}</span>}
          </div>
          <div className='form-register-inputs-label relative'>
            <label className='font-nunito-regular-14'>Valor:*</label>
            <input
              className={errorAmount ? "inputs input-error spacing-input-amount" : "inputs spacing-input-amount"}
              placeholder='Digite o valor'
              name='amount'
              value={money(form.amount)}
              onChange={handleChangeInputValue}
              onFocus={() => setErrorAmount('')}
            />
            <span className='currency'>R$</span>
            {errorAmount && <span className='feedback-error absolute'>{errorAmount}</span>}
          </div>
        </div>
        <label className='font-nunito-regular-14 margin-bottom'>Status*</label>
        <div className='charge-paid font-nunito-regular-14'>
          <img
            className='image-checked'
            src={form.status === 'paga' ? IconChecked : IconUnChecked}
            alt='icon checked'
            onClick={() => setForm({ ...form, status: 'paga' })}
          />
          <span>Cobrança Paga</span>
        </div>
        <div className='charge-pending font-nunito-regular-14'>
          <img
            className='image-checked'
            src={form.status === 'pendente' || form.status === 'vencida' ? IconChecked : IconUnChecked}
            alt='icon checked'
            onClick={() => setForm({ ...form, status: 'pendente' })}
          />
          <span>Cobrança Pendente</span>
        </div>
        <div className='form-register-btn-charge'>
          <button
            type='button'
            className='high-midle-btn btn-cancel'
            onClick={() => CloseModalRegisterCharge()}
          >Cancelar</button>
          <button type='submit' className='high-midle-btn btn-confirm'>Aplicar</button>
        </div>
      </form>
    </div>
  );
}

export default RegisterCharge;
