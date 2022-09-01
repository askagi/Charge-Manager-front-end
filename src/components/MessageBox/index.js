import './styles.css';

const MessageBox = ({ message, image, backgroundColor }) => {
  return (
    <div className="box-successfull animation-in-scale" style={{ backgroundColor: backgroundColor }}>
      <img src={image} alt='message-success' />
      <h2 className="font-mont-serrat-bold-24">{message}</h2>
    </div>
  );
}

export default MessageBox;
