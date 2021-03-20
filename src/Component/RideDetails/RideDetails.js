import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../App';

const RideDetails = () => {
    const {rideName} = useParams();
    const [vehicle] = useContext(UserContext);
    const selectedVehicle = vehicle.find(vh => vh.ride_name===rideName);
    console.log(selectedVehicle);
    
    return (
        <div>
            <h1>Ridedetails: {selectedVehicle.ride_name}</h1>
            <h1>Ridedetails: {selectedVehicle.id}</h1>
            <div className="row">
                <div className="col-lg-4 col-sm-12 col-md-6 col-12 col-xl-4">
                    
                </div>
                <div className="col-lg-8 col-sm-12 col-md-6 col-12 col-xl-8">
                    <h2>hello</h2>
                </div>
            </div>
        </div>
    );
};

export default RideDetails;