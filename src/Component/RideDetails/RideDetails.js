import { Button, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import FakeData from '../../RideData/RideData.json';
import { GoogleMap, LoadScript } from '@react-google-maps/api';



const Destination = () => {
    const [transport, setTransport] = useState([]);
    const [search, setSearch] = useState('');
    const [show, setShow] = useState(false);
    const [destination, setDestination] = useState({
        from: '',
        to: ''
    });
    const { rideName } = useParams();
    useEffect(() => {
        setTransport(FakeData);
    }, [])
    const selectedTransport = transport.find(trans => trans.ride_name === rideName);
    console.log(selectedTransport);
    const handleSubmit = (e) => {
        setShow(true);
        e.preventDefault();
    }
    const handleChange = (e) => {
        const newDestination = { ...destination };
        newDestination[e.target.name] = e.target.value;
        //console.log(newUserInfo);
        setDestination(newDestination);

    }

    return (
        <div>
            <div className="row" style={{ margin:'20px 0px 0px 200px' }}>
                <div className="col-lg-4">
                {
                    show && (
                        <div>
                            <div>
                                <h2>
                                    {
                                        destination.from 
                                    }
                                </h2>
                                <h2>
                                    {
                                        destination.to
                                    }
                                </h2>
                            </div>
                            
                            <img style={{ width:'200px',height:'100px' }} src={selectedTransport.img} alt=""/>
                            <h1>
                                This is: {selectedTransport.ride_name}
                            </h1>
                        </div>
                    )
                }
                {
                    !show && (
                        <form >
                            <TextField name="from" onChange={handleChange} id="standard-basic" label="From" />
                            <br />
                            <TextField name="to" onChange={handleChange} id="standard-basic" label="To" />
                            <br />
                            <br />
                            <Button onClick={handleSubmit} name={rideName} variant="contained" color="primary" > Search </Button>
                        </form>
                    )
                }


                <div>
                    <h3>{search} </h3>
                </div>
                </div>
                <div className="col-lg-8">
                    
                        <LoadScript
                                googleMapsApiKey="AIzaSyBu-AKKZLxnJ9tOQkoADLkA0OlUExEfQck"
                            >
                                <GoogleMap
                                    mapContainerStyle={{ width: '300px', height: '300px' }}
                                    center={{ lat: -3.745, lng: -38.523 }}
                                    zoom={10}
                                >
                                    { /* Child components, such as markers, info windows, etc. */}
                                    <></>
                                </GoogleMap>
                        </LoadScript>
                    
                </div>
            </div>
        </div>

    );
};

export default Destination;