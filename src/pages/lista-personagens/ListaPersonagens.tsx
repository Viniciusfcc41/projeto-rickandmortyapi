import { useState, useEffect } from "react";
import type { Personagem } from "../../shared/types/personagem";
import "../../style/listaPersonagens.css";
import { Paginacao } from "../../shared/paginacao";

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
        if (!response.ok) throw new Error("Erro ao buscar personagens");
        return response.json();
      })
      .then((data) => {
        setPersonagens(data.results);
        setTotalPaginas(data.info.pages);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [paginaAtual]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar personagens.</p>;

  return (
    <div>
      <h1>Characters</h1>

      <div className="personagensContainer">
        {personagens.length ? (
          personagens.map((personagem) => (
            <div key={personagem.id} className="personagemCard">
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
          <p>Nenhum personagem encontrado.</p>
        )}
      </div>

      <Paginacao
        paginaAtual={paginaAtual}
        totalPaginas={totalPaginas}
        irParaPagina={setPaginaAtual}
      />
    </div>
  );
};
