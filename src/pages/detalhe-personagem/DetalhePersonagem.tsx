import { useParams, Link } from "react-router-dom";
import type { Personagem } from "../../shared/types/personagem";
import type { Episodio } from "../../shared/types/episodio";
import { useEffect, useState } from "react";
import { fetchDetalhePersonagem } from "../../service/fetch-detalhe-personagem";
import style from "../../style/detalhePersonagem.module.css";

interface PersonagemDetalhes extends Personagem {}

export const DetalhePersonagem = () => {
  const { id } = useParams();
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
    <div className={style.body}>
      <h1 id={style.titulo}>Character details</h1>
      <div className={style.personagemCard}>
        <div className={style.personagemInfo}>
          <h1 id={style.titulo}>{personagem.name}</h1>
          <div>
          <p className={style.paragrafo}><strong>Status:</strong> {personagem.status}</p>
          <p className={style.paragrafo}><strong>Gender:</strong> {personagem.gender}</p>
          <p className={style.paragrafo}><strong>Species:</strong> {personagem.species}</p>
          <p className={style.paragrafo}><strong>Location:</strong> {personagem.location.name}</p>
          <p className={style.paragrafo}><strong>Origin:</strong> {personagem.origin.name}</p>
          </div>

        
        </div>
        <img src={personagem.image} className={style.image} />
      </div>



      
      <h2 id={style.titulo}>{personagem.name} appears in the following episodes:</h2>
      <div className={style.episodiosContainer}>
        {episodios.length ? (
          episodios.map((episodio) => (
            <Link
              key={episodio.id}
              to={`/episodio/${episodio.id}`}
              className={style.episodioCard}
            >
              <h3>{episodio.name}</h3>
              <div>
                <p><strong>Air Date:</strong> {episodio.air_date}</p>
                <p><strong>Episode:</strong> {episodio.episode}</p>
              </div>
              
            </Link>
          ))
        ) : (
          <p>Este personagem não aparece em nenhum episódio.</p>
        )}
      </div>

      
    </div>
  );
};
