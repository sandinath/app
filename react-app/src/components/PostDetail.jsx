import { AiFillLike } from 'react-icons/ai';
import { Link } from 'react-router-dom'
import React, {useState} from 'react'

const PostDetail = ({user}) => {

  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);

  const addComment = () => {

  }

  return (
    <>
      <div className="flex xl:flex-row flex-col m-auto bg-white" style={{ maxWidth: '1500px', borderRadius: '32px' }}>
        <div className="w-full p-5 flex-1 xl:min-w-620 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <a
                className="bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100"
              >
                <AiFillLike />
              </a>
            </div>
            <a href="www.google.com" target="_blank" rel="noreferrer">
              Visit Link
            </a>
          </div>
          <div>
            <h1 className="text-4xl font-bold break-words mt-3">
              Title
            </h1>
            <p className='mt-3'>About</p>
          </div>
          <Link to={`/user-profile/10`} className="flex gap-2 mt-5 items-center bg-white rounded-lg">
            <p className="font-bold">sandi</p>
          </Link>
          <h2 className="mt-5 text-2xl">Comments</h2>
          <div className="max-h-370 overflow-y-auto">
            {[1,2].map((item) => (
              <div className="flex gap-2 mt-5 items-center bg-white rounded-lg" key={item}>
                <div className="flex flex-col">
                  <p className="font-bold">name</p>
                  <p>comment</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap mt-6 gap-3 align-middle">
            <Link to={`/user-profile/10`}>
              sandi
            </Link>
            <input
              className=" flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
              type="text"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="button"
              className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
              onClick={addComment}
            >
              {addingComment ? 'Doing...' : 'Done'}
            </button>
          </div>
        </div>
      </div>
    </>
    
  )
}

export default PostDetail