import { useState } from 'react';
import './styles.css';

const CardFilterStatusCharge = ({ setOpenModalFilterCharge, IconPolygonUp, IconChecked, IconUnChecked }) => {
  const [checkedFilter, setCheckedFilter] = useState({
    checked1: false,
    checked2: false,
  });

  function CloseModalFilterCharge() {
    setCheckedFilter({
      ...checkedFilter,
      checked1: false,
      checked2: false,
    });
    setOpenModalFilterCharge(false);
  }

  return (
    <div className="container-filter-status-charge">
      <img className='polygon-icon' src={IconPolygonUp} alt='format polygon' />
      <label>Status</label>
      <div className='charge-pending-filter font-nunito-regular-14'>
        <img
          className='image-checked'
          src={checkedFilter.checked1 ? IconChecked : IconUnChecked}
          alt='icon-checked'
          onClick={() => setCheckedFilter({ ...checkedFilter, checked1: !checkedFilter.checked1 })}
        />
        <span>Inadimplentes</span>
      </div>
      <div className='charge-unsuccessful font-nunito-regular-14'>
        <img
          className='image-checked'
          src={checkedFilter.checked2 ? IconChecked : IconUnChecked}
          alt='icon-checked'
          onClick={() => setCheckedFilter({ ...checkedFilter, checked2: !checkedFilter.checked2 })}
        />
        <span>Em Dia</span>
      </div>
      <label>Data</label>
      <input
        type='date'
        className='filter-charge-date inputs'
      />
      <div className='form-register-btn-filter-charge'>
        <button type='submit' className='btn-confirm'>Aplicar</button>
        <button
          type='button'
          className='btn-cancel'
          onClick={() => CloseModalFilterCharge()}
        >Cancelar</button>
      </div>
    </div>
  );
}

export default CardFilterStatusCharge;
