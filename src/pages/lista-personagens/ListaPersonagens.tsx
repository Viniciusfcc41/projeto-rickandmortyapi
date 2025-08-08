import { useState, useEffect } from "react";
import type { Personagem } from "../../shared/types/personagem";
import "../../style/listaPersonagens.css"

export const ListaPersonagens = () => {
  const [personagens, setPersonagens] = useState<Personagem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(false);

    fetch(`https://rickandmortyapi.com/api/character?page=${paginaAtual}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar personagens");
        }
        return response.json();

      }).then((data) => {
        setPersonagens(data.results);
        setTotalPaginas(data.info.pages);

      }).catch((error) => {
        console.error(error);
        setError(true);

      }).finally(() => {
        setLoading(false);
      });
  }, [paginaAtual]);

  const irParaPagina = (pagina: number) => {
    setPaginaAtual(pagina);
  };

  const irParaPaginaAnterior = () => {
    if (paginaAtual > 1){
        irParaPagina(paginaAtual - 1);
    }
  };

  const irParaProximaPagina = () => {
    if (paginaAtual < totalPaginas) {
        irParaPagina(paginaAtual + 1);
    }
  };

  const gerarBotoesPaginacao = () => {
    const botoes = [];

    for (let i = 1; i <= totalPaginas; i++) {
      if (i === 1 || i === totalPaginas || (i >= paginaAtual - 1 && i <= paginaAtual + 1)) {
        botoes.push(
          <button
            key={i}
            onClick={() => irParaPagina(i)}

          >
            {i}
          </button>
        );
      } 
      
      else if ((i === paginaAtual - 2 && i > 2) || (i === paginaAtual + 2 && i < totalPaginas - 1)) {
        botoes.push(<span key={`ellipsis-${i}`}>...</span>);
      }
    }

    return botoes;
  };




  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar personagens.</p>;

  return (
    <div>
      <h1>Characters</h1>

      <div className="personagensContainer">
        {personagens?.length ? (
          personagens.map((personagem) => (
            <div className="personagemCard">
              <img src={personagem.image} className="fotoPersonagem" />
              <div className="personagemInfo">
                <h3>{personagem.name}</h3>
                <p><span>Species:</span> {personagem.species}</p>
                <p><span>Gender:</span> {personagem.gender}</p>
                <p><span>Location:</span> {personagem.location.name}</p>
              </div>

            </div>


          ))
        ) : (
          <p>Nenhum filme encontrado.</p>
        )}
      </div>

      <div style={{ marginTop: "2rem" }}>
        <button onClick={irParaPaginaAnterior} disabled={paginaAtual === 1}>
          Anterior
        </button>

        {gerarBotoesPaginacao()}

        <button
          onClick={irParaProximaPagina}
          disabled={paginaAtual === totalPaginas}
        >
          Próxima
        </button>
      </div>
    </div>
  );
};
