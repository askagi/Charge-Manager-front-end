import ImageSearchNot from '../../assets/image-error-search-client.svg';
import './styles.css';

const ImageErrorSearch = () => {
  return (
    <div className="container-image-error-search">
      <img className='image-search-not-found' src={ImageSearchNot} alt='no-search' />
      <h1 className='font-mont-serrat-bold-24'>Nenhum resultado foi encontrado!</h1>
      <h3 className='font-mont-serrat-bold-24'>Verifique se a escrita está correta</h3>
    </div>
  );
}

export default ImageErrorSearch;
