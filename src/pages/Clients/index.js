import { useEffect, useState } from 'react';
import IconChecked from '../../assets/icon-checked-green.svg';
import IconCliente from '../../assets/icon-client-black.svg';
import IconMagnifier from '../../assets/icon-magnifier.svg';
import IconPlusWhite from '../../assets/icon-plus-white.svg';
import IconUnChecked from '../../assets/icon-unchecked.svg';
import IconPolygonUp from '../../assets/polygon-up.svg';
import AlertMessage from '../../components/AlertMessage';
import CardFilterStatusCharge from '../../components/CardFilterStatusCharge';
import Header from '../../components/Header';
import ImageErrorSearch from '../../components/ImageErrorSearch';
import InactiveSection from '../../components/InactiveSection';
import MessageBoxInvaldToken from '../../components/InvalidToken';
import RegisterCharge from '../../components/RegisterCharge';
import RegisterClient from '../../components/RegisterClient';
import SideBar from '../../components/SideBar';
import TableClients from '../../components/Tableclients';
import ContextMain from '../../hook/ContextHook';
import useQuery from '../../hook/useQuery';
import { getItem } from '../../utils/storage';
import './styles.css';

const Clients = () => {
  const query = useQuery();
  const token = getItem('token');
  const {
    openModalRegisterClient, setOpenModalRegisterClient,
    openModalRegisterCharge, setOpenModalRegisterCharge,
    openModalFilterCharge, setOpenModalFilterCharge, api, headers,
    responseSuccessRegisterClient, setResponseSuccessRegisterClient,
    responseSuccessRegisterCharge, setResponseSuccessRegisterCharge,
    allClients, setAllClients, invalidToken, setLoading
  } = ContextMain();

  const [openInactive, setOpenInactive] = useState(false);
  const [searchSuccessfull, setSearchSuccessfull] = useState(true);
  const [load, setLoad] = useState(false);
  const [search, setSearch] = useState({
    nameAndIdClient: ''
  });
  const parameterValuesStatusDefaulter = ['inadimplente', 'inadimplentes', 'defaulter'];
  const parameterValuesStatusInDay = ['em-dia', 'em-dias', 'in-day'];

  const inactivityTime = function () {
    let time;

    window.onload = resetTimer;
    document.onmousemove = resetTimer;
    document.onkeydown = resetTimer;

    function doSomething() {
      setOpenInactive(true);
    }

    function resetTimer() {
      clearTimeout(time);
      time = setTimeout(doSomething, 720000);
    }
  };

  async function listClients() {
    try {
      setLoad(true);
      const response = await api.get('/listar-cliente', headers);
      setAllClients([...response.data]);
      if (query.toString()) {
        await getCustomersByStatus();
      }
      setLoad(false);
    } catch (error) {
      setLoad(false);
      return console.log(error.response)
    }
  }

  function handleChangeInput(e) {
    setSearch({ ...search, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (search.nameAndIdClient === '') {
      setSearchSuccessfull(true);
      listClients();
      return;
    }
    try {
      if (isNaN(search.nameAndIdClient)) {
        const response = await api.get(`/pesquisa-clientes?name=${search.nameAndIdClient}`, headers);
        setSearchSuccessfull(true);
        setAllClients([...response.data]);
        setSearch({ ...search, nameAndIdClient: '' });
        if (!response.data.length) {
          if (isNaN(search.nameAndIdClient)) {
            const response = await api.get(`/pesquisa-clientes?email=${search.nameAndIdClient}`, headers);
            if (!response.data.length) {
              setSearchSuccessfull(false);
              return;
            }
            setSearchSuccessfull(true);
            setAllClients([...response.data]);
            setSearch({ ...search, nameAndIdClient: '' });
          }
        }
      }
      if (!isNaN(search.nameAndIdClient)) {
        const response = await api.get(`/pesquisa-clientes?cpf=${search.nameAndIdClient}`, headers);
        setSearchSuccessfull(true);
        setAllClients([...response.data]);
        setSearch({ ...search, nameAndIdClient: '' });
        if (!response.data.length) {
          setSearchSuccessfull(false);
          return;
        }
      }
    } catch (error) {
      setSearch({ ...search, nameAndIdClient: '' });
      setSearchSuccessfull(false);
      return;
    }
  }

  const getCustomersByStatus = async () => {
    try {
      const response = await api.get('/clientes-status', {
        headers: { authorization: `Bearer ${token}` }
      });
      if (response.status > 204) {
        return;
      }
      if (parameterValuesStatusDefaulter.includes(query.get('status'))) {
        setAllClients([...response.data.inadimplentes]);
      }
      if (parameterValuesStatusInDay.includes(query.get('status'))) {
        setAllClients([...response.data.emDia]);
      }
    } catch (error) {
      setLoading(false);
      return;
    }
  }

  useEffect(() => {
    listClients();
    inactivityTime();
    return (() => {
      setOpenModalFilterCharge(false);
      setOpenModalRegisterClient(false);
      setOpenModalRegisterCharge(false);
    });
  }, [query]);

  return (
    <div className="container">
      {openInactive &&
        <InactiveSection
          openInactive={openInactive}
          setOpenInactive={setOpenInactive}
        />
      }

      {
        invalidToken &&
        <MessageBoxInvaldToken />
      }
      {
        responseSuccessRegisterClient &&
        <AlertMessage
          open={responseSuccessRegisterClient}
          setOpen={setResponseSuccessRegisterClient}
          titleMessage='Cadastro concluído com sucesso'
        />
      }

      {
        openModalRegisterClient &&
        <RegisterClient
          token={token}
          listClients={listClients}
          title='Cadastro de Cliente'
          setOpenModalRegisterClient={setOpenModalRegisterClient}
        />
      }
      {
        openModalRegisterCharge &&
        <RegisterCharge
          listClients={listClients}
          title='Cadastrar Cobrança'
          typeAction='register'
        />
      }
      <div className='side-bar-home'>
        <SideBar />
      </div>

      <div className='container-home-right'>
        <div></div>
        <div className='header'>
          <Header
            subtitle='Clientes'
          />
        </div>

        <div className='container-content-home'>
          <div className='header-container-content'>
            <div className='header-container-content-left'>
              <img src={IconCliente} alt='icon person minimalist' />
              <h3 className='font-mont-serrat-semi-bold-26'>Clientes</h3>
            </div>
            <div className='header-container-content-right'>
              {
                openModalFilterCharge &&
                <div className='filter-charge filter-active'>
                  <CardFilterStatusCharge
                    IconPolygonUp={IconPolygonUp}
                    IconChecked={IconChecked}
                    IconUnChecked={IconUnChecked}
                    setOpenModalFilterCharge={setOpenModalFilterCharge}
                  />
                </div>
              }
              <button className='high-btn btn-confirm'
                onClick={() => setOpenModalRegisterClient(true)}
              >
                <img src={IconPlusWhite} alt='icon plus' />
                Adicionar Cliente
              </button>
              <form className='search' onSubmit={handleSubmit}>
                <input
                  name='nameAndIdClient'
                  className='inputs font-nunito-regular-18-weight-400'
                  placeholder='Pesquisa'
                  value={search.nameAndIdClient}
                  onChange={handleChangeInput}
                />
                <button>
                  <img src={IconMagnifier} alt='magnifier-search' />
                </button>
              </form>
            </div>
          </div>

          {
            !searchSuccessfull ?
              <ImageErrorSearch />
              :
              <TableClients
                load={load}
                allClients={allClients}
                setAllClients={setAllClients}
                listClients={listClients}
                setOpenModalRegisterCharge={setOpenModalRegisterCharge}
              />
          }
          {
            responseSuccessRegisterCharge &&
            <AlertMessage
              open={responseSuccessRegisterCharge}
              setOpen={setResponseSuccessRegisterCharge}
              titleMessage='Cobrança cadastrada com sucesso'
            />
          }
        </div >
      </div >
    </div >
  );
}

export default Clients;
