const express = require('express');
const promotionRouter = express.Router();

const Promotion = require('../models/promotion');


promotionRouter.route('/')
.get((req, res) => {
    Promotion.find().then((promotions) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions);
    })
})
.post((req, res, next) => {
    Promotion.create(req.body)
        .then((promotion) => {
            console.log('Promotion Created', promotion);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promotion);
        })
        .catch((err) => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((req, res) => {
    Promotion.deleteMany()
    .then((response) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);   
    })
    .catch((err) => next(err));
})

promotionRouter.route('/:promotionId')
.get((req, res, next) => {
    Promotion.findById(req.params.promotionId)
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.json(promotion);
    })
    .catch((err) => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(
        `PUT operation not supported on /promotions/ ${req.params.promotionId}`
        );
})
.put((req, res, next) => {
    Partner.findByIdAndUpdate(
        req.params.promotionId,
        {
            $set: req.body,
        },
        { new: true }
    )
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.json(promotion);
})
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Promotion.findByIdAndDelete(req.params.promotionId)
        .then((response) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.json(response);
        })
        .catch((err) => next(err))
})

module.exports = promotionRouter;