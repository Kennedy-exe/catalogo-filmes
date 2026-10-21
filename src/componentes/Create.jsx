import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API, mensagemErro } from '../api';

function Create() {

    const [values, setValues] = useState( {
        nome: '',
        genero: '',
        ano: ''
    } );
    const [erro, setErro] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(API, values)
            .then( () => navigate('/') )
            .catch( err => setErro(mensagemErro(err)) );
    }

    return (
        <div className='d-flex w-100 justify-content-center align-items-center pagina'>
            <div className='w-50 border cartao shadow px-5 pt-3 pb-5 rounded'>
                <h1>Adicionar filme</h1>

                <form onSubmit={handleSubmit}>

                    <div className='mb-2'>
                        <label htmlFor="nome">Nome:</label>
                        <input type="text" id='nome' name='nome' className='form-control'
                               placeholder='Digite o nome do filme'
                               onChange={ e => setValues( {...values, nome: e.target.value} ) }
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="genero">Gênero:</label>
                        <input type="text" id='genero' name='genero' className='form-control'
                               placeholder='Digite o gênero'
                               onChange={ e => setValues( {...values, genero: e.target.value} ) }
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="ano">Ano:</label>
                        <input type="text" id='ano' name='ano' className='form-control'
                               placeholder='Digite o ano'
                               onChange={ e => setValues( {...values, ano: e.target.value} ) }
                        />
                    </div>

                    {erro && <div className='alert alert-danger'>{erro}</div>}

                    <button className='btn btn-success'>Criar</button>
                    <Link to="/" className='btn btn-primary ms-3'>Cancelar</Link>

                </form>
            </div>
        </div>
    )
}

export default Create;
