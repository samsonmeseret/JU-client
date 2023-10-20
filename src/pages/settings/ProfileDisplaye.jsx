import React, { useState, useEffect } from "react";

import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import SettingsSidebar from "../../partials/settings/SettingsSidebar";
import AccountDisplay from "../../partials/settings/AccountDisplay";
import PulseLoader from "../../components/PulseLoader/PulseLoader";
import ModalBasic from "../../components/ModalBasic";
function Account() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);

  useEffect(() => {}, []);

  //   <div className="flex h-screen overflow-hidden">
  //     {/* Sidebar */}
  //     {/* <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}

  //     {/* Content area */}
  //     <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
  //       {/*  Site header */}
  //       {/* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}

  //       <main>
  //         <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
  //           {/* Page header */}
  //           <div className="mb-8">
  //             {/* Title */}
  //             <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
  //               Account Settings ✨
  //             </h1>
  //           </div>
  //           <ModalBasic
  //             id="basic-modal"
  //             modalOpen={modalOpen}
  //             setModalOpen={setModalOpen}
  //             title="Basic Modal"
  //           >
  //             {/* Modal content */}
  //             <div className="px-5 pt-4 pb-1">
  //               <div className="text-sm">
  //                 <div className="font-medium text-slate-800 mb-2">
  //                   Let’s Talk Paragraph
  //                 </div>
  //                 <div className="space-y-2">
  //                   <p>
  //                     Lorem ipsum dolor sit amet, consectetur adipiscing elit,
  //                     sed do eiusmod tempor incididunt ut labore et dolore magna
  //                     aliqua.
  //                   </p>
  //                   <p>
  //                     Duis aute irure dolor in reprehenderit in voluptate velit
  //                     esse cillum dolore eu fugiat nulla pariatur. Excepteur
  //                     sint occaecat cupidatat non proident, sunt in culpa qui
  //                     officia deserunt mollit anim id est laborum.
  //                   </p>
  //                 </div>
  //               </div>
  //             </div>
  //             {/* Modal footer */}
  //             <div className="px-5 py-4">
  //               <div className="flex flex-wrap justify-end space-x-2">
  //                 <button
  //                   className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
  //                   onClick={(e) => {
  //                     e.stopPropagation();
  //                     setModalOpen(false);
  //                   }}
  //                 >
  //                   Close
  //                 </button>
  //                 <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">
  //                   I Understand
  //                 </button>
  //               </div>
  //             </div>
  //           </ModalBasic>
  //           {/* Content */}
  //           <div className="bg-white shadow-lg rounded-sm mb-8">
  //             <div className="flex flex-col md:flex-row md:-mr-px">
  //               {/* <SettingsSidebar /> */}
  //               {/* <AccountPanel /> */}
  //               {/* <PulseLoader /> */}
  //             </div>
  //           </div>
  //         </div>
  //       </main>
  //     </div>
  //   </div>
  // );
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="mb-8">
              {/* Title */}
              <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                System Users
              </h1>
            </div>

            {/* Content */}
            <div className="bg-white shadow-lg rounded-sm mb-8">
              <div className="flex flex-col md:flex-row md:-mr-px">
                {/* <SettingsSidebar /> */}
                <AccountDisplay />
                {/* <PulseLoader /> */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Account;
