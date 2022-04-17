import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Home, Navbar } from "./pages/index"
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import { Affix, AppShell, Button, UnstyledButton, Image, Group, Header, MantineProvider } from "@mantine/core";
import "./reset.scss"
import Lost from './pages/lost/lost';
import Found from './pages/found/found';
import Search from './pages/search/search';
import { Auth } from './components/auth/auth';
import {
    NotificationsProvider,
    showNotification,
} from "@mantine/notifications";
import logo from "./assets/placeholder.png"
import Background from "./components/background/background";
import MenuIcon from '@mui/icons-material/Menu';
// import Background from "./components/background2/background";
// import Background from "./components/background3/background";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

export const authStatusContext = React.createContext<{
    phoneNumber: string
} | undefined>(undefined);

root.render(
    <React.StrictMode>
        <Background/>
        <MantineProvider theme={{ colorScheme: 'dark' }}>
            <NotificationsProvider position="top-right" zIndex={2077}>
                {/*<AppShell*/}
                {/*    padding="md"*/}
                {/*    header={*/}
                {/*        <Header height={70} p="xs">*/}
                {/*            <Group position="apart">*/}
                {/*                <UnstyledButton component="a" href="/">*/}
                {/*                    <Image*/}
                {/*                        radius="md"*/}
                {/*                        src={logo}*/}
                {/*                        alt="Random unsplash image"*/}
                {/*                        width={50} height={50}*/}
                {/*                    />*/}
                {/*                </UnstyledButton>*/}
                {/*                <Group position="right" className={"navButtons"}>*/}
                {/*                    <Button variant="subtle" color="dark" component="a" href="/lost">*/}
                {/*                        Lost*/}
                {/*                    </Button>*/}
                {/*                    <Button variant="subtle" color="dark" component="a" href="/found">*/}
                {/*                        Found*/}
                {/*                    </Button>*/}
                {/*                    <Button variant="subtle" color="dark" component="a" href="/search">*/}
                {/*                        Search*/}
                {/*                    </Button>*/}
                {/*                    <Auth />*/}
                {/*                </Group>*/}
                {/*            </Group>*/}
                {/*        </Header>*/}
                {/*    }>*/}
                <Navbar/>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/lost" element={<Lost />} />
                            <Route path="/found" element={<Found />} />
                            <Route path="/search" element={<Search />} />
                        </Routes>
                    </BrowserRouter>
                {/*</AppShell>*/}
            </NotificationsProvider>
        </MantineProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
