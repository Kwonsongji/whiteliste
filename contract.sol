//SPDX-License-Identifier:UNLICENSED
pragma solidity ^0.8.13; 

contract NFT {
  // une address est autorisé à minter 
  mapping( address => bool ) public whitelist;
  
}