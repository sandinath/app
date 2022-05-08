import React, { useEffect, useState } from 'react';

import Spinner from './Spinner';

const Search = ({ searchTerm }) => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);

  return (
    <div>

      {loading && <Spinner message="Searching pins" />}
    </div>
  );
};

export default Search;