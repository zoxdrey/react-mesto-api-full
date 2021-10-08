import PopupWithForm from "./PopupWithForm";
import React from "react";

export const AddPlacePopup = ({isOpen, onClose, onAddPlace}) => {

    const [placeName, setPlaceName] = React.useState('');
    const [placeLink, setPlaceLink] = React.useState('');

    React.useEffect(() => {
        setPlaceName('')
        setPlaceLink('');
    }, [isOpen]);

    function handleChangePlaceName(e) {
        setPlaceName(e.target.value)
    }

    function handleChangePlaceLink(e) {
        setPlaceLink(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            placeName,
            placeLink
        });

    }


    return (
        <PopupWithForm name={'popup-place'} title={'Новое место'} isOpen={isOpen}
                       onClose={onClose} onSubmit={handleSubmit}>
            <input
                className="popup__form-input popup__form-input_data_place-name"
                id="place-name"
                maxLength="30"
                minLength="2"
                name="place-name"
                placeholder="Название"
                required
                value={placeName} onChange={handleChangePlaceName}
            />
            <span className="place-name-error popup__form-error"/>
            <input
                className="popup__form-input popup__form-input_data_place-link"
                id="place-link"
                name="place-link"
                placeholder="Ссылка на картинку"
                required
                type="url"
                value={placeLink} onChange={handleChangePlaceLink}
            />
            <span className="place-link-error popup__form-error"/>
        </PopupWithForm>
    )
}