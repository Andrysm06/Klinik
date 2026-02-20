import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faBars,
  faTimes,
  faBox,
  faArrowDown,
  faArrowUp,
  faSignOutAlt,
  faHome,
  faHistory,
  faCarSide,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../public/Image/LgHBP3.png";

const Navbar = () => {
  const role = localStorage.getItem("role");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [logoutSuccess, setLogoutSuccess] = useState(false);

  const location = useLocation();

  // ===== Dynamic Page Title =====
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/Beranda":
        return "Dashboard";
      case "/DataSparepat":
        return "Spare Parts Stock";
      case "/DataMasuk":
        return "Incoming Stock";
      case "/DataKeluar":
        return "Outgoing Stock";
      case "/RiwayatDataTransaksi":
        return "Transaction History";
      case "/KIR":
        return "Vehicle Inspection (KIR)";
      default:
        return "";
    }
  };

  // ===== Hide Navbar On Scroll =====
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // ===== FIXED Notification Logic =====
  useEffect(() => {
    const generateNotifications = () => {
      const today = new Date().toISOString().split("T")[0];

      const barangMasuk = JSON.parse(
        localStorage.getItem("barangMasuk") || "[]"
      );
      const barangKeluar = JSON.parse(
        localStorage.getItem("barangKeluar") || "[]"
      );
      const stok = JSON.parse(localStorage.getItem("stokData") || "[]");

      const notifList = [];

      // Incoming Today
      const incomingToday = barangMasuk.filter(
        (item) => item.tanggal === today
      );

      if (incomingToday.length > 0) {
        notifList.push(`📥 ${incomingToday.length} incoming item(s) today`);
      }

      // Outgoing Today
      const outgoingToday = barangKeluar.filter(
        (item) => item.tanggal === today
      );

      if (outgoingToday.length > 0) {
        notifList.push(`📤 ${outgoingToday.length} outgoing item(s) today`);
      }

      // Low Stock
      stok.forEach((item) => {
        if (Number(item.qty) <= 3) {
          notifList.push(`⚠️ ${item.nama} stock is low (${item.qty} left)`);
        }
      });

      setNotifications(notifList);
    };

    generateNotifications();

    const interval = setInterval(generateNotifications, 3000);

    return () => clearInterval(interval);
  }, []);

  const menuItemClass = (path) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${
      location.pathname === path
        ? "bg-red-100 text-red-600 font-medium shadow-sm"
        : "text-gray-700 hover:bg-red-50 hover:text-red-600"
    }`;

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogoutConfirm = () => {
    localStorage.removeItem("login"); // hapus token login
    setShowLogoutConfirm(false);
    setLogoutSuccess(true);

    setTimeout(() => {
      navigate("/");
    }, 1200);
  };
  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          showNavbar
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="bg-white/70 backdrop-blur-xl border-b border-gray-200 shadow-sm">
          <div className="w-full px-6 h-16 flex items-center justify-between">
            {/* LEFT */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-lg hover:bg-red-50 transition"
              >
                <FontAwesomeIcon
                  icon={faBars}
                  className="text-red-700 text-xl"
                />
              </button>

              <Link to="/Beranda" className="flex items-center gap-3 group">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-9 h-9 object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <span className="hidden md:block text-gray-800 text-sm font-semibold">
                  PT. Harapan Baru Perakasa
                </span>
              </Link>

              <div className="hidden md:block h-6 w-px bg-gray-300"></div>

              <span className="hidden md:block text-sm font-medium text-gray-600">
                {getPageTitle()}
              </span>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-5 relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2 rounded-lg hover:bg-yellow-50 transition"
              >
                <FontAwesomeIcon
                  icon={faBell}
                  className="text-red-700 text-lg"
                />

                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] px-1.5 rounded-full">
                    {notifications.length}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {isNotificationOpen && (
                <div className="absolute right-0 top-12 w-72 bg-white shadow-xl rounded-xl p-4 space-y-2 z-50">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Notifications
                  </h3>

                  {notifications.length === 0 ? (
                    <p className="text-xs text-gray-500">No notifications</p>
                  ) : (
                    notifications.map((notif, index) => (
                      <div
                        key={index}
                        className="text-xs bg-gray-50 p-2 rounded-lg"
                      >
                        {notif}
                      </div>
                    ))
                  )}
                </div>
              )}

              <div className="relative">
                <div
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-red-50 transition cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    className="text-red-700 text-2xl"
                  />
                  <span className="hidden md:block text-sm text-gray-600">
                    Hi,{" "}
                    <span className="font-semibold text-gray-800">
                      {role === "admin" ? "Admin" : "User"}
                    </span>
                  </span>
                </div>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl p-5 z-50 transition-all duration-300 ease-out animate-fadeIn">
                    {/* HEADER */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="relative">
                        <FontAwesomeIcon
                          icon={faUserCircle}
                          className="text-red-600 text-4xl"
                        />
                        <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-base">
                          {role === "admin" ? "Administrator" : "Standard User"}
                        </p>

                        <p className="text-xs text-gray-500">
                          {role === "admin"
                            ? "Full System Access"
                            : "View Only Access"}
                        </p>
                      </div>
                    </div>

                    {/* DESCRIPTION */}
                    <div className="text-sm text-gray-600 space-y-2 leading-relaxed">
                      {role === "admin" ? (
                        <>
                          <p>👋 Welcome back, Administrator.</p>
                          <p>
                            You have full control over the system including
                            managing spare parts inventory, updating stock
                            transactions, reviewing history records, and
                            maintaining vehicle inspection (KIR) data.
                          </p>
                          <p>
                            Please ensure all operational data remains accurate
                            and properly maintained.
                          </p>
                        </>
                      ) : (
                        <>
                          <p>👋 Welcome, User.</p>
                          <p>
                            You are logged in with limited access permissions.
                            You may view spare parts inventory, transaction
                            records, and vehicle inspection data.
                          </p>
                          <p>
                            Editing, deleting, or modifying system data is
                            restricted to administrators only.
                          </p>
                        </>
                      )}
                    </div>

                    {/* BUTTON */}
                    <div className="mt-5 border-t pt-4">
                      <button
                        onClick={() => setShowLogoutConfirm(true)}
                        className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl text-sm transition-all duration-200 w-full"
                      >
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* OVERLAY */}
      {(isSidebarOpen || isNotificationOpen || isProfileOpen) && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={() => {
            setIsSidebarOpen(false);
            setIsNotificationOpen(false);
            setIsProfileOpen(false);
          }}
        ></div>
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-red-100">
          <div className="flex items-center justify-center w-full">
            <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
          </div>

          <FontAwesomeIcon
            icon={faTimes}
            onClick={() => setIsSidebarOpen(false)}
            className="absolute right-5 text-red-400 cursor-pointer hover:text-red-600 transition"
          />
        </div>

        <div className="p-4 space-y-2">
          <Link to="/Beranda" className={menuItemClass("/Beranda")}>
            <FontAwesomeIcon icon={faHome} /> Dashboard
          </Link>

          <Link to="/DataSparepat" className={menuItemClass("/DataSparepat")}>
            <FontAwesomeIcon icon={faBox} /> Spare Parts Stock
          </Link>

          <Link to="/DataMasuk" className={menuItemClass("/DataMasuk")}>
            <FontAwesomeIcon icon={faArrowDown} /> Incoming Stock
          </Link>

          <Link to="/DataKeluar" className={menuItemClass("/DataKeluar")}>
            <FontAwesomeIcon icon={faArrowUp} /> Outgoing Stock
          </Link>

          <Link
            to="/RiwayatDataTransaksi"
            className={menuItemClass("/RiwayatDataTransaksi")}
          >
            <FontAwesomeIcon icon={faHistory} /> Transaction History
          </Link>

          <Link to="/KIR" className={menuItemClass("/KIR")}>
            <FontAwesomeIcon icon={faCarSide} /> Vehicle Inspection (KIR)
          </Link>

          <div className="pt-8">
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white py-2.5 rounded-xl text-sm font-medium shadow-md transition duration-200 w-full"
            >
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="h-16"></div>
      {/* LOGOUT CONFIRM MODAL */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-80 text-center animate-fadeIn">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Confirm Logout
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to logout?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm"
              >
                No
              </button>

              <button
                onClick={handleLogoutConfirm}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      {logoutSuccess && (
        <div className="fixed top-20 right-6 bg-green-500 text-white px-5 py-3 rounded-xl shadow-xl text-sm z-[999] animate-fadeIn">
          Logout Successful ✅
        </div>
      )}
    </>
  );
};

export default Navbar;
