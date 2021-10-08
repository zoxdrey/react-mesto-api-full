import React from "react";
import editIcon from '../images/profile-edit-btn-icon.svg'
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main({
                  onEditProfile,
                  onAddPlace,
                  onEditAvatar,
                  onCardClick,
                  cards,
                  onCardLike,
                  onCardDelete,
              }) {

    const currentUser = React.useContext(CurrentUserContext);


    return (
        <main className="main-content">
            <section className="profile">
                <div className="profile__wrapper">

                    <div className="profile__overlay" onClick={onEditAvatar}>
                        <img alt="Редактировать"
                             className="profile__overlay-edit"
                             src={editIcon}/>
                    </div>
                    <img
                        alt="Кусто"
                        className="profile__avatar"
                        style={{backgroundImage: `url(${currentUser?.avatar})`}}
                        src={`${currentUser?.avatar}`}
                    />
                    <div className="profile-info">
                        <div className="profile-info__text">
                            <div className="profile-info__header">
                                <h1 className="profile-info__title">{currentUser?.name}</h1>
                                <button
                                    aria-label="Edit"
                                    className="profile-info__edit-button"
                                    type="button"
                                    onClick={onEditProfile}
                                />
                            </div>
                            <p className="profile-info__subtitle">{currentUser?.about}</p>
                        </div>
                    </div>
                </div>
                <button
                    aria-label="Add"
                    className="profile__add-button"
                    type="button"
                    onClick={onAddPlace}
                />
            </section>

            <section className="photo-grid">
                <ul className="photo-cards-list">
                    {cards.length > 0 && cards.map((card) => {
                        return (
                            <Card onCardLike={onCardLike} onCardDelete={onCardDelete}
                                  key={card._id} card={card} onCardClick={onCardClick}/>
                        )
                    })}
                </ul>
            </section>


        </main>
    )
}

export default Main