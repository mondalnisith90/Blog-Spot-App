import profilePic from "../images/girl2.jpg";
import blogImg from "../images/laptop3.jpg";
import "../css/BlogPage.css";

const BlogPage = () => {
    return(
        <>
         <section className="blogpage_root_div">
          <div className="row blogpage_main_div">
           <div className="col-lg-3 col-md-3 col-sm-12 col-12 text-center blog_page_profile_div " >
               <img src={profilePic} alt="" className="blogpage_profile_pic" />
               <p className="blogpage_profile_name">Gia Karter</p>
               <div className="d-flex justify-content-around align-items-center mt-4">
               <div>
               <button type="button" className="btn btn-outline-primary">View Profile</button>
               </div>
               <div>
               <button type="button" className="btn btn-outline-success">View More Blogs</button>
               </div>
               </div> 
           </div>

           <div className="col-lg-9 col-md-9 col-sm-12 col-12 blogpage_blog_div ">
           <img src={blogImg} alt="" className="blogpage_blog_image" />
           <div className="blogpage_blog_body">
             <div className="blogpage_body_header_div d-flex justify-content-between">
             <div>
             <p className="blogpage_auther_name_text">Auther: Gia Karter</p>
             </div>
             <div>
             <p className="blogpage_published_date_text">4 days  ago</p>
             </div>
             </div>
             <h2 className="blogpage_blog_title">Checken Chue delicius recipy</h2>
             <p className="blogpage_blog_description">
             Anthropologist Richard Wrangham has proposed cooking arose before 1.8 million years ago, an invention of
             our evolutionary ancestors. If the custom emerged this early, it could explain a defining feature of our
             our evolutionary ancestors. If the custom emerged this early, it could explain a defining feature of our
             Anthropologist Richard Wrangham has proposed cooking arose before 1.8 million years ago, an invention of
             our evolutionary ancestors. If the custom emerged this early, it could explain a defining feature of our
             our evolutionary ancestors. If the custom emerged this early, it could explain a defining feature of our
             Anthropologist Richard Wrangham has proposed cooking arose before 1.8 million years ago, an invention of
             our evolutionary ancestors. If the custom emerged this early, it could explain a defining feature of our
             our evolutionary ancestors. If the custom emerged this early, it could explain a defining feature of our
             Anthropologist Richard Wrangham has proposed cooking arose before 1.8 million years ago, an invention of
             our evolutionary ancestors. If the custom emerged this early, it could explain a defining feature of our
             our evolutionary ancestors. If the custom emerged this early, it could explain a defining feature of our
             Anthropologist Richard Wrangham has proposed cooking arose before 1.8 million years ago, an invention of
             our evolutionary ancestors. If the custom emerged this early, it could explain a defining feature of our
             our evolutionary ancestors. If the custom emerged this early, it could explain a defining feature of our
             </p>
           </div>
           </div>

            </div>
         </section>
        </>
    );
}

export default BlogPage;