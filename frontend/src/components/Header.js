import headerLogo from "../images/logo.svg";

function Header() {
    return (<header className="header">
        <img
            alt="Место лого"
            className="header__logo"
            src={headerLogo}
        />
    </header>)
}

export default Header