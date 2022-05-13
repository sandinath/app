import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { AiFillLike } from 'react-icons/ai';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import PostDetail from './PostDetail';

const Post = ({ post }) => {
    const navigate = useNavigate()
    const [postHovered, setPostHovered] = useState(false);
    const [likingPost, setLikingPost] = useState(false);
    const [postData, setPostData] = useState()

    // const { title, author, category, link, description, comments, likes } = post 

    useEffect(()=> {
        getPostData()
    }, [])

    async function getPostData(){
        let url = new URL(`https://finalproject-links.azurewebsites.net/api/post-getpost`)
        const params = {postID: post}
        url.search = new URLSearchParams(params)
        console.log(url)
        const res = await fetch(url)
        const p = res.json()
        p.then(function(result){
            console.log(result)
            setPostData(result)
        })
    }

    return (
        <>  {postData && (
            <div className="m-2 w-fit">
                <div
                onMouseEnter={()=> setPostHovered(true)}
                onMouseLeave={()=> setPostHovered(false)}
                onClick={() => navigate(`/post-detail/${postData._id}`)}
                className="relative cursor-pointer w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
                >
                    <div className="relative w-80">
                        <img src="https://3dobjects.weebly.com/uploads/1/3/8/8/13883717/8364980.png?569" alt="Norway"/>
                        <div className="absolute px-12 py-4 align-middle justify-center top-1/4">
                            <h1>{postData.title}</h1>
                        </div>
                    </div>
                        {postHovered && (
                            <div
                                className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
                                style={{ height: '100%' }}
                            >
                                <div className="flex items-center justify-between">
                                <div className="flex gap-2">
                                    <a
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                    className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                                    ><AiFillLike />
                                    </a>
                                </div>
                                {alreadySaved?.length !== 0 ? (
                                    <button type="button" className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none">
                                    {/* {pin?.save?.length} */} 1 Saved
                                    </button>
                                ) : (
                                    <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        likePin(_id);
                                    }}
                                    type="button"
                                    className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                                    >
                                    {/* {pin?.save?.length}    */}
                                    {postData.likes} {likingPost ? 'Liking' : 'Likes'}
                                    </button>
                                )}
                                </div>
                                <div className=" flex justify-between items-center gap-2 w-full">
                                {postData.link?.slice(8).length > 0 ? (
                                    <a
                                    href={postData.link}
                                    target="_blank"
                                    className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                                    rel="noreferrer"
                                    >
                                    {' '}
                                    <BsFillArrowUpRightCircleFill />
                                    {postData.link?.slice(8, 17)}...
                                    </a>
                                ) : undefined}
                                {
                            // postedBy?._id === user?.googleId 
                            5 === 5 && (
                            <button
                                type="button"
                                onClick={(e) => {
                                e.stopPropagation();
                                deletePin(_id);
                                }}
                                className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
                            >
                                <AiTwotoneDelete />
                            </button>
                            )
                            }
                            </div>
                        </div>
                        )}
                </div>
            </div>
        )}
        </>
        
    )
}

export default Post;