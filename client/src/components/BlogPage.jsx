import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import defaultProfilePic from "../Data/ProjectData";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import "../css/BlogPage.css";

const BlogPage = ({clickedBlogInfo, sethomeBlogPageToggler }) => {

    const auther_id = clickedBlogInfo.auther_id;
    const [autherData, setAutherData] = useState({autherName: "", profile_pic: defaultProfilePic, address: "", status: "", profission: ""});
    const [autherBlogs, setAutherBlogs] = useState([clickedBlogInfo]);
    const [progressbarState, setProgressbarState] = useState(false);
    const {autherName, profile_pic, address, status, profission} = autherData;




    const closeBackButtonClick = () => {
        //To toggle between Home.jsx and BlogPage.jsx
        //If homeBlogPageToggler = false, then Home.jsx will render and BlogPage.jsx will hide
        sethomeBlogPageToggler(false);
    }

    useEffect(() => {
        if(clickedBlogInfo.auther_id){
            //means blogId is not blank or null
            fetchBlogAutherDataFromServer(auther_id);
        }
    }, [auther_id]);


    const fetchBlogAutherDataFromServer = async (autherId) => {
        try {
            setProgressbarState(true);
            const url = `http://localhost:8000/users?uid=${autherId}`;
            const serverResponse = await axios.get(url);
            if(serverResponse.status == 200){
                //Auther data is available
                setProgressbarState(false);
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
            setProgressbarState(false);
        }
    }

    const moreBlogsAutherButtonClick = () => {
        //When more blogs of this auther button clicked
        //Fetch more blogs of clicked blog auther
        fetchBlogsByAutherId(auther_id);
    }


    const fetchBlogsByAutherId = async () => {
        try {
            setProgressbarState(true);
            const url = `http://localhost:8000/blog/myblogs?auther_id=${auther_id}`;
            const serverResponse = await axios.get(url);
            if(serverResponse.status == 200){
              //Data is available
              setAutherBlogs(serverResponse.data);
            }
            setProgressbarState(false);
        } catch (error) {
            //Data not available. Some error occers
            setProgressbarState(false);
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
            <p className="blogpage_user_info_text">Auther Name: {autherName}</p>  <hr className="myprofile_hr" />
            <p className="blogpage_user_info_text">Profission: {profission}</p>  <hr className="myprofile_hr" />
             <p className="blogpage_user_info_text">Status: {status}</p>  <hr className="myprofile_hr" />
             <p className="blogpage_user_info_text">Address: {address}</p>  <hr className="myprofile_hr" />
            </div>
            <div className=" mt-4">
             <button type="button" className="btn btn-outline-success" onClick={moreBlogsAutherButtonClick}>View More Blogs of This Auther</button>
            </div> 
           </div>

           <div className="col-lg-9 col-md-9 col-sm-12 col-12 blogpage_blog_div ">
               {progressbarState ? <LinearProgress color="secondary" className="my-2" /> : null }
                  {autherBlogs.map((value, index) => {
                    //Blog published date. Convert ISO time zone to normal date
                    const date = new Date(value.publish_date);
                    return(<>
                    <div  key={index}>
                    <img src={value.blog_image} alt="" className="blogpage_blog_image" />
                    <div className="blogpage_blog_body">
                      <div className="row blogpage_body_header_div d-flex justify-content-between mt-3">
                      <div className="col-md-6 col-sm-6 col-12">
                       <p className="blogpage_auther_name_text">Category: {value.catogery}</p>
                      </div>
                      <div className="col-md-6 col-sm-6 col-12  text-sm-end text-start">
                       <p className="blogpage_published_date_text">Publish on {`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`}</p>
                      </div>
                      </div>
                      <h2 className="blogpage_blog_title">{value.title}</h2>
                      <p className="blogpage_blog_description">
                       {value.body}
                      </p>
                    </div>
                    </div>
                    </>) })}
            </div>
                  


            </div>
         </section>
        </>
    );
}

export default BlogPage;