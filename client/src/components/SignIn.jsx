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
import "../css/SignIn.css";


const SignIn = () => {
    return(
        <section className="signin_root_div  d-flex align-items-center justify-content-center">
         <div className="signin_main_div">
            <div className="signin_heading_div">
               <h2 className="signin_heading_text" >User Login</h2>
            </div>
              <form >
               <div className="FORM_div">
               <div className="mb-3">
                 <label htmlFor="exampleInputEmail1" className="form-label signin_form_label"><EmailIcon className="signin_icons"  /> Email Address*</label>
                 <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email address" />
               </div>
               <div class=" mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label signin_form_label"><LockIcon className="signin_icons"  /> Password*</label>
                    <input type="text" class="form-control" placeholder="Password" aria-label="Password" />
                  </div>

               <div className="row my-4">
                <div className="col-md-6">
                  <Button variant="contained" color="secondary" className="signin_button" endIcon={<ExitToAppIcon />} >
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