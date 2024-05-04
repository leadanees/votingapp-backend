import './App.css';
import Router from './routers/Router.tsx';
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css';
import Home from './components/layouts/Home.tsx';


function App() {
  return (
    <>
      <Router/>
      <ToastContainer position='top-left'/>

    {/* <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div> */}
    </>

  );
}

export default App;
