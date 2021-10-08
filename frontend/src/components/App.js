import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import {useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import {EditProfilePopup} from "./EditProfilePopup";
import {EditAvatarPopup} from "./EditAvatarPopup";
import {AddPlacePopup} from "./AddPlacePopup";
import {Route, Switch} from 'react-router-dom';
import {Login} from "./Login";
import {Register} from "./Register";
import {Redirect, useHistory} from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import {InfoTooltip} from "./InfoTooltip";
import authApi from "../utils/authApi";

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState();
    const [cards, setCards] = useState([]);
    const [email, setEmail] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false)
    const history = useHistory();


    useEffect(() => {
        if (isLoggedIn) {
            api.getUserInfo().then(data => {
                setCurrentUser(data)
            }).catch(err => handleResponseError(err))
        }
    }, [isLoggedIn])

    useEffect(() => {
        if (isLoggedIn) {
            api.getInitialCards().then(data => {
                setCards(data);
            }).catch(err => handleResponseError(err))
        }
    }, [isLoggedIn])

    useEffect(() => {
        const token = getUserToken();
        if (token) {
            authApi.getUserEmailByToken(token).then((data) => {
                    setEmail(data.data.email);
                    setIsLoggedIn(true);
                    history.push('/')
                }
            ).catch((err) => {
                console.log(err)
                setEmail('');
                setIsLoggedIn(false);
                history.push('/sign-in')
            })
        }
    }, [])

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

    function handleCardClick(card) {
        setIsImagePopupOpen(true);
        setSelectedCard(card)
    }

    function closeAllPopups() {
        setIsAddPlacePopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsImagePopupOpen(false);
        setIsInfoTooltipOpen(false);
    }

    function handleUpdateUser(user) {
        api.setUserInfo(user.name, user.about).then(data => {
            setCurrentUser(data);
            closeAllPopups();
        }).catch(err => handleResponseError(err))

    }

    function handleUpdateAvatar({avatar}) {
        api.setUserAvatar(avatar).then(data => {
            setCurrentUser(data);
            closeAllPopups();
        }).catch(err => handleResponseError(err))

    }

    function handleResponseError(err) {
        console.log(err)
    }


    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        }).catch(err => handleResponseError(err));
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id).then((data) => {
            setCards((state) => state.filter(item => item._id !== card._id));
        }).catch(err => handleResponseError(err));
    }

    function handleAddPlaceSubmit({placeName, placeLink}) {
        api.createCard(placeName, placeLink).then(newCard => {
            setCards((state) => [newCard, ...state]);
            closeAllPopups();
        }).catch(err => handleResponseError(err))

    }

    function onRegister(user) {
        authApi.signup(user).then((data) => {
            setIsRegistrationSuccess(true);
            setIsInfoTooltipOpen(true);
            history.push('/sign-in')
        }).catch((err) => {
            setIsRegistrationSuccess(false);
            setIsInfoTooltipOpen(true);
            console.log(err);
        })
    }

    function onLogin(user) {
        authApi.signin(user).then(data => {
            localStorage.setItem('jwt', data.token);
            setIsLoggedIn(true);
            setEmail(user.email);
            history.push('/');
        }).catch((err) => {
            console.log(err);
        })

    }

    function onSignOut() {
        localStorage.removeItem('jwt');
        history.push('/sign-in');
        setIsLoggedIn(false);
        setEmail('');
    }

    function getUserToken() {
        return localStorage.getItem('jwt')
    }

    return (
        <div className="App">

            <div className="page">
                <div className="page__wrapper">
                    <CurrentUserContext.Provider value={currentUser}>
                        <Header email={email} onSignOut={onSignOut}/>
                        <Switch>
                            <Route exact path="/sign-in">
                                <Login onSubmit={onLogin}/>
                            </Route>
                            <Route exact path="/sign-up">
                                <Register onSubmit={onRegister}/>
                            </Route>
                            <ProtectedRoute path="/" loggedIn={isLoggedIn}
                                            component={Main}
                                            onEditProfile={handleEditProfileClick}
                                            onAddPlace={handleAddPlaceClick}
                                            onEditAvatar={handleEditAvatarClick}
                                            selectedCard={selectedCard}
                                            onCardClick={handleCardClick}
                                            cards={cards}
                                            onCardLike={handleCardLike}
                                            onCardDelete={handleCardDelete}/>
                            <Route path="*">
                                {isLoggedIn ? <Redirect to="/"/> : <Redirect to="/sign-in"/>}
                            </Route>
                        </Switch>
                        {isLoggedIn && <Footer/>}

                        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                                          onUpdateUser={handleUpdateUser}/>

                        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}
                                       onAddPlace={handleAddPlaceSubmit}/>

                        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                                         onUpdateAvatar={handleUpdateAvatar}/>

                        <PopupWithForm name={'popup-delete'} title={'Вы уверены?'} onClose={closeAllPopups}>
                            <h2 className="popup__form-title popup__form-title-delete">Вы уверены?</h2>
                            <button
                                aria-label="Save"
                                className="popup__form-submit-button popup-delete__form-submit-button"
                                type="submit"
                            >
                                Да
                            </button>
                        </PopupWithForm>

                        <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen}/>

                        <InfoTooltip onClose={closeAllPopups} isOpen={isInfoTooltipOpen}
                                     isRegistrationSuccess={isRegistrationSuccess} infoMessage={isRegistrationSuccess ?
                            "Вы успешно зарегистрировались" :
                            "Что-то пошло не так\n Попробуйте еще раз."}/>

                    </CurrentUserContext.Provider>
                </div>
            </div>

        </div>
    );
}

export default App;
