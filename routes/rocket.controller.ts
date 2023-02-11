import { Request, Response } from 'express';
import { request } from 'http';
import {ImmutableX, Config} from "@imtbl/core-sdk";

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

// Call with a wallet address to receive a blank, level 1 rocket.
function createRocket(req: Request, res: Response) {
    const wallet_address = req.headers.wallet_address;   
}

// function getRocket(Request: Request, Response: Response) {
//     if (Request.headers.wallet_address && Request.headers.wallet_address[0] && Request.body.collection_address) {
//         const wallet_address = Request.headers.wallet_address[0];
//         const Collection_address = Request.body.collection_address;
//         getListAssets(Collection_address, 'name',wallet_address)
//         .then((result) => {
//           //print the result
//           console.log(result);
//         })
//         .catch((e) => {
//           console.log(e);
//         });
//       }
// }
async function getRocket(req: Request, res: Response) {
      console.log("In getRocket")
      console.log("Inside if getRocket branch")
      const collection_address = req.headers.collection_address as string;

        const wallet_address_header = req.headers.wallet_address;
        const wallet_address = wallet_address_header![0];
          
        try{
        const result = await getListAssets(collection_address,'name',wallet_address)
        console.log(result);
        console.log("You are in the try something");
        return res.status(200).json({"msg":result});
        }
        catch(error){
          return res.status(400).json(error);
        }
}



async function getRocketByid(req: Request, res: Response) {
      console.log("in getRocketByid")
      const wallet_address = req.headers.wallet_address![0];
      const id = req.params.id;
      const collection_address = req.headers.collection_address as string;
      console.log("ln94")
      try{
          console.log("In try block of getRocketByid")
          const result = await getListAssetsByid(collection_address, 'name',wallet_address,Number(id))
          return res.status(200).json({mssg:result});
      }
      catch(error){
        console.log("ln103")
        return res.status(400).json(error)
      }
}


export {
    getRocket,
    getRocketByid,
    createRocket
}

