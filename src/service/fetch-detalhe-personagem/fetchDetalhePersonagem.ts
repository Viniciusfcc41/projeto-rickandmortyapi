import type { Personagem } from "../../shared/types/personagem";

interface PersonagemDetalhes extends Personagem {

}

export const fetchDetalhePersonagem = async (id: string): Promise<PersonagemDetalhes> => {
  const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar detalhes do personagem");
  }
  return response.json();
} 

