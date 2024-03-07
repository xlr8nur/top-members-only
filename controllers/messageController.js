const Message = require('../models/message');
const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');

exports.create_message_post = [
    body('message', 'message must contain at least 3 characters')
        .trim()
        .isLength({min:3, max: 300})
        .escape(),

        asyncHandler(async (req, res, next) => {
            const errors = validationResult(req);

            if(!errors.isEmpty()) {
                res.render('new', {
                    title: 'Send a message, it is empty right now!',
                    errors: errors.array(),
                });
            } else {
                try {
                    const messageText = req.body.message;
                    const userId = req.user._id;

                    const message = new Message({
                        author: userId,
                        text: messageText
                    })

                    const result = await message.save();
                    res.redirect('/');
                }
                catch (err) {
                    return next (err);
                }
            }
        }),
];

exports.get_messages = asyncHandler(async (req, res, next) => {
    try {
        const messages = await Message.find()
            .sort({createdAt: -1})
            .limit(12)
            .populate('author', 'username')
            .exec();
        res.render('index', {title:'Express', messages});
    }
    catch (err) {
        return next(err);
    }
});

exports.delete_message = asyncHandler(async (req, res, next) => {
    try {
        const messageId = req.params.id;
        const message = await Message.findByIdAndDelete(messageId);

        res.redirect('/');
    }
    catch (err) {
        return next (err);
    }
});