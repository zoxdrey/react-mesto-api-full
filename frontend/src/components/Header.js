import headerLogo from "../images/logo.svg";
import {Route, Switch} from "react-router";
import {Link} from "react-router-dom";

function Header({email, onSignOut}) {

    return (<header className="header">
        <img
            alt="Место лого"
            className="header__logo"
            src={headerLogo}
        />
        <Switch>

            <Route exact path='/sign-up'>
                <Link className='header__link' to='/sign-in'>
                    Войти
                </Link>
            </Route>
            <Route exact path='/sign-in'>
                <Link className='header__link' to='/sign-up'>
                    Регистрация
                </Link>
            </Route>
            <Route exact path='/'>
                <div className='header__text-wrapper'>
                    <p className='header__user-email'>{email}</p>
                    <Link className='header__link' onClick={onSignOut} to='/'>
                        Выйти
                    </Link>
                </div>
            </Route>
        </Switch>
    </header>)
}

export default Header