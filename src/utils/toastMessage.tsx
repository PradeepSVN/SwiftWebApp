import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export enum ToastMessageType {
    Success,
    Error,
    Info,
    Warning,
  }
  
 
export const showToast = (message:string, type: ToastMessageType = ToastMessageType.Success) => {
  
   switch (type) {
    case ToastMessageType.Success:
      toast.success(message, {
        position: 'top-right',
      }); break;
      case ToastMessageType.Info:
        toast.info(message, {
          position: 'top-right',
        }); break;
      case ToastMessageType.Warning:
        toast.warning(message, {
          position: 'top-right',
        }); break;
        case ToastMessageType.Error:
        toast.error(message, {
          position: 'top-right',
        }); break;
        default: 
        toast.success(message, {
          position: 'top-right',
        }); break;
  }
  
  
  };
// const showToast = (message, variant = 'info') => {
//     toast[variant](message);
//   };