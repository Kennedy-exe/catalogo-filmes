import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API, mensagemErro } from '../api';

function Home() {

    const [data, setData] = useState([]);
    const [erro, setErro] = useState('');

    useEffect( () => {
        axios.get(API)
            .then( res => setData(res.data) )
            .catch( err => setErro(mensagemErro(err)) );
    }, [] );

    return (
        <div className='d-flex flex-column justify-content-center
                    align-items-center pagina'>

            <h1 className='titulo-pagina'>Catálogo de Filmes</h1>

            <div className='w-75 rounded cartao border shadow p-4'>

                <div className='d-flex justify-content-end'>
                    <Link to="/create" className='btn btn-success'>NOVO</Link>
                </div>

                {erro && <div className='alert alert-danger mt-3'>{erro}</div>}

                <table className='table table-striped table-hover'>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        data.map( (d) => (
                            <tr key={d.id}>
                                <td>{d.id}</td>
                                <td>
                                    <Link to={`/read/${d.id}`}>{d.nome}</Link>
                                </td>
                            </tr>
                        ) )
                    }
                    </tbody>
                </table>

                {data.length === 0 && !erro &&
                    <p className='text-muted text-center'>Nenhum filme cadastrado.</p>}

            </div>
        </div>
    )
}

export default Home
