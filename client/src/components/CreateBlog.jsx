import NoteAddIcon from '@material-ui/icons/NoteAdd';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import {NavLink} from 'react-router-dom';
import { useState } from 'react';
import BlogCategoryData from "../Data/BlogCategoryData";
import firebase from "../Firebase/Firebaseconfig";
import validator from 'validator';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';
import "../css/CreateBlog.css";



const reactToastStyle = {
  position: "top-center",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  };

//for testing perpose 
const userId = "60fe529791ea180514755c5d";

const CreateBlog = () => {
  const firebaseStorageRef = firebase.storage().ref();
    const [formInputValue, setFormInputValue] = useState({ title: "", body: "", catogery: "",  blog_image: "", auther: "", auther_id: userId });
          const [inputFieldsError, setInputFieldsError] = useState({
            titleError: "",
            bodyError: "",
            catogeryError: "",
            autherError: "",
            blogImageError: "",
            serverError: ""
        });
        const [progressbarState, setProgressbarState] = useState(false);
        
          const { title, body, catogery, blog_image, auther, auther_id} = formInputValue;
          const {titleError, bodyError, catogeryError, autherError, blogImageError, serverError} = inputFieldsError;
        
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

          if(!blog_image){
            setInputFieldsError({...inputFieldsError, blogImageError: "Please select a blog image"});
            return false;
          }
            return true;
        }
        
        
          const blogFormSubmit = (event) => {
            event.preventDefault();
            if(formValidation()){
              //all ok. Now send data to server
              //Save blog image on Firebase storage
              setProgressbarState(true);
              saveBlogImageOnFirebase(blog_image);
            }
          }



          
          const saveBlogImageOnFirebase = (file) => {
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
               setProgressbarState(false);
        
             },
             async () => {
               //Get image download url
               const imageUrl = await uploadTask.snapshot.ref.getDownloadURL();
               //save user data on server with his/her profile image
               saveBlogOnServer(imageUrl);
               console.log('File is available at', imageUrl);
             }
            )
          } catch (error) {
              setProgressbarState(false);
              console.log(error.message);
          }
          }   
          
        
    
  const saveBlogOnServer = async (blogImageUrl) => {
    //send blog data to serevr
    const url = "http://localhost:8000/blog";
    const data = {
      title: title,
      body: body,
      catogery: catogery,
      blog_image: blogImageUrl,
      auther: auther,
      auther_id: auther_id
    }
    try {
      const serverResponse = await axios.post(url, data, {withCredentials: true});
      if(serverResponse.status == 200){
        //blog created successfully
        setProgressbarState(false);
        toast.success(serverResponse.data, reactToastStyle);
        setFormInputValue({ title: "", body: "", catogery: "",  blog_image: "", auther: "", auther_id: userId });

      }
    } catch (error) {
      //Blog not created. Something is wrong
       //set server error message
       setProgressbarState(false);
       try{
        const serverResponse = error.response;
        toast.error(serverResponse.data, reactToastStyle);
        setInputFieldsError({...inputFieldsError, serverError: serverResponse.data});
      }catch(error){
        setInputFieldsError({...inputFieldsError, serverError: error.message});
      } 
      
    }
    
  }      



        
    return(
        <>
           <section className="create_blog_root_div d-flex justify-content-center">
             <div className="create_blog_main_div shadow">
             <div className="create_blog_heading_div">
               <h2 className="create_blog_heading_text" >Create Blog</h2>
               <hr className="create_blog_hr" />
               <ToastContainer />
               <span className="input_error_span">{serverError}</span>
            </div>
              <form onSubmit={blogFormSubmit}>
               <div className="FORM_div" >
               
               <div className="mb-3">
                 <label htmlFor="exampleInputusername" className="form-label create_blog_form_label"> Blog Title*</label>
                 <input type="text" className="form-control" value={title} onChange={inputTextChange} name="title"  id="exampleInputusername" aria-describedby="emailHelp" placeholder="Enter blog title" required />
                 <span className="input_error_span">{titleError}</span>
               </div>
               <div className="mb-3">
                 <label htmlFor="exampleFormControlTextarea1" className="form-label create_blog_form_label">Blog Text*</label>
                 <textarea className="form-control"  value={body} onChange={inputTextChange} name="body"  id="exampleFormControlTextarea1" rows="3" style={{height: "300px"}} placeholder="Write your blog here..." required></textarea>
                 <span className="input_error_span">{bodyError}</span> 
               </div>
               <div className="mb-3">
               <label htmlFor="exampleDataList" className="form-label create_blog_form_label">Blog Catogery*</label>
                <input className="form-control" value={catogery} onChange={inputTextChange} name="catogery"  type="text" list="datalistOptions" id="exampleDataList" placeholder="Select blog catogery" required />
                <span className="input_error_span">{catogeryError}</span>
                <datalist id="datalistOptions">
                  <option value="Technology" />
                  <option value="Science" />
                  <option value="Cooking" />
                  <option value="Software" />
                  <option value="Computer" />
                </datalist>
                </div>

               <div className="mb-3">
                 <label htmlFor="exampleInputEmail1" className="form-label create_blog_form_label"> Auther Name*</label>
                 <input type="text" className="form-control" value={auther} onChange={inputTextChange} name="auther"  id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter auther name" required />
                 <span className="input_error_span">{autherError}</span>
               </div>
               <div className="mb-3">
                 <label className="form-label create_blog_form_label" htmlFor="inputFile">Blog Image* </label>
                 <input type="file" accept="image/*" className="form-control" id="inputFile" name="blog_image" onChange={inputTextChange} />
                 <span className="input_error_span" >{blogImageError}</span>
               </div>
               <div className="row my-4">
                <div className="col-md-6 d-flex justify-content-around align-items-center">
                <div>
                  <Button variant="contained" type="submit" color="primary" className="create_blog_button"  endIcon={<SendIcon />} >
                    Publish Blog
                  </Button>
                </div>
                <div>
                  {progressbarState ? <CircularProgress color="primary" /> : null }
                </div>
                
                </div>
               <div className="col-md-6 mt-4">
               <NavLink exact to="/signup" style={{textDecoration: "none"}}>
                 <h3 className="create_blog_login_text">New user? Create account</h3>
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

export default CreateBlog;