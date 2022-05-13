import React, { useEffect, useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';

// import { categories } from '../utils/data';

const CreatePin = ({ userID }) => {
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState();
  const [fields, setFields] = useState();
  const [categoryID, setCategoryID] = useState();
  const [newCategory, setNewCategory] = useState();
  const [createCategory, setCreateCategory] = useState();
  const [categories, setCategories] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (fields){
      createPost()
    }
  }, [fields])

  async function createPost(){
    let url = new URL(`https://finalproject-links.azurewebsites.net/api/post-makepost`)
    const params = {title: title,
                    author: userID,
                    category: categoryID,
                    link: destination,
                    description: about
                    }
    url.search = new URLSearchParams(params)
    console.log(url)
    const r = await fetch(url)
    const p = await r.json()
    console.log(p)
  }

  useEffect(() => {
    if (createCategory){
      createNewCategory()
    }
  }, [createCategory])

  async function createNewCategory(){
    let url = `https://finalproject-links.azurewebsites.net/api/category-createcategory?name=${newCategory}&description=${newCategory}`
    console.log(url)
    const r = await fetch(url)
    const p = await r.json()
    console.log(p.categoryId)
    console.log(userID)
    let g_url = new URL(`https://finalproject-links.azurewebsites.net/api/user-grantcategoryaccess`)
    const params = {userID: userID, categoryID: p.categoryId}
    g_url.search = new URLSearchParams(params)
    console.log(g_url)
    const grant_r = await fetch(g_url)
    const grant_p = await grant_r.json()
    console.log(grant_p)
  }  

  useEffect(() => {
    getCategories()
  }, [])

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
      <div>Loading</div>
    )
  }

  function chooseCategory(e) {
    setCategoryID(e)
    console.log(e)
  }
  
  return (
    <>
    {categories && (
      <>
        <div className="flex flex-col justify-center items-center mt-5 lg:h-1/2">
          {fields && !(title && about && destination && categoryID) && (
            <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in ">Please add all fields.</p>
          )}
          <div className=" flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5  w-full">
            <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add your title"
                className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
              />
              <input
                type="text"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Tell everyone what your link is about"
                className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
              />
              <input
                type="url"
                vlaue={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Add a destination link"
                className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
              />

              <div className="flex flex-col">
                <div>
                  <p className="mb-2 font-semibold text:lg sm:text-xl">Choose Link Category</p>
                  <select
                    onChange={(e) => {
                      chooseCategory(e.target.value);
                    }}
                    className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                  >
                    <option value="others" className="sm:text-bg bg-white">Select Category</option>
                    {categories.map((item,index) => (
                      <option key={item._id} className="text-base border-0 outline-none capitalize bg-white text-black " value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end items-end mt-5">
                  <button
                    type="button"
                    onClick={() => setFields(true)}
                    className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
                  >
                    Save Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
        <div className=" flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5  w-full">
            <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Add your category"
                className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
              />
              <div className="flex justify-end items-end mt-5">
                  <button
                    type="button"
                    onClick={() => setCreateCategory(true)}
                    className="bg-red-500 text-white font-bold p-2 rounded-full w-40 outline-none"
                  >
                    Create Category
                  </button>
                </div>
            </div>
          </div>
        </div>
      </>
    )}
    </>
  );
};

export default CreatePin;