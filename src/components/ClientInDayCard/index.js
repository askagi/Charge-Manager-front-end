import { NavLink } from 'react-router-dom';
import IconClientOk from '../../assets/icon-client-ok.svg';
import { formatCurrentCpf, idFormat } from '../../utils/formatter';
import './styles.css';

const ClientInDayCard = ({ customersInDay }) => {
  return (
    <div className="card-medium">
      <div className="card-header">
        <div className='card-header-left'>
          <img src={IconClientOk} alt="icon client defaulter" />
          <h4>Clientes em dia</h4>
        </div>
        <div className="card-total-items bg-light-blue color-light-blue">
          <span>{String(customersInDay.length).padStart(2, '0')}</span>
        </div>
      </div>
      <div className="card-table">
        <div className="card-table-head">
          <div className="card-title card-title--name">
            <span>Clientes</span>
          </div>
          <div className="card-title card-title--id">
            <span>ID do Clie.</span>
          </div>
          <div className="card-title card-title--cpf">
            <span>CPF</span>
          </div>
        </div>
        <div className="table-body">
          {customersInDay.map((data, index) => (
            index < 4 &&
            <div className="table-row" key={data.id}>
              <span className='item item--name'>{data.name}</span>
              <span className='item item--id'>{idFormat(data.id)}</span>
              <span className='item item--cpf'>{formatCurrentCpf(data.cpf)}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="card-footer">
        {customersInDay.length >= 4 &&
          <NavLink to='/clients?status=em-dia'>Ver todos</NavLink>
        }
      </div>
    </div>
  );
}

export default ClientInDayCard;
