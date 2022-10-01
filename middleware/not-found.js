const notFoundMiddleware = (req, res) => {
    return res.status(404).send('route does not exist');
}

export default notFoundMiddleware;