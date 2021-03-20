import logo from './logo.svg';
import './App.css';
import Home from './Component/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
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
  return (
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
      <p>Name: {loggedInUser.name}</p>
      <p>Name: {loggedInUser.email}</p>
      <Header></Header>
        <Router>
          <Switch>
            <Route path="/home">
                <Home></Home>
            </Route>
            <Route path="/rideType/:rideName">
                <RideDetails></RideDetails>
            </Route>
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
