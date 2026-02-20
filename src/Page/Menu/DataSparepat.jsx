import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import jsPDF from "jspdf";
import "jspdf-autotable";

const DataSparepart = () => {
  const [stokSparepart, setStokSparepart] = useState([]);

  useEffect(() => {
    const loadData = () => {
      const saved = localStorage.getItem("stokData");

      if (saved) {
        try {
          setStokSparepart(JSON.parse(saved));
        } catch (error) {
          console.error("Gagal parsing data stok:", error);
          setStokSparepart([]);
        }
      } else {
        setStokSparepart([]);
      }
    };

    loadData();
    window.addEventListener("storage", loadData);

    return () => {
      window.removeEventListener("storage", loadData);
    };
  }, []);

  // 🔥 Sort berdasarkan kategori
  const sortedSparepart = [...stokSparepart].sort((a, b) =>
    a.kategori.localeCompare(b.kategori)
  );

  // 🔥 Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Laporan Stok Spare Parts", 14, 20);

    const tableColumn = ["No", "Kategori", "Nama Spare Part", "Qty"];

    const tableRows = sortedSparepart.map((item, index) => [
      index + 1,
      item.kategori,
      item.nama,
      item.qty + " Pcs",
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      theme: "grid",
    });

    doc.save("stok-spareparts.pdf");
  };

  return (
    <>
      <div className="screen bg-gray-100 w-full">
        <Navbar />
        <div className="px-4 pt-12 "></div>
        <div className="bg-white rounded-2xl shadow-xl max-w-6xl mx-auto p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Stok Spare Parts
          </h1>

          {/* <div className="text-right mb-4">
            <button
              onClick={exportPDF}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Export PDF
            </button>
          </div> */}

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-red-700 text-white">
                <tr>
                  <th className="py-3 px-4 border text-center w-16">No</th>
                  <th className="py-3 px-4 border text-center w-40">
                    Category
                  </th>
                  <th className="py-3 px-4 border text-left">Spare Part</th>
                  <th className="py-3 px-4 border text-center w-24">Qty</th>
                </tr>
              </thead>

              <tbody>
                {sortedSparepart.length > 0 ? (
                  sortedSparepart.map((item, index) => {
                    const isNewCategory =
                      index === 0 ||
                      sortedSparepart[index - 1].kategori !== item.kategori;

                    return (
                      <React.Fragment key={index}>
                        {/* 🔥 HEADER KATEGORI */}
                        {isNewCategory && (
                          <tr className="bg-gray-200 font-bold text-left">
                            <td colSpan="4" className="py-2 px-4 border">
                              {item.kategori.toUpperCase()}
                            </td>
                          </tr>
                        )}

                        <tr className="hover:bg-gray-100 transition text-center border-t">
                          <td className="py-2 px-4 border">{index + 1}</td>
                          <td className="py-2 px-4 border font-medium">
                            {item.kategori}
                          </td>
                          <td className="py-2 px-4 border text-left">
                            {item.nama}
                          </td>
                          <td
                            className={`py-2 px-4 border font-semibold ${
                              item.qty === 0 ? "text-red-600" : "text-green-600"
                            }`}
                          >
                            {item.qty} Pcs
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="py-4 text-center text-gray-500 border"
                    >
                      Tidak ada data stok
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="px-4 pt-12 "></div>
        <Footer />
      </div>
    </>
  );
};

export default DataSparepart;
