import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import axios from 'axios';

const TongQuan = () => {
    const user = useSelector((state: RootState) => state.user.user?.id);
    const [brand, setBrand] = useState(null);

    useEffect(() => {
        if (user) {
            axios.post(`${import.meta.env.VITE_APP_API_URL}/brand/getbrand`, { userId: user })
                .then(response => {
                    setBrand(response.data);
                })
                .catch(error => {
                    console.error('Error fetching brand:', error);
                });
        }
    }, [user]);
    console.log("brands:" + JSON.stringify(brand))

    return (
        <div>
            tong quan
        </div>
    );
};

export default TongQuan;