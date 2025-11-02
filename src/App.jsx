import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import Cartelera from './pages/Cartelera';
import DetallePelicula from './pages/DetallePelicula';


function App( ){
  return(
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}  />
        <Route path="/peliculas" element={<Cartelera />} />
        <Route path="/pelicula/:id" element={<DetallePelicula />} /> 
        <Route path="/contacto" element={<h1>Componente Contacto aquí chiques</h1>} />
        <Route path="*" element={<h1>404 | Página no encontrada</h1>} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App;