import React, { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import createTheme from "@mui/material/styles/createTheme";
import { themeSettings } from "./theme";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./scenes/dashboard/Dashboard";
import Layout from "./scenes/layout/Layout";
import Products from "./scenes/products/Products";
import Customers from "./scenes/customers/Customers";
const App = () => {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
