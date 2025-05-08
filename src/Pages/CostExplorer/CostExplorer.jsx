import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// MUI
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

// FusionCharts
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const CostExplorer = () => {
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [accountsLoading, setAccountsLoading] = useState(true);
  const [accountError, setAccountError] = useState(null);
  const [assignedAccounts, setAssignedAccounts] = useState([]);
  const [date, setDate] = useState(new Date());
  const [personName, setPersonName] = useState([]);

  const [columns, setColumns] = useState([]);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  // const names = [
  //   "Oliver Hansen",
  //   "Van Henry",
  //   "April Tucker",
  //   "Ralph Hubbard",
  //   "Omar Alexander",
  //   "Carlos Abbott",
  //   "Miriam Wagner",
  //   "Bradley Wilkerson",
  //   "Virginia Andrews",
  //   "Kelly Snyder",
  // ];

  const [names, setNames] = useState([]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      setAccountsLoading(true);
      setAccountError(null);
      try {
        const response = await axios.get(
          "http://localhost:8080/cloudAccount/getallaccounts",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        setAssignedAccounts(response.data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
        setAccountError(
          "Failed to load accounts. Please check your connection and try again."
        );
      } finally {
        setAccountsLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  // Fetch columns data

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/snowflake/getallcolumn",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        setColumns(response.data);
        setNames(response.data);
      } catch (error) {
        console.error("Error fetching columns:", error);
      }
    };

    fetchColumns();
  }, []);

  const handleAccountChange = (e) => {
    setSelectedAccountId(e.target.value);
  };

  const handleTagChange = (event) => {
    const { value } = event.target;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };



const handleFilterChange = ()=>{

}




  const chartData = [
    { label: "Venezuela", value: "290" },
    { label: "Saudi", value: "260" },
    { label: "Canada", value: "180" },
    { label: "Iran", value: "140" },
    { label: "Russia", value: "115" },
    { label: "UAE", value: "100" },
    { label: "US", value: "30" },
    { label: "China", value: "30" },
  ];

  const chartConfigs = {
    type: "column2d",
    width: "700",
    height: "400",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Countries With Most Oil Reserves [2017-18]",
        subCaption: "In MMbbl = One Million barrels",
        xAxisName: "Country",
        yAxisName: "Reserves (MMbbl)",
        numberSuffix: "K",
        theme: "fusion",
      },
      data: chartData,
    },
  };

  return (
    <div className="cost-explorer" style={{ padding: "2rem" }}>
      {/* Account Selector */}
      <section style={{ marginBottom: "1.5rem" }}>
        <label>
          <strong>Select AWS Account:</strong>
        </label>
        {accountsLoading ? (
          <p>Loading accounts...</p>
        ) : accountError ? (
          <div className="error-message">
            {accountError}
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        ) : (
          <select value={selectedAccountId} onChange={handleAccountChange}>
            <option value="">-- Choose Account --</option>
            {assignedAccounts.map((acc) => (
              <option key={acc.id} value={acc.accountId}>
                {acc.name} ({acc.accountId})
              </option>
            ))}
          </select>
        )}
      </section>

      {/* //tabbed accounts */}

      <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: "background.paper" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {columns.map((col, index) => (
            <Tab key={index} label={col} />
          ))}
        </Tabs>
      </Box>

      {/* Date Picker */}
      <section style={{ marginBottom: "1.5rem" }}>
        <label>
          <strong>Select Date:</strong>
        </label>
        <div>
          <DatePicker selected={date} onChange={(date) => setDate(date)} />
        </div>
      </section>

      {/* Multi-Select Tags */}
      <section style={{ marginBottom: "1.5rem" }}>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="tag-multi-select-label">Tags</InputLabel>
          <Select
            labelId="tag-multi-select-label"
            id="tag-multi-select"
            multiple
            value={personName}
            onChange={handleTagChange}
            input={<OutlinedInput label="Tags" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={personName.includes(name)} onClick={handleFilterChange}/>
                 {/* checkbox dropdown with html css and js 
                 and will populate the dat from 

                  */}
              

                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </section>

      {/* Chart */}
      <section>
        <ReactFC {...chartConfigs} />
      </section>
    </div>
  );
};

export default CostExplorer;
