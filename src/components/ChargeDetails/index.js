import IconCharge from '../../assets/icon-charge-sidebar.svg';
import IconClose from '../../assets/icon-close.svg';
import ContextMain from '../../hook/ContextHook';
import { amountFormat, dateFormat } from '../../utils/formatter';
import './styles.css';

const ChargeDetails = () => {
  const { setOpenModalChargeDetails, currentCharge, setCurrentCharge } = ContextMain();

  const handleClose = () => {
    setCurrentCharge({});
    setOpenModalChargeDetails(false);
  }

  const handleApplyBadgeType = () => {
    if (currentCharge.status == 'paga') {
      return 'card-charge-details__data badge badge--pay';
    }

    if (currentCharge.status == 'pendente') {
      return 'card-charge-details__data badge badge--pending';
    }

    if (currentCharge.status == 'vencida') {
      return 'card-charge-details__data badge badge--unsuccessful';
    }
    return;
  }

  const handleApplyDropShadow = () => {
    if (currentCharge.status == 'paga') {
      return ' drop-shadow--pay';
    }

    if (currentCharge.status == 'pendente') {
      return ' drop-shadow--pending';
    }

    if (currentCharge.status == 'vencida') {
      return ' drop-shadow--unsuccessful';
    }
    return;
  }

  return (
    <div className="modal-charge-details">
      <div className={'card-charge-details animation-in-scale' + handleApplyDropShadow()}>
        <div className="card-charge-details__close-icon" onClick={handleClose}>
          <img src={IconClose} alt=" icon close" />
        </div>
        <div className="card-charge-details__header flex-row">
          <img className='card-charge-details__icon' src={IconCharge} alt="icon charge" />
          <h2 className='card-charge-details__title'>Detalhes da cobrança</h2>
        </div>
        <div className="card-charge-details__body flex-column">
          <div className="card-charge-datails__group flex-column">
            <label className='card-charge-details__label'>Nome</label>
            <span className='card-charge-details__data'>{currentCharge.name}</span>
          </div>
          <div className="card-charge-details__group flex-column">
            <label className='card-charge-details__label'>Descrição</label>
            <span className='card-charge-details__data--description'>{currentCharge.description}</span>
          </div>
          <div className="card-charge-details__group--row">
            <div className="card-charge-details__group flex-column grow">
              <label className='card-charge-details__label'>Vencimento</label>
              <span className='card-charge-details__data'>{dateFormat(currentCharge.expiration)}</span>
            </div>
            <div className="card-charge-details__group flex-column grow">
              <label className='card-charge-details__label'>Valor</label>
              <span className='card-charge-details__data'>{amountFormat(currentCharge.amount)}</span>
            </div>
          </div>

          <div className="card-charge-details__group--row">
            <div className="card-charge-details__group flex-column grow">
              <label className='card-charge-details__label'>ID Cobrança</label>
              <span className='card-charge-details__data'>{currentCharge.id}</span>
            </div>
            <div className="card-charge-details__group flex-column grow">
              <label className='card-charge-details__label'>Status</label>
              <div>
                <span className={handleApplyBadgeType()}>{currentCharge.status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default ChargeDetails;
