import styled from "styled-components"
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
export default function SessionsPage(props) {
    const {sessions, setSessions} = props;
    /*     const movID = props.movies.id; */
    const {idFilme} = useParams();
    useEffect(() => {
        const url = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`;
		const requisicao = axios.get(url);
        requisicao.then(resposta => {
            setSessions(resposta.data);

		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if(sessions.length === 0) {
		return "Carregando...."
	}
    return (
        <PageContainer>
            Selecione o horário
            <div>
                {sessions.days.map((sessao) => ( 
        (
            <SessionContainer key={sessao.id} data-test="movie-day" >
           {sessao.weekday} {sessao.date}
                            <ButtonsContainer>
                       {sessao.showtimes.map(times => <Link to={`/assentos/${times.id}`} key={times.id}><button   data-test="showtime">{times.name}</button></Link>)}         
            </ButtonsContainer>
        </SessionContainer>
 
       )))}
            </div>

            <FooterContainer data-test="footer">
                <div>
                    <img src={sessions.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{sessions.title}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
    }
    a {
        text-decoration: none;
    }
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
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
`