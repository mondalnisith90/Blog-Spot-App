import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import HomeIcon from '@material-ui/icons/Home';
import LockIcon from '@material-ui/icons/Lock';
import WorkIcon from '@material-ui/icons/Work';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {NavLink} from 'react-router-dom';
import { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { CurrentUserDataContext } from '../App';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import "../css/SignIn.css";


const reactToastStyle = {
  position: "top-center",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  };


const SignIn = () => {

  const {currentUserData, setCurrentUserData} = useContext(CurrentUserDataContext);

  const [inputFieldsData, setInputFieldsData] = useState({ email: "", password: ""});
  const [serverError, setServerError] = useState("");
  const history = useHistory();
  const {email, password} = inputFieldsData;

  const inputTextChange = (event) => {
    const inputFieldName = event.target.name;
    const inputFieldValue = event.target.value;
    setInputFieldsData({ ...inputFieldsData, [inputFieldName]: inputFieldValue });
    setServerError("");
   }


   const signinFormSubmit = async (event) => {
     event.preventDefault();
     //send data to server for user login
     const url = "http://localhost:8000/users/login";
     try {
      const serverResponse = await axios.post(url, {email, password}, {withCredentials: true});
      if(serverResponse.status===200){
        //user ogin successfull
        toast.success("Login successfull", reactToastStyle);
        setCurrentUserData({...currentUserData, userLoginStatus: true});
        setTimeout(() => {
          history.push("/");
        }, 2300);
      }
     } catch (error) {
       //user login failed
           //set server error message
           try{
             const serverResponse = error.response;
             toast.error(serverResponse.data, reactToastStyle);
             setServerError(serverResponse.data);
           }catch(error){
             setServerError(error.message);
           } 
     }
     

   }




    return(
        <section className="signin_root_div  d-flex align-items-center justify-content-center">
         <div className="signin_main_div">
         <ToastContainer />
            <div className="signin_heading_div">
               <h2 className="signin_heading_text" >User Login</h2>
               
            </div>
              <form onSubmit={signinFormSubmit} >
               <div className="FORM_div">
               <p className="text-center text-danger fw-bold">{serverError}</p>
               <div className="mb-3">
                 <label htmlFor="exampleInputEmail1" className="form-label signin_form_label"><EmailIcon className="signin_icons"  /> Email Address*</label>
                 <input type="email" className="form-control" name="email" value={email} onChange={inputTextChange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email address" required />
               </div>
               <div class=" mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label signin_form_label"><LockIcon className="signin_icons"  /> Password*</label>
                    <input type="password" className="form-control"  name="password" value={password} onChange={inputTextChange}  placeholder="Password" aria-label="Password" required />
                  </div>

               <div className="row my-4">
                <div className="col-md-6">
                  <Button variant="contained" type="submit" color="secondary" className="signin_button" endIcon={<ExitToAppIcon />} >
                  SignIn
                  </Button>
                </div>
  
               <div className="col-md-6 mt-4">
               <NavLink exact to="/signup" style={{textDecoration: "none"}}>
                 <h3 className="signin_login_text">New user? Create account</h3>
               </NavLink>
               </div>
               </div>
               </div>
                </form>
             </div> 
        </section>
    );
}

export default SignIn;