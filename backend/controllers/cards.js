const Card = require('../models/card');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

module.exports.createCard = (req, res, next) => {
  const {name, link} = req.body;
  const owner = req.user._id;
  Card.create({name, link, owner})
    .then((card) => res.send({card}))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
      }
      next(err);

    }).catch(next);
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const {cardId} = req.params;
  const owner = req.user._id;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
      if (!card.owner.equals(owner)) {
        throw new ForbiddenError('Нельзя удалять чужие карточки');
      }
      Card.deleteOne(card).then(() => res.send({card}));
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      }
      if (err.message === 'Карточка с указанным _id не найдена.') {
        next(new NotFoundError('Карточка с указанным _id не найдена.'));
      }
      next(err);
    }).catch(next);
};

module.exports.likeCard = (req, res, next) => {
  const {cardId} = req.params;
  const owner = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    {$addToSet: {likes: owner}}, // добавить _id в массив, если его там нет
    {
      new: true,
      runValidators: true,
    },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
      res.send({card});
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      }
      if (err.message === 'Карточка с указанным _id не найдена.') {
        next(new NotFoundError('Карточка с указанным _id не найдена.'));
      }
      next();
    }).catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  const {cardId} = req.params;
  const owner = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    {$pull: {likes: owner}},
    {
      new: true,
      runValidators: true,
    },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
      res.send({card});
    })
    .catch((err) => {
      if (err.message === 'Карточка с указанным _id не найдена.') {
        next(new NotFoundError('Карточка с указанным _id не найдена.'));
      }
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      }
      next(err);
    }).catch(next);
};
