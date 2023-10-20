import React, { useState } from "react";

import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import SettingsSidebar from "../../partials/settings/SettingsSidebar";
import AccountPanel from "../../partials/settings/AccountPanel";
import PulseLoader from "../../components/PulseLoader/PulseLoader";
import ModalBasic from "../../components/ModalBasic";
function Account() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden">


      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="mb-8">
              {/* Title */}
              <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                Account Settings ✨
              </h1>
            </div>

            {/* Content */}
            <div className="bg-white shadow-lg rounded-sm mb-8">
              <div className="flex flex-col md:flex-row md:-mr-px">
                <AccountPanel />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Account;
