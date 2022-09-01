import MessageBox from '../MessageBox';
import ImageExpiredToken from '../../assets/image-delete-charge.svg';
import './styles.css';

const MessageBoxInvaldToken = () => {
  return (
    <div className="modal-invalid-token animation-in-scale">
      <MessageBox
        image={ImageExpiredToken}
        message={'Sua sessão expirou! Por favor, faça login novamente.'}
        backgroundColor='#FCF6DC'
      />
    </div>
  );
}

export default MessageBoxInvaldToken;
