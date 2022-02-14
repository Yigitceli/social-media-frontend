import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { AiFillCloseCircle } from "react-icons/ai";
import Navbar from "./Navbar";
import Head from "next/head";

export default function ProfilLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex h-screen md:flex-row w-100 flex-col bg-mainColor">
      <Head>
        <link rel="icon" href="%PUBLIC_URL%/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/favicon.png" />

        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato&display=swap"
          rel="stylesheet"
        />
        <title>ShareWith</title>
      </Head>
      <div className="hidden md:block h-screen">
        <Sidebar />
      </div>
      {isOpen && (
        <div className="fixed z-10 w-4/5 bg-white absolute md:hidden block animate-slide-in transition-all duration-200 ease-in-out fixed">
          <AiFillCloseCircle
            onClick={() => setIsOpen(false)}
            className="absolute top-5 right-5 text-3xl cursor-pointer"
          />
          <Sidebar />
        </div>
      )}
      <div className="w-full h-full overflow-y-auto">
        <div className="md:hidden">
          <Navbar setIsOpen={setIsOpen}/>
        </div>
        {children}
      </div>
    </div>
  );
}
