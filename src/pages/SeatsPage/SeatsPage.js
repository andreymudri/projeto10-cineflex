import styled from "styled-components";
import axios from "axios";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
export default function SeatsPage(props) {
  const {
    selected,
    setSelected,
    setNome,
    setCpf,
    nome,
    cpf,
    seats,
    setSeats,
    poltrona,
    setPoltrona,
  } = props;
  const { idSessao } = useParams();
  const reserva = {
    ids: selected,
    name: nome,
    cpf: cpf
  };

  useEffect(() => {
    console.log("selected seats:", selected);
    console.log("numero do assento:", poltrona);
  }, [selected]);
  useEffect(() => {
    const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`;
    const requisicao = axios.get(url);

    requisicao.then((resposta) => {
      setSeats(resposta.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function handlereservation() {
    console.log(reserva);
    const url = `https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many`;
    const requisicao = axios.post(url, reserva);

    requisicao.then((resposta) => {
      console.log(resposta.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  if (seats.length === 0) {
    return "Carregando....";
  }
  function handleseat(seatId, assento, banco) {
    if (assento) {
      if (selected.includes(seatId)) {
        setSelected(selected.filter((id) => id !== seatId));
        setPoltrona(poltrona.filter((poltrona) => poltrona !== banco));
      } else {
        setSelected([...selected, seatId]);
        setPoltrona([...poltrona, banco]);
      }
    } else {
      alert("assento já escolhido");
    }
  }

  return (
    <PageContainer>
      Selecione o(s) assento(s)
      <SeatsContainer>
        {seats.seats.map((assento, index) => (
          <SeatItem
            className={
              selected.includes(assento.id)
                ? "selected"
                : assento.isAvailable
                ? "available"
                : "unavailable"
            }
            key={index}
            disabled={!assento.isAvailable}
            onClick={() =>
              handleseat(assento.id, assento.isAvailable, assento.name)
            }
            data-test="seat"
          >
            {assento.name}
          </SeatItem>
        ))}
      </SeatsContainer>
      <CaptionContainer>
        <CaptionItem>
          <CaptionCircle className={"selected"} />
          Selecionado
        </CaptionItem>
        <CaptionItem>
          <CaptionCircle className={"available"} />
          Disponível
        </CaptionItem>
        <CaptionItem>
          <CaptionCircle className={"unavailable"} />
          Indisponível
        </CaptionItem>
      </CaptionContainer>
      <FormContainer>
        Nome do Comprador:
        <input
          type="text"
          placeholder="Digite seu nome..."
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          data-test="client-name"
        />
        CPF do Comprador:
        <input
          type="number"
          placeholder="Digite seu CPF..."
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          data-test="client-cpf"
        />
        <Link to="/sucesso">
          <button onClick={() => handlereservation()} data-test="book-seat-btn">
            Reservar Assento(s)
          </button>
        </Link>
      </FormContainer>
      <FooterContainer data-test="footer">
        <div>
          <img src={seats.movie.posterURL} alt="poster" />
        </div>
        <div>
          <p>{seats.movie.title}</p>
          <p>
            {seats.day.weekday} - {seats.name}
          </p>
        </div>
      </FooterContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-bottom: 120px;
  padding-top: 70px;
`;
const SeatsContainer = styled.div`
  width: 330px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
const FormContainer = styled.div`
  width: calc(100vw - 40px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
  font-size: 18px;
  button {
    align-self: center;
  }
  input {
    width: calc(100vw - 60px);
  }
`;
const CaptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  justify-content: space-between;
  margin: 20px;
`;
const CaptionCircle = styled.div`
  border: 1px solid blue; // Essa cor deve mudar
  background-color: lightblue; // Essa cor deve mudar
  height: 25px;
  width: 25px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
  &.available {
    background-color: #c3cfd9;
    border: 1px solid #7b8b99;
  }
  &.unavailable {
    background-color: #fbe192;
    border: 1px solid #f7c52b;
  }
  &.selected {
    background-color: #1aae9e;
    border: 1px solid #0e7d71;
  }
`;
const CaptionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
`;
const SeatItem = styled.div`
  border: 1px solid blue; // Essa cor deve mudar
  background-color: lightblue; // Essa cor deve mudar
  height: 25px;
  width: 25px;
  border-radius: 25px;
  font-family: "Roboto";
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
  &.available {
    background-color: #c3cfd9;
    border: 1px solid #7b8b99;
  }
  &.unavailable {
    background-color: #fbe192;
    border: 1px solid #f7c52b;
  }
  &.selected {
    background-color: #1aae9e;
    border: 1px solid #0e7d71;
  }
`;
const FooterContainer = styled.div`
  width: 100%;
  height: 120px;
  background-color: #c3cfd9;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
  position: fixed;
  bottom: 0;

  div:nth-child(1) {
    box-shadow: 0px 2px 4px 2px #0000001a;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    margin: 12px;
    img {
      width: 50px;
      height: 70px;
      padding: 8px;
    }
  }

  div:nth-child(2) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    p {
      text-align: left;
      &:nth-child(2) {
        margin-top: 10px;
      }
    }
  }
`;
