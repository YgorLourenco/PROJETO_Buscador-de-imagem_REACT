import React from 'react'

const Error = ({mensagem}) => {
    return ( 
        <p className='my-3 p-4 text-center alert alert-danger'>{mensagem}</p>
     );
}
 
export default Error;