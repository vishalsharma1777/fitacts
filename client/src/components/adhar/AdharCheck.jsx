import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import { uploadAadhar } from "../../apis/userapis";
import { jwtDecode } from 'jwt-decode';


function AdharCheck() {
    const [adharPdf, setAadharPdf] = useState(null);
    const user_id = jwtDecode(localStorage.getItem('token')).id;
    const formData = new FormData();

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setAadharPdf(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        formData.append('aadhar', adharPdf.name);
        console.log(adharPdf.name);
        console.log(formData);
        uploadAadhar(user_id,formData).then((res) => {
            console.log(res);
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