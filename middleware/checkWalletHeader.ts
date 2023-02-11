import {Express, Request, Response, NextFunction} from 'express';

const checkWalletHeader = (req:Request, res:Response, next:NextFunction) => {
    if(req.headers.wallet_address && req.headers.wallet_address[0] && req.headers.collection_address){
        console.log("request has wallet_address pass onto route")
        next();
    }
    //request has no wallet address header
    else{
        return res.status(400).json({mssg:"No wallet_address header"})
    }
}


module.exports.checkWalletHeader = checkWalletHeader;