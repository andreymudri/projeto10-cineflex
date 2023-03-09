import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import {useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
export default function App() {
    // eslint-disable-next-line no-unused-vars
    const [movies, setMovies] = useState([])
    const [sessions, setSessions] = useState([])
    const [seats, setSeats] = useState([])
    const [selected, setSelected] = useState([])
    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    const [poltrona, setPoltrona] = useState([])
    return (
        <>
            <NavContainer>CINEFLEX</NavContainer>
            <BrowserRouter>
            <Routes>

                              <Route path="/" element={<HomePage
                movies={movies}
                setMovies={setMovies} /> }/>

          <Route path='/sessoes/:idFilme' element={<SessionsPage
            sessions={sessions}
                setSessions={setSessions}
                movies={movies}
            /> } />

          <Route path='/assentos/:idSessao' element={<SeatsPage

                    selected={selected}
                    setSelected={setSelected}
                    setNome={setNome}
                        setCpf={setCpf}
                        nome ={nome}
                        cpf={cpf}
                        seats={seats}
                        setSeats={setSeats}
                        poltrona={poltrona}
                        setPoltrona={setPoltrona}
                />} />

                    <Route path='/sucesso' element={<SuccessPage
                    movies ={movies}
                    sessions ={sessions}
                    selected ={selected}
                    nome ={nome}
                    cpf={cpf}                    
                        seats={seats}
                        poltrona={poltrona}

                    />} />
                </Routes>
                </BrowserRouter>
        </>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
