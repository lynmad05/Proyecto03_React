import React from 'react';
import Slider from 'react-slick';

const IMG_BASE_URL = 'https://image.tmdb.org/t/p/original';

const MovieCarousel = ({ peliculas }) => {
  if (!peliculas || peliculas.length === 0) return null;

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    pauseOnHover: true,
  };

  return (
    <section className="main-carousel-container">
      <Slider {...settings}>
        {peliculas.slice(0, 5).map((pelicula) => (
          <div key={pelicula.id} className="carousel-slide">
            <div
              className="carousel-image-wrapper"
              style={{
                backgroundImage: `url(${IMG_BASE_URL}${pelicula.backdrop_path})`,
              }}
            >
              <div className="carousel-content">
                <h2>{pelicula.title}</h2>
                <p>{pelicula.overview.substring(0, 150)}...</p>
                <button>Ver Ahora</button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default MovieCarousel;
