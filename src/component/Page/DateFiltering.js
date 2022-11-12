import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
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
const DateFiltering = () => {
  const [gridApi, setGridApi] = useState(null)
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [allBooking] = useAllBookingInfo();


  const columns = [{ headerName: "Name", field: "name" },
  { headerName: "Phone", field: "phone" },
  { headerName: "Address", field: "address" },
  { headerName: "Date", field: "date", filter: 'agDateColumnFilter', filterParams: dateFilterParams, }
  ]
  const defColumnDefs = { flex: 1, }

  const onGridReady = (params) => {
    setGridApi(params)
  }
  const getFilterType = () => {
    if (startDate !== '' && endDate !== '') return 'inRange';
    else if (startDate !== '') return 'greaterThan'
    else if (endDate !== '') return 'lessThan'
  };
  useEffect(() => {
    if (gridApi) {
      if (startDate !== '' && endDate !== '' && startDate > endDate) {
        alert("Start Date should be before End Date")
        setEndDate('')
      } else {
        var dateFilterComponent = gridApi.api.getFilterInstance('date');
        dateFilterComponent.setModel({
          type: getFilterType(),
          dateFrom: startDate ? startDate : endDate,
          dateTo: endDate,
        });
        gridApi.api.onFilterChanged();
      }

    }

  }, [startDate, endDate])
  const searchFilter = (e) => {
    gridApi.api.setQuickFilter(e.target.value)
  }
  return (
    <div className='lg:mx-10'>
      <h2 className='text-primary text-3xl font-bold text-center my-3'>Booking list </h2>
      <p align="center">Date Range Filtering </p>

      <div className='flex justify-between items-center'>

        <input type="search" placeholder="Search..." className="input input-bordered input-info w-full max-w-xs my-3" onChange={searchFilter} />
        <div className='flex'>
          <p className='text-1xl mr-16 font-bold'> From : <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
          </p>

          <p className='text-1xl mr-10 font-bold'> To : <input type="date" className='' value={endDate} onChange={e => setEndDate(e.target.value)} />
          </p>
        </div>
      </div>

      <div className="ag-theme-alpine" style={{ height: 500 }}>




        <AgGridReact
          className='mt-5'
          rowData={allBooking}
          columnDefs={columns}
          defaultColDef={defColumnDefs}
          onGridReady={onGridReady} />
      </div>





    </div>
  );
}


export default DateFiltering;