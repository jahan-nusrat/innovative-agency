import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import ServiceCard from './ServiceCard';
import './serviceList.style.css';
import LOading from '../../Loading/LOading'

const ServiceList = ({ user }) => {
    const [myOrders, setMyOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        fetch(`http://localhost:5000/my-orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email })
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setMyOrders(data)
                    setIsLoading(false)
                } 
            })
            .catch(err => console.log(err))
    }, [user.email])

    return (
        <div className="serviceList-section">
            {
                isLoading ? <LOading /> : <div className="row">
                {
                    myOrders.map(order => {
                        return <ServiceCard order={order} key={order._id} />
                    })
                }
            </div>
            }
        </div>
    )
}

export default ServiceList
