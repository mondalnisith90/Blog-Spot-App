import "../css/Blog.css";


const Blog = ({blogObj, setClickedBlogInfo, sethomeBlogPageToggler}) => {
    const onBlogClick = () => {
      setClickedBlogInfo(blogObj);
      //To toggle between Home.jsx and BlogPage.jsx
      //If homeBlogPageToggler = true, then Home.jsx will hide and BlogPage.jsx will render
      sethomeBlogPageToggler(true);
       
    }

    return(
        <>
         <section className="blog_root_div shadow mb-5" onClick={onBlogClick }>
           <img src={blogObj.blog_image} alt="" className="blog_image" />
           <div className="blog_body">
             <div className="body_header_div d-flex justify-content-between">
             <div>
            <p className="auther_name_text">Auther: {blogObj.auther}</p>
             </div>
             <div>
             <p className="published_date_text">{blogObj.publish_date}</p>
             </div>
             </div>
             <h2 className="blog_title">{blogObj.title}</h2>
             <p className="blog_description">
             {blogObj.body}
             </p>
           </div>
           
         </section>
        </>
    );
}

export default Blog;