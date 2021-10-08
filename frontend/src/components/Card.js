import {CurrentUserContext} from "../contexts/CurrentUserContext";
import React from "react";

function Card({card, onCardClick, onCardLike, onCardDelete}) {


    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser?._id;
    const cardDeleteButtonClassName = (
        `photo-card__trash ${isOwn ? 'photo-card__trash_visible' : ''}`
    );

    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `photo-card__like-icon ${isLiked ? 'photo-card__like-icon_state_active' : ''}`
    );

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card)
    }

    function handleDeleteClick() {
        onCardDelete(card)
    }

    return (
        <li className="photo-card">
            <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button"/>
            <img className="photo-card__image" alt='Изображение'
                 style={{backgroundImage: `url(${card.link})`}}
                 src={`${card.link}`} onClick={handleClick}/>
            <div className="photo-card__header">
                <h2 className="photo-card__title">{card.name}</h2>
                <div className="photo-card__like">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}/>
                    <p className="photo-card__like-count">
                        {card.likes.length}
                    </p>
                </div>
            </div>
        </li>
    )
}

export default Card