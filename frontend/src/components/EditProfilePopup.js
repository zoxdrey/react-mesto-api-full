import PopupWithForm from "./PopupWithForm";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export const EditProfilePopup = ({isOpen, onClose, onUpdateUser}) => {

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser?.name);
        setDescription(currentUser?.about);
    }, [currentUser, isOpen]);

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm name={'profile-popup'}
                       title={'Редактировать профиль'}
                       isOpen={isOpen}
                       onClose={onClose}
                       onSubmit={handleSubmit}>
            <input
                className="popup__form-input popup__form-input_data_user-name"
                id="user-name"
                maxLength="40"
                minLength="2"
                name="user-name"
                placeholder="Имя"
                required
                value={name || ''} onChange={handleChangeName}
            />
            <span className="user-name-error popup__form-error"/>
            <input
                className="popup__form-input popup__form-input_data_user-profession"
                id="user-profession"
                maxLength="200"
                minLength="2"
                name="user-profession"
                placeholder="Вид деятельности"
                required
                value={description || ''} onChange={handleChangeDescription}
            />
            <span className="user-profession-error popup__form-error"/>
        </PopupWithForm>)
}