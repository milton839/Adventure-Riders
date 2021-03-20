import React, { useContext, useEffect } from 'react';
import './Home.css';
import rideAllData from '../../RideData/RideData.json';
import HomeItem from '../HomeItem/HomeItem';
import { UserContext } from '../../App';

const Home = () => {
    const [vehicle,setVehicle] = useContext(UserContext);
    // const [rideData,setRideData] = useState([]);
    useEffect(() => {
        setVehicle(rideAllData);
    },[setVehicle]);
    // console.log(rideData);
    return (
        <div className="home_page">
            <div className="home_item container">
                <div className="row">
                    {
                        vehicle.map(rider=><HomeItem rider={rider} key={rider.id}></HomeItem>)
                    }
                </div>
            </div>
            
        </div>
    );
};

export default Home;