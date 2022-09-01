import { Skeleton } from '@mui/material';
import { useState } from 'react';
import ArrowIcon from '../../assets/icon-arrowdown-green.svg';
import ContextMain from '../../hook/ContextHook';
import { amountFormat, dateFormat, idFormat, maxLengthString } from '../../utils/formatter';
import './styles.css';

const DetailChargeClient = ({
  IconPlusWhite, sortedChargesCod, sortedChargesDate,
  IconArrowDownUp, allCharges, idClient, setTitleModalCharge,
  IconEditChargeGrey, IconTrashCharge, setCharge, loadCharges
}) => {

  const [openEditAndDeleteCharges, setOpenEditAndDeleteCharges] = useState(false);
  const colorType = '#f2f2f2';
  const heithType = 24;
  const widhType = 140;

  const {
    setOpenModalRegisterCharge, setOpenaModalDelteCharge,
    setTypeAction, setCurrentCharge, setOpenModalChargeDetails
  } = ContextMain();

  const [openPopup, setOpenPopup] = useState({
    popupId: '',
    show: false
  });

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

  function deleteCharge(chargeClient) {
    setOpenaModalDelteCharge(true);
    setCharge(chargeClient);
    setOpenPopup({
      popupId: '',
      show: false
    });
    setOpenEditAndDeleteCharges(false);
  }

  function handleEditCharge(item) {
    setCurrentCharge(item);
    setTypeAction('edit');
    setTitleModalCharge('Editar cobrança');
    setOpenModalRegisterCharge(true);
    setOpenPopup({
      popupId: '',
      show: false
    });
    setOpenEditAndDeleteCharges(false);
  }

  function handleRegisterCharge() {

    setTypeAction('register');
    setTitleModalCharge('Cadastrar cobrança');
    setOpenModalRegisterCharge(true);
  }

  function openaMiniBox(charges) {
    const idCharge = allCharges.filter((charge) => {
      return charge.id === charges
    });
    setOpenPopup({
      popupId: idCharge[0].id,
      show: !openPopup.show
    });
  }

  const handleChargerDetails = (charge) => {
    setCurrentCharge(charge)
    setOpenModalChargeDetails(true);
  }

  return (
    <div className='container-table-charge-detail'>
      <div className='table-head-charge-detail'>
        <h3 className='font-mont-serrat-bold-24'>Cobranças do cliente</h3>
        <button
          className='btn-confirm high-midle-btn flex-button-charge font-nunito-regular-18-weight-400'
          onClick={() => handleRegisterCharge()}
        >
          <img src={IconPlusWhite} alt='pen green' />
          Nova cobrança
        </button>
      </div>
      <div className='table-head-detail-charge font-nunito-bold-16'>
        <span className='arrow-down-up-id' onClick={sortedChargesCod}>
          <img src={IconArrowDownUp} alt='icon arrow down and up' />
          ID Cob.
        </span>
        <span className='arrow-down-up-expired text-overflow' onClick={sortedChargesDate}>
          <img src={IconArrowDownUp} alt='icon arrow down and up' />
          Data de venc.
        </span>
        <span className='widt-14'>Valor</span>
        <span className='widt-14'>Status</span>
        <span id='table-content-description'>Descrição</span>
        <span id='image-charge-table-detail' className='mr-24'></span>
        <span id='image-charge-table-detail'></span>
      </div>
      {allCharges.map((item) =>
        item.customer_id === parseInt(idClient) ?
          (
            <div key={item.id} className='table-content-detail-charge font-nunito-regular-14'>
              {
                loadCharges ?
                  (
                    <Skeleton
                      sx={{ bgcolor: colorType }}
                      width={widhType}
                      height={heithType} />
                  ) : (
                    <span
                      onClick={() => handleChargerDetails(item)}
                      className='widt-12  c-pointer'>{idFormat(item.id)}</span>
                  )
              }
              {
                loadCharges ?
                  (
                    <Skeleton
                      sx={{ bgcolor: colorType }}
                      width={widhType}
                      height={heithType} />
                  ) : (
                    <span
                      className='d-none'>{dateFormat(item.expiration)}</span>
                  )
              }

              {
                loadCharges ?
                  (
                    <Skeleton
                      sx={{ bgcolor: colorType }}
                      width={widhType}
                      height={heithType} />
                  ) : (
                    <span
                      onClick={() => handleChargerDetails(item)}
                      className='widt-14 c-pointer'>{amountFormat(item.amount)}</span>
                  )
              }

              {
                loadCharges ?
                  (
                    <Skeleton
                      sx={{ bgcolor: colorType }}
                      width={widhType}
                      height={heithType} />
                  ) : (
                    <div className='charge-status  c-pointer'>
                      <span
                        onClick={() => handleChargerDetails(item)}
                        className={handleChargeStatus(item.status, item.expiration)}>
                        {handleChargeStatus(item.status, item.expiration)}
                      </span>
                    </div>
                  )
              }

              {
                loadCharges ?
                  (
                    <Skeleton
                      sx={{ bgcolor: colorType }}
                      width='35%'
                      height={heithType} />
                  ) : (
                    <span id='table-content-description'>{maxLengthString(item.description)}</span>
                  )
              }

              {
                loadCharges ?
                  (
                    <Skeleton
                      sx={{ bgcolor: colorType }}
                      width={40}
                      height={heithType} />
                  ) : (
                    <span id='image-charge-table-detail' className='color-gray mr-24'
                      onClick={() => handleEditCharge(item)}
                    >
                      <img
                        src={IconEditChargeGrey}
                        alt='charge icon'
                      />Editar
                    </span>
                  )
              }

              {
                loadCharges ?
                  (
                    <Skeleton
                      sx={{ bgcolor: colorType }}
                      width={40}
                      height={heithType} />
                  ) : (
                    <span id='image-charge-table-detail' className='color-dark-red'
                      onClick={() => deleteCharge(item)}
                    >
                      <img
                        src={IconTrashCharge}
                        alt='charge icon'
                      />Excluir
                    </span>
                  )
              }

              <div
                className="settings-charge-detail"
                onClick={() => openaMiniBox(item.id)}>
                <img
                  className={
                    (openPopup.popupId == item.id && openPopup.show) ? 'arrow-rotate settings-btn' : 'settings-btn'}
                  src={ArrowIcon} alt="arrow icon" />
              </div>
              {
                (openPopup.popupId == item.id && openPopup.show) &&
                <div className="actions-box animation-in-scale">
                  <div className="square"></div>
                  <div className="item-actions">
                    <div className='action action-edit' onClick={() => handleEditCharge(item)}>
                      <img
                        src={IconEditChargeGrey}
                        alt='charge icon'
                      />
                    </div>
                    <div className='action action-logout'>
                      <img
                        src={IconTrashCharge}
                        alt='charge icon'
                        onClick={() => deleteCharge(item)}
                      />
                    </div>
                  </div>
                </div>
              }
            </div>
          ) : ''
      )}
    </div>
  );
}

export default DetailChargeClient;
