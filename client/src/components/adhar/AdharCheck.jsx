import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import { uploadAadhar } from "../../apis/userapis";
import { jwtDecode } from 'jwt-decode';
import {useNavigate} from 'react-router-dom';


function AdharCheck() {
    const navigate = useNavigate();
    const [adharPdf, setAadharPdf] = useState(null);
    const user_id = jwtDecode(localStorage.getItem('token')).id;

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setAadharPdf(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        uploadAadhar(user_id,adharPdf.name).then((res) => {
            navigate('/dashboard/activities');
        }
        ).catch((err) => {
            console.log(err);
        });

    }

    return (
        <div className="aadhar-center">
            <h2> Please upload your aadhar card to proceed.</h2>
            <br/>
            <input type="file" onChange={handleImageChange} />
            <br/><br/>
            <Button variant="contained" color="success" disabled={adharPdf==null} onClick={handleUpload}>Submit</Button>
        </div>
    );
}

export default AdharCheck;