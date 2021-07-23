import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import HomeIcon from '@material-ui/icons/Home';
import LockIcon from '@material-ui/icons/Lock';
import WorkIcon from '@material-ui/icons/Work';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {NavLink} from 'react-router-dom';
import { useState } from 'react';
import validator from "validator";
import "../css/SignUp.css";


const SignUp = () => {

  const [formInputValue, setFormInputValue] = useState({
    name: "", email: "", password: "", cpassword: "", address: "", profission: "", profile_pic: ""
  });
  const [inputFieldsError, setInputFieldsError] = useState({
    nameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
    serverError: ""
});

  const { name, email, password, cpassword, address, profission, profile_pic} = formInputValue;
  const {nameError, emailError, passwordError, confirmPasswordError, serverError} = inputFieldsError;

  const inputTextChange = (event) => {
    setInputFieldsError("");
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    setFormInputValue({...formInputValue, [fieldName]: fieldValue});
  }

  const formValidation = () => {
    //check if users fills all the input fields currectly or not
    if(name.trim().length<5){
        setInputFieldsError({...inputFieldsError, nameError: "Name length must be at least 5 characters"});
        return false
    }

    if(!validator.isEmail(email.trim())){
        setInputFieldsError({...inputFieldsError, emailError: "This email address is not valid"});
        return false;
    }

    if(password.trim().length <6){
        setInputFieldsError({...inputFieldsError, passwordError: "Password length must be at least 6 characters"});
        return false;
    }

    if(password != cpassword){
        setInputFieldsError({...inputFieldsError, confirmPasswordError: " Confirm Password not matched"});
        return false;
    }

    return true;

}


  const signupFormSubmit = (event) => {
    event.preventDefault();
    if(formValidation()){
      //all ok. Now send data to server
      alert("all Ok");
    }
  }


    return(
        <>
        <section className="signup_root_div  d-flex align-items-center justify-content-center">
          <div className="signup_main_div">
            <div className="signup_heading_div">
               <h2 className="signup_heading_text" >Create Account</h2>
               {/* <hr/> */}
            </div>
              <form onSubmit={signupFormSubmit}>
               <div className="FORM_div">
               <p className="text-center text-danger fw-bold">{serverError}</p>
               <div className="mb-3">
                 <label htmlFor="exampleInputusername" className="form-label signup_form_label"><PersonIcon className="signup_icons" /> User Name*</label>
                 <input type="text" className="form-control" value={name} onChange={inputTextChange} name="name" id="exampleInputusername" aria-describedby="emailHelp" placeholder="Enter full name" required />
                 <span className="input_error_span">{nameError}</span>
               </div>

               <div className="mb-3">
                 <label htmlFor="exampleInputEmail1" className="form-label signup_form_label"><EmailIcon className="signup_icons"  /> Email Address*</label>
                 <input type="email" className="form-control"  value={email} onChange={inputTextChange} name="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email address" required/>
                 <span className="input_error_span">{emailError}</span>
               </div>
               <div class="row mb-3">
                  <div class="col-md-6">
                    <label htmlFor="exampleInputEmail1" className="form-label signup_form_label"><LockIcon className="signup_icons"  /> Password*</label>
                    <input type="password" class="form-control" value={password} onChange={inputTextChange} name="password" placeholder="Password" aria-label="Password"required />
                    <span className="input_error_span">{passwordError}</span>
                  </div>
                  <div class="col-md-6 ">
                  <label htmlFor="exampleInputEmail1" className="form-label signup_form_label"><LockIcon className="signup_icons"  /> Confirm Password*</label>
                    <input type="password" class="form-control"  value={cpassword} onChange={inputTextChange} name="cpassword" placeholder="Confirm password" aria-label="Confirm Password" required/>
                    <span className="input_error_span">{confirmPasswordError}</span>
                  </div>
                   </div>
               <div className="mb-3">
                 <label htmlFor="exampleInputAddress" className="form-label signup_form_label"><HomeIcon className="signup_icons"  /> Address</label>
                 <input type="text" className="form-control" value={address} onChange={inputTextChange} name="address" id="exampleInputAddress" aria-describedby="emailHelp" placeholder="Enter your address" />
               </div>

               <div className="mb-3">
                 <label htmlFor="exampleInputEmail1" className="form-label signup_form_label"><WorkIcon className="signup_icons"  /> Profission</label>
                 <input type="text" className="form-control"  value={profission} onChange={inputTextChange}  name="profission" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your profission" />
               </div>

               <div className="mb-3">
                 <label className="form-label signup_form_label" htmlFor="inputFile"><CameraAltIcon className="signup_icons"/> Profile Picture </label>
                 <input type="file" className="form-control" id="inputFile" />
               </div>
               <div className="row my-4">
                <div className="col-md-6">
                  <Button variant="contained" type="submit" color="primary" className="signup_button"  startIcon={<PersonAddIcon />} >
                  SignUp
                  </Button>
                </div>
  
               <div className="col-md-6 mt-4">
               <NavLink exact to="/signin" style={{textDecoration: "none"}}>
                 <h3 className="signup_login_text">I already have an account.</h3>
               </NavLink>
               </div>
               </div>
                 </div>
                </form>
             </div>
        </section>
      </>
    );
}

export default SignUp;