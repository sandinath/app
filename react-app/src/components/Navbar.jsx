import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';
import { BiLogIn, BiLogOut } from 'react-icons/bi'

const Navbar = ({ searchTerm, setSearchTerm, userID }) => {

  const navigate = useNavigate();
  console.log(userID)

  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7 ">
      <div className="flex justify-start items-center w-full px-2 rounded-md border-none outline-none focus-within:shadow-sm">
        <h1>Welcome to LinkIt</h1>
      </div>

      {!userID && (
        <span>
        <a key="login" href={`/.auth/login/aad?post_login_redirect_uri=/`}>
          <h4><BiLogIn fontSize={50} /></h4>
        </a>
        </span>
      )}
      {userID && (
        <div>
          <p>
            <span>
              <a href={`/.auth/logout?post_logout_redirect_uri=/`}>
                <BiLogOut fontSize={50} />
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