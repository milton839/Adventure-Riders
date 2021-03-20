import React from 'react';
import { Card,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomeItem = (props) => {
    console.log(props.rider);
    const {ride_name,img} = props.rider;
    return (
        <div className="col-md-6 col-sm-12 col-lg-4 col-12 col-xl-3" style={{ paddingTop:'150px' }}>
                <Card style={{ width: '17rem',float:'left'}}>
                    <Card.Img variant="top" src={img} />
                    <Card.Body>
                    <Card.Title className="text-center fw-bold">{ride_name}</Card.Title>
                    <Link to={`/rideType/${ride_name}`}>
                        <Button style={{ backgroundColor:'tomato',border:'none',marginLeft:'55px' }}>Booking Now</Button>
                    </Link>
                    </Card.Body>
                </Card>
        </div>
    );
};

export default HomeItem;