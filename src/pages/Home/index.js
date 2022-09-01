import { Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import IconOverdueHome from '../../assets/icon-charge-overdue.svg';
import IconChargeHome from '../../assets/icon-charge-paid.svg';
import IconPreviewHome from '../../assets/icon-charge-preview.svg';
import ClientDefaulterCard from '../../components/ClientDefaulterCard';
import ClientInDayCard from '../../components/ClientInDayCard';
import CustomBackdrop from '../../components/CustomBackdrop';
import Header from '../../components/Header';
import OverdueCard from '../../components/OverdueCard';
import PaidCard from '../../components/PaidCard';
import PendingCard from '../../components/PendingCard';
import SideBar from '../../components/SideBar';
import ContextMain from '../../hook/ContextHook';
import api from '../../services/api';
import { amountFormat } from '../../utils/formatter';
import { getItem } from '../../utils/storage';
import './styles.css';

function Home() {
  const {
    loading, setLoading,
  } = ContextMain();

  const [resumeChargeValue, setResumeChargeValue] = useState({
    overdue: 0,
    forecast: 0,
    paid: 0
  });

  const colorType = '#f2f2f2';
  const heithType = 180;
  const widhType = 360;
  const bordeR = 10;
  const [charges, setCharges] = useState([]);
  const [customersInDay, setCustomersInDay] = useState([]);
  const [customersDefaulter, setCustomersDefaulter] = useState([]);
  const [load, setLoad] = useState(false);

  const token = getItem('token');

  const getCharges = async () => {
    try {
      const response = await api.get('/cobrancas', {
        headers: { authorization: `Bearer ${token}` }
      })
      if (response.status > 204) {
        return;
      }
      setCharges(response.data);
      resumeCharges(response.data);
    } catch (error) {
      setLoading(false);
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
      setCustomersInDay(response.data.emDia);
      setCustomersDefaulter(response.data.inadimplentes);
    } catch (error) {
      setLoading(false);
      return;
    }
  }

  const loadingData = async () => {
    setLoading(true);
    await getCharges();
    await getCustomersByStatus();
    setLoading(false)
  }

  const resumeCharges = (charges) => {
    const resume = {
      overdue: 0,
      forecast: 0,
      paid: 0
    }
    charges.forEach(element => {
      if (element.status === 'pendente') {
        resume.forecast += element.amount;
      }
      if (element.status === 'paga') {
        resume.paid += element.amount;
      }
      if (element.status === 'vencida') {
        resume.overdue += element.amount;
      }
    });
    setResumeChargeValue(resume);
  }

  useEffect(() => {
    loadingData();
  }, [])
  return (
    <div className="container-home">
      <CustomBackdrop open={loading} />
      <div className='side-bar-home'>
        <SideBar />
      </div>

      <div className='container-right'>
        <div className='header'>
          <Header
            title='Resumo das cobranças'
          />
        </div>
        <div className='home-body'>
          <div className="item-group--resume">
            {
              load ?
                (
                  <Skeleton
                    sx={{ bgcolor: colorType, borderRadius: bordeR }}
                    width={widhType}
                    height={heithType} />
                ) : (
                  <div className="summary-card bg-light-pink">
                    <img src={IconOverdueHome} alt="icon charge" />
                    <div className="card-info">
                      <span className='card-title'>Cobranças Vencidas</span>
                      <span className='card-value'>{amountFormat(resumeChargeValue.overdue)}</span>
                    </div>
                  </div>
                )
            }
            {
              load ?
                (
                  <Skeleton
                    sx={{ bgcolor: colorType, borderRadius: bordeR }}
                    width={widhType}
                    height={heithType} />
                ) : (
                  <div className="summary-card bg-light-orange">
                    <img src={IconPreviewHome} alt="icon charge" />
                    <div className="card-info">
                      <span className='card-title'>Cobranças Previstas</span>
                      <span className='card-value'>{amountFormat(resumeChargeValue.forecast)}</span>
                    </div>
                  </div>
                )
            }
            {
              load ?
                (
                  <Skeleton
                    sx={{ bgcolor: colorType, borderRadius: bordeR }}
                    width={widhType}
                    height={heithType} />
                ) : (
                  <div className="summary-card bg-light-blue">
                    <img src={IconChargeHome} alt="icon charge" />
                    <div className="card-info">
                      <span className='card-title'>Cobraças Pagas</span>
                      <span className='card-value'>{amountFormat(resumeChargeValue.paid)}</span>
                    </div>
                  </div>
                )
            }
          </div>

          <div className="item-group mt-24">
            <OverdueCard charges={charges} />
            <PendingCard charges={charges} />
            <PaidCard charges={charges} />
          </div>

          <div className="item-group mt-32">
            <ClientDefaulterCard
              customersDefaulter={customersDefaulter}
            />
            <ClientInDayCard
              customersInDay={customersInDay}
            />
          </div>
        </div>
      </div>
    </div>

  );
}

export default Home;
