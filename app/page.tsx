"use client"
import { useEffect, useState } from "react";
import Navbar from "./Component/Navbar"
import abi from "../config/abi.json"
import { ethers } from "ethers";
export default function Home() {
  const contractadd = "0x8E6622bB720aC3EF382C117405aaBA777e17d5F3";
  const [address, setAddress] = useState("");
  const [contract, setContract] = useState(null);
  const [depositamount, setdepositamount] = useState("");
  const [withdrawamount, setwithdrawamount] = useState("");
  const [balance, setbalance] = useState("");
  useEffect(()=>{
    async function initialize(){
      if(typeof window.ethereum !== undefined){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const contract = new ethers.Contract(contractadd, abi, signer);
        setAddress(address);
        setContract(contract)
      }
    }
    initialize();
  })
  async function depo(){
    const log = await contract?.deposit({value: depositamount});
    console.log(log);
  }
  async function withdraw(){
    const log = await contract?.withdraw(withdrawamount)
    console.log(log);
  }
  async function getBalance(){
    const log = await contract?.getBalance();
    console.log(log);
    setbalance(log.toString())
  }
  getBalance();
  return (
    <main >
      <Navbar  />
     <div className="flex flex-col justify-center text-center">
      <div className="flex space-x-5 my-2">
      <p>Deposit </p>
      <input type="number" onChange={(e)=>{setdepositamount(e.target.value)}} className="border-black outline none" />
    <button onClick={depo} className="bg-blue-600 text-white px-3 py-2 rounded-lg">Deposit here</button>
      </div>
      <div className="flex space-x-5 my-2">
      <p>Withdraw </p>
      <input type="number" onChange={(e)=>{setwithdrawamount(e.target.value)}} className="border-black outline none" />
      <button onClick={withdraw} className="bg-blue-600 text-white px-3 py-2 rounded-lg">Withdraw here</button>
      </div>
      <div>
        <p>My Balance: {balance}</p>
      </div>
     </div>
    </main>
  )
}
