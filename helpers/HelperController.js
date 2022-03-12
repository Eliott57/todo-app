const genericController = (req, res, cb) => {
    try {
        return cb();
    }catch(e){
        res.status(400).json({e});
    }
}

module.exports = genericController;