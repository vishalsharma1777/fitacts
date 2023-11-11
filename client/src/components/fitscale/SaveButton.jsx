import { Button } from "@mui/material";
import { createPerformance } from "../../apis/performanceApi";
import { tableDataActions } from "../../store/TableDataSlice";
import { useDispatch } from "react-redux";

function SaveButton({performanceDetails,handleClose,handleCloseMainModal}) {
    const dispatch = useDispatch();
    const handleSave =()=>{
        createPerformance(performanceDetails).then
        ((res)=>{
            dispatch(tableDataActions.tableDataAction(res.data))
        })
        handleClose();
        handleCloseMainModal()
    }

    return (
        <Button onClick={handleSave}>Save Performance</Button>
    );
}

export default SaveButton;