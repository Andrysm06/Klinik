import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const Home = () => {
  const stokData = JSON.parse(localStorage.getItem("stokData")) || [];
  const barangMasuk = JSON.parse(localStorage.getItem("barangMasuk")) || [];
  const barangKeluar = JSON.parse(localStorage.getItem("barangKeluar")) || [];
  const kirData = JSON.parse(localStorage.getItem("kirData")) || [];

  // =========================
  // TOTAL STOCK
  // =========================
  const totalStok = stokData.reduce((acc, item) => acc + item.qty, 0);

  // =========================
  // SUMMARY PER CATEGORY
  // =========================
  const kategoriSummary = stokData.reduce((acc, item) => {
    const existing = acc.find((k) => k.kategori === item.kategori);
    if (existing) {
      existing.qty += item.qty;
    } else {
      acc.push({ kategori: item.kategori, qty: item.qty });
    }
    return acc;
  }, []);

  // =========================
  // VEHICLE INSPECTION STATUS
  // =========================
  const getStatus = (masaBerlaku) => {
    const today = new Date();
    const expiryDate = new Date(masaBerlaku);
    const diffDays = Math.ceil(
      (expiryDate - today) / (1000 * 60 * 60 * 24)
    );

    if (expiryDate < today) return "red";
    if (diffDays <= 30) return "yellow";
    return "green";
  };

  const kirSummary = kirData.reduce(
    (acc, item) => {
      const status = getStatus(item.masaBerlaku);
      acc[status] += 1;
      return acc;
    },
    { green: 0, yellow: 0, red: 0 }
  );

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="px-4 pt-12"></div>

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-700">
              Admin Dashboard
            </h1>
            <p className="text-gray-500 text-sm">
              Warehouse Inventory Management System - PT. Harapan Baru Perkasa
            </p>
          </div>

          {/* STAT CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

            {/* TOTAL STOCK */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border">
              <p className="text-sm text-gray-500">Total Stock</p>
              <h2 className="text-2xl font-semibold text-blue-600">
                {totalStok} Pcs
              </h2>
            </div>

            {/* INCOMING GOODS */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border">
              <p className="text-sm text-gray-500">Incoming Goods</p>
              <h2 className="text-2xl font-semibold text-green-600">
                {barangMasuk.length}
              </h2>
            </div>

            {/* OUTGOING GOODS */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border">
              <p className="text-sm text-gray-500">Outgoing Goods</p>
              <h2 className="text-2xl font-semibold text-red-600">
                {barangKeluar.length}
              </h2>
            </div>

            {/* VEHICLE INSPECTION LIST */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border">
              <p className="text-sm text-gray-500 mb-3">
                Three-Wheel Vehicle Inspection
              </p>

              <div className="space-y-2 text-sm">

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    Active
                  </span>
                  <span className="font-semibold text-green-600">
                    {kirSummary.green}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                    Expiring Soon
                  </span>
                  <span className="font-semibold text-yellow-600">
                    {kirSummary.yellow}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    Expired
                  </span>
                  <span className="font-semibold text-red-600">
                    {kirSummary.red}
                  </span>
                </div>

              </div>
            </div>
          </div>

          {/* CHART (UNCHANGED) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Stock Chart by Category
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={kategoriSummary}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="kategori" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="qty"
                  stroke="#2563eb"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

        </div>

        <Footer />
      </div>
    </>
  );
};

export default Home;