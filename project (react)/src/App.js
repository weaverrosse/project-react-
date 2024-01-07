import "./App.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import "ag-grid-enterprise";
import { useState, useEffect, useRef, useMemo } from "react";

function App() {
  const gridRef = useRef();

  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: "athlete" },
    {
      field: "age",
      cellRenderer: (p) => (
        <>
          <b>Age is: </b>
          {p.value}
        </>
      ),
    },
    { field: "country", editable: false },
    { field: "year", editable: true },
    { field: "date", editable: true },
    { field: "sport", editable: true },
    { field: "gold", editable: true },
    { field: "silver", editable: true },
    { field: "bronze", editable: true },
    { field: "total", editable: true },
  ],
  );

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      enableRowGroup: true,
    }),
    []
  ); 

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);

  const handleCellValueChanged = (params) => {
    console.log("Değer değiştirildi: Eski Değer", params.oldValue, "Yeni Değer:", params.newValue);
    console.log("Güncellenen Satir Verisi:", params.node.data);
    // Burada veriyi güncelleme işlemini gerçekleştirebilirsiniz
  };

  const gridOptions = {
    columnDefs,
    onCellValueChanged: handleCellValueChanged,
    // ... diğer grid seçenekleri ...
  };

  

  return (
    <div className="ag-theme-alpine-dark" style={{ height: "100vh" }}>
      <AgGridReact
        rowGroupPanelShow="always"
        rowData={rowData}
        animateRows={true}
        columnDefs={columnDefs}
        gridOptions={gridOptions}
        defaultColDef={defaultColDef}
      />
    </div>
  );
}

export default App;
