import blogImg from "../images/laptop3.jpg";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import firebase from "../Firebase/Firebaseconfig";
import BlogCategoryData from "../Data/BlogCategoryData";
import { useState, useEffect } from "react";
import "../css/EditBlog.css";

let defaultBlogImage = blogImg;

const EditBlog = ({setState}) =>{
    
  const firebaseStorageRef = firebase.storage().ref();
  const [formInputValue, setFormInputValue] = useState({ title: "", body: "", catogery: "", auther: "", blog_image: "",  blog_image_url: defaultBlogImage });
  const [updateImageButtonState, setUpdateImageButtonState] = useState(false);
  const [progressbarState, setProgressbarState] = useState({updateBlogImageProgressbarStatus: false, updateBlogInfoProgressbarStatus: false});
  const [inputFieldsError, setInputFieldsError] = useState({titleError: "", bodyError: "", catogeryError: "", autherError: "", serverError: "" });

  const { title, body, catogery, auther, blog_image, blog_image_url} = formInputValue;
  const {titleError, bodyError, catogeryError, autherError, serverError} = inputFieldsError;

  useEffect(()=>{
    if(blog_image){
      console.log("use effect is called inside if ....");
      setFormInputValue({...formInputValue, blog_image_url: URL.createObjectURL(blog_image)});
      setUpdateImageButtonState(true);
    }
  }, [blog_image]);
   
   const inputTextChange = (event) => {
    setInputFieldsError("");
    const fieldName = event.target.name;
    let fieldValue = event.target.value;
    if(fieldName === "blog_image"){
      fieldValue = event.target.files[0];
    }
    setFormInputValue({...formInputValue, [fieldName]: fieldValue});
   }


   const formValidation = () => {
    //check if users fills all the input fields currectly or not
    if(title.trim().length<3){
        setInputFieldsError({...inputFieldsError, titleError: "Title length must be at least 3 characters"});
        return false
    }

    if(body.trim().length<10){
      setInputFieldsError({...inputFieldsError, bodyError: "Write more about this blog"});
      return false
  }
  let isValidCategory = false;
  BlogCategoryData.map((value => {
    if(value === catogery){
      isValidCategory = true;
    }
  }));

  if(!isValidCategory){
    //means not a valid category
    setInputFieldsError({...inputFieldsError, catogeryError: "Blog category is not valid. Please choose one from list."});
    return false;
  }

  if(auther.trim().length<1){
    setInputFieldsError({...inputFieldsError, autherError: "Enter auther name"});
    return false;
  }

    return true;

}



   const saveBlogInfoButtonClick = () => {
     //when user click to update the blog
     if(formValidation()){
       //Update blog data on server
       alert("all ok here...");
     }
     
   }

   const cancelBlogInfoButtonClick = () => {
     //when user click cancel button
     //go back to the MyBlog component
     setState(true);
   }

    
    const onSaveImageButtonClick = () => {
      //Save blog image on firebase storage
      setProgressbarState({...progressbarState, updateBlogImageProgressbarStatus: true});
      updateBlogImageOnFirebaseStorage(blog_image);
    }
  


    const onCancelImageButtonClick = () => {
    //Hide blog image update buttons
    setFormInputValue({...formInputValue, blog_image_url: defaultBlogImage })
    setUpdateImageButtonState(false);
    
    }



    
  const updateBlogImageOnFirebaseStorage = (file) => {
    //Save user profile image on Firebase Storage
    try {
    const uploadTask = firebaseStorageRef.child(`blogImages/${(Date.now()) + (file.name)}`).put(file);
    console.log("Image is uploading to firebase...");
   
    uploadTask.on("state_changed",
    (snapshot)=>{
      //for handeling upload progress
     },
     (error) => {
       console.log(error.message);
       setProgressbarState({...progressbarState, updateBlogImageProgressbarStatus: false});

     },
     async () => {
       //Get image download url
       const imageUrl = await uploadTask.snapshot.ref.getDownloadURL();
       //save user data on server with his/her profile image
       updateBlogImageUrlOnServer(imageUrl);
     }
    )
  } catch (error) {
    setProgressbarState({...progressbarState, updateBlogImageProgressbarStatus: false});
      console.log(error.message);
  }
  }


  
  const updateBlogImageUrlOnServer = async (profileImageUrl) => {
    //send blog image url on serev
    alert(profileImageUrl);
    defaultBlogImage = profileImageUrl;
    setFormInputValue({...formInputValue, blog_image_url: profileImageUrl});
    setUpdateImageButtonState(false);
    setProgressbarState({...progressbarState, updateBlogImageProgressbarStatus: false});
  }



    return(
        <>
         <div className="editblog_root_div">
             <div>
               <img src={blog_image_url} alt="" className="editblog_image" />
               <div className="d-flex justify-content-start align-items-center">
                 <div>
                 <input accept="image/*" id="icon-button-file" type="file"  style={{display: "none"}} onChange={inputTextChange} name="blog_image" />
                 <label htmlFor="icon-button-file">
                <IconButton color="secondary" aria-label="upload picture" component="span" >
                <Tooltip title="Change profile picture">
                  <PhotoCamera className="editblog_photo_icon mt-2" />
                  </Tooltip>
                </IconButton>
                </label>
                 </div>
                 {updateImageButtonState ? 
                  <>
                 <div className="mr-3">
                 <Button variant="contained" className="update_image_button" onClick={onSaveImageButtonClick}  startIcon={<SaveIcon />} >
                     Save Image
                 </Button>
                </div>
                <div>
                <Button variant="contained" color="secondary" className="cancel_image_button" onClick={onCancelImageButtonClick}    startIcon={<CancelIcon />} >
                     Cancel
                 </Button>
                 </div>
                <div>
                {progressbarState.updateBlogImageProgressbarStatus ? <CircularProgress color="primary" className="ml-5" /> : null }
                </div>
                 </>    : null }
               </div>
             
             </div>
             <div className="editblog_body_div">
             <label htmlFor="exampleFormControlTextarea1" className="form-label create_blog_form_label">Blog Title*</label>
             <TextField
             name="title"
             onChange={inputTextChange}
             value={title}
              id="standard-full-width"
              style={{ margin: "8px"}}
              placeholder="Enter blog title"
              fullWidth
              margin="normal"
              InputLabelProps={{
              shrink: true,
              }} />
              <span className="input_error_span ml-2">{titleError}</span>
               <div className="my-3">
                 <label htmlFor="exampleFormControlTextarea1" className="form-label create_blog_form_label">Blog Text*</label>
                 <textarea className="form-control"  name="body" value={body} onChange={inputTextChange}  id="exampleFormControlTextarea1" rows="3" style={{height: "300px"}} placeholder="Write your blog here..."></textarea>
                 <span className="input_error_span ml-2">{bodyError}</span>
               </div>
               <div className="my-3">
               <label htmlFor="exampleDataList" className="form-label create_blog_form_label">Blog Catogery*</label>
                <input className="form-control" type="text" list="datalistOptions" name="catogery" value={catogery} onChange={inputTextChange} id="exampleDataList" placeholder="Select blog catogery" />
                <datalist id="datalistOptions">
                  <option value="Technology" />
                  <option value="Science" />
                  <option value="Cooking" />
                  <option value="Software" />
                  <option value="Computer" />
                </datalist>
                <span className="input_error_span ml-2">{catogeryError}</span>
                </div>
                <label htmlFor="exampleFormControlTextarea1" className="form-label create_blog_form_label">Auther Name*</label>
                 <TextField
                  name="auther"
                  value={auther} 
                  onChange={inputTextChange}
                  id="standard-full-width"
                  style={{ margin: "8px"}}
                  placeholder="Enter auther name"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                  shrink: true,
                  }} />
                  <span className="input_error_span ml-2">{autherError}</span>
                  <div className="d-flex justify-content-start mt-4">
                   <div>
                   <Button variant="contained" color="secondary" onClick={cancelBlogInfoButtonClick} className="editblog_cancel_button" startIcon={<CancelIcon />  } >
                    Cancel
                  </Button>
                   </div>
                   <div>
                   <Button variant="contained" color="secondary"  onClick={saveBlogInfoButtonClick} className="editblog_save_button ml-4" startIcon={<SaveIcon />} >
                    Save
                  </Button>
                   </div>
                  </div>

                 </div>
         </div>
        </>
    );
}

export default EditBlog;