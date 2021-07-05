import { take } from "redux-saga/effects";
import { setErrorMessageAction } from "../actions";
import { toast } from "react-toastify";

export function* errorMessageHandler(){
  while(true){
    const { payload } = yield take(setErrorMessageAction);

    toast.error(payload, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
  })
  }
}
