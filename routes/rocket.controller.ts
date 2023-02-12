import { Request, Response } from 'express';
import { AlchemyProvider } from '@ethersproject/providers';
import {ImmutableX, Config, MintUser, CreateExchangeAndURLAPIRequestProviderEnum, Mint, UnsignedMintRequest, generateStarkPrivateKey, createStarkSigner, EthSigner} from "@imtbl/core-sdk";
import { ImmutableMethodParams, ImmutableXClient } from "@imtbl/imx-sdk";
import axios from 'axios'
import { config as envConfig } from 'dotenv';
import env from '../config/client';
var spawn = require('child_process').spawn;
import sqlite3 from 'sqlite3'
import { Wallet } from '@ethersproject/wallet';
import { v4 as uuid } from 'uuid';
import { keccak256 } from '@ethersproject/keccak256';
import { toUtf8Bytes } from '@ethersproject/strings';
import BN from 'bn.js'; // https://www.npmjs.com/package/bn.js
import * as encUtils from 'enc-utils'; // https://www.npmjs.com/package/enc-utils
import { MintBodyCodec } from 'imx-sdk';
import { db } from '../models/seed';
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

// Call with a wallet address to mint and receive a blank, level 1 rocket.
async function createRocket(req: Request, res: Response) {  
try {
    const provider = new AlchemyProvider(env.ethNetwork, env.alchemyApiKey);

    const minter = await ImmutableXClient.build({
      ...env.client,
      signer: new Wallet(env.privateKey1 as string).connect(provider),
    });

    const registerImxResult = await minter.registerImx({
      etherKey: minter.address.toLowerCase(),
      starkPublicKey: minter.starkPublicKey,
    });

    const payload: ImmutableMethodParams.ImmutableOffchainMintV2ParamsTS = [
      {
        contractAddress: env.tokenAddress as string, // NOTE: a mintable token contract is not the same as regular erc token contract
        users: [
          {
            etherKey: (req.headers.wallet_address as string).toLowerCase(),
            tokens: [{id: '1001', blueprint: 'onchain-metadata'}]
          },
        ],
      },
    ];

    const result = await minter.mintV2(payload);
    res.status(200).json(result);
} catch (err) {
  res.status(400).json(err);
}

}

// Called during the game to update rocket attributes we need in real time.
function updateRocket(req: Request, res: Response) {  
    console.log("In updateRocket")
    console.log(req.body)
  const {id, name, description, image_url, health, fuel , speed, rating}= req.body;
  
    console.log(req.body)
    console.log(`id:${id}`);
    console.log(`description:${description}`);


  db.all("UPDATE rockets SET name=$1,description=$2,image_url=$3,health=$4,fuel = $5,speed = $6,rating= $7 WHERE id=$8",  [name, description, image_url, health, fuel 
    , speed, rating, id], function(err:any){
      if(err){
        return res.status(400).json(err)
      }
      else{
        return res.status(200).json({"msg":"Succesful Update"})
      }
    })
}

// Called after a game, to save final state to blockchain
async function pushRocketToBlockchain(req: Request, res: Response) {

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
  try{
     const data = await axios.get(`https://api.sandbox.x.immutable.com/v1/assets?collection=${CONTRACT_ADDRESS}`);
     const newData= data.data.result.filter((element: allRocketsResult) => {
     return (element.user as string).toLowerCase() === (req.headers.wallet_address as string).toLowerCase();
    })
    if (newData.length < 1) {
      res.status(400).json({message: "This user doesn't have a rocket."})
    }

    db.all(`INSERT INTO rockets(id, name, description, user_id, image_url, health, fuel, speed, rating) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [newData[0].token_id, newData[0].name, newData[0].description, newData[0].user, newData[0].image_url, newData[0].metadata.health, newData[0].metadata.fuel, newData[0].metadata.speed, newData[0].metadata.rating])

    return res.status(200).json(newData);
  }
  catch(error){
    console.error(error);
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



// async function updateRocket(req:Request, res:Response){


// }


export {
    getRocket,
    getRocketByid,
    createRocket,
    pushRocketToBlockchain
}

