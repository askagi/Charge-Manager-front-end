import './styles.css';
import IconClose from '../../assets/icon-close.svg';
import AlerteDelteCharge from '../../assets/image-delete-charge.svg';
import ContextMain from '../../hook/ContextHook';

const DelteCharge = ({ setOpenaModalDelteCharge, charge, getCharges }) => {
  const {
    api, headers, setResponseSuccessDeleteCharge,
    setMessageDeleteCharge, setBackGroundDeleteCharge, setColorDeleteCharge
  } = ContextMain();

  async function deleteChargeClient() {

    try {
      setResponseSuccessDeleteCharge(false)
      const response = await api.delete(`/excluir-cobranca/${charge.id}`, headers);
      setMessageDeleteCharge(response.data);

      if (response.status < 400) {
        setTimeout(() => {
          setColorDeleteCharge('#243F80');
          setResponseSuccessDeleteCharge(true);
          setOpenaModalDelteCharge(false);
        }, 900);
        getCharges();
      }

    } catch (error) {
      if (error.response.status >= 400) {
        setMessageDeleteCharge(error.response.data);
        setResponseSuccessDeleteCharge(false);
        setBackGroundDeleteCharge('#F2D6D0');
        setColorDeleteCharge('#AE1100');
        setTimeout(() => {
          setResponseSuccessDeleteCharge(true);
          setOpenaModalDelteCharge(false);
        }, 900);
      }
      return;
    }
  }

  return (
    <div className="container-delete-charge">
      <div className='card-delete-charge animation-in-scale'>
        <img
          src={IconClose} alt='x-close'
          onClick={() => setOpenaModalDelteCharge(false)}
        />
        <img id='alert-delete' src={AlerteDelteCharge} alt='alert message' />
        <h1
          className='font-mont-serrat-bold-18-700'
        >Tem certeza que deseja excluir esta cobrança?
        </h1>
        <div className='btn-delete-yes-no font-nunito-regular-18-weight-700'>
          <button
            onClick={() => setOpenaModalDelteCharge(false)}
          >Não</button>
          <button
            onClick={() => deleteChargeClient()}
          >Sim</button>
        </div>
      </div>
    </div>
  );
}

export default DelteCharge;
