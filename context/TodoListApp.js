import React, {useEffect,useState} from 'react'
import Web3Modal from 'web3modal';
import {ethers} from 'ethers';

//Internal import

import {todoListAddress,todoListABI} from './constants'
const fetchContract =(signerOrProvider)=> new ethers.Contract(
    todoListABI,todoListAddress,signerOrProvider) //to communicate without smartcontract

    export const TodoListContext = React.createContext();

    export const TodoListProvider = ({children}) => {
const [currentAccount, setcurrentAccount] = useState('');
const [error, seterror] = useState('');   //here we contain the error message
const [allTodoList, setallTodoList] = useState([]);
const [myList, setmyList] = useState([]);

const [allAddress, setallAddress] = useState([]); //here we contain allAddress of the user
//--connecting metamask
const checkIfWalletIsConnected = async()=>{
    
    const account = await window.ethereum.request({method: "eth_accounts"});
    if(account.length){
        setcurrentAccount(account[0]);
        console.log(account[0]);
    }else{
        seterror("Please Install Metamask & connect,reload");
    }
};

//..connect wallet
const connectWallet = async()=>{
    if(!window.ethereum) return seterror("please install metamask");

    const account = await window.ethereum.request({
        method: "eth_requestAccounts"});
        setcurrentAccount(account[0]);
};

//Interacting with smart contract & also it will receive message
const todoList = async(message)=>{
    try {
        // connecting with smart contract
        const web3modal = new web3modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = await fetchContract(signer);

        const createList = await contract.createList(message);
        createList.wait();

        console.log(createList);

        
        } catch (error) {
        seterror("Something wrong creating list");
        
    }
};
//this function allow us to get all the data
const getTodoList = async()=>{
    try {
         // connecting with smart contract
         const web3modal = new web3modal();
         const connection = await web3modal.connect();
         const provider = new ethers.providers.Web3Provider(connection);
         const signer = provider.getSigner();
         const contract = await fetchContract(signer);

         //get the data
         const getAllAddress = await contract.getAddress();
         //once we have got all the address we have to set it to set address
         setallAddress(getAllAddress);

        
         //here we have to do loop over these that why we are using map
         getAllAddress.map(async(eL)=>{
            const getSingleData = await contract.getCreatorData(eL);
            allTodoList.push(getSingleData);
            
         });

         const allMessage = await contract.getMessage();
         setmyList(allMessage);
        
    } catch (error) {
        seterror("Something wrong getting list");
        
    }
};
//change state of TodoList to false to true
const change = async(address)=>{
    try {
        // connecting with smart contract
        const web3modal = new web3modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = await fetchContract(signer);

        const state = await contract.toggle(address);
        state.wait();
        console.log(state);
        
    } catch (error) {
        seterror("Something wrong changing state");
        
    }
}

        return(
            <TodoListContext.Provider value ={{
                checkIfWalletIsConnected,
                connectWallet,
                todoList,
                getTodoList,
                change,
                currentAccount,
                error,
                allTodoList,
                myList,
                allAddress,
                 }}>
                {children}
            </TodoListContext.Provider>
        );

    };