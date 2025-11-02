import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import './DetallePelicula.css';

const IMG_BASE_URL = 'https://image.tmdb.org/t/p/original';

const DetallePelicula = () => {
    const { id } = useParams();
    const [pelicula, setPelicula] = useState(null);
    const [trailerKey, setTrailerKey] = useState(null);
    const [modalAbierto, setModalAbierto] = useState(false); 
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

    useEffect(() => {
        const fetchDetallesCompletos = async () => {
            if (!id) {
                setError("No se proporcionó un ID de película.");
                setCargando(false);
                return;
            }

            const urlDetalles = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=es-ES`;
            const urlVideos = `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=es-ES`;

            try {
                const [resDetalles, resVideos] = await Promise.all([
                    fetch(urlDetalles),
                    fetch(urlVideos)
                ]);

                if (!resDetalles.ok) throw new Error('Error al obtener detalles');
                if (!resVideos.ok) throw new Error('Error al obtener videos');

                const dataDetalles = await resDetalles.json();
                const dataVideos = await resVideos.json();

                setPelicula(dataDetalles);

                const videos = dataVideos.results;
                const trailerOficial = videos.find(
                    video => video.site === 'YouTube' && video.type === 'Trailer'
                );

                if (trailerOficial) {
                    setTrailerKey(trailerOficial.key);
                }

                setCargando(false);

            } catch (err) {
                console.error('Error al obtener los detalles completos:', err);
                setError('No se pudieron cargar los detalles de la película.');
                setCargando(false);
            }
        };

        fetchDetallesCompletos();
    }, [id, API_KEY, BASE_URL]);

    const abrirModal = () => setModalAbierto(true);
    const cerrarModal = () => setModalAbierto(false);

    const opts = {
        height: '480',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    };

    if (cargando) {
        return <div className='loading-state'>Cargando detalles de la película...</div>;
    }

    if (error) {
        return <div className='error-state'>{error}</div>;
    }

    if (!pelicula) {
        return <div className='error-state'>No se encontró la película.</div>;
    }

    return (
        <> {/* 8. Usamos un Fragment para el modal */}
            <div className='detalle-pelicula-page'>
                <div 
                    className='backdrop-image' 
                    style={{backgroundImage: `url(${IMG_BASE_URL}${pelicula.backdrop_path})`}}
                >
                    <div className='overlay'></div>
                    <div className='detalle-content'>
                        <img 
                            src={`${IMG_BASE_URL}${pelicula.poster_path}`} 
                            alt={pelicula.title} 
                            className="detalle-poster"
                        />
                        <div className='info-text'>
                            <h1>{pelicula.title}</h1>
                            <p className='tagline'>{pelicula.tagline}</p>
                            <p className='overview'>{pelicula.overview}</p>
                            <div className='details-grid'>
                                <p><strong>Puntuación:</strong> ⭐ {pelicula.vote_average ? pelicula.vote_average.toFixed(1) : 'N/A'}</p>
                                <p><strong>Fecha de Lanzamiento:</strong> {pelicula.release_date}</p>
                                <p><strong>Duración:</strong> {pelicula.runtime ? `${pelicula.runtime} min` : 'N/A'}</p>
                                <p>
                                    <strong>Géneros:</strong> 
                                    {pelicula.genres && pelicula.genres.map(genre => genre.name).join(', ')}
                                </p>
                                {pelicula.production_companies && pelicula.production_companies.length > 0 && (
                                    <p>
                                        <strong>Compañías:</strong> 
                                        {pelicula.production_companies.map(company => company.name).join(', ')}
                                    </p>
                                )}
                            </div>
                            
                            {/* 9. Solo mostramos el botón si encontramos un tráiler */}
                            {trailerKey && (
                                <button className='btn-primary' onClick={abrirModal}>
                                    Ver Trailer
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* 10. El Modal del Tráiler */}
            {modalAbierto && (
                <div className='modal-backdrop' onClick={cerrarModal}>
                    <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                        <button className='modal-close' onClick={cerrarModal}>&times;</button>
                        <div className='video-container'>
                            <YouTube videoId={trailerKey} opts={opts} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DetallePelicula;