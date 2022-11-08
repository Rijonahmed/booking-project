import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
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
  const [gridApi, setGridApi] = useState()
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const rowData = [
    { alaka: "Dumni", model: "Celica", img: "https://dubaitrippackages.files.wordpress.com/2017/11/2-imgdinosaurs_base.jpg", price: 35000, date: "03-11-2022" },
    { alaka: "Patira", model: "Mondeo", img: "https://dubaitrippackages.files.wordpress.com/2017/11/2-imgdinosaurs_base.jpg", price: 32000, date: "04-11-2022" },
    { alaka: "Mostul", model: "Boxter", img: "https://dubaitrippackages.files.wordpress.com/2017/11/2-imgdinosaurs_base.jpg", price: 72000, date: "05-11-2022" },
    { alaka: "Tolna", model: "Mers", img: "https://dubaitrippackages.files.wordpress.com/2017/11/2-imgdinosaurs_base.jpg", price: 92000, date: "06-11-2022" }
  ];

  const columns = [{ headerName: "Alaka", field: "alaka" },
  { headerName: "Price", field: "price" },
  { headerName: "Model", field: "model" },
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
  return (
    <div >
      <h2 className='text-red-700'>Booking</h2>
      <p align="center">Date Range Filtering </p>
      <div className="ag-theme-alpine" style={{ height: 500 }}>
        From : <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        To : <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        <AgGridReact
          className='mt-10'
          rowData={rowData}
          columnDefs={columns}
          defaultColDef={defColumnDefs}
          onGridReady={onGridReady} />
      </div>

    </div>
  );
}


export default DateFiltering;