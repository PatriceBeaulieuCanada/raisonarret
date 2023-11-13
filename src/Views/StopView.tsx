import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { useState, useMemo } from "react";
import UseCallApi from "../Hooks/UseCallApi";
import Popup from "./Popup";
import PopupSpeed from "./PopupSpeed";

const StopView = () => {
  const [data, setData] = useState([{ id: 0, name: "" }]);
  const [dataSpeed, setDataSpeed] = useState([{ id: 0, name: "" }]);
  const [enablePopup, setEnablePopup] = useState(false);
  const [textPopup, setTextPopup] = useState("");
  const [enablePopupSpeed, setEnablePopupSpeed] = useState(false);
  const [textPopupSpeed, setTextPopupSpeed] = useState("");
  const param = {
    action: "",
    humainstopreason: {},
    guid: "",
    comment: "",
    reducedspeedreason: {},
  };
  const [serialData, getSerialData] = useState("");
  const [commentTxt, setCommentTxt] = useState("");
  const [commentTxtSpeed, setCommentTxtSpeed] = useState("");

  useMemo(() => {
    UseCallApi({ action: "GetAllHumainReason" }).then((data) => setData(data));
    UseCallApi({ action: "GetAllReducedSpeed" }).then((dataSpeed) =>
      setDataSpeed(dataSpeed)
    );
  }, []);

  const handleClick = async (args: any) => {
    const variable = data.find((v) => v.name === args.target.textContent);
    setTextPopup(args.target.textContent);
    param.action = "AddStopReason";
    param.humainstopreason = variable as any;
    setCommentTxt("");

    var button = document.getElementById(args.target.id);
    if (button != null) {
      if (button.style.background === "red") {
        button.style.background = "blue";

        setEnablePopup(true);
      } else {
        button.style.background = "red";
        getSerialData(await UseCallApi(param));
      }
    }

    data.forEach((v, i) => {
      //console.log(v)
      var btn = document.getElementById(v.name);
      if (btn != null) {
        if (button !== btn) {
          let disabled = btn.getAttribute("disabled");

          if (disabled) {
            btn.removeAttribute("disabled");
          } else {
            btn.setAttribute("disabled", "disabled");
          }
          btn.style.background = "blue";
        }
      }
    });
  };

  const handleClickSpeed = async (args: any) => {
    const variable = dataSpeed.find((v) => v.name === args.target.textContent);
    setTextPopupSpeed(args.target.textContent);
    param.action = "AddSpeedReason";
    param.reducedspeedreason = variable as any;
    //getSerialData(await UseCallApi(param))
    setCommentTxt("");

    var button2 = document.getElementById(args.target.id);
    if (button2 != null) {
      if (button2.style.background === "red") {
        button2.style.background = "blue";

        setEnablePopupSpeed(true);
      } else {
        button2.style.background = "red";
        getSerialData(await UseCallApi(param));
      }
    }

    dataSpeed.forEach((v, i) => {
        //console.log(v)
        var btn = document.getElementById(v.name);
        if (btn != null) {
          if (button2 !== btn) {
            let disabled = btn.getAttribute("disabled");
  
            if (disabled) {
              btn.removeAttribute("disabled");
            } else {
              btn.setAttribute("disabled", "disabled");
            }
            btn.style.background = "blue";
          }
        }
      });
  };

  const handleReturnBtn = async () => {
    param.action = "ModifStopReason";
    param.guid = serialData;
    param.comment = commentTxt;
    await UseCallApi(param);
  };

  const handleReturnSpeedBtn = async () => {
    param.action = "ModifSpeedReason";
    param.guid = serialData;
    param.comment = commentTxtSpeed;
    await UseCallApi(param);
  };

  return (
    <div>
      <h1>Raison d'arrêt</h1>
      <div className="container1" id="mainDiv">
        {data.map((v, i) => {
          return (
            <ButtonComponent
              id={v.name}
              className="stopBtn"
              onClick={handleClick}
            >
              {v.name}
            </ButtonComponent>
          );
        })}
        <Popup
          trigger={enablePopup}
          setTrigger={setEnablePopup}
          setText={textPopup}
          setHandleReturn={handleReturnBtn}
          setComment={setCommentTxt}
        />
      </div>
      <h1>Raison de vitesse réduite</h1>
      <div className="container3" id="mainDiv1">
        {dataSpeed.map((v, i) => {
          return (
            <ButtonComponent
              id={v.name}
              className="stopBtn"
              onClick={handleClickSpeed}
            >
              {v.name}
            </ButtonComponent>
          );
        })}
      </div>

      <div style={{ top: "80%", left: "90%" }}>
        <PopupSpeed
          triggerSpeed={enablePopupSpeed}
          setTriggerSpeed={setEnablePopupSpeed}
          setTextSpeed={textPopupSpeed}
          setHandleReturnSpeed={handleReturnSpeedBtn}
          setCommentSpeed={setCommentTxtSpeed}
        />
      </div>
    </div>
  );
};

export default StopView;
