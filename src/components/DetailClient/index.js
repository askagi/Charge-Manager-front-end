import './styles.css';
import { Skeleton } from '@mui/material';

const DetailClient = ({ imageEditClient, clientCurrent, load, setOpenModalRegisterClient }) => {
  const colorType = '#f2f2f2';
  const heithType = 24;
  const widhType = 130;
  const bordeR = 1.5;

  return (
    < div className='container-table-clients-detail' >
      <div className='table-head-detail'>
        <h3 className='font-mont-serrat-bold-24'>Dados do cliente</h3>
        <button
          className='btn-cancel high-midle-btn flex-button-edit font-nunito-regular-18-weight-400'
          onClick={() => setOpenModalRegisterClient(true)}
        >
          <img src={imageEditClient} alt='pen green' />
          Editar Cliente
        </button>

      </div>
      <div className='table-content-detail font-nunito-regular-14'>
        <div className='personal-data'>

          <div className='personal-data-email'>
            <h3>E-mail</h3>
            {
              load ?
                (
                  <Skeleton sx={{ bgcolor: colorType, borderRadius: bordeR }}
                    animation="wave"
                    width={widhType}
                    height={heithType}
                    variant='text'
                    component="span" />
                ) : (
                  <span>{clientCurrent.email}</span>
                )
            }
          </div>

          <div className='personal-data-phone'>
            <h3>Telefone</h3>
            {
              load ?
                (
                  <Skeleton sx={{ bgcolor: colorType, borderRadius: bordeR }}
                    animation="wave" width={widhType}
                    height={heithType}
                    variant='text'
                    component="span" />
                ) : (
                  <span>{clientCurrent.telephone}</span>
                )
            }

          </div>
          <div className='personal-data-cpf'>
            <h3>CPF</h3>
            {
              load ?
                (
                  <Skeleton sx={{ bgcolor: colorType, borderRadius: bordeR }}
                    animation="wave"
                    width={widhType}
                    height={heithType}
                    variant='text'
                    component="span" />
                ) : (
                  <span>{clientCurrent.cpf}</span>
                )
            }

          </div>
          <div className='div-empty-detail'></div>
          <div className='div-empty-detail'></div>
          <div className='div-empty-detail'></div>
        </div>
        <div className='address-data'>
          <div className='address-data-address'>
            <h3>Endereço</h3>
            {
              load ?
                (
                  <Skeleton sx={{ bgcolor: colorType, borderRadius: bordeR }}
                    animation="wave" width={widhType}
                    height={heithType}
                    variant='text'
                    component="span" />
                ) : (
                  <span>{clientCurrent.address ? clientCurrent.address : '-'}</span>
                )
            }

          </div>
          <div className='address-data-district'>
            <h3>Bairro</h3>
            {
              load ?
                (
                  <Skeleton sx={{ bgcolor: colorType, borderRadius: bordeR }}
                    animation="wave" width={widhType}
                    height={heithType}
                    variant='text'
                    component="span" />
                ) : (
                  <span>{clientCurrent.district ? clientCurrent.district : '-'}</span>
                )
            }

          </div>
          <div className='address-data-complement'>
            <h3>Complemento</h3>
            {
              load ?
                (
                  <Skeleton sx={{ bgcolor: colorType, borderRadius: bordeR }}
                    animation="wave" width={widhType}
                    height={heithType}
                    variant='text'
                    component="span" />
                ) : (
                  <span>{clientCurrent.compliment ? clientCurrent.compliment : '-'}</span>
                )
            }

          </div>
          <div className='address-data-cep'>
            <h3>CEP</h3>
            {
              load ?
                (
                  <Skeleton sx={{ bgcolor: colorType, borderRadius: bordeR }}
                    animation="wave" width={widhType}
                    height={heithType}
                    variant='text'
                    component="span" />
                ) : (
                  <span>{clientCurrent.cep ? clientCurrent.cep : '-'}</span>
                )
            }

          </div>
          <div className='address-data-city'>
            <h3>Cidade</h3>
            {
              load ?
                (
                  <Skeleton sx={{ bgcolor: colorType, borderRadius: bordeR }}
                    animation="wave"
                    width={widhType}
                    height={heithType}
                    variant='text'
                    component="span" />
                ) : (
                  <span>{clientCurrent.city ? clientCurrent.city : '-'}</span>
                )
            }

          </div>
          <div className='address-data-uf'>
            <h3>UF</h3>
            {
              load ?
                (
                  <Skeleton sx={{ bgcolor: colorType, borderRadius: bordeR }}
                    animation="wave"
                    width={22}
                    height={heithType}
                    variant='text'
                    component="span" />
                ) : (
                  <span>{clientCurrent.state ? clientCurrent.state : '-'}</span>
                )
            }
          </div>
        </div>
      </div>
    </div >
  );
}

export default DetailClient;
