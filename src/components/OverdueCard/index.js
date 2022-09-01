import { NavLink } from 'react-router-dom';
import ContextMain from '../../hook/ContextHook';
import { amountFormat, idFormat } from '../../utils/formatter';
import './styles.css';


const OverdueCard = ({ charges }) => {

  const filterCharge = charges.filter(item => item.status === 'vencida');
  const sliceCharge = filterCharge.reverse().slice(0, 4);

  return (
    <div className="card card-small">
      <div className="card-header">
        <h4>Cobranças Vencidas</h4>
        <div className="card-total-items bg-light-pink color-dark-red">
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
          {sliceCharge.map((data) =>
          (
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
          <NavLink to='/charges?status=vencida'>Ver todos</NavLink>
          : ''
        }
      </div>
    </div>
  );
}

export default OverdueCard;
