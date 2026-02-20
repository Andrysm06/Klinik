import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useRef } from "react";

/* =========================
   DATA MOBIL
========================= */

const dataMobil = [
  // Tiga Roda
  { id: 1, nopol: "B 9782 UYU", driver: "Kustia" },
  { id: 2, nopol: "B 9671 UYU", driver: "Amin" },
  { id: 3, nopol: "B 9570 UFU", driver: "Dedi" },
  { id: 4, nopol: "B 9571 UFU", driver: "Enyank" },
  { id: 5, nopol: "B 9741 UFU", driver: "Iyan" },
  { id: 6, nopol: "B 9742 UFU", driver: "Dace" },
  { id: 7, nopol: "B 9997 UFU", driver: "Gunawan" },
  { id: 8, nopol: "B 9998 UFU", driver: "Dwi" },
  { id: 9, nopol: "B 9048 UFV", driver: "Maman" },
  { id: 10, nopol: "B 9052 UFV", driver: "Jablai" },
  { id: 11, nopol: "B 9135 UFV", driver: "Abdul" },
  { id: 12, nopol: "B 9136 UFV", driver: "Wandi" },
  { id: 13, nopol: "B 9137 UFV", driver: "Imam" },
  { id: 14, nopol: "BE 8026 AMD", driver: "Carma" },
  { id: 15, nopol: "BE 8613 AMD", driver: "Asim" },
  { id: 16, nopol: "B 9940 UT", driver: "Heru" },
  { id: 17, nopol: "B 9941 UT", driver: "Aman" },
  { id: 18, nopol: "B 9500 TU", driver: "Sarupudin" },
  { id: 19, nopol: "B 9441 TU", driver: "Umri" },
  { id: 20, nopol: "B 9894 BFU", driver: "Nana" },
  { id: 21, nopol: "B 9681 JK", driver: "Mino" },
  { id: 22, nopol: "B 9638 ZK", driver: "Syahrial" },
  { id: 23, nopol: "B 9752 SYK", driver: "Tatang" },
  { id: 24, nopol: "B 9488 UFU", driver: "Ace" },
  { id: 25, nopol: "B 9406 UFU", driver: "Sumarna" },
  { id: 26, nopol: "B 9212 JB", driver: "Andi" },
  { id: 27, nopol: "B 9273 UVY", driver: "Adnan" },
  { id: 28, nopol: "B 9739 UIU", driver: "Toni" },
  { id: 29, nopol: "B 9085 UDG", driver: "Agus" },
  { id: 30, nopol: "B 9459 UVX", driver: "Umri" },
  { id: 31, nopol: "B 9350 UVV", driver: "Dede" },
  { id: 32, nopol: "B 9351 UVV", driver: "Iwan" },

  // Flayash
  { id: 33, nopol: "B 9869 UIS", driver: "Risal" },
  { id: 34, nopol: "B 9584 ZJ", driver: "Adrian" },
  { id: 35, nopol: "B 9586 ZJ", driver: "Yayan" },
  { id: 36, nopol: "B 9249 MI", driver: "Bojes" },
  { id: 37, nopol: "B 9541 SYM", driver: "Dahlan" },
  { id: 38, nopol: "B 9035 UFV", driver: "Asep M" },
  { id: 39, nopol: "B 9177 UFV", driver: "Madroni" },
  { id: 40, nopol: "B 9878 SYM", driver: "Samsuri" },
  { id: 41, nopol: "B 9237 UFV", driver: "Saleh" },
  { id: 42, nopol: "B 9236 UFV", driver: "Endra" },
  { id: 43, nopol: "B 9604 BFU", driver: "Dede" },
  { id: 44, nopol: "B 9647 JK", driver: "Rasta" },
  { id: 45, nopol: "B 9418 BFU", driver: "Soleh" },
  { id: 46, nopol: "B 9469 UFU", driver: "Lukman" },
  { id: 47, nopol: "B 9631 UFV", driver: "Tatang" },
  { id: 48, nopol: "B 9618 UFV", driver: "Entus" },
  { id: 49, nopol: "B 9735 UFU", driver: "Satori" },
  { id: 50, nopol: "B 9164 SYO", driver: "Jana" },
  { id: 51, nopol: "B 9250 BFU", driver: "Didi" },
  { id: 52, nopol: "B 9138 TU", driver: "Amin" },
  { id: 53, nopol: "B 9819 UFU", driver: "Heru" },
  { id: 54, nopol: "B 9036 UFV", driver: "Yedi" },
  { id: 55, nopol: "B 9276 UYT", driver: "Roji" },

  // SCG
  { id: 56, nopol: "B 9394 UFU", driver: "Ahmad D" },
  { id: 57, nopol: "B 9165 SYO", driver: "Roni" },
  { id: 58, nopol: "B 9957 BFU", driver: "Samsul" },
  { id: 59, nopol: "B 9584 UFV", driver: "Holil" },
  { id: 60, nopol: "B 9072 UFA", driver: "Saipul" },
  { id: 61, nopol: "B 9327 TU", driver: "Mamat" },
  { id: 62, nopol: "B 9049 UFV", driver: "Ahmad S" },
  { id: 63, nopol: "B 9050 UFV", driver: "Pardi" },
  { id: 64, nopol: "B 9051 UFV", driver: "Pudin" },
  { id: 65, nopol: "B 9597 UFV", driver: "Gian" },
  { id: 66, nopol: "B 9582 UFV", driver: "Gian" },
  { id: 67, nopol: "B 9740 UFU", driver: "Unan" },
];

const DataSparepartKeluar = () => {
  const today = new Date().toISOString().split("T")[0];
  const role = localStorage.getItem("role");
  const isUser = role === "user";
  const vehicleRef = useRef(null);
  const sparepartRef = useRef(null);
  const qtyRef = useRef(null);
  const submitRef = useRef(null);

  /* =========================
     STATE
  ========================= */
  const [stok, setStok] = useState(() => {
    const saved = localStorage.getItem("stokData");
    return saved ? JSON.parse(saved) : [];
  });

  const [barangKeluar, setBarangKeluar] = useState(() => {
    const saved = localStorage.getItem("barangKeluar");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    tanggal: today,
    mobilId: "",
    nopol: "",
    driver: "",
    nama: "",
    kategori: "",
    qty: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [pendingQty, setPendingQty] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  /* =========================
     SAVE LOCAL STORAGE
  ========================= */
  useEffect(() => {
    localStorage.setItem("stokData", JSON.stringify(stok));
    localStorage.setItem("barangKeluar", JSON.stringify(barangKeluar));
  }, [stok, barangKeluar]);

  /* =========================
     HANDLE MOBIL
  ========================= */
  const handleMobilChange = (e) => {
    const selected = dataMobil.find(
      (item) => item.id === parseInt(e.target.value)
    );
    if (!selected) return;

    setForm((prev) => ({
      ...prev,
      mobilId: selected.id,
      nopol: selected.nopol,
      driver: selected.driver,
    }));
  };

  /* =========================
     HANDLE SPAREPART
  ========================= */
  const handleSparepartChange = (e) => {
    const selected = stok.find((item) => item.nama === e.target.value);
    if (!selected) return;

    setForm((prev) => ({
      ...prev,
      nama: selected.nama,
      kategori: selected.kategori,
    }));
  };

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isUser) {
      alert(
        "Access denied. You do not have permission to perform this action."
      );
      return;
    }

    const qtyNumber = parseInt(form.qty);
    const currentItem = stok.find((item) => item.nama === form.nama);

    if (!currentItem) return;

    if (!qtyNumber || qtyNumber <= 0) {
      alert("Quantity must be greater than zero.");
      return;
    }

    if (!isEdit && qtyNumber > currentItem.qty) {
      alert("Stock is not sufficient!");
      return;
    }

    setPendingQty(qtyNumber);
    setShowModal(true);
  };

  /* =========================
     CONFIRM SUBMIT
  ========================= */
  const confirmSubmit = () => {
    if (isEdit) {
      const oldData = barangKeluar[editIndex];

      // Kembalikan stok lama
      let updatedStock = stok.map((item) =>
        item.nama === oldData.nama
          ? { ...item, qty: item.qty + oldData.qty }
          : item
      );

      // Kurangi stok baru
      updatedStock = updatedStock.map((item) =>
        item.nama === form.nama ? { ...item, qty: item.qty - pendingQty } : item
      );

      const updatedHistory = [...barangKeluar];
      updatedHistory[editIndex] = { ...form, qty: pendingQty };

      setStok(updatedStock);
      setBarangKeluar(updatedHistory);
      setIsEdit(false);
      setEditIndex(null);
    } else {
      setBarangKeluar([...barangKeluar, { ...form, qty: pendingQty }]);

      const updatedStok = stok.map((item) =>
        item.nama === form.nama ? { ...item, qty: item.qty - pendingQty } : item
      );

      setStok(updatedStok);
    }

    setForm({
      tanggal: today,
      mobilId: "",
      nopol: "",
      driver: "",
      nama: "",
      kategori: "",
      qty: "",
    });

    setShowModal(false);
  };

  /* =========================
     EDIT
  ========================= */
  const handleEdit = (index) => {
    const selected = barangKeluar[index];
    setForm(selected);
    setIsEdit(true);
    setEditIndex(index);
  };

  /* =========================
     DELETE
  ========================= */
  const handleDelete = (index) => {
    const confirmDelete = window.confirm("Delete this data?");
    if (!confirmDelete) return;

    const deletedItem = barangKeluar[index];

    const updatedStok = stok.map((item) =>
      item.nama === deletedItem.nama
        ? { ...item, qty: item.qty + deletedItem.qty }
        : item
    );

    const updatedHistory = barangKeluar.filter((_, i) => i !== index);

    setStok(updatedStok);
    setBarangKeluar(updatedHistory);
  };
  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();

      if (document.activeElement === vehicleRef.current) {
        sparepartRef.current.focus();
      } else if (document.activeElement === sparepartRef.current) {
        qtyRef.current.focus();
      } else if (document.activeElement === qtyRef.current) {
        submitRef.current.focus();
      }
    }

    if (e.key === "Enter") {
      if (document.activeElement === submitRef.current) {
        e.preventDefault();
        setShowModal(true);
      }
    }

    if (e.key === "Escape") {
      setShowModal(false);
    }
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
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
        <div className="px-4 pt-12"></div>

        <div className="bg-white rounded-3xl shadow-xl max-w-6xl mx-auto p-8">
          <h1 className="text-3xl font-semibold text-center mb-8">
            Outgoing Spare Parts
          </h1>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-5 gap-4 mb-10"
          >
            <input
              type="date"
              value={form.tanggal}
              readOnly
              className="border p-3 rounded-xl bg-gray-50"
            />

            <input
              ref={vehicleRef}
              list="vehicle-list"
              value={form.nopol || ""}
              placeholder="Type or select vehicle"
              onKeyDown={handleKeyDown}
              className="border p-3 rounded-xl"
              onChange={(e) => {
                const value = e.target.value;

                // update dulu supaya bisa diketik
                setForm((prev) => ({
                  ...prev,
                  nopol: value,
                }));

                // lalu cek apakah ada yang cocok
                const selected = dataMobil.find((item) => item.nopol === value);

                if (selected) {
                  setForm((prev) => ({
                    ...prev,
                    mobilId: selected.id,
                    driver: selected.driver,
                  }));
                }
              }}
              required
            />

            <datalist id="vehicle-list">
              {dataMobil.map((mobil) => (
                <option key={mobil.id} value={mobil.nopol} />
              ))}
            </datalist>
            <select
              ref={sparepartRef}
              value={form.nama}
              onChange={handleSparepartChange}
              onKeyDown={handleKeyDown}
              className="border p-3 rounded-xl"
              required
            >
              <option value="">Select Spare Part</option>
              {stok.map((item, index) => (
                <option key={index} value={item.nama}>
                  {item.nama} (Stock: {item.qty})
                </option>
              ))}
            </select>

            <input
              type="text"
              value={form.kategori}
              readOnly
              className="border p-3 rounded-xl bg-gray-50"
            />

            <input
              ref={qtyRef}
              type="number"
              placeholder="Quantity"
              value={form.qty}
              onChange={(e) => setForm({ ...form, qty: e.target.value })}
              onKeyDown={handleKeyDown}
              className="border p-3 rounded-xl"
              required
            />

            <button
              type="submit"
              disabled={isUser}
              className={`md:col-span-5 py-3 rounded-xl transition ${
                isUser
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-red-500 text-white hover:bg-red-600"
              }`}
            >
              {isEdit ? "Update Spare Part" : "Submit Outgoing Spare Part"}
            </button>
          </form>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr className="text-center">
                  <th className="border px-4 py-2">No</th>
                  <th className="border px-4 py-2">Date</th>
                  <th className="border px-4 py-2">Vehicle</th>
                  <th className="border px-4 py-2">Driver</th>
                  <th className="border px-4 py-2">Spare Part</th>
                  <th className="border px-4 py-2">Category</th>
                  <th className="border px-4 py-2">Qty</th>
                  <th className="border px-4 py-2">Action</th>
                </tr>
              </thead>

              <tbody>
                {barangKeluar.length > 0 ? (
                  barangKeluar.map((item, index) => (
                    <tr key={index} className="text-center border-t">
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">{item.tanggal}</td>
                      <td className="border px-4 py-2">{item.nopol}</td>
                      <td className="border px-4 py-2">{item.driver}</td>
                      <td className="border px-4 py-2">{item.nama}</td>
                      <td className="border px-4 py-2">{item.kategori}</td>
                      <td className="border px-4 py-2 text-red-600 font-semibold">
                        {item.qty} pcs
                      </td>
                      <td className="border px-4 py-2">
                        {!isUser ? (
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleEdit(index)}
                              className="px-3 py-1 bg-blue-500 text-white rounded-lg"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(index)}
                              className="px-3 py-1 bg-red-500 text-white rounded-lg"
                            >
                              Delete
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm italic">
                            View Only
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4 border">
                      No outgoing spare part history
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="px-4 pt-12"></div>
        <Footer />
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl p-8 w-96 text-center">
            <h2 className="text-xl font-semibold mb-4">
              Confirm Spare Part Issue
            </h2>

            <p className="mb-2">
              <strong>Vehicle:</strong> {form.nopol}
            </p>
            <p className="mb-2">
              <strong>Driver:</strong> {form.driver}
            </p>
            <p className="mb-2">
              <strong>Spare Part:</strong> {form.nama}
            </p>
            <p className="mb-6">
              <strong>Quantity:</strong> {pendingQty} pcs
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={confirmSubmit}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DataSparepartKeluar;
