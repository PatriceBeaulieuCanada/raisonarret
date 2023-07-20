import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { useState,useMemo,useEffect} from 'react'
import UseCallApi from '../Hooks/UseCallApi'
import Popup from './Popup';
import PopupSpeed from './PopupSpeed';

const StopView = () =>{
    const [data,setData] = useState([{id:0,name:""}])
    const [dataSpeed,setDataSpeed] = useState([{id:0,name:""}])
    const[enablePopup,setEnablePopup] = useState(false);
    const[textPopup,setTextPopup] = useState("");
    const[enablePopupSpeed,setEnablePopupSpeed] = useState(false);
    const[textPopupSpeed,setTextPopupSpeed] = useState("");
    const param = { action: '', humainstopreason:{},guid:'',comment:'',reducedspeedreason:{}}
    const [serialData,getSerialData] = useState("")
    const [commentTxt,setCommentTxt] = useState('')
    const [commentTxtSpeed,setCommentTxtSpeed] = useState('')
    
    useMemo(() =>{
        UseCallApi({action:'GetAllHumainReason'}).then((data)=>setData(data))
		UseCallApi({action:'GetAllReducedSpeed'}).then((dataSpeed)=>setDataSpeed(dataSpeed))       
      },[])
    
const handleClick = async(args:any)=>{
    const variable = data.find(v=>v.name==args.target.textContent)
    setTextPopup(args.target.textContent)

    param.action = 'AddStopReason'
    param.humainstopreason = variable as any
    getSerialData(await UseCallApi(param))
    setCommentTxt('')

    var mainDiv = document.getElementById("mainDiv");
    mainDiv?.classList.toggle("container1",false);
    mainDiv?.classList.toggle("container2",true);
    
    if(enablePopup){
        setEnablePopup(false);
    }
    else
    {
        setEnablePopup(true);
    }
}

const handleClickSpeed = async(args:any)=>{
    const variable = dataSpeed.find(v=>v.name==args.target.textContent)
    setTextPopupSpeed(args.target.textContent)

    console.log(variable)

    param.action = 'AddSpeedReason'
    param.reducedspeedreason = variable as any
    getSerialData(await UseCallApi(param))
    setCommentTxt('')

    var mainDiv = document.getElementById("mainDiv1");
    mainDiv?.classList.toggle("container3",false);
    mainDiv?.classList.toggle("container4",true);
    
    if(enablePopupSpeed){
        setEnablePopupSpeed(false);
    }
    else
    {
        setEnablePopupSpeed(true);
    }
}

const handleReturnBtn= async()=>{
    var mainDiv1 = document.getElementById("mainDiv");
    mainDiv1?.classList.toggle("container2",false);
    mainDiv1?.classList.toggle("container1",true);
  
    param.action = 'ModifStopReason'
    param.guid = serialData
    param.comment = commentTxt;
    await UseCallApi(param)
}

const handleReturnSpeedBtn= async()=>{
    var mainDiv2 = document.getElementById("mainDiv1");
    mainDiv2?.classList.toggle("container4",false);
    mainDiv2?.classList.toggle("container3",true);
  
    param.action = 'ModifSpeedReason'
    param.guid = serialData
    param.comment = commentTxtSpeed;
    await UseCallApi(param)
    
}

    return (
        <div>
            <h1>Raison d'arrêt</h1>
            <div className='container1' id='mainDiv'>
                {data.map((v,i)=>{
                return(
                    <ButtonComponent className='stopBtn' onClick={handleClick}>{v.name}</ButtonComponent>
                )
                })}
                <Popup trigger={enablePopup} setTrigger={setEnablePopup} setText={textPopup} setHandleReturn={handleReturnBtn}
                setComment={setCommentTxt}/>
                
            </div>
            <h1>Raison de vitesse réduite</h1>
            <div className='container3' id='mainDiv1'>
                {dataSpeed.map((v,i)=>{
                return(
                    <ButtonComponent className='stopBtn' onClick={handleClickSpeed}>{v.name}</ButtonComponent>
                )
                })}
            </div>
                
                <div style={{top:'80%', left:'90%'}}>
                    <PopupSpeed triggerSpeed={enablePopupSpeed} setTriggerSpeed={setEnablePopupSpeed} setTextSpeed={textPopupSpeed} setHandleReturnSpeed={handleReturnSpeedBtn}
                            setCommentSpeed={setCommentTxtSpeed}/>
                </div> 
        </div>  

)}

export default StopView

