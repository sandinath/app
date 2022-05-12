import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MasonryLayout from './MasonryLayout';
import Post from './Post'

import Spinner from './Spinner';

const Feed = () => {
  const [pins, setPins] = useState();

  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();

  const [name, setName] = useState('');
  const [message, setMessage] = useState('')

  const getDataFromApi = async(e)=>{
    e.preventDefault();
    const data = await fetch(`/api/hello?name=${name}`);
    const json = await data.json();
    if (json.message){
        setMessage(json.message)
    }
  }

  const ideaName = categoryId || 'new';
  if (loading) {
    return (
      <Spinner message={`We are adding ${ideaName} ideas to your feed!`} />
    );
  }
  return (
    <div>
      <MasonryLayout post={pins}/>
    </div>
  );
};

export default Feed;