import { useParams, useNavigate, Link } from "react-router-dom";
import type { Personagem } from "../../shared/types/personagem";
import type { Episodio } from "../../shared/types/episodio";
import { useEffect, useState } from "react";
import { fetchDetalhePersonagem } from "../../service/fetch-detalhe-personagem";
import "../../style/detalhePersonagem.css";

interface PersonagemDetalhes extends Personagem {}

export const DetalhePersonagem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [personagem, setPersonagem] = useState<PersonagemDetalhes | null>(null);
  const [episodios, setEpisodios] = useState<Episodio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        console.error("ID do personagem não fornecido");
        return;
      }
      try {
        setLoading(true);
        const data = await fetchDetalhePersonagem(id);
        setPersonagem(data);

        // Buscar detalhes de todos os episódios
        if (data.episode?.length) {
          const episodiosData = await Promise.all(
            data.episode.map((url: string) =>
              fetch(url).then((response) => response.json())
            )
          );
          setEpisodios(episodiosData);
        }
      } catch (error) {
        console.error("Erro ao buscar detalhes do personagem:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!personagem) return <p>Personagem não encontrado.</p>;

  return (
    <div className="main">
      <h2 id="titulo">Character details</h2>
      <div className="mainCard">
        <div className="personagemInfo">
          <h1>{personagem.name}</h1>
          <p><strong>Espécie:</strong> {personagem.species}</p>
          <p><strong>Gênero:</strong> {personagem.gender}</p>
          <p><strong>Status:</strong> {personagem.status}</p>
          <p><strong>Origem:</strong> {personagem.origin.name}</p>
          <p><strong>Localização:</strong> {personagem.location.name}</p>
        </div>
        <img src={personagem.image} />
      </div>

      <h2>{personagem.name} appears in the following episodes</h2>
      <div className="episodiosContainer">
        {episodios.length ? (
          episodios.map((episodio) => (
            <Link
              key={episodio.id}
              to={`/episodio/${episodio.id}`}
              className="episodioCard"
            >
              <h3>{episodio.name}</h3>
              <p><span>Air Date:</span> {episodio.air_date}</p>
              <p><span>Episode:</span> {episodio.episode}</p>
            </Link>
          ))
        ) : (
          <p>Este personagem não aparece em nenhum episódio listado.</p>
        )}
      </div>

      <button onClick={() => navigate(-1)}>Voltar</button>
    </div>
  );
};
