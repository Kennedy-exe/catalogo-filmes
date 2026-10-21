import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { API, mensagemErro } from '../api';

function Read() {

    const [data, setData] = useState({});
    const [erro, setErro] = useState('');

    // Pega o id enviado na URL ( <Link to={`/read/${d.id}`}... ):
    const {id} = useParams();

    useEffect( () => {
        axios.get(`${API}/${id}`)
            .then( res => setData(res.data) )
            .catch( err => setErro(mensagemErro(err)) );
    }, [id] );

    return (
        <div className='d-flex w-100 justify-content-center align-items-center pagina'>
            <div className='w-50 border cartao shadow px-5 pt-3 pb-5 rounded'>

                <h3>Detalhes do filme</h3>

                {erro && <div className='alert alert-danger'>{erro}</div>}

                <div className='mb-2'>
                    <strong>ID: {data.id}</strong>
                </div>
                <div className='mb-2'>
                    <strong>Nome: {data.nome}</strong>
                </div>
                <div className='mb-2'>
                    <strong>Gênero: {data.genero}</strong>
                </div>
                <div className='mb-3'>
                    <strong>Ano: {data.ano}</strong>
                </div>

                <Link to="/" className='btn btn-primary'>Cancelar</Link>

            </div>
        </div>
    )
}

export default Read;
