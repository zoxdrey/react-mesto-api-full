import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import React from "react";

export const EditAvatarPopup = ({isOpen, onClose, onUpdateAvatar}) => {

    const [avatar, setAvatar] = React.useState('');
    const imageRef = React.useRef();
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setAvatar(currentUser?.avatar)
    }, [currentUser]);

    React.useEffect(() => {
        setAvatar('')
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: imageRef.current.value,
        });

    }

    return (
        <PopupWithForm name={'popup-avatar'} title={'Обновить аватар'} isOpen={isOpen}
                       onClose={onClose} onSubmit={handleSubmit}>
            <input
                ref={imageRef}
                className="popup__form-input popup__form-input_data_avatar-link"
                id="avatar-link"
                name="avatar-link"
                placeholder="Ссылка на аватар"
                required
                type="url"
                defaultValue=""
                value={avatar}
            />
            <span className="avatar-link-error popup__form-error"/>
        </PopupWithForm>)
}