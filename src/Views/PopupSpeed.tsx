import React, { useEffect, useState } from "react"
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

const PopupSpeed = (props:any) =>{

    const handleCloseClick=()=>{
        props.setTriggerSpeed(false)
        props.setHandleReturnSpeed()        
    }

    const getDate=()=>{

        var date = new Date().toLocaleDateString()
        var time = new Date().toLocaleTimeString()

        var dateTime = date+" "+time
        return dateTime
    }

    const handleCommentLabel =(args:any)=>{
       props.setCommentSpeed(args.target.value)  
    }    


    return(props.triggerSpeed)? (
        <div className="popup1">
            <div className="popup1-inner">
                <h3>Raison de vitesse réduite</h3>
                <label className="popupLabel">{props.setTextSpeed}</label>
                <label className="popupLabel">{getDate()}</label>
                <div>
                    <label>Commentaire</label>
                    <input id='lblInput' className="popupInp" type="text" onChange={handleCommentLabel}/>
                </div>                
                <div>
                    <ButtonComponent className="popupBtn" onClick={handleCloseClick}>Enregistrer</ButtonComponent>
                </div>
                
                {props.children}   
            </div> 
        </div>
    ):"" as any;
}

export default PopupSpeed