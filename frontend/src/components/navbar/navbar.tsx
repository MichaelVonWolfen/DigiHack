import "./navbar.sass";
import logo from "../../assets/placeholder.png"
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { Auth } from "../auth/auth";
export default function () {
    const mobileChangeState = () => {
        let mobileNav = document.getElementById("mobile_nav")
        if (mobileNav)
            mobileNav.classList.toggle("hidden")
    }

    const getNavbarLinks = () => {
        return (<>
            <li><a href="/">Home</a></li>
            <li><a href="/lost">Lost a Pet</a></li>
            <li><a href="/found">Found a pet</a></li>
            <li><a href="/search">Search for a pet</a></li>
            <li><Auth /></li>
        </>);
    }

    return (
        <div className={"navbarContainer"}>
            <a href="/"><img src={logo} alt="Site Logo" /></a>
            <ul className={"computer"}>
                {getNavbarLinks()}
                <MenuIcon className={"hamburgerMenu"} onClick={mobileChangeState} />
            </ul>
            <ul className={"mobile hidden"} id={"mobile_nav"}>
                <CloseIcon className={"closeIcon"} onClick={mobileChangeState} />
                {getNavbarLinks()}
            </ul>
        </div>
    );
}