import { useState, useEffect } from "react";
import type { Episodio } from "../../shared/types/episodio";
import { Paginacao } from "../../shared/paginacao";
import { Link } from "react-router-dom";
import style from "../../style/listaEpisodios.module.css"


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
    <div className={style.body}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Rick_and_Morty.svg" id={style.logo} />
      
        <h1 id={style.titulo}>Episodes</h1>
        <div className={style.episodiosContainer}>
      {episodios?.length ? (
          episodios.map((episodio) => (
       
            <Link to={`/episodio/${episodio.id}` } key={episodio.id} className={style.episodioCard}>
                 <h3>{episodio.name}</h3>
                 <div>
                    <p> <strong>Air Date:</strong> {episodio.air_date}</p>
                    <p> <strong>Episode:</strong> {episodio.episode}</p>
                 </div>

            </Link>
        
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
