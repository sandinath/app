import React from 'react';
import Masonry from 'react-masonry-css';
import Post from './Post';

const breakpointColumnsObj = {
  default: 4,
  3600: 6,
  3000: 5,
  2500: 4,
  1600: 3,
  1200: 2,
  700: 1,
};

const MasonryLayout = ({ pins }) => (
  <Masonry className="flex animate-slide-fwd" breakpointCols={breakpointColumnsObj}>
    {/* {pins?.map((pin) => <Post key={pin._id} pin={pin} className="w-max" />)} */}
    {[1,2,3,4,5].map((p) => <Post key={p} post={p}/>)}
  </Masonry>
);

export default MasonryLayout;