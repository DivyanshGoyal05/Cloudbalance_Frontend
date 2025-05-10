import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FilterSidebar from "./FilterSidebar";
import "./CostExplorer.css";

// MUI
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// FusionCharts
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const CostExplorer = () => {
  // Fixed account ID


  const [accountsLoading, setAccountsLoading] = useState(true);
  const [accountError, setAccountError] = useState(null);
  const [assignedAccounts, setAssignedAccounts] = useState([]);
  const [date, setDate] = useState(new Date());
  const [columnName, setColumnName] = useState([]);
  const [innerColumnName, setInnerColumnName] = useState([]);
  const [names, setNames] = useState([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const [columns, setColumns] = useState([]);
  const [filterOptions, setFilterOptions] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({});
  const [loadingChart, setLoadingChart] = useState(false);



  // Fetch data when dependencies change
  useEffect(() => {
    getCostExplorerData();
  }, [getCostExplorerData]);

  const handleTabChange = (event, newValue) => {
    setActiveTabIndex(newValue);
  };

  const handleColumnClick = useCallback(
    async (colName) => {
      if (filterOptions[colName]) {
        setFilterOptions((prev) => {
          const updated = { ...prev };
          delete updated[colName];
          return updated;
        });
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/snowflake/filtercolumn/${colName}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        setFilterOptions((prev) => ({ ...prev, [colName]: response.data }));
      } catch (error) {
        console.error(`Error getting filter values:`, error);
      }
    },
    [filterOptions]
  );

  // Fetch accounts on mount
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
        console.error("Error getting accounts:", error);
        setAccountError(
          "Failed to load accounts. Please check your connection and try again."
        );
      } finally {
        setAccountsLoading(false);
      }
    };
    fetchAccounts();
  }, []);

  // Fetch columns on mount
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
        console.error("Error getting columns:", error);
      }
    };
    fetchColumns();
  }, []);

  const handleCheckboxChange = useCallback((columnName, value) => {
    const valStr = value.toString();
    setSelectedFilters((prev) => {
      const currentSelections = prev[columnName] || [];
      const updatedSelections = currentSelections.includes(valStr)
        ? currentSelections.filter((item) => item !== valStr)
        : [...currentSelections, valStr];
      return {
        ...prev,
        [columnName]: updatedSelections,
      };
    });
  }, []);

  const chartConfigs = {
    type: "column2d",
    width: "100%",
    height: "400",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Cloud Cost By Service",
        subCaption: loadingChart
          ? "Loading..."
          : `Grouped by ${columns[activeTabIndex] || "category"}`,
        xAxisName: "Service",
        yAxisName: "Cost ($)",
        numberPrefix: "$",
        theme: "fusion",
        paletteColors: "#5D62B5,#29C3BE,#F2726F,#FFC533,#62B58F",
      },
      data: chartData,
    },
  };

  return (
    <div className="cost-explorer" style={{ padding: "2rem" }}>
      <section style={{ marginBottom: "1.5rem" }}>
        <label>
          <strong>AWS Account:</strong> {selectedAccountId}
        </label>
      </section>

      <Box
        sx={{ maxWidth: { xs: 320, sm: 1261 }, bgcolor: "background.paper" }}
      >
        <Tabs
          value={activeTabIndex}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="column grouping tabs"
        >
          {columns.map((col, index) => (
            <Tab key={index} label={col} />
          ))}
        </Tabs>
      </Box>

      <section style={{ marginBottom: "1.5rem" }}>
        <label>
          <strong>Select Date:</strong>
        </label>
        <div>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
          />
        </div>
      </section>

      <div className="costExplorerContent">
        <div className="main-content">
          <section>
            <ReactFC {...chartConfigs} />
          </section>
        </div>
        <div className="filterSidebar">
          <FilterSidebar
            columns={columns}
            filterOptions={filterOptions}
            selectedFilters={selectedFilters}
            onColumnClick={handleColumnClick}
            onCheckboxChange={handleCheckboxChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CostExplorer;
