import { Link, useNavigate } from 'react-router-dom';
import IconChargeTable from '../../assets/icon-add-charge.svg';
import IconArrowDownUp from '../../assets/icon-arrow-down-up.svg';
import ContextMain from '../../hook/ContextHook';
import IconchargeOnly from '../../assets/icon-add-charge-only.svg';
import { Skeleton } from '@mui/material';
import { useEffect } from 'react';
import './styles.css';

const TableClients = ({ listClients, load, allClients, setAllClients }) => {
  const navigate = useNavigate();
  const {
    openModalRegisterCharge, api,
    setOpenModalRegisterCharge,
    setClientCurrent, setTypeAction,
    sorted, setSorted, headers,
    allCharges, setAllCharges
  } = ContextMain();

  const colorType = '#f2f2f2';
  const heithType = 24;
  const widhType = 100;

  const localAllClients = [...allClients];
  const localAllCharges = [...allCharges];

  function detailClient(client) {
    navigate(`/clients/detail/${client.id}`);
  };

  const getChargesInTableClients = async () => {
    try {
      const response = await api.get('/cobrancas', headers)
      if (response.status > 204) {
        return;
      }
      setAllCharges([...response.data]);
    } catch (error) {
      return;
    }
  }

  function verifyChargeInDay(id) {
    const dateNow = new Date();
    const result = [...localAllCharges].filter((charge) => {
      return charge.customer_id === id
    });
    for (let i = 0; i < result.length; i++) {
      if (result[i].status !== 'paga' && +new Date(result[i].expiration) < +dateNow) {
        return 'Inadimplente';
      }
    }
    return 'Em dia';
  }

  const handleRegisterCharge = (item) => {
    setTypeAction('register');
    setClientCurrent(item);
    setOpenModalRegisterCharge(true);
  }

  useEffect(() => {
    getChargesInTableClients();
  }, [openModalRegisterCharge]);

  const sortedClients = () => {
    if (!sorted) {
      const sortedAscend = localAllClients.sort((a, b) => {
        let x = a.name, y = b.name
        return x == b ? 0 : x > y ? 1 : -1
      });
      setAllClients(sortedAscend);
      setSorted(true);
    }
    if (sorted) {
      const sortedDesc = localAllClients.sort((a, b) => {
        let x = a.name, y = b.name
        return x == b ? 0 : x < y ? 1 : -1
      });
      setAllClients(sortedDesc);
      setSorted(false);
    }
  }

  return (
    <div className='container-table-clients'>
      <div className='table-head font-nunito-bold-16'>
        <span
          onClick={() => sortedClients()}
        >
          <img src={IconArrowDownUp} alt='icon arrow down and up' />
          Cliente
        </span>
        <span>CPF</span>
        <span id='table-email'>E-mail</span>
        <span>Telefone</span>
        <span>Status</span>
        <span id='image-charge-table'>Criar Cobrança</span>
      </div>
      <div className='body-table'>
        {localAllClients.map((item) => (
          <div className='table-content font-nunito-regular-14' key={item.id}>
            {
              load ?
                (
                  <Skeleton
                    sx={{ bgcolor: colorType }}
                    width={widhType}
                    height={heithType} />
                ) : (
                  <span
                    onClick={() => detailClient(item)}>{item.name}</span>
                )
            }
            {
              load ?
                (
                  <Skeleton
                    sx={{ bgcolor: colorType }}
                    width={widhType}
                    height={heithType} />
                ) : (
                  <span
                    onClick={() => detailClient(item)}>{item.cpf.replace(/(\d{3})(\d{3})(\d{3})/g, '$1.$2.$3-')}</span>
                )
            }
            {
              load ?
                (
                  <Skeleton
                    sx={{ bgcolor: colorType }}
                    width={widhType}
                    height={heithType} />
                ) : (
                  <span id='table-email'
                    onClick={() => detailClient(item)}>{item.email}</span>
                )
            }
            {
              load ?
                (
                  <Skeleton
                    sx={{ bgcolor: colorType }}
                    width={widhType}
                    height={heithType} />
                ) : (
                  <span
                    onClick={() => detailClient(item)}>{item.telephone.replace(/(\d{2})(\d{1})(\d{4})/g, '($1) $2 $3-')}</span>
                )
            }
            {
              load ?
                (
                  <Skeleton
                    sx={{ bgcolor: colorType }}
                    width={widhType}
                    height={heithType} />
                ) : (
                  <div className={verifyChargeInDay(item.id) === 'Inadimplente' ? 'inadimplente' : 'emdia'} onClick={() => detailClient(item)}>
                    <span>{verifyChargeInDay(item.id)}</span>
                  </div>
                )
            }
            <span id='image-charge-table-hidden'>
              <img
                src={IconChargeTable}
                alt='charge icon'
                onClick={() => handleRegisterCharge(item)}
              />
            </span>
            <span id='image-charge-table-hidden-icon-olny'>
              <img
                src={IconchargeOnly}
                alt='charge icon'
                onClick={() => handleRegisterCharge(item)}
              />
            </span>
            <span id='image-charge-table'>
              <img
                src={IconChargeTable}
                alt='charge icon'
                onClick={() => handleRegisterCharge(item)}
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TableClients;
