import { useState, useEffect } from "react";
import type { Episodio } from "../../shared/types/episodio";
import "../../style/listaEpisodios.css"
import { Paginacao } from "../../shared/paginacao";

export const ListaEpisodios = () =>{
      const [episodios, setEpisodios] = useState<Episodio[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(false);
    
      const [paginaAtual, setPaginaAtual] = useState(1);
      const [totalPaginas, setTotalPaginas] = useState(0);

      useEffect(() => {
    setLoading(true);
    setError(false);

    fetch(`https://rickandmortyapi.com/api/episode?page=${paginaAtual}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar episódips");
        }
        return response.json();

      }).then((data) => {
        setEpisodios(data.results);
        setTotalPaginas(data.info.pages);

      }).catch((error) => {
        console.error(error);
        setError(true);

      }).finally(() => {
        setLoading(false);
      });
  }, [paginaAtual]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar episódios.</p>;

  return(
    <div>
        <h1>Episodes</h1>
        <div className="episodiosContainer">
      {episodios?.length ? (
          episodios.map((episodio) => (

            <div className="episodioCard">
                 <h3>{episodio.name}</h3>
                 <p> <span>Air Date:</span> {episodio.air_date}</p>
                 <p> <span>Episode:</span> {episodio.episode}</p>
            </div>
        


          ))
        ) : (
          <p>Nenhum episódio encontrado.</p>
        )}
        </div>

        <Paginacao
         paginaAtual={paginaAtual}
         totalPaginas={totalPaginas}
         irParaPagina={setPaginaAtual}
        />
        
    </div>
  )
}
