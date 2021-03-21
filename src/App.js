import './App.css';
import Home from './Component/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './Component/Header/Header';
import Destination from './Component/Destination/Destination';
import Blog from './Component/Blog/Blog';
import Contact from './Component/Contact/Contact';
import LogIn from './Component/LogIn/LogIn';
import NoMatch from './Component/NoMatch/NoMatch';
import RideDetails from './Component/RideDetails/RideDetails';
import { createContext, useState } from 'react';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [vehicle, setVehicle] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState([]);
  console.log(loggedInUser);
  return (
    <UserContext.Provider value={[loggedInUser,setLoggedInUser,vehicle,setVehicle]}>
      <p>Name: {loggedInUser.name || loggedInUser.displayName}</p>
      <p>Email: {loggedInUser.email}</p>
      
        <Router>
        <Header></Header>
          <Switch>
            <Route path="/home">
                <Home></Home>
            </Route>
            <PrivateRoute path="/rideType/:rideName">
                <RideDetails></RideDetails>
            </PrivateRoute>
            <PrivateRoute path="/destination">
                <Destination></Destination>
            </PrivateRoute>
            <PrivateRoute path="/blog">
                <Blog></Blog>
            </PrivateRoute>
            <PrivateRoute path="/contact">
                <Contact></Contact>
            </PrivateRoute>
            <Route path="/login">
                <LogIn></LogIn>
            </Route>
            <Route exact path="/">
                <Home></Home>
            </Route>
            <Route path="*">
                <NoMatch></NoMatch>
            </Route>
          </Switch>
        </Router>
    </UserContext.Provider>
  );
}

export default App;
