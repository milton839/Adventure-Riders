import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import rideAllData from '../../RideData/RideData.json';
import HomeItem from '../HomeItem/HomeItem';
import { UserContext } from '../../App';

const Home = () => {
    const [setVehicle] = useContext(UserContext);
    const [rideData,setRideData] = useState([]);
    useEffect(() => {
        setRideData(rideAllData);
        setVehicle(rideAllData);

    },[setVehicle]);
    // console.log(rideData);
    return (
        <div className="home_page">
            <div className="home_item container">
                <div className="row">
                    {
                        rideData.map(rider=><HomeItem rider={rider} key={rider.id}></HomeItem>)
                    }
                </div>
            </div>
            
        </div>
    );
};

export default Home;