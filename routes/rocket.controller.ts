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
    if (Request.headers.wallet_address && Request.headers.wallet_address[0] && Request.body.collection_address) {
        const wallet_address = Request.headers.wallet_address[0];
        const Collection_address = Request.body.collection_address;
        getListAssets(Collection_address, 'name',wallet_address)
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
    orderBy: 'updated_at' | 'name',
    walletAddress: string
  ) => {
    const response = await client.listAssets({
      collection: collectionAddress,
      user:walletAddress,
      orderBy: orderBy,
    });
    return response.result;
  };



function getRocketByid(Request: Request, Response: Response) {
  if (Request.headers.wallet_address && Request.headers.wallet_address[0] && Request.body.collection_address) {
      const wallet_address = Request.headers.wallet_address[0];
      const id = Request.params.id;
      const Collection_address = Request.body.collection_address;
      getListAssetsByid(Collection_address, 'name',wallet_address,Number(id))
      .then((result) => {
        //print the result
        console.log(result);
      })
      .catch((e) => {
        console.log(e);
      });
    }
}


const getListAssetsByid = async (
  collectionAddress: string,
  orderBy: 'updated_at' | 'name',
  walletAddress: string,
  id : number
) => {
  const response = await client.listAssets({
    collection: collectionAddress,
    user:walletAddress,
    orderBy: orderBy,
  });
  return response.result[id];
}; 





export {
    getRocket,
    getRocketByid,
    createRocket
}