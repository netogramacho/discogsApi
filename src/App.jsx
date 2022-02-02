import Axios from 'axios';
import { useState, useEffect } from 'react/cjs/react.development';
import './App.css';
import Discs from './components/discs/Discs';
import ModalMasters from './components/modal/ModalMasters';
import SearchInput from './components/search/SearchInput';

function App() {
  // dados da modal
  const [modalData, setModalData] = useState('')

  // input search
  const [textSearch, setTextSearch] = useState('');

  // discos retornados da api
  const [discs, setDiscs] = useState([]);

  // controlador do botão de carregamento
  const [loadMore, setLoadMore] = useState('');
  const [loadMoreDisabled, setLoadMoreDisabled] = useState(true);
  
  // controladores do loader e da modal
  const [overlayDisplay, setOverlayDisplay] = useState(true);
  const [loaderDisplay, setLoaderDisplay] = useState(false);

  const renderDiscs = discs.map(disc => {
    return(
      <Discs 
        key={disc.id*Math.random()}
        thumb={disc.thumb} 
        onClick={() => {openModal(`${disc.resource_url}`, `${disc.thumb}`)}} 
        title={disc.title.split('-')[1]}
        year={disc.year}
      />
    )
  })
  

  function openModal(url, img) {
    Axios.get(url).then(json => {
    json.data.img = img;
    setModalData(json.data)
    })
    setOverlayDisplay(false)
  }

  function closeModal() {
    setModalData({})
    setOverlayDisplay(true)
  }

  function getDiscogs(url) {
    setLoaderDisplay(false)
    setLoadMoreDisabled(true)
    Axios.get(url).then(json => {
      for (let i = 0; i < json.data.results.length; i++) {
        setDiscs(discs => ([...discs, json.data.results[i]]))
      }

      if(json.data.pagination.urls.next) {
        setLoadMore(json.data.pagination.urls.next)
      } else {
        setLoadMore('')
      }

      setLoadMoreDisabled(false)
      setLoaderDisplay(true)
    })
  }
  
  useEffect(() => {

    setDiscs([])

    if(textSearch != "") {
      getDiscogs(`https://api.discogs.com/database/search?type=master&artist=${textSearch}&format=album&per_page=5&sort=year&sort_order=asc&token=GPltfqgHFPNPfCXuoRCEokVlscvrfABatAmVPLcd`)
    } else {
      setLoadMore('')
      setLoaderDisplay(true)
    }

  }, [textSearch]);


  return (
    <div className="App">
      <div className='d-flex justify-content-start align-items-center flex-column'>
        <div className='d-flex justify-content-around my-5'>
            <SearchInput value={textSearch} onChange={(search) => setTextSearch(search)} />
        </div>
        <div className='discTable'>
          {renderDiscs}
        </div>
        <div className='loader' hidden={loaderDisplay}>
        </div>
        {(loadMore === '') ? 
          '' 
        : 
          <button onClick={ e => getDiscogs(loadMore, e)} className='btn btn-primary my-4' disabled={loadMoreDisabled} >
            <b>LOAD MORE</b>
          </button> 
        }
      </div>

      <div className='overlay' hidden={overlayDisplay}>
        {
        (modalData.artists) ?
          <ModalMasters 
            img={modalData.img} 
            name={modalData.artists[0].name.toUpperCase()} 
            title={modalData.title}  
            year={modalData.year}
            notes={modalData.notes}
            fn={() => closeModal()}
          />
        : 
          ''
        }
      </div>
    </div>
  );
}

export default App;
