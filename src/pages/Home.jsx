import React, {useState, useEffect} from 'react';
import MiniMovieCard from '../components/MiniMovieCard';
import MovieCarrusel from '../components/MovieCarrusel';

const Home = () => {

    const [peliculas,setPeliculas] = useState([]);
    const [cargando, setCargando] = useState(true);

    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

    useEffect(() => {
        const fetchDestacadas = async () =>{
            const urlCompleta = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=es-ES&page=1`;
        
            try{
                const response = await fetch(urlCompleta);
                if(!response.ok){
                    throw new Error('Error al obtener las películas destacadas');
                }
                const data = await response.json();

                setPeliculas(data.results.slice(0,4));
                setCargando(false);
            } catch (error){
                console.error('Error al obtener las películas destacadas:', error);
                setCargando(false);
            }
        };
        fetchDestacadas();
    }, [API_KEY, BASE_URL]);

    if (cargando){
        return <div className='loading-state'>Cargando...</div>;
    }


    const peliculaPrincipal = peliculas[0];
    const peliculasEnTarjetas = peliculas.slice(1, 9)

    return (
        <div className='home-page'>

           {peliculas.length > 0 && <MovieCarrusel peliculas={peliculas} />}

            <section className='hero-banner'>
                <h1>Bienvenido a Cineplanet</h1>
                <p>Vive la emoción del cine. ¡Revisa nuestra cartelera!</p>
            </section>

            <section className='peliculas-destacadas'>
            <h2>Estrenos de la semana</h2>
            <div className='peliculas-container'>
                {peliculas.map(pelicula =>(
                <MiniMovieCard key={pelicula.id} pelicula={pelicula} />
            ))}
            </div>
        </section>
            
            <section className='promociones'>
                <h2>Promociones Exclusivas</h2>
                <p>2X1 todos los miércoles. No te lo pierdas</p>
            </section>
        </div>
    );
};
export default Home;
