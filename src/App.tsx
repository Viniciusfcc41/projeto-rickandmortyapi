import "../src/App.css"
import { ListaPersonagens } from "./pages/lista-personagens"
import { ListaEpisodios } from "./pages/lista-episodios"
import { ListaLocais } from "./pages/lista-locais";
import { DetalhePersonagem } from "./pages/detalhe-personagem";
import { DetalheEpisodio } from "./pages/detalhe-episodio";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Navbar } from "./shared/navbar"
function App() {
 

  return (


    <>
        <Navbar/>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListaPersonagens />} />
          <Route path="/episodios" element={<ListaEpisodios />} />
          <Route path="/locais" element={<ListaLocais />} />
          <Route path="/personagem/:id" element={<DetalhePersonagem />} />
          <Route path="/episodio/:id" element={<DetalheEpisodio />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
