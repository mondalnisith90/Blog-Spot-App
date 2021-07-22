import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import HomeIcon from '@material-ui/icons/Home';
import LockIcon from '@material-ui/icons/Lock';
import WorkIcon from '@material-ui/icons/Work';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {NavLink} from 'react-router-dom';
import "../css/SignUp.css";

const SignUp = () => {
    return(
        <>
        <section className="signup_root_div  d-flex align-items-center justify-content-center">
          <div className="signup_main_div">
            <div className="signup_heading_div">
               <h2 className="signup_heading_text" >Create Account</h2>
               {/* <hr/> */}
            </div>
              <form >
               <div className="FORM_div">
               <div className="mb-3">
                 <label htmlFor="exampleInputusername" className="form-label signup_form_label"><PersonIcon className="signup_icons" /> User Name*</label>
                 <input type="email" className="form-control" id="exampleInputusername" aria-describedby="emailHelp" placeholder="Enter full name" />
               </div>

               <div className="mb-3">
                 <label htmlFor="exampleInputEmail1" className="form-label signup_form_label"><EmailIcon className="signup_icons"  /> Email Address*</label>
                 <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email address" />
               </div>
               <div class="row mb-3">
                  <div class="col-md-6">
                    <label htmlFor="exampleInputEmail1" className="form-label signup_form_label"><LockIcon className="signup_icons"  /> Password*</label>
                    <input type="text" class="form-control" placeholder="Password" aria-label="Password" />
                  </div>
                  <div class="col-md-6 ">
                  <label htmlFor="exampleInputEmail1" className="form-label signup_form_label"><LockIcon className="signup_icons"  /> Confirm Password*</label>
                    <input type="text" class="form-control" placeholder="Confirm password" aria-label="Confirm Password" />
                  </div>
                   </div>
               <div className="mb-3">
                 <label htmlFor="exampleInputAddress" className="form-label signup_form_label"><HomeIcon className="signup_icons"  /> Address</label>
                 <input type="email" className="form-control" id="exampleInputAddress" aria-describedby="emailHelp" placeholder="Enter your address" />
               </div>

               <div className="mb-3">
                 <label htmlFor="exampleInputEmail1" className="form-label signup_form_label"><WorkIcon className="signup_icons"  /> Profission</label>
                 <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your profission" />
               </div>

               <div className="mb-3">
                 <label className="form-label signup_form_label" htmlFor="inputFile"><CameraAltIcon className="signup_icons"/> Profile Picture </label>
                 <input type="file" className="form-control" id="inputFile" />
               </div>
               <div className="row my-4">
                <div className="col-md-6">
                  <Button variant="contained" color="primary" className="signup_button"  startIcon={<PersonAddIcon />} >
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