import "./navbar.sass";
import logo from "../../assets/placeholder.png"
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { Auth } from "../auth/auth";
import { Button } from "@mantine/core";

export default function () {
    const mobileChangeState = () => {
        let mobileNav = document.getElementById("mobile_nav")
        if (mobileNav)
            mobileNav.classList.toggle("hidden")
    }

    const getNavbarLinks = () => {
        return (<>
            <li>
                <Button variant="subtle" color="dark" component="a" href="/">
                    Home
                </Button>
            </li>
            <li>
                <Button variant="subtle" color="dark" component="a" href="/lost">
                    Lost a Pet
                </Button>
            </li>
            <li>
                <Button variant="subtle" color="dark" component="a" href="/found">
                    Found a pet
                </Button>
            </li>
            <li>
                <Button variant="subtle" color="dark" component="a" href="/search">
                    Search for a pet
                </Button>
            </li>
            <li>
                <Auth />
            </li>
        </>);
    }

    return (
        <div className={"navbarContainer"}>
            <a href="/"><img src={logo} alt="Site Logo" /></a>
            <ul className={"computer"}>
                {getNavbarLinks()}
                <MenuIcon className={"hamburgerMenu"} onClick={mobileChangeState} style={{color:"white"}}/>
            </ul>
            <ul className={"mobile hidden"} id={"mobile_nav"}>
                <CloseIcon className={"closeIcon"} onClick={mobileChangeState} style={{color:"white"}}/>
                {getNavbarLinks()}
            </ul>
        </div>
    );
}