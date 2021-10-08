function ImagePopup({card, onClose, isOpen}) {

    const isPopupOpen = isOpen ? 'popup_opened' : ''

    return (
      
        <div className={`popup image-overlay ${isPopupOpen}`}>
            <div className="image-overlay__container">
                <button
                    aria-label="Close"
                    className="popup__close-icon image-overlay__close-icon"
                    type="button"
                    onClick={onClose}
                />
                <figure className="image-overlay__image-wrapper">
                    <img alt="оверлей" className="image-overlay__image"
                         style={{backgroundImage: `url(${card.link})`}}
                         src={`${card.link}`}/>
                    <figcaption className="image-overlay__title"/>
                </figure>
            </div>
        </div>
    )
}

export default ImagePopup
