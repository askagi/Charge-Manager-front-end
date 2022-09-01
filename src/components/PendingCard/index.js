import { NavLink } from 'react-router-dom';
import { amountFormat, idFormat } from '../../utils/formatter';
import './styles.css';

const PendingCard = ({ charges }) => {
  const filterCharge = charges.filter(item => item.status === 'pendente');
  const sliceCharge = filterCharge.reverse().slice(0, 4);
  return (
    <div className="card card-small">
      <div className="card-header">
        <h4>Cobranças Previstas</h4>
        <div className="card-total-items bg-light-orange color-dark-yellow">
          <span>{String(filterCharge.length).padStart(2, '0')}</span>
        </div>
      </div>
      <div className="card-table">
        <div className="card-table-head">
          <div className="card-title">
            <span>Cliente</span>
          </div>
          <div className="card-title">
            <span>ID da cob.</span>
          </div>
          <div className="card-title">
            <span>Valor</span>
          </div>
        </div>
        <div className="table-body">
          {sliceCharge.map(data => (
            <div className="table-row" key={data.id}>
              <span className='item'>{data.name}</span>
              <span className='item padding-left'>{idFormat(data.id)}</span>
              <span className='item'>{amountFormat(data.amount)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card-footer">
        {filterCharge.length > 3 ?
          <NavLink to='/charges?status=pendente'>Ver todos</NavLink>
          : ''
        }
      </div>
    </div>
  );
}

export default PendingCard;
