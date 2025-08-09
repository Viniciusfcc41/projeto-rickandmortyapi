import { useState, useEffect } from "react";
import type { Local } from "../../shared/types/local";
import "../../style/listaLocais.css"
import { Paginacao } from "../../shared/paginacao";


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
    <div>
        <h1>Locations</h1>
        <div className="episodiosContainer">
      {locais?.length ? (
          locais.map((local) => (

            <div className="episodioCard">
                 <h3>{local.name}</h3>
                 <p><span>Dimension:</span> {local.dimension}</p>
                 <p><span>Type:</span> {local.type}</p>
            </div>
        


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
