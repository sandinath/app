import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
      <form id="form1" className="App-form" onSubmit={e => getDataFromApi(e)}>
        <div>
          <input 
            type="text" 
            id="name" 
            className="App-input" 
            placeholder="Name" 
            value={name} 
            onChange={e=>setName(e.target.value)} />
          <button type="submit" className="App-button">Submit</button>
        </div>
      </form>
      <div><h5>Message: {message} </h5></div>
    </div>
  );
};

export default Feed;