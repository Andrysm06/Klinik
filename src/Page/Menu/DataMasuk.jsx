import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const masterData = [
  { kategori: "Ban", nama: "Ban Luar 11R22.5 Goodyear (Tubes)", qty: 0 },
  {
    kategori: "Ban",
    nama: "Ban Luar 11R22.5 X-Multi Michelin (Tubes)",
    qty: 0,
  },
  { kategori: "Ban", nama: "Ban Luar 11R22.5 Bridgestone (Tubes)", qty: 0 },
  { kategori: "Ban", nama: "Ban Luar 11R22.5 CEAT (Tubes)", qty: 0 },
  { kategori: "Ban", nama: "Ban Luar 295/80R22.5 CEAT (Tubes)", qty: 0 },

  {
    kategori: "Velg Baru",
    nama: "Velg Baru Lubang 8 X-Multi Michelin (Topy Tubes)",
    qty: 0,
  },
  { kategori: "Velg Baru", nama: "Velg Baru Lubang 8 CZX Tubes", qty: 12 },
  {
    kategori: "Pentil Baru",
    nama: "Pentil Velg Baru Lubang 8 X-Multi Michelin (Topy Tubes)",
    qty: 0,
  },
  {
    kategori: "Pentil Baru",
    nama: "Pentil Velg Baru Lubang 8 CZX Tubes",
    qty: 12,
  },
  {
    kategori: "Velg Bekas",
    nama: "Velg Bekas Lubang 10 CZX Tubes dari Kedoya",
    qty: 12,
  },
  {
    kategori: "Pentil Bekas",
    nama: "Pentil Velg Bekas Lubang 10 CZX Tubes",
    qty: 12,
  },

  { kategori: "Lampu", nama: "Lampu Halogen H4 Philips", qty: 0 },
  { kategori: "Filter", nama: "Filter Oil Hino 21/90L", qty: 0 },
  { kategori: "Filter", nama: "Filter Solar Atas Hino 1332L", qty: 0 },
  { kategori: "Filter", nama: "Filter Solar Bawah Hino 1440L", qty: 0 },
  { kategori: "Filter", nama: "Filter Udara Kompresor (A-120)", qty: 3 },
  { kategori: "Filter", nama: "Filter Solar Hino 500 Euro", qty: 6 },
  { kategori: "Filter", nama: "Filter Solar Bawah Hino 500", qty: 4 },
  { kategori: "Filter", nama: "Filter Oli Gardan", qty: 0 },
  { kategori: "Filter", nama: "Filter Oil Perkins", qty: 0 },
  { kategori: "Minyak", nama: "Minyak Kopel Cum 80", qty: 2 },
  { kategori: "Sparepart", nama: "Universal Joint PTO", qty: 12 },
  { kategori: "Kampas", nama: "Kampas Rem Roda Depan", qty: 4 },
  { kategori: "Kampas", nama: "Kampas Rem Roda Belakang", qty: 20 },
  { kategori: "Bearing", nama: "Bearing Roda Belakang Dalam", qty: 1 },
  { kategori: "Bearing", nama: "Bearing Roda Belakang Luar", qty: 2 },
  { kategori: "Bearing", nama: "Bearing Roda Depan Dalam", qty: 3 },
  { kategori: "Bearing", nama: "Bearing Roda Depan Luar", qty: 0 },
];

const DataSparepartMasuk = () => {
  /* ================= STATE ================= */
  const role = localStorage.getItem("role"); // "admin" atau "user"
  const isUser = role === "user";
  const [stok, setStok] = useState(() => {
    const saved = localStorage.getItem("stokData");
    return saved ? JSON.parse(saved) : masterData;
  });

  const [barangMasuk, setBarangMasuk] = useState(() => {
    const saved = localStorage.getItem("barangMasuk");
    return saved ? JSON.parse(saved) : [];
  });

  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    tanggal: today,
    nama: "",
    kategori: "",
    qty: "",
  });

  const [editIndex, setEditIndex] = useState(null);
  const [notification, setNotification] = useState(null);

  /* ================= LOCAL STORAGE SYNC ================= */

  useEffect(() => {
    localStorage.setItem("stokData", JSON.stringify(stok));
    localStorage.setItem("barangMasuk", JSON.stringify(barangMasuk));
  }, [stok, barangMasuk]);

  /* ================= NOTIFICATION ================= */

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  /* ================= HANDLE SELECT ================= */

  const handleSparepartChange = (e) => {
    const selected = stok.find((item) => item.nama === e.target.value);

    if (selected) {
      setForm({
        ...form,
        nama: selected.nama,
        kategori: selected.kategori,
      });
    }
  };

  /* ================= HANDLE SUBMIT ================= */

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nama) return;

    const qtyNumber = parseInt(form.qty);

    if (!qtyNumber || qtyNumber <= 0) {
      showNotification("Quantity must be greater than zero.", "error");
      return;
    }

    if (editIndex !== null) {
      const oldQty = parseInt(barangMasuk[editIndex].qty);

      const updatedStok = stok.map((item) =>
        item.nama === form.nama
          ? { ...item, qty: item.qty - oldQty + qtyNumber }
          : item
      );

      const updatedMasuk = [...barangMasuk];
      updatedMasuk[editIndex] = { ...form, qty: qtyNumber };

      setStok(updatedStok);
      setBarangMasuk(updatedMasuk);
      setEditIndex(null);

      showNotification("Stock entry updated successfully!");
    } else {
      setBarangMasuk([...barangMasuk, { ...form, qty: qtyNumber }]);

      const updatedStok = stok.map((item) =>
        item.nama === form.nama ? { ...item, qty: item.qty + qtyNumber } : item
      );

      setStok(updatedStok);

      showNotification("Spare part successfully added to stock!");
    }

    setForm({
      tanggal: today,
      nama: "",
      kategori: "",
      qty: "",
    });
  };

  /* ================= DELETE ================= */

  const handleDelete = (index) => {
    const deletedQty = parseInt(barangMasuk[index].qty);
    const namaBarang = barangMasuk[index].nama;

    const updatedStok = stok.map((item) =>
      item.nama === namaBarang ? { ...item, qty: item.qty - deletedQty } : item
    );

    const updatedMasuk = barangMasuk.filter((_, i) => i !== index);

    setStok(updatedStok);
    setBarangMasuk(updatedMasuk);

    showNotification("Stock entry deleted successfully!", "error");
  };

  /* ================= RENDER ================= */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const formElements = Array.from(
        e.target.form.querySelectorAll("input, button")
      ).filter((el) => !el.disabled);

      const index = formElements.indexOf(e.target);

      if (index > -1 && index < formElements.length - 1) {
        e.preventDefault();
        formElements[index + 1].focus();
      }
    }

    if (e.key === "Escape") {
      setForm({
        tanggal: today,
        nama: "",
        kategori: "",
        qty: "",
      });
    }
  };

  return (
    <>
      <div className="screen bg-gray-100 w-full">
        <div className="px-4 pt-12 "></div>
        {/* Role Info */}
        <div
          className={`mb-6 p-4 rounded-lg text-center ${
            isUser ? "bg-blue-50 text-blue-700" : "bg-green-50 text-green-700"
          }`}
        >
          {isUser ? (
            <>
              <h2 className="font-semibold text-lg">Hi, User 👋</h2>
              <p className="text-sm mt-1">
                You are logged in as a User. You can view stock data, but
                editing, deleting, and modifying entries is restricted.
              </p>
            </>
          ) : (
            <>
              <h2 className="font-semibold text-lg">Hi, Admin 👑</h2>
              <p className="text-sm mt-1">
                You have full access to manage incoming spare parts data.
              </p>
            </>
          )}
        </div>
        <Navbar />

        <div className="bg-white rounded-2xl shadow-xl max-w-6xl mx-auto p-8 relative">
          <h1 className="text-3xl font-semibold text-center mb-8">
            Incoming Spare Parts
          </h1>

          {/* Toast Notification */}
          {notification && (
            <div
              className={`fixed top-20 right-6 px-6 py-3 rounded-lg shadow-lg text-white transition-all duration-300 ${
                notification.type === "error" ? "bg-red-600" : "bg-green-600"
              }`}
            >
              {notification.message}
            </div>
          )}

          {/* FORM */}
          <form
            onSubmit={isUser ? (e) => e.preventDefault() : handleSubmit}
            className="grid grid-cols-4 gap-4 mb-6"
          >
            <input
              list="sparepart-list"
              value={form.nama}
              onChange={(e) => {
                const selected = stok.find(
                  (item) => item.nama === e.target.value
                );

                if (selected) {
                  setForm({
                    ...form,
                    nama: selected.nama,
                    kategori: selected.kategori,
                  });
                } else {
                  setForm({ ...form, nama: e.target.value });
                }
              }}
              className="border p-2 rounded"
              placeholder="Type or select spare part"
              required
            />

            <datalist id="sparepart-list">
              {stok.map((item, index) => (
                <option key={index} value={item.nama} />
              ))}
            </datalist>

            <input
              type="text"
              value={form.kategori}
              readOnly
              className="border p-2 rounded bg-gray-100"
            />

            <input
              type="number"
              placeholder="Quantity"
              value={form.qty}
              onKeyDown={handleKeyDown}
              onChange={(e) => setForm({ ...form, qty: e.target.value })}
              className="border p-2 rounded"
              required
            />

            <button
              type="submit"
              disabled={isUser}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const confirmSubmit = window.confirm(
                    "Are you sure you want to submit this stock entry?"
                  );
                  if (confirmSubmit) {
                    handleSubmit(e);
                  }
                }
              }}
              className={`rounded p-2 transition ${
                isUser
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              Submit
            </button>
          </form>

          {/* HISTORY TABLE */}
          <h2 className="text-xl font-semibold mt-10 mb-4">Incoming History</h2>

          <table className="w-full text-sm border mb-10">
            <thead className="bg-gray-100">
              <tr className="text-center">
                <th className="p-2">No</th>
                <th className="p-2">Date</th>
                <th className="p-2">Spare Part</th>
                <th className="p-2">Category</th>
                <th className="p-2">Qty</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {barangMasuk.map((item, index) => (
                <tr key={index} className="border-t text-center">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{item.tanggal}</td>
                  <td className="p-2">{item.nama}</td>
                  <td className="p-2">{item.kategori}</td>
                  <td className="p-2 text-green-600 font-semibold">
                    +{item.qty}
                  </td>
                  <td className="p-2">
                    {!isUser && (
                      <button
                        onClick={() => handleDelete(index)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs transition"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 pt-12 "></div>
        <Footer />
      </div>
    </>
  );
};

export default DataSparepartMasuk;
