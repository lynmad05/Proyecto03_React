import React, {useState, useEffect} from 'react';

const Home = () => {

    const [peliculas,setPeliculas] = useState([]);
    const [cargando, setCargando] = useState(true);

    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
    const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

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
    }, []);

    if (cargando){
        return <div className='loading-state'>Cargando...</div>;
    }

    return (
        <div className='home-page'>
            <section className='hero-banner'>
                <h1>Bienvenido a Cineplanet</h1>
                <p>Vive la emoción del cine. ¡Revisa nuestra cartelera!</p>
            </section>

            <section className='peliculas-destacadas'>
            <h2>Estrenos de la semana</h2>
            <div className='peliculas-container'>
                {peliculas.map(pelicula =>(
                    <div key={pelicula.id} className='pelicula-card'>
                        <img 
                            src={`${IMG_BASE_URL}${pelicula.poster_path}`} 
                            alt={pelicula.title} 
                        />                     
                        <h3>{pelicula.title}</h3>
                        <p>Rating: {pelicula.vote_average}</p>
                        <p className="resumen">{pelicula.overview.substring(0, 100)}...</p>
                    </div>
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
