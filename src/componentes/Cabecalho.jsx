import React from 'react';
import { NavLink } from 'react-router-dom';

function Cabecalho() {
    return (
        <nav className='navbar navbar-expand navbar-dark cabecalho-granulado px-4'>
            <span className='navbar-brand'>Catálogo de Filmes</span>
            <div className='navbar-nav'>
                <NavLink to='/' end className='nav-link'>Início</NavLink>
                <NavLink to='/create' className='nav-link'>Criar</NavLink>
                <NavLink to='/update' className='nav-link'>Alterar</NavLink>
                <NavLink to='/delete' className='nav-link'>Apagar</NavLink>
            </div>
        </nav>
    )
}

export default Cabecalho;
