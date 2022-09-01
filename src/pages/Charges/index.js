import { useEffect, useState } from 'react';
import IconCharge from '../../assets/icon-charge-sidebar.svg';
import IconMagnifier from '../../assets/icon-magnifier.svg';
import AlertMessage from '../../components/AlertMessage';
import ChargeDetails from '../../components/ChargeDetails';
import Header from '../../components/Header';
import ImageErrorSearch from '../../components/ImageErrorSearch';
import RegisterCharge from '../../components/RegisterCharge';
import SideBar from '../../components/SideBar';
import TableCharges from '../../components/TableCharges';
import ContextMain from '../../hook/ContextHook';
import useQuery from '../../hook/useQuery';
import api from '../../services/api';
import { getItem } from '../../utils/storage';
import './styles.css';

const Charges = () => {
  const query = useQuery();
  const token = getItem('token');
  const {
    responseSuccessEditCharge, setResponseSuccessEditCharge,
    openModalChargeDetails, setAllCharges, headers,
    openModalRegisterCharge, allCharges, refresh,
  } = ContextMain();

  const [search, setSearch] = useState({
    nameAndIdClient: ''
  });
  const [searchSuccessfull, setSearchSuccessfull] = useState(true);
  const [load, setLoad] = useState();
  const parameterValuesStatusOverdue = ['vencida', 'vencidas', 'vencido', 'vencidos', 'overdue'];
  const parameterValuesStatusPaid = ['paga', 'pagas', 'paid'];
  const parameterValuesStatusPending = ['pendente', 'pendentes', 'pending'];

  const getCharges = async () => {
    setLoad(true);
    try {
      const response = await api.get('/cobrancas', {
        headers: { authorization: `Bearer ${token}` }
      });
      if (response.status > 204) {
        return;
      }
      if (parameterValuesStatusOverdue.includes(query.get('status'))) {
        const localChargesOverdue = response.data.filter((charge) => { return charge.status === 'vencida' });
        setAllCharges([...localChargesOverdue]);
        setLoad(false);
        return;
      }
      if (parameterValuesStatusPaid.includes(query.get('status'))) {
        const localChargesPaid = response.data.filter((charge) => { return charge.status === 'paga' });
        setAllCharges([...localChargesPaid]);
        setLoad(false);
        return;
      }
      if (parameterValuesStatusPending.includes(query.get('status'))) {
        const localChargesPending = response.data.filter((charge) => { return charge.status === 'pendente' });
        setAllCharges([...localChargesPending]);
        setLoad(false);
        return;
      }
      setAllCharges([...response.data]);
      setLoad(false);
    } catch (error) {
      setLoad(false)
      if (error.response.status > 204) {
        return;
      }
      return;
    }
  }

  function handleChangeInput(e) {
    setSearch({ ...search, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (search.nameAndIdClient === '') {
      setSearchSuccessfull(true);
      getCharges();
      return
    }
    try {
      if (isNaN(search.nameAndIdClient)) {
        const response = await api.get(`/pesquisa-cobranca?name=${search.nameAndIdClient}`, headers);
        setSearchSuccessfull(true);
        setAllCharges([...response.data]);
        setSearch({ ...search, nameAndIdClient: '' });
      }

      if (!isNaN(search.nameAndIdClient)) {
        const response = await api.get(`/pesquisa-cobranca?id=${parseInt(search.nameAndIdClient)}`, headers);
        setSearchSuccessfull(true);
        setAllCharges([...response.data]);
        setSearch({ ...search, nameAndIdClient: '' });
      }
    } catch (error) {
      setSearch({ ...search, nameAndIdClient: '' });
      setSearchSuccessfull(false);
      return;
    }
  }

  const loadData = async () => {
    await getCharges();
  }

  useEffect(() => {
    loadData();
    return (() => {
      setAllCharges([]);
    })
  }, [refresh, query]);
  return (
    <div className="container-charge">
      <div className='side-bar-home'>
        <SideBar />
      </div>

      <div className='container-right-charge'>
        <div></div>
        <div className='header'>
          <Header
            subtitle='Cobranças'
          />
        </div>
        <div className='container-content-charge'>
          <div className='header-container-content-charge'>
            <div className='header-container-content-left-charge'>
              <img className='iconCharge' src={IconCharge} alt='icon person minimalist' />
              <h3 className='font-mont-serrat-semi-bold-26'>Cobranças</h3>
            </div>
            <div className='header-container-content-right-charge'>
              <form className='search-charge' onSubmit={handleSubmit}>
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
              <TableCharges
                load={load}
                allCharges={allCharges}
                getCharges={getCharges}
              />
          }
          {
            openModalRegisterCharge &&
            <RegisterCharge
              title='Editar Cobrança'
            />
          }
          {
            openModalChargeDetails &&
            <ChargeDetails />
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
      </div>
    </div >
  );
}

export default Charges;
