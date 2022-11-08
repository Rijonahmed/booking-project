import React from 'react';
import useAllBookingInfo from '../Hooks/useAllBookingInfo';

const Home = () => {
  const [allBooking] = useAllBookingInfo();
  console.log(allBooking)
  return (
    <div>
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
            allBooking.map((bookinginfo, index) => <tr>
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