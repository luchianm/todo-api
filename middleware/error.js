module.exports = async function (err, req, res, next) {
    err.details && res.status(400).send(err.details);
    err.response && res.status(err.response.status).send(err.response.data.reason);
}