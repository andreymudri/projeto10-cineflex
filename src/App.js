import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import {useState} from "react";

export default function App() {
    const [movies, setMovies] = useState([])
    const [sessions, setSessions] = useState([])
    return (
        <>
           <NavContainer>CINEFLEX</NavContainer>
           <SessionsPage
            sessions={sessions}
                setSessions={setSessions}
                movies={movies}
            />
 {/*            <HomePage
                movies={movies}
                setMovies={setMovies} />
            <SeatsPage />

            <SuccessPage /> */}
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
