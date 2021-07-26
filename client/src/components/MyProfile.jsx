import Button from '@material-ui/core/Button';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import { useState, useEffect } from 'react';
import axios from "axios";
import firebase from "../Firebase/Firebaseconfig";
import {NavLink} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import defaultProfilePic from '../Data/ProjectData';
import CircularProgress from '@material-ui/core/CircularProgress';
import "../css/MyProfile.css";



const reactToastStyle = {
  position: "top-center",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  };

let defaultImage = defaultProfilePic;

const MyProfile = () => {
  const firebaseStorageRef = firebase.storage().ref();
  const [formInputValue, setFormInputValue] = useState({userId: "", name: "", profission: "", status: "", address: "", profile_image: "",  profile_image_url: defaultImage });
  const [updateImageButtonState, setUpdateImageButtonState] = useState(false);
  const [progressbarState, setProgressbarState] = useState({updateProfileImageProgressbar: false, updateProfileInfoProgressbar: false});
  const [inputFieldsError, setInputFieldsError] = useState({nameError: ""});


  const {userId, name, profission, status, address, profile_image, profile_image_url} = formInputValue;
  const {nameError} = inputFieldsError;

  useEffect(()=>{
    if(profile_image){
      setFormInputValue({...formInputValue, profile_image_url: URL.createObjectURL(profile_image)});
      setUpdateImageButtonState(true);
    }
  }, [profile_image]);

  useEffect(() => {
    //Fetch current user information from server
    fetchUserDataFromServer();
  }, []);



  const fetchUserDataFromServer = async () => {
    //Fetch current user data from server
    try {
      const url = "http://localhost:8000/users/data";
      const serverResponse = await axios.get(url, {withCredentials: true});
      if(serverResponse.status == 200){
        const userData = serverResponse.data;
        setFormInputValue({
          ...formInputValue,
          userId: userData.id,
          name: userData.name ,
          profission: userData.profission ,
          status: userData.status ,
          address: userData.address ,
          profile_image_url: userData.profie_pic=="default" ? defaultProfilePic : userData.profie_pic
        });
        defaultImage = userData.profie_pic=="default" ? defaultProfilePic : userData.profie_pic;
      }

    } catch (error) {
      console.log("Server error", error.message);
    }
  }


  const onModalCloseButtonClick = () => {
    //This will call when modal popup is close by pressing close or cross botton
    //Here we simply fetch user info again
    fetchUserDataFromServer();

  }


  const inputFieldChange = (event) => {
    setInputFieldsError("");
    const fieldName = event.target.name;
    let fieldValue = event.target.value;
    if(fieldName === "profile_image"){
      fieldValue = event.target.files[0];
      // fieldValue = URL.createObjectURL(event.target.files[0])
    }
    setFormInputValue({...formInputValue, [fieldName]: fieldValue});
  }




  const formValidation = () => {
    //check if users fills all the input fields currectly or not
    if(name.trim().length<5){
        setInputFieldsError({...inputFieldsError, nameError: "Name length must be at least 5 characters"});
        return false;
    }

    return true;

}


 const userInfoSaveButtonClick = () => {
   if(formValidation()){
     //update user profile
     //send user information to server for update profile
     setProgressbarState({...progressbarState, updateProfileInfoProgressbar: true});
     updateUserProfileOnServer();
   }
 }


 const updateUserProfileOnServer = async () => {
  //update user profile image url on serevr
  try {
    const url = "http://localhost:8000/users";
    const data = {
      uid: userId,
      name: name,
      address: address,
      profission: profission,
      status: status
    };
    const serverResponse = await axios.put(url, data, {withCredentials: true});
    if(serverResponse.status == 200){
      //user profile updated successfully
      console.log("Profile data update result", serverResponse);
      setProgressbarState({...progressbarState, updateProfileInfoProgressbar: false});
      toast.success("Profile updated successfully.", reactToastStyle);
    }
  } catch (error) {
    console.log(error.message);
    toast.error("Profile not update", reactToastStyle);
    setProgressbarState({...progressbarState, updateProfileInfoProgressbar: false});
  }
}


  const onSaveImageButtonClick = () => {
    //Save profile image on firebase storage
    setProgressbarState({...progressbarState, updateProfileImageProgressbar: true});
    updateProfileImageOnFirebase(profile_image);
  }

  const onCancelImageButtonClick = () => {
    //Hide profile image update buttons
    if(!progressbarState.updateProfileImageProgressbar){
      //Only run when image is not upload. Then progressbar state will true
    setFormInputValue({...formInputValue, profile_image_url: defaultImage })
    setUpdateImageButtonState(false);
  }
  }



  const updateProfileImageOnFirebase = (file) => {
    //Save user profile image on Firebase Storage
    try {
    const uploadTask = firebaseStorageRef.child(`profileImages/${(Date.now()) + (file.name)}`).put(file);   
    uploadTask.on("state_changed",
    (snapshot)=>{
      //for handeling upload progress
     },
     (error) => {
       console.log(error.message);
       setProgressbarState({...progressbarState, updateProfileImageProgressbar: false});

     },
     async () => {
       //Get image download url
       const imageUrl = await uploadTask.snapshot.ref.getDownloadURL();
       //save user data on server with his/her profile image
       updateProfileImageUrlOnServer(imageUrl);
     }
    )
  } catch (error) {
    setProgressbarState({...progressbarState, updateProfileImageProgressbar: false});
      console.log(error.message);
  }
  }


  
  const updateProfileImageUrlOnServer = async (profileImageUrl) => {
    //update user profile image url on serevr
    try {
      const url = "http://localhost:8000/users";
      const data = {
        uid: userId,
        profile_pic: profileImageUrl
      };
      const serverResponse = await axios.put(url, data, {withCredentials: true});
      if(serverResponse.status == 200){
        //image updated successfully
        console.log("Profile image update result", serverResponse);
        defaultImage = profileImageUrl;
        setFormInputValue({...formInputValue, profile_image_url: profileImageUrl});
        setUpdateImageButtonState(false);
        setProgressbarState({...progressbarState, updateProfileImageProgressbar: false});
        toast.success("Profile image updated successfully.", reactToastStyle);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Profile image not update", reactToastStyle);
      setProgressbarState({...progressbarState, updateProfileImageProgressbar: false});
    }
  }


    return(
        <>
         <section className="myprofile_root_div d-flex justify-content-center">
         <div className="myprofile_main_div shadow">
         <ToastContainer />
         <div className="text-center bg-light header_div_style p-4">
           <img src={profile_image_url} alt="" className="myprofile_profile_pic" />
          
           <input accept="image/*" id="icon-button-file" type="file"  style={{display: "none"}} onChange={inputFieldChange} name="profile_image" />
              <label htmlFor="icon-button-file">
                <IconButton color="secondary" aria-label="upload picture" component="span" >
                <Tooltip title="Change Profile Picture">
                  <CameraAltIcon className="myprofile_camera_icon"   data-toggle="modal" data-target="#exampleModal"/>
                  </Tooltip>
                </IconButton>
              </label>

           <h2 className="myprofile_user_name">{name}</h2>
           {updateImageButtonState ? 
           <>
           <div className="d-flex align-items-center justify-content-center">
             <div className="mr-3">
              <Button variant="contained" className="update_image_button" onClick={onSaveImageButtonClick}  startIcon={<SaveIcon />} >
                  Save
              </Button>
             </div>
             <div>
             {progressbarState.updateProfileImageProgressbar ? <CircularProgress color="primary" className="mr-3" /> : null }
             </div>
             <div>
             <Button variant="contained" color="secondary" className="cancel_image_button" onClick={onCancelImageButtonClick}    startIcon={<CancelIcon />} >
                  Cancel
              </Button>
             </div>
           </div>
           </> : null }

         </div>
         <div className="myprofile_user_info_div">
         <div className="d-flex justify-content-between align-content-center" style={{marginBottom: "-15px"}}>
           <div>
           <p className="myprofile_user_info_text">Name: {name}</p>
           </div>
           <div>
           <Tooltip title="Edit Profile">
             <EditIcon className="myProfile_edit_icon"  data-toggle="modal" data-target="#exampleModalCenter" />
           </Tooltip>
             
           </div>
           <div className="pr-2">
           <p className="myprofile_user_info_text">Profission: {profission}</p>
           </div>
         </div>
         <hr className="myprofile_hr" />

         {/* modal */}
          <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
         <div className="modal-dialog modal-dialog-centered" role="document">
           <div className="modal-content">
             <div className="modal-header">
               <h5 className="modal-title" id="exampleModalLongTitle">Edit Profile</h5>
               <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onModalCloseButtonClick}>
                 <span aria-hidden="true">&times;</span>
               </button>
             </div>
             <div className="modal-body">
             <div>
               <label htmlFor="exampleFormControlTextarea1" className=" form-label myprofile_form_label ">User Name*</label>
               <TextField
               onChange={inputFieldChange}
               value={name}
               name="name"
                id="standard-full-width"
                style={{ margin: "8px"}}
                placeholder="Enter blog title"
                fullWidth
                margin="normal"
                InputLabelProps={{
                shrink: true,
                }} />
                <span className="input_error_span ml-2">{nameError}</span>
              </div>

              <div>
               <label htmlFor="exampleFormControlTextarea1" className=" form-label myprofile_form_label ">Profission</label>
               <TextField
               onChange={inputFieldChange}
               value={profission}
               name="profission"
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
               onChange={inputFieldChange}
               value={status}
               name="status"
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
               onChange={inputFieldChange}
               value={address}
               name="address"
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
             <div className="modal-footer d-flex justify-content-start align-items-center">
             <div>
             <button type="button" className="btn btn-secondary" data-dismiss="modal"  onClick={onModalCloseButtonClick} >Close</button>
             </div>
               <div>
               <button type="button" className="btn btn-primary update_profile_button" onClick={userInfoSaveButtonClick} ><SaveIcon /> Save</button>
               </div>
               <div>
                {progressbarState.updateProfileInfoProgressbar ? <CircularProgress color="primary" className="ml-5" /> : null }
               </div>
               
             </div>
           </div>
         </div>
         </div>

         {/* modal */}

            <p className="myprofile_user_info_text">Status: {status}</p>  <hr className="myprofile_hr" />
            <p className="myprofile_user_info_text">Address: {address}</p>  <hr className="myprofile_hr" />
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