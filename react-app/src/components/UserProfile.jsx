import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';

const UserProfile = ({ user }) => {

    const [pins, setPins] = useState();
    const [text, setText] = useState("Created");
    const [activeBtn, setActiveBtn] = useState('created')

    return (
        <div className="relative pb-2 h-full justify-center items-center">
            <div className="flex flex-col pb-5">
                <div className="relative flex flex-col mb-7">
                    <h1 className="font-bold text-3xl text-center mt-3">
                        {user.userDetails}
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
            </div>
        </div>
    )
};

export default UserProfile;