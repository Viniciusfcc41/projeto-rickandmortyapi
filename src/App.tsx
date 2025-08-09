import "../src/App.css"
import { ListaPersonagens } from "./pages/lista-personagens"
import { ListaEpisodios } from "./pages/lista-episodios"
import { ListaLocais } from "./pages/lista-locais";
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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
