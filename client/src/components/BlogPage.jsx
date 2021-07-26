import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import defaultProfilePic from "../Data/ProjectData";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import "../css/BlogPage.css";

const BlogPage = ({blogId, setShowLargeBlog }) => {

    // const {blogId} = useParams();
    const [autherData, setAutherData] = useState({autherName: "", profile_pic: defaultProfilePic, address: "", status: "", profission: ""});
    const [blogData, setBlogData] = useState({title: "", body: "", category: "", blog_image_url: "", publish_date: "", auther: "", auther_id: "",});
    const {title, body, category, blog_image_url, publish_date, auther, auther_id} = blogData;
    const {autherName, profile_pic, address, status, profission} = autherData;




    const closeBackButtonClick = () => {
        //hide BlogPage.jsx and show Home.jsx
        setShowLargeBlog(false);
    }

    const buttonClick = () => {
    }

    useEffect(() => {
        if(blogId){
            //means blogId is not blank or null
            fetchBlogDataFromServer(blogId);
        }
    }, [blogId]);
    const fetchBlogDataFromServer = async (blogId) => {
        try {
            const url = `http://localhost:8000/blog?blogId=${blogId}`;
            console.log("Blog page server response nisith blog id is", blogId)
            const serverResponse = await axios.get(url);
            console.log("Blog page server response nisith", serverResponse)
            if(serverResponse.status == 200){
                const blogInfo = serverResponse.data;
                setBlogData({
                    title: blogInfo.title,
                    body: blogInfo.body,
                    category: blogInfo.catogery,
                    blog_image_url: blogInfo.blog_image,
                    publish_date: blogInfo.publish_date,
                    auther: blogInfo.auther,
                    auther_id: blogInfo.auther_id
                });
             //Now fetch Blog Auther Data from server
             fetchBlogAutherDataFromServer(blogInfo.auther_id);
            }
        } catch (error) {
            console.log("Error", error.message);
        }
    }


    const fetchBlogAutherDataFromServer = async (autherId) => {
        try {
            const url = `http://localhost:8000/users?uid=${autherId}`;
            const serverResponse = await axios.get(url);
            if(serverResponse.status == 200){
                //Auther data is available
                const autherInfo = serverResponse.data;
                setAutherData({
                    autherName: autherInfo.name,
                    profile_pic: autherInfo.profile_pic == "default" ? defaultProfilePic : autherInfo.profile_pic,
                    address: autherInfo.address,
                    status: autherInfo.status,
                    profission: autherInfo.profission
                });
            }

        } catch (error) {
            console.log("Error", error.message);
        }
    }

    return(
        <>
         <section className="blogpage_root_div">
          <div className="row blogpage_main_div">
           <div className="col-lg-3 col-md-3 col-sm-12 col-12 text-center blog_page_profile_div " >
             <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="ml-2">
              <Button variant="contained" color="primary" className="blogpage_back_button" onClick={closeBackButtonClick} startIcon={<ArrowBackIcon />}>
               Back
             </Button>
              </div>
              <div className="mr-2">
              <Button variant="contained" className="blogpage_close_button" color="primary"  onClick={closeBackButtonClick} startIcon={<CancelIcon />}>
               Close
             </Button>
              </div>
             </div>
               <img src={profile_pic} alt="" className="blogpage_profile_pic" />
               <p className="blogpage_profile_name">{autherName}</p>
            <hr className="myprofile_hr mt-5" />
            <div className="text-start">
            <p className="blogpage_user_info_text">Name: {autherName}</p>  <hr className="myprofile_hr" />
            <p className="blogpage_user_info_text">Profission: {profission}</p>  <hr className="myprofile_hr" />
             <p className="blogpage_user_info_text">Status: {status}</p>  <hr className="myprofile_hr" />
             <p className="blogpage_user_info_text">Address: {address}</p>  <hr className="myprofile_hr" />
            </div>
              

               <div className=" mt-4">
               <button type="button" className="btn btn-outline-success" onClick={buttonClick}>View More Blogs of This Auther</button>
            </div> 

            

           </div>

           <div className="col-lg-9 col-md-9 col-sm-12 col-12 blogpage_blog_div ">
           <img src={blog_image_url} alt="" className="blogpage_blog_image" />
           <div className="blogpage_blog_body">
             <div className="blogpage_body_header_div d-flex justify-content-between">
             <div>
             <p className="blogpage_auther_name_text">Category: {category}</p>
             </div>
             <div>
             <p className="blogpage_published_date_text">{publish_date}</p>
             </div>
             </div>
             <h2 className="blogpage_blog_title">{title}</h2>
             <p className="blogpage_blog_description">
              {body}
             </p>
           </div>
           </div>

            </div>
         </section>
        </>
    );
}

export default BlogPage;