import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import { uploadAadhar } from "../../apis/userapis";
import { jwtDecode } from 'jwt-decode';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";


function AdharCheck() {
    const [adharPdf, setAadharPdf] = useState(null);
    const dispatch = useDispatch();
    const user_id = jwtDecode(localStorage.getItem('token')).id;

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setAadharPdf(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        console.log(adharPdf.name);
        uploadAadhar(user_id,adharPdf.name).then((res) => {
            // dispatch(userActions.userAdharAction(adharPdf.name))
        }
        ).catch((err) => {
            console.log(err);
        });

    }

    console.log(adharPdf);

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