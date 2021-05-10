import React, {useState} from 'react'
import Error from './Error'

const Formulario = ({guardarBusca}) => {

    const [termo, guardarTermo] = useState('')
    const [error, guardarError] = useState(false)

    const buscarImagens = e => {
        e.preventDefault()

        // Validar
        if(termo.trim() === '') {
            guardarError(true)
            return
        }
        guardarError(false)

        // Enviar o termo
        guardarBusca(termo)
    }

    return ( 
        <form
            onSubmit={buscarImagens}
        >
            <div className='row'>
                <div className='form-group col-md-8'>
                    <input 
                        type='text'
                        className='form-control form-control-lg'
                        placeholder='Busque uma image, exemplo: café'
                        onChange={e => guardarTermo(e.target.value)} // Vai guardar a informação no State 'guardarTermino'
                    />
                </div>
    
                <div className='form-group col-md-4'>
                    <input 
                        type='submit'
                        className='btn btn-lg btn-danger btn-block'
                        value='Buscar'
                    />
                </div>
            </div>
            {error ? <Error mensagem='Adicine um termo de busca'/> : null}
        </form>
     );
}
 
export default Formulario;