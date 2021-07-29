import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { CurrentUserDataContext } from '../App';
import '../css/Navbar.css';

const Navbar = () => {

  const {currentUserData, setCurrentUserData} = useContext(CurrentUserDataContext);

    return(
        <>

           <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
             <div className="container">
               <a className="navbar-brand" href="/">Sun-Tech</a>
               <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                 <span className="navbar-toggler-icon"></span>
               </button>
               <div className="collapse navbar-collapse" id="navbarSupportedContent">
                 <ul className="navbar-nav mr-auto text-center">
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
                 
                   {currentUserData.userLoginStatus ? 
                   <>
                   <li className="nav-item nav_list_item">
                    <NavLink className="nav-link navbar_navlink" activeClassName="navlink_active" exact to="/logout" aria-current="page">Logout</NavLink>
                     </li>

                    <li  className="nav-item nav_list_item">
                    <img src={currentUserData.profileImageUrl} alt="" className="profile_pic" />
                    </li>
                    <li className="nav-item ">
                    <span className="nav-link disabled navbar_navlink"  aria-current="page">{currentUserData.name}</span>
                    </li>
                    </> : 
                    <>
                    <li className="nav-item nav_list_item">
                     <NavLink className="nav-link navbar_navlink" activeClassName="navlink_active"  aria-current="page" exact to="/signup">SignUp</NavLink>
                   </li>

                   <li className="nav-item nav_list_item">
                     <NavLink className="nav-link navbar_navlink" activeClassName="navlink_active"  aria-current="page" exact to="/signin">SignIn</NavLink>
                   </li>
                   </> }

                 </ul>
                 <form className="d-flex">
                  <input className="form-control  me-2" type="search" placeholder="Search blogs. . ." aria-label="Search" />
                  <button className="btn btn-outline-success">Search</button>
                 </form>
                </div>
             </div>
           </nav>
           
        </>
    );
}

export default Navbar;