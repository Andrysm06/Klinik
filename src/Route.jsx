import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./Page/Login";
import Home from "./Page/Home";
import NotFound from "./components/NotFound";
import DataSparepat from "./Page/Menu/DataSparepat";
import ListDataMasuk from "./Page/Menu/DataMasuk";
import ListDataKeluar from "./Page/Menu/DataKeluar";
import DataKIR from "./Page/Menu/dataKIR";
import About from "./components/About";
import DataTransaksi from "./Page/Menu/RiwayatDataTransaksi";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },

  {
    path: "/Beranda",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },

  {
    path: "/DataSparepat",
    element: (
      <ProtectedRoute>
        <DataSparepat />
      </ProtectedRoute>
    ),
  },

  {
    path: "/DataMasuk",
    element: (
      <ProtectedRoute>
        <ListDataMasuk />
      </ProtectedRoute>
    ),
  },

  {
    path: "/DataKeluar",
    element: (
      <ProtectedRoute>
        <ListDataKeluar />
      </ProtectedRoute>
    ),
  },

  {
    path: "/RiwayatDataTransaksi",
    element: (
      <ProtectedRoute>
        <DataTransaksi />
      </ProtectedRoute>
    ),
  },

  {
    path: "/KIR",
    element: (
      <ProtectedRoute>
        <DataKIR />
      </ProtectedRoute>
    ),
  },

  {
    path: "/About",
    element: (
      <ProtectedRoute>
        <About />
      </ProtectedRoute>
    ),
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

function Route() {
  return <RouterProvider router={router} />;
}

export default Route;
