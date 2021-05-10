import React from 'react'
import Imagem from './Imagem'

const ListaImagens = ({imagens}) => {
    return ( 
        <div className='col-12 p-5 row'>
            {imagens.map(imagem => (
                <Imagem 
                    key={imagem.id}
                    imagem={imagem}
                />
            ))}
        </div>
     );
}
 
export default ListaImagens;