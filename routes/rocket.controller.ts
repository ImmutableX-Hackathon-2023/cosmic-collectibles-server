import { Request, Response } from 'express';
import { Wallet as EthersWallet, AlchemyProvider, Provider } from 'ethers';
import {ImmutableX, Config, MintUser, CreateExchangeAndURLAPIRequestProviderEnum, Mint, UnsignedMintRequest, generateStarkPrivateKey, createStarkSigner} from "@imtbl/core-sdk";
import { ImmutableMethodParams, ImmutableXClient } from "@imtbl/imx-sdk";
import axios from 'axios'
import sqlite3 from 'sqlite3'
import { Wallet } from 'ethers';
import { v4 as uuid } from 'uuid';
import { keccak256 } from '@ethersproject/keccak256';
import { toUtf8Bytes } from '@ethersproject/strings';
import BN from 'bn.js'; // https://www.npmjs.com/package/bn.js
import * as encUtils from 'enc-utils'; // https://www.npmjs.com/package/enc-utils
import { MintBodyCodec } from 'imx-sdk';
const config = Config.SANDBOX; // Or Config.PRODUCTION
const client = new ImmutableX(config);


const CONTRACT_ADDRESS = '0x2021ca07c0be453ff54ddcc3b6d05f53eaf561b0';

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
  console.log(response);
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
async function createRocket(req: Request, res: Response) {

  // mintFunc(req.headers.wallet_address as);


}

// Called during the game to update rocket attributes we need in real time.
async function updateRocket(req: Request, res: Response) {  

}

// Called after a game, to save final state to blockchain
async function syncRocketToBlockchain(req: Request, res: Response) {

}


interface allRocketsResult {
  "token_address": string,
  "token_id": string,
  "id":string,
  "user": string,
  "status":string,
  "uri": string|null,
  "name": string|null,
  "description": string|null,
  "image_url": string|null,
  "metadata":string|null,
  "collection": {
    "name": string,
    "icon_url":string
  }
}


async function getRocket(req:Request, res:Response){
  console.log("In getRocket")
  try{
    const data = await axios.get(`https://api.sandbox.x.immutable.com/v1/assets?collection=${CONTRACT_ADDRESS}`);
     const newData= data.data.result.filter((element: allRocketsResult) => {
     return (element.user as string).toLowerCase() === (req.headers.wallet_address as string).toLowerCase();
    })
    // console.log(newData)
    return res.status(200).json(newData);
  }
  catch(error){
    console.error(error);
    return res.status(200).json(error);
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

