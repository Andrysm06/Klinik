import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-white/10 backdrop-blur-2xl border-t border-white/20 shadow-xl p-6">
      <div className="container mx-auto text-center text-gray-700">
        <div className="flex justify-center space-x-6 mb-4">


        </div>

        <div className="text-sm">&copy; 2026 PT.Harapan Baru Perakasa. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
