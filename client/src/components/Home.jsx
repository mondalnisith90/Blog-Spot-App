import Blog from "./Blog";
import BlogCategoryData from "../Data/BlogCategoryData";
import { NavLink } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import BlogPage from './BlogPage';
import LinearProgress from '@material-ui/core/LinearProgress';
import "../css/Home.css";



const Home = () => { 


     const [categoryButtonState, setCategoryButtonState] = useState(
      [{category: "All" ,state: true}, {category: "Art" ,state: false},  {category: "Engineering" ,state: false}, 
      {category: "Medical" ,state: false}, {category: "Science" ,state: false}, {category: "Technology" ,state: false}, 
      {category: "Game" ,state: false}, {category: "Video Game" ,state: false}, {category: "Cooking" ,state: false},
       {category: "Covid-19" ,state: false}, {category: "Story" ,state: false}, {category: "Software" ,state: false}]
     );

     const [progressbarState, setProgressbarState] = useState(false);
     const [blogNotFoundErrorState, setBlogNotFoundErrorState] = useState(false);
     const [blogs, setBlogs] = useState([]);
      //To toggle between Home.jsx and BlogPage.jsx
     //If homeBlogPageToggler = false, then Home.jsx will render and BlogPage.jsx will hide
     //If homeBlogPageToggler = true, then Home.jsx will hide and BlogPage.jsx will render
     const [homeBlogPageToggler, sethomeBlogPageToggler] = useState(false);
     //The blog information which is clicked by User of Home page.
     const [clickedBlogInfo, setClickedBlogInfo] = useState("");

     useEffect(() => {
       //fetch blogs when home component is load
       //Default category is all
       fetchBlogsFromServer("All", 0);
     }, []);
    
      const blogCategoryButtonClick = async (event) => {
        //get clicked button category value
        const buttonCaptionText = event.target.innerHTML;
        for(let index=0; index<categoryButtonState.length; index++){
          if(categoryButtonState[index].category == buttonCaptionText){
            categoryButtonState[index].state = true;
          }else{
            categoryButtonState[index].state = false;
          }
        }
        setCategoryButtonState([...categoryButtonState]);
        fetchBlogsFromServer(buttonCaptionText, 0);

      }

      const fetchBlogsFromServer = async (category, limit) => {
          //fetch blogs from server according to category
          //limit=0 means select all blogs
          setProgressbarState(true);
          const url = `http://localhost:8000/blog/custom?catogery=${category}&&limit=${limit}`;
          try {
            const serverResponse = await axios.get(url);
            setBlogs(serverResponse.data);
            setBlogNotFoundErrorState(serverResponse.data.length ? false : true);
            setProgressbarState(false);
          } catch (error) {
            setProgressbarState(false);
            console.log(error.message)
          }
      }

   

      const buttonNormanState = "btn btn-outline-success category_option_button";
      const buttonActiveState = "btn btn-outline-success category_option_button active";

    return(
     
        <>
         {homeBlogPageToggler ?  <BlogPage clickedBlogInfo={clickedBlogInfo}   sethomeBlogPageToggler={sethomeBlogPageToggler}/>:
         <>
          <section className="home_root_div">
            <div className="home_header_div d-flex justify-content-center align-items-center flex-column">
              <h1 className="home_header_heading_text">Blog-Spot</h1>
              <p className="home_header_para_text">
                More than 5000 blogs you can see here. You can create your own blog here and earn money online.
              </p>
              <div className="row header_button_div w-100">
              <div className="col-6  d-flex justify-content-md-end justify-content-sm-center justify-content-center my-3">
               <NavLink to="/create-blog" > <button className="home_about_button">Create Blog</button> </NavLink>
              </div>
              <div className="col-6 d-flex justify-content-md-start  justify-content-sm-center justify-content-center my-3">
              <NavLink to="/my-profile"> <button className="home_contact_button">My Profile</button> </NavLink>
              </div>
              </div> 
            </div>
            <div className="home_body_div">
            <div className="home_category_div">
              <h3 className="home_blog_category_text">Blog Category</h3>
              <hr className="home_hr"/>
              <div className="row home_blog_category_div text-center">
              {BlogCategoryData.map((value, index) => {
              
                return(<>
              
                  <div className="col-lg-2 col-md-2 col-sm-4 col-6 my-2" key={index}>
                   <button type="button" className={ categoryButtonState[index].state ? buttonActiveState : buttonNormanState} onClick={blogCategoryButtonClick}>{value}</button>
                </div>
                </>)
              })}


               
              </div>
              <hr className="home_hr"/>
              <div style={{height: "3px"}}>
              {progressbarState ? <LinearProgress color="secondary" /> : null }
              </div>
               
              <div>
              <div className="row home_blog_div">
               {blogNotFoundErrorState ? <h1 className="home_blog_not_found_error">OOPS! No blog found of this category</h1> : null }
              {blogs.map((value, index) => {
                return(
                  <>
                   <div className="col-lg-4 col-md-6 col-sm-12 col-12 m-auto d-block d-flex justify-content-center" key={index}>
                    <Blog blogObj={value}  setClickedBlogInfo={setClickedBlogInfo}   sethomeBlogPageToggler={sethomeBlogPageToggler} />
                   </div>
                  </>
                );
              })}

              </div>
             
              
              </div>
            </div>
         
            </div>
          </section>
          </>}
        </>
      
    );
}

export default Home;