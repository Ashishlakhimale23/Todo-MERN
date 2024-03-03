import './App.css'
import Login from "./components/login"
import Signin from './components/signin'
import Todo from './components/todo'
import  {BrowserRouter as Router,Route,Routes} from 'react-router-dom'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/signin" Component={Signin}/>
          <Route path="/login" Component={Login}/>
          <Route path="/Todo" Component={Todo}/>
     </Routes>
      </Router>
    </>
  );
}

export default App
