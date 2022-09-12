import React,{useState,useEffect,useContext} from 'react'
import { MdVerified } from "react-icons/md";
import { RiSendPlaneFill,RiCloseFill } from "react-icons/ri";

import Image from 'next/image';
//Internal import

import { TodoListContext } from "../context/TodoListApp";
import Style from '../styles/index.module.css';
import Loading from '../loading.gif';
import Data from '../components/Data';

const Home = () => {
  const [message, setMessage] = useState('');
  const {
    checkIfWalletIsConnected,
    connectWallet,
    todoList,
    getTodoList,
    change,
    currentAccount,
    error,
    allTodoList,
    myList,
    allAddress,} = useContext(TodoListContext);

  useEffect(()=>{
    checkIfWalletIsConnected();
    getTodoList();
  },[]);
  return (
   <div className={Style.home}>
   <div className={Style.navBar}>
   <Image src ={Loading} alt="Logo" width={50} height={50}/>
   <div className={Style.connect}>
    //if there is no account we've to render these account
    {!currentAccount ?(
      <button onClick={()=>connectWallet()}>Connect Wallet</button>
    ) : (
      //If the account is there we've to mention currentwallet

      <button>{currentAccount.slice(0,20)}...</button>
    )}
   </div>
   </div>
   <div className={Style.home_box}>
    <div className={Style.home_completed}>
      <h2>Todo History List</h2>

    </div>
    {myList.map((eL, i)=>(
      <div className={Style.home_completed_list}>
        <MdVerified className={Style.iconColor}/>
        <p>{eL.slice(0, 30)}</p>
      </div>
    ))}
    <div className={Style.home_create}>
      <div className={Style.home_create_box}>
        <h2>Create Blockchain TodoList</h2>
        <div className={Style.home_create_input}>
          <input type='Text' placeholder="Enter your Todo" onChange={(e)=> setMessage(e.target.value)}
          />
          
          {currentAccount ? (
                <RiSendPlaneFill
                  className={Style.iconBlack}
                  onClick={() => todoList(message)}
                />
              ) : (
                <RiSendPlaneFill
                  className={Style.iconBlack}
                  onClick={() => connectWallet()}
                />
              )}
        </div>

        <Data allTodoList={allTodoList}
        allAddress={allAddress}
        myList={myList}
        change={change}
        />

   </div>
   </div>
   </div>
   </div>
  );
}

export default Home