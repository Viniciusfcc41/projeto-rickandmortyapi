export interface Personagem {
  id: number;
  name: string;
  gender: string;
  status: string;
  species: string;
  image: string;
  origin: {
    name: string
  };
  location: {
    name: string;
  };
}
