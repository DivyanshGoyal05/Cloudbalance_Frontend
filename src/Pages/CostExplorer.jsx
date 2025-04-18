import React, { useEffect, useState } from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
// import axios from "../api/axiosConfig";
import "../Styles/CostExplorer.css";

Charts(FusionCharts); // Register chart types

const CostExplorer = () => {
  const [costData, setCostData] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // You can call the actual API here
    fetchCostData();
  }, []);

  const fetchCostData = async () => {
    setLoading(true);
    try {
      // Mock API response
      const response = {
        data: {
          monthlyCost: [
            { label: "Jan", value: "4000" },
            { label: "Feb", value: "3000" },
            { label: "Mar", value: "2500" },
            { label: "Apr", value: "3200" },
          ],
          serviceWiseCost: [
            { label: "EC2", value: "5000" },
            { label: "S3", value: "2000" },
            { label: "RDS", value: "1500" },
            { label: "Lambda", value: "1800" },
          ],
        },
      };
      setCostData(response.data.monthlyCost);
      setServiceData(response.data.serviceWiseCost);
    } catch (error) {
      console.error("Error fetching cost data:", error);
    }
    setLoading(false);
  };

  const renderChart = (id, type, data, caption, yAxisName) => {
    return new FusionCharts({
      type,
      renderAt: id,
      width: "100%",
      height: "300",
      dataFormat: "json",
      dataSource: {
        chart: {
          caption,
          yAxisName,
          theme: "fusion",
          paletteColors: "#3B82F6",
          bgColor: "#ffffff",
          borderAlpha: "0",
          canvasBorderAlpha: "0",
          usePlotGradientColor: "0",
          showValues: "1",
          showShadow: "0",
        },
        data,
      },
    }).render();
  };

  useEffect(() => {
    if (costData.length > 0) {
      renderChart(
        "monthlyChart",
        "column2d",
        costData,
        "Monthly Cloud Cost",
        "Cost ($)"
      );
    }
    if (serviceData.length > 0) {
      renderChart(
        "serviceChart",
        "pie2d",
        serviceData,
        "Cost by Service",
        "Cost ($)"
      );
    }
  }, [costData, serviceData]);

  return (
    <div className="cost-explorer-container">
      {/* <h1 className="title">Cost Explorer</h1> */}
      <p className="subtitle">Analyze and explore your cloud spend visually</p>

      {loading ? (
        <p className="loading">Loading data...</p>
      ) : (
        <>
          <div className="chart-box">
            <div id="monthlyChart"></div>
          </div>

          <div className="chart-box">
            <div id="serviceChart"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default CostExplorer;
