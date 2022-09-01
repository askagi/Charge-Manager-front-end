import { Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import IconArrowDownUp from '../../assets/icon-arrow-down-up.svg';
import IconEditChargeGrey from '../../assets/icon-edit-user.svg';
import IconTrashCharge from '../../assets/icon-trash-red.svg';
import DelteCharge from '../../components/DeleteCharge';
import ContextMain from '../../hook/ContextHook';
import { amountFormat, dateFormat, idFormat, maxLengthString } from '../../utils/formatter';
import AlertMessage from '../AlertMessage';
import './styles.css';

const TableCharges = ({ getCharges, load, allCharges }) => {
  const {
    setOpenModalChargeDetails, setAllCharges,
    refresh, setOpenModalRegisterCharge,
    setTypeAction, responseSuccessDeleteCharge,
    setResponseSuccessDeleteCharge, setCurrentCharge, setMessageDeleteCharge,
    setOpenaModalDelteCharge, setBackGroundDeleteCharge,
    sorted, setSorted, opeanModalDelteCharge, setColorDeleteCharge,
    messageDeleteCharge, colorDeleteCharge, backGroundDeleteCharge
  } = ContextMain();

  const colorType = '#f2f2f2';
  const heithType = 24;
  const widhType = 100;
  const marginT = 1.3;

  const [charge, setCharge] = useState({});

  const handleEditCharge = (item) => {
    setTypeAction('edit')
    setCurrentCharge(item);
    setOpenModalRegisterCharge(true);
  }

  function deleteCharge(chargeClient) {
    setOpenaModalDelteCharge(true);
    setCharge(chargeClient)
  }

  const sortedChargesName = () => {
    if (!sorted) {
      const sortedAscend = allCharges.sort((a, b) => {
        let x = a.name.toUpperCase(), y = b.name.toUpperCase()
        return x == b ? 0 : x > y ? 1 : -1
      });
      setAllCharges(sortedAscend);
      setSorted(true);
    }
    if (sorted) {
      const sortedDesc = allCharges.sort((b, a) => {
        return a.name.localeCompare(b.name);
      });
      setAllCharges(sortedDesc);
      setSorted(false);
    }
  }

  const sortedChargesCod = () => {
    if (!sorted) {
      const sortedAscend = allCharges.sort((a, b) => {
        return a.id - b.id;
      });
      setAllCharges(sortedAscend);
      setSorted(true);
    }
    if (sorted) {
      const sortedDesc = allCharges.sort((b, a) => {
        return a.id - b.id;
      });
      setAllCharges(sortedDesc);
      setSorted(false);
    }
  }

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

  const handleChargerDetails = (charge) => {
    setCurrentCharge(charge)
    setOpenModalChargeDetails(true);
  }

  useEffect(() => {

  }, [refresh])

  return (
    <div className='container-table-charges'>
      {
        responseSuccessDeleteCharge &&
        <AlertMessage
          open={responseSuccessDeleteCharge}
          setOpen={setResponseSuccessDeleteCharge}
          titleMessage={messageDeleteCharge}
          colorDeleteCharge={colorDeleteCharge}
          setColorDeleteCharge={setColorDeleteCharge}
          backGroundDeleteCharge={backGroundDeleteCharge}
          setBackGroundDeleteCharge={setBackGroundDeleteCharge}
        />
      }
      {opeanModalDelteCharge &&
        <DelteCharge
          getCharges={getCharges}
          charge={charge}
          setOpenaModalDelteCharge={setOpenaModalDelteCharge}
          setColorDeleteCharge={setColorDeleteCharge}
          setBackGroundDeleteCharge={setBackGroundDeleteCharge}
          setMessageDeleteCharge={setMessageDeleteCharge}
        />
      }

      <div className='table-head-charges font-nunito-bold-16'>
        <span className='item order-group'
          onClick={() => sortedChargesName()}
        >
          <img className='pointer' src={IconArrowDownUp} alt='icon arrow down and up' />
          Cliente
        </span>
        <span className='item order-group mobile-hidden' onClick={sortedChargesCod}>
          <img className='pointer' src={IconArrowDownUp} alt='icon arrow down and up' />
          ID. Cob.
        </span>
        <span className='item'>Valor</span>
        <span className='item mobile-hidden'>Data de venc.</span>
        <div className='div-center'>
          <span>Status</span>
        </div>
        <span className='description-item--spacing'>Descrição</span>
        <span></span>
      </div>
      <div className='body-table'>
        {allCharges.map((item) => (
          <div className='table-content-charges font-nunito-regular-14' key={item.id}>
            {
              load ?
                (
                  <Skeleton
                    sx={{ bgcolor: colorType, marginTop: marginT }}
                    width={widhType}
                    height={heithType} />
                ) : (
                  <span
                    onClick={() => handleChargerDetails(item)}
                    className='item'>{item.name}</span>
                )
            }
            {
              load ?
                (
                  <Skeleton
                    sx={{ bgcolor: colorType, marginTop: marginT }}
                    width={widhType}
                    height={heithType} />
                ) : (
                  <span
                    onClick={() => handleChargerDetails(item)}
                    className='item mobile-hidden'>{idFormat(item.id)}</span>
                )
            }
            {
              load ?
                (
                  <Skeleton
                    sx={{ bgcolor: colorType, marginTop: marginT }}
                    width={widhType}
                    height={heithType} />
                ) : (
                  <span
                    onClick={() => handleChargerDetails(item)}
                    className='item'>{amountFormat(item.amount)}</span>
                )
            }
            {
              load ?
                (
                  <Skeleton
                    sx={{ bgcolor: colorType, marginTop: marginT }}
                    width={widhType}
                    height={heithType} />
                ) : (
                  <span
                    onClick={() => handleChargerDetails(item)}
                    className='item mobile-hidden'>{dateFormat(item.expiration)}</span>
                )
            }
            {
              load ?
                (
                  <Skeleton
                    sx={{ bgcolor: colorType, marginTop: marginT }}
                    width={widhType}
                    height={heithType} />
                ) : (
                  <div onClick={() => handleChargerDetails(item)} className='div-center'>
                    <span
                      className={handleChargeStatus(item.status, item.expiration)}>
                      {handleChargeStatus(item.status, item.expiration)}
                    </span>
                  </div>
                )
            }
            {
              load ?
                (
                  <Skeleton
                    sx={{ bgcolor: colorType, marginTop: marginT }}
                    width='20%'
                    height={heithType} />
                ) : (
                  <span
                    onClick={() => handleChargerDetails(item)}
                    className='description-item mobile-hidden'> {maxLengthString(item.description)}</span>
                )
            }

            <div className="row-actions">
              <div className='actions-group'
                onClick={() => handleEditCharge(item)}
              >
                <img
                  src={IconEditChargeGrey}
                  alt='charge icon'
                />
                <span className='color-gray'>Editar</span>
              </div>
              <div className='actions-group'
                onClick={() => deleteCharge(item)}
              >
                <img
                  src={IconTrashCharge}
                  alt='charge icon'
                />
                <span className='color-dark-red'>Excluir</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div >
  );
}

export default TableCharges;
