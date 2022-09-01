import { Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IconArrowDownUp from '../../assets/icon-arrow-down-up.svg';
import IconCliente from '../../assets/icon-client-black.svg';
import IconEditClient from '../../assets/icon-edit-green.svg';
import IconEditChargeGrey from '../../assets/icon-edit-user.svg';
import IconPlusWhite from '../../assets/icon-plus-white.svg';
import IconTrashCharge from '../../assets/icon-trash-red.svg';
import AlertMessage from '../../components/AlertMessage';
import ChargeDetails from '../../components/ChargeDetails';
import DelteCharge from '../../components/DeleteCharge';
import DetailChargeClient from '../../components/DetailChargeClient';
import DetailClient from '../../components/DetailClient';
import Header from '../../components/Header';
import RegisterCharge from '../../components/RegisterCharge';
import RegisterClient from '../../components/RegisterClient';
import SideBar from '../../components/SideBar';
import ContextMain from '../../hook/ContextHook';
import './styles.css';

const ClientsDetail = () => {
  const { id } = useParams();
  const {
    openModalRegisterClient, setOpenModalRegisterClient,
    openModalRegisterCharge, opeanModalDelteCharge, setOpenaModalDelteCharge, api,
    clientCurrent, responseSuccessDeleteCharge, setResponseSuccessDeleteCharge,
    headers, setClientCurrent, setOpen, setLoading, responseSuccessRegisterCharge,
    setResponseSuccessRegisterCharge, responseSuccessEditCharge, setResponseSuccessEditCharge,
    refresh, responseSuccessEditClient, setResponseSuccessEditClient, openModalChargeDetails,
    backGroundDeleteCharge, setBackGroundDeleteCharge, colorDeleteCharge, setColorDeleteCharge,
    allCharges, setAllCharges, sorted, setSorted, messageDeleteCharge, setMessageDeleteCharge
  } = ContextMain();

  const [charge, setCharge] = useState({});
  const [titleModalCharge, setTitleModalCharge] = useState('');
  const [load, setLoad] = useState(false);
  const [loadCharges, setLoadCharges] = useState(false);

  const localAllCharges = [...allCharges];
  async function detailClient() {
    try {
      setLoad(true)
      const response = await api.get(`/detalhar-cliente/${parseInt(id)}`, headers);
      setClientCurrent({
        ...response.data, telephone: response.data.telephone.replace(/(\d{2})(\d{1})(\d{4})/g, '($1) $2 $3-'),
        cpf: response.data.cpf.replace(/(\d{3})(\d{3})(\d{3})/g, '$1.$2.$3-')
      });
      setLoad(false)
    } catch (error) {
      setLoad(false)
      return console.log(error.response)
    }
  }

  const getCharges = async () => {
    try {
      setLoadCharges(true)
      const response = await api.get('/cobrancas', headers)
      setLoading(false);
      if (response.status > 204) {
        return;
      }
      setAllCharges([...response.data]);
      setLoadCharges(false)
    } catch (error) {
      setLoadCharges(false)
      if (error.response.status > 204) {
        return;
      }
      return;
    }
  }

  const sortedChargesCod = () => {
    if (!sorted) {
      const sortedAscend = localAllCharges.sort((a, b) => {
        return a.id - b.id;
      });
      setAllCharges(sortedAscend);
      setSorted(true);
    }
    if (sorted) {
      const sortedDesc = localAllCharges.sort((b, a) => {
        return a.id - b.id;
      });
      setAllCharges(sortedDesc);
      setSorted(false);
    }
  }

  const sortedChargesDate = () => {
    if (!sorted) {
      const sortedAscend = localAllCharges.sort((a, b) => {
        return +(new Date(a.expiration)) - +(new Date(b.expiration));
      });
      setAllCharges(sortedAscend);
      setSorted(true);
    }
    if (sorted) {
      const sortedDesc = localAllCharges.sort((b, a) => {
        return +(new Date(a.expiration)) - +(new Date(b.expiration));
      });
      setAllCharges(sortedDesc);
      setSorted(false);
    }
  }

  useEffect(() => {
    detailClient();
    getCharges();
    return (() => {
      setClientCurrent([]);
    })
  }, [refresh]);

  return (
    <div className="container">

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
      {
        responseSuccessEditClient &&
        <AlertMessage
          open={responseSuccessEditClient}
          setOpen={setResponseSuccessEditClient}
          titleMessage='Edições do cadastro concluídas com sucesso'
        />
      }
      {
        opeanModalDelteCharge &&
        <DelteCharge
          setOpen={setOpen}
          getCharges={getCharges}
          charge={charge}
          setColorDeleteCharge={setColorDeleteCharge}
          setBackGroundDeleteCharge={setBackGroundDeleteCharge}
          setMessageDeleteCharge={setMessageDeleteCharge}
          setOpenaModalDelteCharge={setOpenaModalDelteCharge}
        />
      }
      {
        openModalRegisterClient &&
        <RegisterClient
          title='Editar Cliente'
          detailClient={detailClient}
          setOpenModalRegisterClient={setOpenModalRegisterClient}
        />
      }
      {
        openModalRegisterCharge &&
        <RegisterCharge
          title={titleModalCharge}
        />
      }
      {
        openModalChargeDetails &&
        <ChargeDetails />
      }

      <div className='side-bar-home'>
        <SideBar />
      </div>
      <div className='container-home-right'>
        <div></div>
        <div className='header'>
          <Header
            load={load}
            subtitle='Clientes'
            subtitleDetail={clientCurrent.name}
            arrowRight='>'
            detail={' Detalhes do cliente'}
          />
        </div>
        <div className='container-content-home'>
          <div className='header-container-content'>
            <div className='header-container-content-left'>
              {
                load ?
                  (
                    <Skeleton sx={{ bgcolor: '#f2f2f2', marginRight: 1 }}
                      animation="wave" width={32}
                      height={32}
                      variant="circular" />
                  ) : (
                    <img src={IconCliente} alt='icon person minimalist' />
                  )
              }

              {
                load ?
                  (
                    <Skeleton sx={{ bgcolor: '#F8F8F9', borderRadius: 1.5 }}
                      animation="wave"
                      width={250}
                      height={30}
                      variant='h1'
                      component="h1" />
                  ) : (
                    <h3 className='font-mont-serrat-semi-bold-26'>{clientCurrent.name}</h3>
                  )
              }
            </div>
          </div>
          <DetailClient
            load={load}
            setOpenModalRegisterClient={setOpenModalRegisterClient}
            imageEditClient={IconEditClient}
            clientCurrent={clientCurrent}
          />
          <DetailChargeClient
            idClient={id}
            loadCharges={loadCharges}
            setTitleModalCharge={setTitleModalCharge}
            setCharge={setCharge}
            IconPlusWhite={IconPlusWhite}
            sortedChargesCod={sortedChargesCod}
            sortedChargesDate={sortedChargesDate}
            IconArrowDownUp={IconArrowDownUp}
            allCharges={allCharges}
            IconEditChargeGrey={IconEditChargeGrey}
            IconTrashCharge={IconTrashCharge}
          />
        </div>
      </div>
      {
        responseSuccessRegisterCharge &&
        <AlertMessage
          open={responseSuccessRegisterCharge}
          setOpen={setResponseSuccessRegisterCharge}
          titleMessage='Cobrança cadastrada com sucesso'
        />
      }
      {
        responseSuccessEditCharge &&
        <AlertMessage
          open={responseSuccessEditCharge}
          setOpen={setResponseSuccessEditCharge}
          titleMessage='Cobrança editada com sucesso!'
        />
      }
    </div>
  );
}

export default ClientsDetail;