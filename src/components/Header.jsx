import React from 'react';

import {Link} from 'react-router-dom';

const Header = () =>{

    return (

        <header className='main-header'>
            <div className='logo'>
                <Link to='/'>Cineplanet</Link>
            </div>

            <nav className='main-nav'>
                <ul>
                    <li>
                        <Link to='/'>Inicio</Link>
                    </li>
                    <li>
                        <Link to='/peliculas'>Cartelera</Link>
                    </li>
                    <li>
                        <Link to='/contacto'>Contacto</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;