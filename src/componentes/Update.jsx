import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API, mensagemErro } from '../api';

// Renderização condicional: a tela muda conforme o estado "fase".
//   'busca'         -> caixa para digitar o id
//   'edicao'        -> formulário com os dados do filme encontrado
//   'naoEncontrado' -> mensagem e botão para voltar ao Início

function Update() {

    const [fase, setFase] = useState('busca');
    const [id, setId] = useState('');
    const [values, setValues] = useState( {
        nome: '',
        genero: '',
        ano: ''
    } );
    const [erro, setErro] = useState('');

    const navigate = useNavigate();

    // Botão Procura: busca o filme pelo id digitado.
    const handleProcura = (event) => {
        event.preventDefault();
        axios.get(`${API}/${id.trim()}`)
            .then( res => {
                setValues(res.data);
                setFase('edicao');
            } )
            .catch( () => setFase('naoEncontrado') );
    }

    // Botão Alterar: grava os dados na API e volta para o Início.
    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put(`${API}/${id.trim()}`, values)
            .then( () => navigate('/') )
            .catch( err => setErro(mensagemErro(err)) );
    }

    return (
        <div className='d-flex w-100 justify-content-center align-items-center pagina'>
            <div className='w-50 border cartao shadow px-5 pt-3 pb-5 rounded'>

                {fase === 'busca' && (
                    <>
                        <h1>Alterar filme</h1>
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

                {fase === 'edicao' && (
                    <>
                        <h1>Editar filme {id}</h1>
                        <form onSubmit={handleUpdate}>
                            <div className='mb-2'>
                                <label htmlFor="nome">Nome:</label>
                                <input type="text" id='nome' className='form-control'
                                       value={values.nome}
                                       onChange={ e => setValues( {...values, nome: e.target.value} ) }
                                />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor="genero">Gênero:</label>
                                <input type="text" id='genero' className='form-control'
                                       value={values.genero}
                                       onChange={ e => setValues( {...values, genero: e.target.value} ) }
                                />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="ano">Ano:</label>
                                <input type="text" id='ano' className='form-control'
                                       value={values.ano}
                                       onChange={ e => setValues( {...values, ano: e.target.value} ) }
                                />
                            </div>

                            {erro && <div className='alert alert-danger'>{erro}</div>}

                            <button className='btn btn-success'>Alterar</button>
                            <Link to="/" className='btn btn-primary ms-3'>Cancelar</Link>
                        </form>
                    </>
                )}

                {fase === 'naoEncontrado' && (
                    <>
                        <h1>Alterar filme</h1>
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

export default Update
