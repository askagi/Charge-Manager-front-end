import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IconArrowDownUp from '../../assets/icon-arrow-down-up.svg';
import IconEditChargeGrey from '../../assets/icon-edit-user.svg';
import IconPlusWhite from '../../assets/icon-plus-white.svg';
import IconTrashCharge from '../../assets/icon-trash-red.svg';
import ContextMain from '../../hook/ContextHook';
import api from '../../services/api';
import { amountFormat, dateFormat, idFormat } from '../../utils/formatter';
import './styles.css';

const TableChargesDetail = () => {
  const {
    allCharges,
    setAllCharges,
    sorted, setSorted,
  } = ContextMain();
  const localAllCharges = [...allCharges];

  const handleEditCharge = (item) => {
    setTypeAction('edit')
    setClientCurrent(item);
    setOpenModalRegisterCharge(true)
  }

  const getCharges = async () => {
    try {
      setLoading(true);
      const response = await api.get('/cobrancas', headers);
      setAllCharges(response.data);
      setLoading(false);
    } catch (error) {
      return;
    }
  }
  useEffect(() => {
    getCharges();
  }, [])

  const handleChargeStatus = (status, expiration) => {
    const expirationDate = new Date(expiration);
    const currentDate = new Date();
    if (status === 'pendente') {
      if (+currentDate > +expirationDate) {
        return 'vencida';
      }
    }
    return status;
  }
  useEffect(() => {

  }, [])

  return (
    <div className='container-table-clients-detail'>
      <div className='table-head-detail'>
        <h3 className='font-mont-serrat-bold-24'>Cobranças do Cliente</h3>
        <button
          className='btn-confirm high-midle-btn'
          onClick={() => setOpenModalRegisterCharge(true)}
        >
          <img src={IconPlusWhite} alt='pen green' />
          Nova cobrança
        </button>
      </div>
      <div className='table-head-detail font-nunito-bold-16'>
        <span id='arrow-down-up'>
          <img className='pointer' src={IconArrowDownUp} alt='icon arrow down and up' />
          ID Cob.
        </span>
        <span id='arrow-down-up'>
          <img className='pointer' src={IconArrowDownUp} alt='icon arrow down and up' />
          Data de venc.
        </span>
        <span>Valor</span>
        <span>Status</span>
        <span id='table-content-description'>Descrição</span>
        <span id='image-charge-table-detail'></span>
        <span id='image-charge-table-detail'></span>
      </div>
      {localAllCharges.map(charge => (
        <div className='table-content-detail-charge font-nunito-regular-14'>
          <>
            <span>{idFormat(charge.id)}</span>
            <span>{dateFormat(charge.expiration)}</span>
            <span>{amountFormat(charge.amount)}</span>
            <div id='deficit'>
              <span>Vencida</span>
            </div>
            <span id='table-content-description'>{charge.description}</span>
            <span id='image-charge-table-detail'
              onClick={() => modalEditCharge()}
            >
              <img
                src={IconEditChargeGrey}
                alt='charge icon'
              />Editar
            </span>
            <span id='image-charge-table-detail'
              onClick={() => setOpenaModalDelteCharge(true)}
            >
              <img
                src={IconTrashCharge}
                alt='charge icon'
              />Excluir
            </span>
          </>
        </div>
      ))}
    </div>
  );
}

export default TableChargesDetail;
