function PopupWithForm({title, name, children, isOpen, onClose, onSubmit}) {

    const isPopupOpen = isOpen ? 'popup_opened' : ''

    return (
            <div className={`popup ${name} ${isPopupOpen}`}>
                <div className="popup__container">
                    <button
                        aria-label="Close"
                        className={`popup__close-icon ${name}__close-icon`}
                        type="button"
                        onClick={onClose}
                    />
                    <form className={`popup__form ${name}__form`} name={`${name}-form`} noValidate onSubmit={onSubmit}>
                        <h2 className="popup__form-title">{title}</h2>
                        {children}
                        <button
                            aria-label="Save"
                            className={`popup__form-submit-button ${name}__form-submit-button`}
                            type="submit"
                        >
                            Сохранить
                        </button>
                    </form>
                </div>
            </div>)
}

export default PopupWithForm