
function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
export default function convertMsToTime(milliseconds) {
    let ms = milliseconds % 1000;
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    seconds = seconds % 60;
    minutes = minutes % 60;
    hours = hours % 24;

    if(hours===0 && minutes===0 && seconds===0){
        return `${padTo2Digits(ms)} miliseconds.`;
    }
    
    if(hours===0 && minutes===0){
        return `${padTo2Digits(seconds)} secs ${padTo2Digits(ms)} miliseconds.`;
    }
    
    if(hours===0){
        return `${padTo2Digits(minutes)} mins ${padTo2Digits(
            seconds)} secs ${padTo2Digits(ms)} miliseconds.`;
    }
  
    return `${padTo2Digits(hours)}hrs ${padTo2Digits(minutes)}mins ${padTo2Digits(
      seconds)} secs ${padTo2Digits(ms)} ms`;
  }

