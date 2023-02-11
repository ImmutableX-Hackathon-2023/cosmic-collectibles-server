import { Request, Response } from 'express';
import { request } from 'http';
import {ImmutableX, Config } from "@imtbl/core-sdk";


const config = Config.SANDBOX; // Or Config.PRODUCTION
const client = new ImmutableX(config);

async function getRocket(Request: Request, Response: Response) {
  console.log("In getRocket")
    if (Request.headers.wallet_address && Request.headers.wallet_address[0]) {
      console.log("Inside if getRocket branch")
        const wallet_address = Request.headers.wallet_address[0];
        try{
        const result = await getListAssets(wallet_address, 'name')
        console.log(result);
        console.log("You are in the .then block something");
        return Response.status(200).json({"msg":result});
        }
        catch(error){
          return Response.status(400).json(error);
          
        }
      }
}

export {
    getRocket
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


