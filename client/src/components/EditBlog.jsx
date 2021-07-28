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
import { useState, useEffect, useContext } from "react";
import { CurrentUserDataContext } from '../App';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import "../css/EditBlog.css";



const reactToastStyle = {
  position: "top-center",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  };

const EditBlog = ({setToggler, blogToEdit, fetchBlogsFromServer}) =>{
  const {currentUserData, setCurrentUserData} = useContext(CurrentUserDataContext);
  const currentUserId = currentUserData.userId;
  let defaultBlogImage = blogToEdit.blog_image;  
  const firebaseStorageRef = firebase.storage().ref();
  const [formInputValue, setFormInputValue] = useState({ title: blogToEdit.title, body: blogToEdit.body, catogery: blogToEdit.catogery, auther: blogToEdit.auther, blog_image: "",  blog_image_url: defaultBlogImage });
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
    if(value.toLowerCase() == catogery.toLowerCase()){
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
       setProgressbarState({...progressbarState, updateBlogInfoProgressbarStatus: true});
       updateBlogInfoOnServer();
     }
   }


   const updateBlogInfoOnServer = async () => {
      //Update blog Information on server
    try {
      const url = `http://localhost:8000/blog?blogId=${blogToEdit._id}&&uid=${currentUserId}`;
      const data = {
        title: title,
        body: body,
        catogery: catogery,
        auther: auther
      }
      const serverResponse = await axios.put(url, data, {withCredentials: true});
      if(serverResponse.status == 200){
        //Blog Information updated successfully
        setProgressbarState({...progressbarState, updateBlogInfoProgressbarStatus: false});
        toast.success("Blog updated successfully", reactToastStyle);
        //Blog information updated successfully. So again fetch all blogs of this current user from server to see changes
        //This fetchBlogsFromServer() method is belong to MyBlogs.jsx component
        fetchBlogsFromServer();
      }
    } catch (error) {
      //Blog information not update
      setProgressbarState({...progressbarState, updateBlogInfoProgressbarStatus: false});
      toast.error("Blog not update", reactToastStyle);
    }
   }



   const cancelBlogInfoButtonClick = () => {
     //when user click cancel button
     //go back to the MyBlog component
     //Hide EditBlog.jsx and show or render MyBlogBlog.jsx
     setToggler(true);
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


  
  const updateBlogImageUrlOnServer = async (blogImageUrl) => {
    //Update blog image url on server
    try {
      const url = `http://localhost:8000/blog?blogId=${blogToEdit._id}&&uid=${currentUserId}`;
      const data = {
        blog_image: blogImageUrl
      }
      const serverResponse = await axios.put(url, data, {withCredentials: true});
      if(serverResponse.status == 200){
        //Blog image url updated successfully
        defaultBlogImage = blogImageUrl;
        setFormInputValue({...formInputValue, blog_image_url: blogImageUrl});
        setUpdateImageButtonState(false);
        setProgressbarState({...progressbarState, updateBlogImageProgressbarStatus: false});
        toast.success("Blog image updated successfully", reactToastStyle);
        //Blog image updated successfully. So again fetch all blogs of this current user from server to see changes
        //This fetchBlogsFromServer() method is belong to MyBlogs.jsx component
        fetchBlogsFromServer();
      }
    } catch (error) {
      setProgressbarState({...progressbarState, updateBlogImageProgressbarStatus: false});
      toast.error("Blog image not update", reactToastStyle);
    }
  }



    return(
        <>
         <div className="editblog_root_div">
         <ToastContainer />
         <div className="text-center">
            <Tooltip title="Cancel">
              <CancelIcon className="editblog_close_icon" onClick={cancelBlogInfoButtonClick}/>
              </Tooltip>
             </div>
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
                  <option value="Art" />
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
                  <div className="d-flex justify-content-start align-items-center mt-4">
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
                   <div>
                   {progressbarState.updateBlogInfoProgressbarStatus ? <CircularProgress color="primary" className="ml-5" /> : null }
                   </div>
                  </div>

                 </div>
         </div>
        </>
    );
}

export default EditBlog;