import React from "react"
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';


const Popup = (props:any) =>{

    const handleCloseClick=()=>{
        props.setTrigger(false)
        props.setHandleReturn()        
    }

    const getDate=()=>{

        var date = new Date().toLocaleDateString()
        var time = new Date().toLocaleTimeString()

        var dateTime = date+" "+time
        return dateTime
    }

    const handleCommentLabel =(args:any)=>{
       props.setComment(args.target.value)  
    }    

    return (props.trigger)?(
        <div className="popup">
            <div className="popup-inner">
                <h3>Voulez-vous mettre une raison</h3>
                <label className="popupLabel">{props.setText}</label>
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

export default Popup