import { NavLink } from 'react-router-dom';
import IconClientDefaulter from '../../assets/icon-client-defaulter.svg';
import { formatCurrentCpf, idFormat } from '../../utils/formatter';
import './styles.css';

const DefaulterClientCard = ({ customersDefaulter }) => {

  return (
    <div className="card-medium">
      <div className="card-header">
        <div className='card-header-left'>
          <img src={IconClientDefaulter} alt="icon client defaulter" />
          <h4>Clientes Inadimplentes</h4>
        </div>
        <div className="card-total-items bg-light-pink color-dark-red">
          <span>{String(customersDefaulter.length).padStart(2, '0')}</span>
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
          {customersDefaulter.map((data, index) => (
            index < 4 ?
              <div className="table-row" key={data.id}>
                <span className='item item--name'>{data.name}</span>
                <span className='item item--id'>{idFormat(data.id)}</span>
                <span className='item item--cpf'>{formatCurrentCpf(data.cpf)}</span>
              </div>
              : ''
          ))}
        </div>
      </div>

      <div className="card-footer">
        {customersDefaulter.length >= 4 &&
          <NavLink to='/clients?status=inadimplente'>Ver todos</NavLink>
        }
      </div>
    </div >
  );
}

export default DefaulterClientCard;
