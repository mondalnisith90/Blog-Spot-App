import { NavLink } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () => {
    return(
        <>

           <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
             <div className="container">
               <a className="navbar-brand" href="#">Sun-Tech</a>
               <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                 <span className="navbar-toggler-icon"></span>
               </button>
               <div className="collapse navbar-collapse" id="navbarSupportedContent">
                 <ul className="navbar-nav ml-auto text-center">
                   <li className="nav-item nav_list_item">
                     <NavLink className="nav-link navbar_navlink" activeClassName="navlink_active"  aria-current="page" exact to="/">Home</NavLink>
                   </li>
                   <li className="nav-item nav_list_item">
                     <NavLink className="nav-link navbar_navlink" activeClassName="navlink_active"  aria-current="page" exact to="/create-blog">Create Blog</NavLink>
                   </li>
                   <li className="nav-item nav_list_item">
                     <NavLink className="nav-link navbar_navlink" activeClassName="navlink_active"  aria-current="page" exact to="/my-blog">My Blogs</NavLink>
                   </li>
                   <li className="nav-item nav_list_item">
                     <NavLink className="nav-link navbar_navlink" activeClassName="navlink_active"  aria-current="page" exact to="/my-profile">My Profile</NavLink>
                   </li>
                   <li className="nav-item nav_list_item">
                     <NavLink className="nav-link navbar_navlink" activeClassName="navlink_active"  aria-current="page" exact to="/signup">SignUp</NavLink>
                   </li>
                   <li className="nav-item nav_list_item">
                     <NavLink className="nav-link navbar_navlink" activeClassName="navlink_active"  aria-current="page" exact to="/signin">SignIn</NavLink>
                   </li>
                 </ul>
               </div>
             </div>
           </nav>
           
        </>
    );
}

export default Navbar;