import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { performanceActions } from "../../store/PerformanceSlice";

function StopWatch({time, setTime,isTimerRunning, setisTimerRunning}) {
    const dispatch = useDispatch();
    // const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(false);
    // const [isTimerRunning, setisTimerRunning] = useState(false);

    var timeString = new Date(time).toISOString().slice(11, -1);
    

    useEffect(() => {
        let interval = null;

        if (timerOn) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }
    , [timerOn]);

    const startTimer = () => {
        setisTimerRunning(true);
        setTimerOn(true);
    }

    const stopTimer = () => {
        setisTimerRunning(false);
        setTimerOn(false);
    }

    const resetTimer = () => {
        setTime(0);
        setisTimerRunning(false);
        setTimerOn(false);
    }





    return (
        <div className="stopwatch">
            <div className="stopwatch-display">
                <div className="stopwatch-time">{timeString}</div>
            </div>
            <div className="stopwatch-controls">
                <Button variant="contained"onClick={startTimer} disabled={isTimerRunning}>Start</Button>
                <Button variant="contained"onClick={stopTimer}  disabled={!isTimerRunning}>Stop</Button>
                <Button variant="contained" onClick={resetTimer} disabled={!isTimerRunning}>Reset</Button>
            </div>
        </div>
    );
}

export default StopWatch;