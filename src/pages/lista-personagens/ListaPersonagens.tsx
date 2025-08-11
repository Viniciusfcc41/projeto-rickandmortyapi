import { useState, useEffect } from "react";
import type { Personagem } from "../../shared/types/personagem";
import style from "../../style/listaPersonagens.module.css"
import { Paginacao } from "../../shared/paginacao";
import { Link } from "react-router-dom";

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
    <div className={style.body}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Rick_and_Morty.svg" id={style.logo} />
      
      <h1 id={style.titulo}>Characters</h1>
    
      <div className={style.personagensContainer}>
       
        {personagens.length ? (
          personagens.map((personagem) => (
            
            <Link to={`/personagem/${personagem.id}`} key={personagem.id} className={style.personagemCard}>    
              <img src={personagem.image} className={style.fotoPersonagem} />
              <div className={style.personagemInfo}>
                <h3>{personagem.name}</h3>           
                <p><span>Species:</span> {personagem.species}</p>
                <p><span>Status:</span> {personagem.status}</p>
                <p><span>Location:</span> {personagem.location.name}</p>
              </div>
              </Link>
           
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