import "./paginacao.css"

interface PaginacaoProps {
  paginaAtual: number;
  totalPaginas: number;
  irParaPagina: (pagina: number) => void;
}

export const Paginacao: React.FC<PaginacaoProps> = ({
  paginaAtual,
  totalPaginas,
  irParaPagina,
}) => {
  const irParaPaginaAnterior = () => {
    if (paginaAtual > 1) {
      irParaPagina(paginaAtual - 1);
    }
  };

  const irParaProximaPagina = () => {
    if (paginaAtual < totalPaginas) {
      irParaPagina(paginaAtual + 1);
    }
  };

  const gerarBotoesPaginacao = () => {
    const botoes = [];

    for (let i = 1; i <= totalPaginas; i++) {
      if (
        i === 1 ||
        i === totalPaginas ||
        (i >= paginaAtual - 1 && i <= paginaAtual + 1)
      ) {
        botoes.push(
          <button
            key={i}
            onClick={() => irParaPagina(i)}
            style={
              
              
              {
              fontWeight: i === paginaAtual ? "bold" : "normal",
              background: i === paginaAtual ? "#ffa500" : "transparent",
              border: i === paginaAtual ? "none" : "solid 2px #ffa500",
              color: i === paginaAtual ? "#fff" : "#000",
            }}
            className="botoesNumerados"
          >
            {i}
          </button>
        );
      } else if (
        (i === paginaAtual - 2 && i > 2) ||
        (i === paginaAtual + 2 && i < totalPaginas - 1)
      ) {
        botoes.push(<span key={`ellipsis-${i}`}>...</span>);
      }
    }

    return botoes;
  };

  return (
    <div className="teste">
      <button onClick={irParaPaginaAnterior} disabled={paginaAtual === 1}>
        Anterior
      </button>
      {gerarBotoesPaginacao()}
      <button
        onClick={irParaProximaPagina}
        disabled={paginaAtual === totalPaginas}
      >
        Próxima
      </button>
    </div>
  );
};
