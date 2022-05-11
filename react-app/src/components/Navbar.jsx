import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';

const Navbar = ({ searchTerm, setSearchTerm, user }) => {

  const navigate = useNavigate();

  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7 ">
      <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
        <IoMdSearch fontSize={21} className="ml-1" />
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          value={searchTerm}
          onFocus={() => navigate('/search')}
          className="p-2 w-full bg-white outline-none"
        />
      </div>

      {!user && (
        <span><a key="login" href={`/.auth/login/aad?post_login_redirect_uri=/`}><h4>{'Login'}</h4></a></span>
      )}
      {user && (
        <div>
          <p>
            <span>{user && user?.userDetails}</span>
            <span>
              <a href={`/.auth/logout?post_logout_redirect_uri=/`}>
                Logout
              </a>
            </span>
          </p>
        </div>
      )}

      <div className="flex gap-3 ">
        {/* <Link to={`user-profile/`} className="hidden md:block">
          <img 
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
          alt="user-pic" className="w-14 h-12 rounded-lg " />
        </Link> */}

        <Link to="/create-pin" className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center">
          <IoMdAdd />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;