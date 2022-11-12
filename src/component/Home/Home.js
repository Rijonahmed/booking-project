import { AgGridReact } from 'ag-grid-react';
import React, { useEffect, useState } from 'react';
import useAllBookingInfo from '../Hooks/useAllBookingInfo';
const dateFilterParams = {
  comparator: function (filterLocalDateAtMidnight, cellValue) {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split('-');
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  },
  browserDatePicker: true,
};

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
            <th>Date </th>
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