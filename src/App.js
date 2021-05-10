import Formulario from './components/Formulario'
import {useState, useEffect} from 'react'
import ListaImagens from './components/ListaImagens'

function App() {

  // State do app
  const [busca, guardarBusca] = useState('')
  const [imagens, guardarImagens] = useState([])
  const [paginaAtual, guardarPaginaAtual] = useState(1)
  const [totalpaginas, guardarTotalPaginas] = useState(1)


  useEffect(() => {

    const consultarAPI = async () => {
      if(busca === '') return;

      const ImagensPorPagina = 30;
      const key = '7725269-b6e7af7ac6ed803a30e1c99ea'
      const url = `https://pixabay.com/api/?key=${key}&q=${busca}&per_page=${ImagensPorPagina}&page=${paginaAtual}`

      const resposta = await fetch(url)
      const resultado = await resposta.json()
      guardarImagens(resultado.hits)

      // Calcular o total de páginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / ImagensPorPagina)
      guardarTotalPaginas(calcularTotalPaginas)

      // Mover a tela pra cima
      const jumbotron = document.querySelector('.jumbotron')
      jumbotron.scrollIntoView({behavior: 'smooth'}) // Ao carregar a pagina pra proxima página, vai subir em direção a classe jumbotron que fica no topo

    }
    consultarAPI()

  }, [busca, paginaAtual])

  // Definir a pagina anterior
  const paginaAnterior = () => {
    const novaPaginaAtual = paginaAtual - 1; // Diminuir a posição para voltar páginas

    if(novaPaginaAtual === 0) return; // Não voltar a pagina 0 atual

    guardarPaginaAtual(novaPaginaAtual)
  }

  // Definir a pagina anterior
  const paginaSeguinte = () => {
    const novaPaginaAtual = paginaAtual + 1; // Aumentar a posição para voltar páginas

    if(novaPaginaAtual > totalpaginas) return; // Só passa pra pagina seguinte se tiver um valor maior

    guardarPaginaAtual(novaPaginaAtual)
  }


  return (
      <div className='container'>
        <div className='jumbotron'>
          <p className='lead text-center'>Buscador de Imagem</p>
          <Formulario 
            guardarBusca={guardarBusca}
          />
        </div>
        <div className='row justify-content'>
          <ListaImagens 
            imagens={imagens}
          />

          {(paginaAtual === 1) ? null : (
              <button 
              type='button'
              className='bbtn btn-info mr-1'
              onClick={paginaAnterior}
            >&laquo; Anterior </button>
          )}

          
          {(paginaAtual === totalpaginas) ? null : (
              <button 
              type='button'
              className='bbtn btn-info'
              onClick={paginaSeguinte}
            >Proximo &raquo;</button>
          )}
          

        </div>
      </div>
  );
}

export default App;
