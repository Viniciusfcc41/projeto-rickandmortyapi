import type { Episodio } from "../../shared/types/episodio";

interface EpisodioDetalhes extends Episodio {

}

export const fetchDetalheEpisodio = async (id: string): Promise<EpisodioDetalhes> => {
  const response = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar detalhes do episódio");
  }
  return response.json();
} 

