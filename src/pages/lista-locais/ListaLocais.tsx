import { useState, useEffect } from "react";
import type { Local } from "../../shared/types/local";
import style from "../../style/listaLocais.module.css"
import { Paginacao } from "../../shared/paginacao";
import { Link } from "react-router-dom";


export const ListaLocais = () =>{
      const [locais, setLocais] = useState<Local[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(false);
    
      const [paginaAtual, setPaginaAtual] = useState(1);
      const [totalPaginas, setTotalPaginas] = useState(0);

      useEffect(() => {
    setLoading(true);
    setError(false);

    fetch(`https://rickandmortyapi.com/api/location?page=${paginaAtual}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar locais");
        }
        return response.json();

      }).then((data) => {
        setLocais(data.results);
        setTotalPaginas(data.info.pages);

      }).catch((error) => {
        console.error(error);
        setError(true);

      }).finally(() => {
        setLoading(false);
      });
  }, [paginaAtual]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar locais.</p>;

  return(
    <div className={style.body}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Rick_and_Morty.svg" id={style.logo} />
      
        <h1 id={style.titulo}>Locations</h1>
        <div className={style.locaisContainer}>
      {locais?.length ? (
          locais.map((local) => (
            <Link to={`/local/${local.id}`} key={local.id} className={style.localCard}>
                 <h3>{local.name}</h3>
                 <p><span>Dimension:</span> {local.dimension}</p>
                 <p><span>Type:</span> {local.type}</p>
            </Link>
        
          ))
        ) : (
          <p>Nenhum local encontrado.</p>
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
