import React, { useState, useEffect } from 'react';
import MiniMovieCard from '../components/MiniMovieCard'; 

const Cartelera = () => {
    const [peliculas, setPeliculas] = useState([]);
    const [cargando, setCargando] = useState(true);

    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

    useEffect(() => {
        const fetchCartelera = async () => {
            const urlCompleta = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=es-ES&page=1`;
        
            try {
                const response = await fetch(urlCompleta);
                if (!response.ok) {
                    throw new Error('Error al obtener la cartelera');
                }
                const data = await response.json();
                
                setPeliculas(data.results); 
                setCargando(false);

            } catch (error) {
                console.error('Error al obtener la cartelera:', error);
                setCargando(false);
            }
        };

        fetchCartelera();
    }, [API_KEY, BASE_URL]); 

    if (cargando) {
        return <div className='loading-state'>Cargando cartelera...</div>;
    }

    return (
        <div className='cartelera-page'>
            <section className='listado-peliculas'>
                <h2>Nuestra Cartelera</h2>
                <p>Descubre las películas que puedes ver hoy en nuestros cines.</p>
                
                <div className='peliculas-container'>
                    {peliculas.length > 0 ? (
                        peliculas.map(pelicula => (
                            <MiniMovieCard key={pelicula.id} pelicula={pelicula} />
                        ))
                    ) : (
                        <p>No hay películas en cartelera en este momento.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Cartelera;