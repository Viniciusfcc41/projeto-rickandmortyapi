import { useParams, useNavigate, Link } from "react-router-dom";
import type { Local } from "../../shared/types/local";
import type { Personagem } from "../../shared/types/personagem";
import { useEffect, useState } from "react";
import { fetchDetalheLocal } from "../../service/fetch-detalhe-local";
import style from "../../style/detalheLocal.module.css"

interface LocalDetalhes extends Local {}

export const DetalheLocal = () => {
    
    const { id } = useParams();
          const navigate = useNavigate();
          const [local, setLocal] = useState<LocalDetalhes | null>(null);
          const [personagens, setPersonagens] = useState<Personagem[]>([]);
          const [loading, setLoading] = useState(true);
        
          useEffect(() => {
            const fetchData = async () => {
              if (!id) {
                console.error("ID da localização não fornecido");
                return;
              }
              try {
                setLoading(true);
                const data = await fetchDetalheLocal(id);
                setLocal(data);
        
                // Buscar detalhes de todos as localizações
                if (data.residents?.length) {
                  const locaisData = await Promise.all(
                    data.residents.map((url: string) =>
                      fetch(url).then((response) => response.json())
                    )
                  );
                  setPersonagens(locaisData);
                }
              } catch (error) {
                console.error("Erro ao buscar detalhes da localização:", error);
              } finally {
                setLoading(false);
              }
            };
            fetchData();
          }, [id]);
        
          if (loading) return <p>Carregando...</p>;
          if (!local) return <p>Localização não encontrada.</p>;
    
        return(
        <div className={style.body}>
          <h1 className={style.titulo}>Location details</h1>
          <div className={style.localCard}>
              <h1 className={style.titulo}>{local.name}</h1>
              <div>
                <p className={style.paragrafo}><strong>Dimension:</strong> {local.dimension}</p>
                <p className={style.paragrafo}><strong>Type:</strong> {local.type}</p>
              </div>

          </div>
    
      <h2 className={style.titulo}>{local.name} features the following characters:</h2>
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
          <p>Esssa localização não tem personagens.</p>
        )}
      </div>
    

            </div>
          )
    
}