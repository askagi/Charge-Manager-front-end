import './styles.css';
import IconCheck from '../../assets/icon-check.svg';

const steps = [
  {
    label: 'Cadastre-se',
    description: `Por favor, escreva seu nome e e-mail`,
  },
  {
    label: 'Escolha uma senha',
    description: 'Escolha uma senha segura',
  },
  {
    label: 'Cadastro realizado com sucesso',
    description: `E-mail e senha cadastrados com sucesso`,
  },
];

function ReasonSignUp({ activeStep, setActiveStep }) {

  return (
    <div className='reasons'>

      <div className='mini-box'>
        <div className='arrow-vertical'></div>
        <div className='circles'>
          <div
            className='circles-inter'
            style={{ display: activeStep.section2 && 'none' }}
          ></div>
          {activeStep.section2 &&
            <img src={IconCheck} alt='check' />
          }
        </div>
        <div className='div-label'>
          <label className='font-mont-serrat-bold-18'>{steps[0].label}</label>
          <label className='font-nunito-regular-16'>{steps[0].description}</label>
        </div>
      </div>

      <div className='mini-box'>
        <div className='arrow-vertical-2'></div>
        <div
          className='circles'
          style={{ backgroundColor: activeStep.section2 ? '#0E8750' : '#fff' }}
        >
          <div
            className='circles-inter'
            style={{
              backgroundColor: activeStep.section2 ? '#fff' : '#0E8750',
              display: activeStep.section3 && 'none'
            }}
          ></div>
          {activeStep.section3 &&
            <img src={IconCheck} alt='check' />
          }
        </div>
        <div className='div-label'>
          <label className='font-mont-serrat-bold-18'>{steps[1].label}</label>
          <label className='font-nunito-regular-16'>{steps[1].description}</label>
        </div>
      </div>

      <div className='mini-box'>
        <div
          className='circles'
          style={{ backgroundColor: activeStep.section3 ? '#0E8750' : '#fff' }}
        >
          <div
            className='circles-inter'
            style={{
              backgroundColor: activeStep.section3 ? '#fff' : '#0E8750',
              display: activeStep.section3 && 'none'
            }}
          ></div>
          {activeStep.section3 &&
            <img src={IconCheck} alt='check' />
          }
        </div>
        <div className='div-label'>
          <label className='font-mont-serrat-bold-18'>{steps[2].label}</label>
          <label className='font-nunito-regular-16'>{steps[2].description}</label>
        </div>
      </div>
    </div>
  )
};

export default ReasonSignUp;