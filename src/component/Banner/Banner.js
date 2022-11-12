import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div>
      <div className="hero min-h-screen" style={{ backgroundImage: `url("https://image.cnbcfm.com/api/v1/image/107013001-1644416179384-Booking_Idris_Sunchair_v6.jpg?v=1644931650&w=1920&h=1080")` }}>
        <div className="hero-overlay bg-opacity-40"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello Booking List</h1>
            <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            <button className="btn bg-sky-600"><Link to='/dateFiltering'>Booking List</Link></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;