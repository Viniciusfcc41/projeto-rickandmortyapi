import type { Local } from "../../shared/types/local";

interface LocalDetalhes extends Local{
    
}

export const fetchDetalheLocal = async (id:string): Promise<LocalDetalhes> =>{
     const response = await fetch(`https://rickandmortyapi.com/api/location/${id}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar detalhes da localização");
  }
  return response.json();
}