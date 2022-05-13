import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import MasonryLayout from './MasonryLayout';

const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';

const UserProfile = () => {
    const [posts, setPosts] = useState();
    const [user, setUser] = useState();
    const [text, setText] = useState("Created");
    const [activeBtn, setActiveBtn] = useState('created')
    const { userID } = useParams()

    useEffect(() => {
        console.log("reached")
        getUser()
    }, [])

    async function getUser(){
        let url = `https://finalproject-links.azurewebsites.net/api/user-getuser?id=${userID}`
        console.log(url)
        const r = await fetch(url)
        const p = await r.json()
        setUser(p)
        console.log(p)
    }

    useEffect(() => {
        if (user){
            if (text === 'Created'){
                const createdPosts = user.postHistory;
                setPosts(createdPosts)
            } else {
                const likedPosts = user.likeHistory;
                setPosts(likedPosts)
            }    
        }
    }, [text, userID])

    if (!user) {
        return (
            <div>
                Loading
            </div>
        )
    }

    return (
        <>
        {user && (
            <div className="relative pb-2 h-full justify-center items-center">
                <div className="flex flex-col pb-5">
                    <div className="relative flex flex-col mb-7">
                        <h1 className="font-bold text-3xl text-center mt-3">
                            {user.username}
                        </h1>
                    </div>
                    <div className="text-center mb-7">
                        <button type="button"
                            onClick={(e) => {
                            setText(e.target.textContent);
                            setActiveBtn('created'); }}
                            className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}
                        >
                            Created
                        </button>
                        <button type="button"
                            onClick={(e) => {
                            setText(e.target.textContent);
                            setActiveBtn('saved'); }}
                            className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}
                        >
                            Liked
                        </button>
                    </div>
                    <div className='px-2'>
                        <MasonryLayout posts={posts}/>
                    </div>
                </div>
            </div>
        )}
        </>
    )
};

export default UserProfile;