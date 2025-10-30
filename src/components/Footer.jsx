import React from "react";

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-container">

        <div className="footer-column">
          <h4>Acerca de Cineplanet</h4>
          <ul>
            <li><a href="#">Nosotros</a></li>
            <li><a href="#">Trabaja en Cineplanet</a></li>
            <li><a href="#">Ventas Corporativas</a></li>
            <li><a href="#">Política de SST</a></li>
            <li><a href="#">Política de Diversidad e Inclusión</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Sostenibilidad</h4>
          <ul>
            <li><a href="#">Política de Sostenibilidad</a></li>
            <li><a href="#">Memoria de Gestión de Sostenibilidad 2024</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Ayuda y Contacto</h4>
          <ul>
            <li><a href="#">Centro de Ayuda</a></li>
            <li><a href="#">Contáctanos</a></li>
            <li><a href="#">Boleta Electrónica</a></li>
            <li><a href="#">Política de Privacidad</a></li>
            <li><a href="#">Términos y condiciones</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Síguenos en</h4>
          <div className="social-icons">
            <a href="https://www.facebook.com/cineplanet" target="_blank" rel="noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/cineplanetoficial/" target="_blank" rel="noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://x.com/cineplanet" target="_blank" rel="noreferrer">
              <i className="fab fa-x-twitter"></i>
            </a>
            <a href="https://www.youtube.com/channel/UCbKcf3bFY05mOS-GjLPLwsQ" target="_blank" rel="noreferrer">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>Cineplex S.A. | RUC 20429683581</p>
        <p>Todos los derechos reservados © 2025 Chiribayas 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
