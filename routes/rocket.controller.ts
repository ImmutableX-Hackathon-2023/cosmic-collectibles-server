import { Request, Response } from 'express';

interface METADATA_TEMPLATE {
    id: number,
    name: string,
    description: string,
    image_url: string 
    speed: number,
    health: number,
    laserstrength: number,
    fuel: number,
    rating: number,
}

// Call with a wallet address to receive a blank, level 1 rocket.
function createRocket(req: Request, res: Response) {
    const wallet_address = req.headers.wallet_address;

}

export {
    createRocket
}