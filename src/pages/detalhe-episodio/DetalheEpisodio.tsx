import { useParams, Link } from "react-router-dom";
import type { Personagem } from "../../shared/types/personagem";
import type { Episodio } from "../../shared/types/episodio";
import { useEffect, useState } from "react";
import { fetchDetalheEpisodio } from "../../service/fetch-detalhe-episodio";
import style from "../../style/detalheEpisodio.module.css"

interface EpisodioDetalhes extends Episodio {}

export const DetalheEpisodio = () => {
      const { id } = useParams();
      const [episodio, setEpisodio] = useState<EpisodioDetalhes | null>(null);
      const [personagens, setPersonagens] = useState<Personagem[]>([]);
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        const fetchData = async () => {
          if (!id) {
            console.error("ID do personagem não fornecido");
            return;
          }
          try {
            setLoading(true);
            const data = await fetchDetalheEpisodio(id);
            setEpisodio(data);
    
            // Buscar detalhes de todos os episódios
            if (data.characters?.length) {
              const episodiosData = await Promise.all(
                data.characters.map((url: string) =>
                  fetch(url).then((response) => response.json())
                )
              );
              setPersonagens(episodiosData);
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
      if (!episodio) return <p>Episódio não encontrado.</p>;

      return(
        <div className={style.body}>
        <h1 className={style.titulo}>Episode details</h1>
        <div className={style.episodioCard}>
            <h1 className={style.titulo}>{episodio.name}</h1>
            <div>
               <p className={style.paragrafo}><strong>Air Date:</strong> {episodio.air_date}</p>
               <p className={style.paragrafo}><strong>Episode:</strong> {episodio.episode}</p>
            </div>

        </div>

      <h2 className={style.titulo}>{episodio.name} features the following characters:</h2>
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
          <p>Este episódio não tem personagens.</p>
        )}
      </div>
        </div>
      )
}

/*


*/