import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Home, Navbar } from "./pages/index"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import "./reset.scss"
import Lost from './pages/lost/lost';
import Found from './pages/found/found';
import Search from './pages/search/search';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

export const authStatusContext = React.createContext<{
    phoneNumber: string
} | undefined>(undefined);

root.render(
    <React.StrictMode>
        <MantineProvider theme={{ colorScheme: 'light' }}>
            <Navbar/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/lost" element={<Lost />} />
                    <Route path="/found" element={<Found />} />
                    <Route path="/search" element={<Search />} />
                </Routes>
            </BrowserRouter>
        </MantineProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
