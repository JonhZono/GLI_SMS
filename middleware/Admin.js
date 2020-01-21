module.exports = (req, res, next) =>{
    if(req.user.role !== 'admin' ){
        return res.send('You dont have correct privilege to perform this operation.')
    }
    next();
}
