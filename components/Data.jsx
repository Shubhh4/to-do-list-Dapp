import React,{useContext} from 'react'
import { AiFillLock,AiFillUnlock } from "react-icons/ai";
import { RiSendPlaneFill,RiCloseFill } from "react-icons/ri";

//Internal import

//import { TodoListContext } from "../context/TodoListApp";
import Style from '../styles/index.module.css';

const Data = (allTodoList,allAddress,myList,change) => {
  

  return (
    <div className={Style.home_create_list}>
      {allTodoList.length===0 ? (
        <div className={Style.noData}>No Data</div>
      ):(
        <div>
        {allTodoList.map((eL,i)=> (
          <div key={i+1} className={Style.home_create_list_app}>
          <div className={Style.lock_list}>
          <AiFillLock className={Style.lock_color}/>
          {eL[2]}
          </div>
          {el[3] === false ?(
            <RiCloseFill onClick={()=>change(eL[0])} className={Style.iconClose}/>
            //if they will clicked to change it will get true and initially it will be false
          ):(
            <p className={Style.down}>Down</p>
          )}
          </div>
      ))}
      </div>
  )}
    
    </div>
  );
  
};

export default Data