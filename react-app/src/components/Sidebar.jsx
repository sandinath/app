import React, {useState, useEffect} from 'react';
import { NavLink, Link } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';
// import { categories } from '../utils/data';

const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize';

const Sidebar = ({ closeToggle, user, userID }) => {

  const [categories, setCategories] = useState();

  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  useEffect(() => {
    getCategories()
  }, [userID])

  async function getCategories(){
    let cat_url=new URL(`https://finalproject-links.azurewebsites.net/api/category-getallcategories`)
    const r = await fetch(cat_url)
    const p = await r.json()
    console.log(p.categories)
    setCategories(p.categories)
    console.log(categories)
  }

  if (!categories){
    return (
      <div>
        Loading
      </div>
    )
  }

  return (
    <>{categories && (
      <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
        <div className="flex flex-col">
          <Link
            to="/"
            className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
            onClick={handleCloseSidebar}
          >
            <img 
            src="https://upload.wikimedia.org/wikipedia/commons/5/56/Chain_link_icon_slanted.png"
            alt="logo" className="w-20" />
          </Link>
          <div className="flex flex-col gap-5">

            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
              onClick={handleCloseSidebar}
            >
              <RiHomeFill />
              Home
            </NavLink>
            <h3 className="mt-2 px-5 text-base 2xl:text-xl">Discover categories</h3>
            {categories?.map((category) => (
              <NavLink
                to={`/category/${category._id}`}
                className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
                onClick={handleCloseSidebar}
                key={category._id}
              >
                {category.name}
              </NavLink>
            ))}
          </div>
        </div>
        {user && (
          <Link
            to={`user-profile/${userID}`}
            className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
            onClick={handleCloseSidebar}
          >
            <p>{user?.userDetails}</p>
            <IoIosArrowForward />
          </Link>
        )}
      </div> 
    )} 
    </>
    
  );
};

export default Sidebar;