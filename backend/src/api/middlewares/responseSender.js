const responseSender = (req, res, next) => {
    const message = {};
    message.data = req.responseObject || null;
    message.success = true;
    message.status = req.responseStatus || 200;
    return res.status(message.status).send(message);
};
module.exports = {
    responseSender,
};