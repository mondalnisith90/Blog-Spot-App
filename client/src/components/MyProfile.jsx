import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import {NavLink} from 'react-router-dom';
import image from "../images/girl2.jpg";
import "../css/MyProfile.css";

const MyProfile = () => {
    return(
        <>
         <section className="myprofile_root_div d-flex justify-content-center">
         <div className="myprofile_main_div shadow">
         <div className="text-center bg-light p-4">
           <img src={image} alt="" className="myprofile_profile_pic" />
           <CameraAltIcon className="myprofile_camera_icon" />
           <h2 className="myprofile_user_name">Gia Karter</h2>
         </div>
         <div className="myprofile_user_info_div">
            <p className="myprofile_user_info_text">Name: Gia Karter</p> 
            <p className="myprofile_user_info_text">Status: Hi, I am Gia Karter.</p> 
            <p className="myprofile_user_info_text">Profission: Student</p> 
            <p className="myprofile_user_info_text">Address: California, America</p> 
            <p className="myprofile_user_info_text">Total blog publish: 3</p> 
         </div>  
          
          
         <div className="row my-2 ml-3">
                <div className="col-md-4">
                  <Button variant="contained" color="secondary" className="update_profile_button" startIcon={<SaveIcon />} >
                   Update Profile
                  </Button>
                </div>
  
               <div className="col-md-4 mt-4">
               <NavLink exact to="/create-blog" style={{textDecoration: "none"}}>
                 <h3 className="myprofile_login_text">Create Blog</h3>
               </NavLink>
               </div>
               <div className="col-md-4 mt-4">
               <NavLink exact to="/my-blog" style={{textDecoration: "none"}}>
                 <h3 className="myprofile_login_text">My Blogs</h3>
               </NavLink>
               </div>
               </div>

         </div>
         </section>
        </>
    );
}

export default MyProfile;