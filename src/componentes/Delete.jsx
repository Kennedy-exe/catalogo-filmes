import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API, mensagemErro } from '../api';

// Mesmo comportamento do Update:
//   'busca' -> 'confirmacao' (mostra os dados e pede para confirmar) ou 'naoEncontrado'
function Delete() {

    const [fase, setFase] = useState('busca');
    const [id, setId] = useState('');
    const [filme, setFilme] = useState({});
    const [erro, setErro] = useState('');

    const navigate = useNavigate();

    const handleProcura = (event) => {
        event.preventDefault();
        axios.get(`${API}/${id.trim()}`)
            .then( res => {
                setFilme(res.data);
                setFase('confirmacao');
            } )
            .catch( () => setFase('naoEncontrado') );
    }

    const handleDelete = () => {
        axios.delete(`${API}/${id.trim()}`)
            .then( () => navigate('/') )
            .catch( err => setErro(mensagemErro(err)) );
    }

    return (
        <div className='d-flex w-100 justify-content-center align-items-center pagina'>
            <div className='w-50 border cartao shadow px-5 pt-3 pb-5 rounded'>

                {fase === 'busca' && (
                    <>
                        <h1>Apagar filme</h1>
                        <form onSubmit={handleProcura}>
                            <div className='mb-3'>
                                <label htmlFor="id">ID do filme:</label>
                                <input type="text" id='id' className='form-control'
                                       placeholder='Digite o id'
                                       value={id}
                                       onChange={ e => setId(e.target.value) }
                                />
                            </div>
                            <button className='btn btn-success'>Procura</button>
                            <Link to="/" className='btn btn-primary ms-3'>Cancelar</Link>
                        </form>
                    </>
                )}

                {fase === 'confirmacao' && (
                    <>
                        <h1>Apagar este filme?</h1>
                        <div className='mb-2'><strong>ID: {filme.id}</strong></div>
                        <div className='mb-2'><strong>Nome: {filme.nome}</strong></div>
                        <div className='mb-2'><strong>Gênero: {filme.genero}</strong></div>
                        <div className='mb-3'><strong>Ano: {filme.ano}</strong></div>

                        {erro && <div className='alert alert-danger'>{erro}</div>}

                        <button onClick={handleDelete} className='btn btn-danger'>Apagar</button>
                        <Link to="/" className='btn btn-primary ms-3'>Cancelar</Link>
                    </>
                )}

                {fase === 'naoEncontrado' && (
                    <>
                        <h1>Apagar filme</h1>
                        <div className='alert alert-warning'>
                            Não existe filme com o id {id}.
                        </div>
                        <Link to="/" className='btn btn-primary'>Voltar para o Início</Link>
                    </>
                )}

            </div>
        </div>
    )
}

export default Delete
