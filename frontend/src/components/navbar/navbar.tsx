import "./navbar.sass";
import logo from "../../assets/placeholder.png"
export default function() {
    return (
        <div className={"navbarContainer"}>
            <a href="/"><img src={logo} alt="Site Logo"/></a>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/lost">Lost a Pet</a></li>
                <li><a href="/found">Found a pet</a></li>
                <li><a href="/search">Search for a pet</a></li>
            </ul>
        </div>
    );
}