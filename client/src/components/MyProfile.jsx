import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import {NavLink} from 'react-router-dom';
import image from "../images/girl2.jpg";
import "../css/MyProfile.css";

const MyProfile = () => {
    return(
        <>
         <section className="myprofile_root_div d-flex justify-content-center">
         <div className="myprofile_main_div shadow">
         <div className="text-center bg-light header_div_style p-4">
           <img src={image} alt="" className="myprofile_profile_pic" />
           <input accept="image/*" id="icon-button-file" type="file"  style={{display: "none"}} />
              <label htmlFor="icon-button-file">
                <IconButton color="secondary" aria-label="upload picture" component="span" >
                <Tooltip title="Change Profile Picture">
                  <CameraAltIcon className="myprofile_camera_icon" />
                  </Tooltip>
                </IconButton>
              </label>


           <h2 className="myprofile_user_name">Gia Karter</h2>
         </div>
         <div className="myprofile_user_info_div">
         <div className="d-flex justify-content-between align-content-center" style={{marginBottom: "-15px"}}>
           <div>
           <p className="myprofile_user_info_text">Name: Gia Karter</p>
           </div>
           <div>
           <Tooltip title="Edit Profile">
             <EditIcon className="myProfile_edit_icon"  data-toggle="modal" data-target="#exampleModalCenter" />
           </Tooltip>
             
           </div>
           <div className="pr-2">
           <p className="myprofile_user_info_text">Profission: Student</p>
           </div>
         </div>
         <hr className="myprofile_hr" />

         {/* modal */}
          <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
         <div className="modal-dialog modal-dialog-centered" role="document">
           <div className="modal-content">
             <div className="modal-header">
               <h5 className="modal-title" id="exampleModalLongTitle">Edit Profile</h5>
               <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
               </button>
             </div>
             <div className="modal-body">
             <div>
               <label htmlFor="exampleFormControlTextarea1" className=" form-label myprofile_form_label ">User Name*</label>
               <TextField
               value="Gia Karter"
                id="standard-full-width"
                style={{ margin: "8px"}}
                placeholder="Enter blog title"
                fullWidth
                margin="normal"
                InputLabelProps={{
                shrink: true,
                }} />
              </div>

              <div>
               <label htmlFor="exampleFormControlTextarea1" className=" form-label myprofile_form_label ">Profission</label>
               <TextField
               value="Student"
                id="standard-full-width"
                style={{ margin: "8px"}}
                placeholder="Enter blog title"
                fullWidth
                margin="normal"
                InputLabelProps={{
                shrink: true,
                }} />
              </div>

              <div>
               <label htmlFor="exampleFormControlTextarea1" className=" form-label myprofile_form_label ">Status</label>
               <TextField
               value="Hey there, I am Gia Karter..."
                id="standard-full-width"
                style={{ margin: "8px"}}
                placeholder="Enter blog title"
                fullWidth
                margin="normal"
                InputLabelProps={{
                shrink: true,
                }} />
              </div>

              <div>
               <label htmlFor="exampleFormControlTextarea1" className=" form-label myprofile_form_label ">Address</label>
               <TextField
               value="California, America"
                id="standard-full-width"
                style={{ margin: "8px"}}
                placeholder="Enter blog title"
                fullWidth
                margin="normal"
                InputLabelProps={{
                shrink: true,
                }} />
              </div>
             </div>
             <div className="modal-footer">
               <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
               <button type="button" className="btn btn-primary update_profile_button">Save changes</button>
             </div>
           </div>
         </div>
         </div>

         {/* modal */}

            <p className="myprofile_user_info_text">Status: Hi, I am Gia Karter.</p>  <hr className="myprofile_hr" />
            <p className="myprofile_user_info_text">Address: California, America</p>  <hr className="myprofile_hr" />
            <p className="myprofile_user_info_text">Total blog publish: 3</p>  <hr className="myprofile_hr" />
         </div>  
          
          
         <div className="row my-2 ml-3">
                <div className="col-md-4">
                  <Button variant="contained" color="secondary" className="update_profile_button"  data-toggle="modal" data-target="#exampleModalCenter"  startIcon={<EditIcon />} >
                   Edit Profile
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