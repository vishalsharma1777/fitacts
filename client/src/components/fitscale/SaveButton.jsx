import { Button } from "@mui/material";
import { createPerformance } from "../../apis/performanceApi";

function SaveButton({performanceDetails,handleClose,handleCloseMainModal}) {

    const handleSave =()=>{
        console.log(performanceDetails);
        createPerformance(performanceDetails)
        handleClose();
        handleCloseMainModal()
    }

    return (
        <Button onClick={handleSave}>Save Performance</Button>
    );
}

export default SaveButton;