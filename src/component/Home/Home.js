import React, { useState } from 'react';
import useAllBookingInfo from '../Hooks/useAllBookingInfo';

const Home = () => {
  const [allBooking] = useAllBookingInfo();
  const [query, setQuery] = useState('');

  return (
    <div>
      <div className='w-8/12 m-auto' >
        <input type="text" placeholder="Search..." className="input input-bordered input-info w-full max-w-xs my-10" onChange={(e) => setQuery(e.target.value)} />
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>

            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>

          {
            allBooking.filter(booking => booking.name.toLowerCase().includes(query) || booking.phone.toLowerCase().includes(query)).map((bookinginfo, index) => <tr key={bookinginfo._id}>
              <th>{index + 1}</th>

              <td>{bookinginfo?.name}</td>
              <td>{bookinginfo?.phone}</td>
              <td>{bookinginfo?.address}</td>
              <td>{bookinginfo?.date}</td>

            </tr>)
          }




        </tbody>
      </table>

    </div>
  );
};

export default Home;