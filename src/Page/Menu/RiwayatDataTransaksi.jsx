import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import logo from "../../../public/Image/LgHBP3.png";

const DataRiwayat = () => {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [barangKeluar] = useState(() => {
    const saved = localStorage.getItem("barangKeluar");
    return saved ? JSON.parse(saved) : [];
  });

  const dataMobil = [];

  const data = barangKeluar.map((item) => {
    const mobil = dataMobil.find((m) => m.id === item.mobilId) || {};
    return {
      ...item,
      kategori: item.kategori || mobil.kategori,
      nopol: item.nopol || mobil.nopol,
      driver: item.driver || mobil.driver,
    };
  });

  // 🔥 FILTER SEARCH + TANGGAL
  const filteredData = data.filter((item) => {
    const matchSearch =
      item.nopol?.toLowerCase().includes(search.toLowerCase()) ||
      item.driver?.toLowerCase().includes(search.toLowerCase()) ||
      item.nama?.toLowerCase().includes(search.toLowerCase()) ||
      item.kategori?.toLowerCase().includes(search.toLowerCase());

    const itemDate = new Date(item.tanggal);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const matchDate =
      (!start || itemDate >= start) && (!end || itemDate <= end);

    return matchSearch && matchDate;
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <div className="no-print">
          <Navbar />
        </div>

        <div className="flex-1 px-4 pt-10 print-area">
          <h1 className="text-2xl font-semibold text-black mb-4 text-center print:text-xl">
            Sparepart Outgoing Transaction History
          </h1>

          {/* 🔥 FILTER SECTION */}
          <div className="flex flex-wrap justify-center mb-4 gap-2 no-print">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border rounded-xl"
            />

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-4 py-2 border rounded-xl"
            />

            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-4 py-2 border rounded-xl"
            />

            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-red-600 text-white rounded-xl"
            >
              Print
            </button>
          </div>

          <div className="bg-white shadow-md rounded-2xl overflow-auto print:overflow-visible p-4">
            {/* HEADER PRINT */}
            <div className="print-only text-center mb-4">
              <img
                src={logo}
                alt="Logo"
                className="mx-auto mb-2"
                style={{ width: "80px" }}
              />
              <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>
                PT. Harapan Baru Perkasa
              </h1>

              {startDate && endDate && (
                <p style={{ fontSize: "12px" }}>
                  Period: {startDate} s/d {endDate}
                </p>
              )}

              <hr style={{ border: "2px solid black", marginTop: "10px" }} />
            </div>

            <table className="w-full text-sm print:text-xs border-collapse">
              <thead className="bg-red-600 text-white print:bg-gray-200 print:text-black">
                <tr>
                  <th className="p-3 border">No</th>
                  <th className="p-3 border">Date</th>
                  <th className="p-3 border">Category</th>
                  <th className="p-3 border">Vehicle</th>
                  <th className="p-3 border">Driver</th>
                  <th className="p-3 border">Type</th>
                  <th className="p-3 border">Sparepart</th>
                  <th className="p-3 border">Qty</th>
                </tr>
              </thead>

              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={index}>
                      <td className="p-3 border">{index + 1}</td>
                      <td className="p-3 border">{item.tanggal}</td>
                      <td className="p-3 border">{item.kategori}</td>
                      <td className="p-3 border">{item.nopol}</td>
                      <td className="p-3 border">{item.driver}</td>
                      <td className="p-3 border">{item.jenis}</td>
                      <td className="p-3 border">{item.nama}</td>
                      <td className="p-3 border">-{item.qty}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center p-5">
                      No Data Available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="no-print">
          <Footer />
        </div>
      </div>

      <style>
        {`
          .print-only { display: none; }

          @media print {
            .no-print { display: none !important; }
            .print-only { display: block !important; }
            body { background: white; }
            table, th, td { border: 1px solid black; }
          }
        `}
      </style>
    </>
  );
};

export default DataRiwayat;
