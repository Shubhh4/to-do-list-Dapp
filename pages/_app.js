import "../styles/globals.css";

//Here we have to do internal import

import {TodoListProvider} from "../context/TodolistApp";

const  MyApp = ({ Component, pageProps }) => (
  <TodoListProvider>
    <div>
    <Component {...pageProps} />
    </div>
  </TodoListProvider>
);

export default MyApp
