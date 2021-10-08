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

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
    const [selectedCard, setSelectedCard] = useState({})
    const [currentUser, setCurrentUser] = useState()
    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.getUserInfo().then(data => {
            setCurrentUser(data)
        }).catch(err => handleResponseError(err))
    }, [])

    useEffect(() => {
        api.getInitialCards().then(data => {
            setCards(data);
        }).catch(err => handleResponseError(err))
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

    return (
        <div className="App">

            <div className="page">
                <div className="page__wrapper">
                    <CurrentUserContext.Provider value={currentUser}>
                        <Header/>
                        <Main
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onEditAvatar={handleEditAvatarClick}
                            selectedCard={selectedCard}
                            onCardClick={handleCardClick}
                            cards={cards}
                            onCardLike={handleCardLike}
                            onCardDelete={handleCardDelete}
                        />

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

                        <Footer/>
                    </CurrentUserContext.Provider>
                </div>
            </div>

        </div>
    );
}

export default App;
