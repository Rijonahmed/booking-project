import { useEffect, useState } from 'react';
const useAllBookingInfo = () => {
  const [allBooking, setAllBooking] = useState([]);

  useEffect(() => {
    fetch('bookinginfo.json')
      .then(res => res.json())
      .then(data => setAllBooking(data))
  }, [])
  return [allBooking]
};

export default useAllBookingInfo;