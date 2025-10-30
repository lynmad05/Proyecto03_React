import React from 'react';

const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500'; 

const MiniMovieCard = ({ pelicula }) => {
    if (!pelicula) return null; 

    return (
        <div className='pelicula-card'>
            <img 
                src={`${IMG_BASE_URL}${pelicula.poster_path}`} 
                alt={pelicula.title} 
                className="card-poster"
            />
            <div className="card-info">
                <h3>{pelicula.title}</h3>
                <p>⭐ {pelicula.vote_average.toFixed(1)}</p>
               
            </div>
        </div>
    );
};

export default MiniMovieCard;