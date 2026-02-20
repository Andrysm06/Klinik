import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const DataKIR = () => {
  const today = new Date().toISOString().split("T")[0];
  const role = localStorage.getItem("role"); // "admin" atau "user"
  const isUser = role === "user";

  /* =========================
       INITIAL DATA
    ========================= */
  const initialData = [
    {
      nopol: "B 9940 UT",
      nama: "HERU",
      status: "KIR Hampir Habis",
      masaBerlaku: "2026-03-01",
      catatan: "",
    },
    {
      nopol: "B 9941 UT",
      nama: "AMAN",
      status: "KIR Hampir Habis",
      masaBerlaku: "2026-04-30",
      catatan: "",
    },
    {
      nopol: "B 9500 TU",
      nama: "SARIPUDIN",
      status: "KIR Aktif",
      masaBerlaku: "2026-04-30",
      catatan: "",
    },
    {
      nopol: "B 9570 UFU",
      nama: "DEDI",
      status: "KIR Aktif",
      masaBerlaku: "2026-08-06",
      catatan: "",
    },
    {
      nopol: "B 9571 UFU",
      nama: "ENYANG",
      status: "KIR Aktif",
      masaBerlaku: "2026-08-03",
      catatan: "",
    },
    {
      nopol: "B 9997 UFU",
      nama: "GUNAWAN",
      status: "KIR Aktif",
      masaBerlaku: "2026-04-30",
      catatan: "",
    },
    {
      nopol: "B 9998 UFU",
      nama: "DWI",
      status: "KIR Aktif",
      masaBerlaku: "2026-04-30",
      catatan: "",
    },
    {
      nopol: "B 9741 UFU",
      nama: "IYAN",
      status: "KIR Aktif",
      masaBerlaku: "2026-08-09",
      catatan: "",
    },
    {
      nopol: "B 9742 UFU",
      nama: "DACE",
      status: "KIR Aktif",
      masaBerlaku: "2026-06-02",
      catatan: "",
    },
    {
      nopol: "B 9894 BFU",
      nama: "NANA",
      status: "KIR Aktif",
      masaBerlaku: "2026-07-03",
      catatan: "",
    },
    {
      nopol: "B 9406 UFU",
      nama: "SUMARNA",
      status: "KIR Aktif",
      masaBerlaku: "2026-08-06",
      catatan: "",
    },
    {
      nopol: "B 9488 UFU",
      nama: "ACE",
      status: "KIR Aktif",
      masaBerlaku: "2026-04-30",
      catatan: "",
    },
    {
      nopol: "B 9819 UFU",
      nama: "HERU",
      status: "KIR Tidak Berlaku",
      masaBerlaku: "2025-12-04",
      catatan: "",
    },
    {
      nopol: "B 9752 SYK",
      nama: "TATANG",
      status: "KIR Aktif",
      masaBerlaku: "2026-06-02",
      catatan: "",
    },
    {
      nopol: "B 9782 UYU",
      nama: "KUSTIA",
      status: "KIR Aktif",
      masaBerlaku: "2026-08-06",
      catatan: "",
    },
    {
      nopol: "B 9671 UYU",
      nama: "AMIN",
      status: "KIR Aktif",
      masaBerlaku: "2026-08-06",
      catatan: "",
    },
    {
      nopol: "B 9135 UFV",
      nama: "AJO",
      status: "KIR Hampir Habis",
      masaBerlaku: "2026-03-18",
      catatan: "",
    },
    {
      nopol: "B 9136 UFV",
      nama: "WANDI",
      status: "KIR Aktif",
      masaBerlaku: "2026-08-03",
      catatan: "",
    },
    {
      nopol: "B 9638 ZK",
      nama: "SYAHRUL",
      status: "KIR Hampir Habis",
      masaBerlaku: "2026-03-01",
      catatan: "",
    },
    {
      nopol: "B 9681 JK",
      nama: "MINO",
      status: "KIR Aktif",
      masaBerlaku: "2026-07-03",
      catatan: "",
    },
    {
      nopol: "B 9052 UFV",
      nama: "JABLAI",
      status: "KIR Aktif",
      masaBerlaku: "2026-04-15",
      catatan: "",
    },
    {
      nopol: "B 9048 UFV",
      nama: "MAMAN",
      status: "KIR Aktif",
      masaBerlaku: "2026-04-30",
      catatan: "",
    },
    {
      nopol: "B 9137 UFV",
      nama: "IMAM",
      status: "KIR Aktif",
      masaBerlaku: "2026-04-09",
      catatan: "",
    },
    {
      nopol: "B 9441 TU",
      nama: "UMRI",
      status: "KIR Aktif",
      masaBerlaku: "2026-07-03",
      catatan: "",
    },
    {
      nopol: "B 9350 UVV",
      nama: "DEDE",
      status: "KIR Aktif",
      masaBerlaku: "2026-07-21",
      catatan: "",
    },
    {
      nopol: "B 9351 UVV",
      nama: "IWAN",
      status: "KIR Aktif",
      masaBerlaku: "2026-07-21",
      catatan: "",
    },
    {
      nopol: "B 9212 JB",
      nama: "ANDI",
      status: "KIR Aktif",
      masaBerlaku: "2026-07-08",
      catatan: "",
    },
    {
      nopol: "B 9273 UVY",
      nama: "ADNAN",
      status: "KIR Aktif",
      masaBerlaku: "2026-06-02",
      catatan: "",
    },
    {
      nopol: "B 9739 UIU",
      nama: "TONI",
      status: "KIR Aktif",
      masaBerlaku: "2026-07-08",
      catatan: "",
    },
    {
      nopol: "B 9459 UVX",
      nama: "UMRI",
      status: "KIR Aktif",
      masaBerlaku: "2026-08-06",
      catatan: "",
    },
    {
      nopol: "B 9085 UDG",
      nama: "AGUS",
      status: "KIR Aktif",
      masaBerlaku: "2026-06-02",
      catatan: "",
    },
    {
      nopol: "BE 8026 AMD",
      nama: "CARMA",
      status: "KIR Tidak Berlaku",
      masaBerlaku: "2026-01-18",
      catatan: "",
    },
    {
      nopol: "BE 8613 AMD",
      nama: "ASIM",
      status: "KIR Aktif",
      masaBerlaku: "2026-07-09",
      catatan: "",
    },
  ];

  const [kirData, setKirData] = useState(() => {
    const saved = localStorage.getItem("kirData");
    return saved ? JSON.parse(saved) : initialData;
  });

  const [form, setForm] = useState({
    nopol: "",
    nama: "",
    masaBerlaku: today,
    catatan: "",
  });

  const [editIndex, setEditIndex] = useState(null);

  /* =========================
       SAVE TO LOCAL STORAGE
    ========================= */
  useEffect(() => {
    localStorage.setItem("kirData", JSON.stringify(kirData));
  }, [kirData]);

  /* =========================
       AUTO STATUS
    ========================= */
  const getStatus = (masaBerlaku) => {
    const todayDate = new Date();
    const expiryDate = new Date(masaBerlaku);
    const diffDays = Math.ceil(
      (expiryDate - todayDate) / (1000 * 60 * 60 * 24)
    );

    if (expiryDate < todayDate) return "Expired";
    if (diffDays <= 30) return "Expiring Soon";
    return "Active";
  };

  /* =========================
       SUBMIT
    ========================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isUser && editIndex === null) {
      alert("You do not have permission to add new inspection data.");
      return;
    }

    const updatedForm = {
      ...form,
      status: getStatus(form.masaBerlaku),
    };

    if (editIndex !== null) {
      const updated = [...kirData];

      if (isUser) {
        // User hanya boleh ubah catatan
        updated[editIndex] = {
          ...updated[editIndex],
          catatan: form.catatan,
        };
      } else {
        updated[editIndex] = updatedForm;
      }

      setKirData(updated);
      setEditIndex(null);
    } else {
      setKirData([...kirData, updatedForm]);
    }

    setForm({
      nopol: "",
      nama: "",
      masaBerlaku: today,
      catatan: "",
    });
  };
  /* =========================
       EDIT
    ========================= */
  const handleEdit = (index) => {
    setForm(kirData[index]);
    setEditIndex(index);
  };

  /* =========================
       DELETE
    ========================= */
  const handleDelete = (index) => {
    if (
      window.confirm("Are you sure you want to delete this inspection record?")
    ) {
      setKirData(kirData.filter((_, i) => i !== index));
    }
  };

  return (
    <>
      <div className="screen bg-gray-100 w-full">
        <Navbar />
        {/* Role Info */}
        <div
          className={`mb-6 p-4 rounded-xl text-center shadow-sm ${
            isUser
              ? "bg-blue-50 border border-blue-200 text-blue-700"
              : "bg-green-50 border border-green-200 text-green-700"
          }`}
        >
          {isUser ? (
            <>
              <h2 className="font-semibold text-lg">Hi, User 👋</h2>
              <p className="text-sm mt-1 leading-relaxed">
                You are logged in as a{" "}
                <span className="font-semibold">Standard User</span>. You are
                permitted to update inspection remarks only. Editing vehicle
                information, inspection validity dates, and deleting records are
                restricted to administrators.
              </p>
            </>
          ) : (
            <>
              <h2 className="font-semibold text-lg">Hi, Admin 👑</h2>
              <p className="text-sm mt-1 leading-relaxed">
                You have full administrative access. You are authorized to add,
                modify, update, and remove inspection records within the Vehicle
                Inspection (KIR) system.
              </p>
            </>
          )}
        </div>
        <div className="px-4 pt-12"></div>

        <div className="bg-white p-8 rounded-3xl shadow max-w-6xl mx-auto">
          <h1 className="text-3xl font-semibold mb-8 text-center">
            Vehicle Inspection Data (Tiga Roda)
          </h1>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
          >
            <input
              type="text"
              placeholder="Vehicle"
              value={form.nopol}
              onChange={(e) => setForm({ ...form, nopol: e.target.value })}
              className="border px-4 py-2 rounded"
              required
              disabled={isUser}
            />

            <input
              type="text"
              placeholder="Driver"
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              className="border px-4 py-2 rounded"
              required
              disabled={isUser}
            />

            <input
              type="date"
              value={form.masaBerlaku}
              onChange={(e) =>
                setForm({ ...form, masaBerlaku: e.target.value })
              }
              className="border px-4 py-2 rounded"
              required
              disabled={isUser}
            />
            <input
              type="text"
              placeholder="Remarks"
              value={form.catatan}
              onChange={(e) => setForm({ ...form, catatan: e.target.value })}
              className="border px-4 py-2 rounded"
            />
            <button
              type="submit"
              disabled={isUser && editIndex === null}
              className={`md:col-span-4 py-2 px-4 rounded transition ${
                isUser && editIndex === null
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {editIndex !== null ? "Update Inspection" : "Add Inspection"}
            </button>
          </form>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-2">No</th>
                  <th className="border p-2">Vehicle</th>
                  <th className="border p-2">Driver </th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Expiry Date</th>
                  <th className="border p-2">Remarks</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {kirData.map((item, index) => {
                  const status = getStatus(item.masaBerlaku);

                  const badgeColor =
                    status === "Active"
                      ? "bg-green-100 text-green-700"
                      : status === "Expiring Soon"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700";

                  return (
                    <tr
                      key={index}
                      className="text-center border-t hover:bg-gray-50"
                    >
                      <td className="border p-2">{index + 1}</td>
                      <td className="border p-2">{item.nopol}</td>
                      <td className="border p-2">{item.nama}</td>
                      <td className="border p-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeColor}`}
                        >
                          {status}
                        </span>
                      </td>
                      <td className="border p-2">{item.masaBerlaku}</td>
                      <td className="border p-2">{item.catatan}</td>
                      <td className="border p-2 space-x-2">
                        <button
                          onClick={() => handleEdit(index)}
                          className="bg-yellow-400 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>

                        {!isUser && (
                          <button
                            onClick={() => handleDelete(index)}
                            className="bg-red-500 text-white px-3 py-1 rounded"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default DataKIR;
