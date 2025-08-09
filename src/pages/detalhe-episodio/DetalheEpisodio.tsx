import { useParams, useNavigate, Link } from "react-router-dom";
import type { Personagem } from "../../shared/types/personagem";
import type { Episodio } from "../../shared/types/episodio";
import { useEffect, useState } from "react";
import { fetchDetalheEpisodio } from "../../service/fetch-detalhe-episodio";
import "../../style/detalheEpisodio.css";

interface EpisodioDetalhes extends Episodio {}

export const DetalheEpisodio = () => {
      const { id } = useParams();
      const navigate = useNavigate();
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
        <div className="main">
        <h2 id="titulo">Episode details</h2>
        <div className="mainCard">
            <h1>{episodio.name}</h1>
        </div>
        </div>
      )
}