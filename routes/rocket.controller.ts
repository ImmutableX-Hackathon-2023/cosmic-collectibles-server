import { Request, Response } from 'express';
import { request } from 'http';
import {ImmutableX, Config } from "@imtbl/core-sdk";

const config = Config.SANDBOX; // Or Config.PRODUCTION
const client = new ImmutableX(config);

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

function getRocket(Request: Request, Response: Response) {
    if (Request.headers.wallet_address && Request.headers.wallet_address[0]) {
        const wallet_address = Request.headers.wallet_address[0];
        getListAssets(wallet_address, 'name')
        .then((result) => {
          //print the result
          console.log(result);
        })
        .catch((e) => {
          console.log(e);
        });
      }
}

const getListAssets = async (
    collectionAddress: string,
    orderBy: 'updated_at' | 'name'
  ) => {
    const response = await client.listAssets({
      collection: collectionAddress,
      orderBy: orderBy,
    });
    return response.result;
  };




export {
    getRocket,
    createRocket
}