import React from "react";
import { Audio } from "react-loader-spinner";

export default function PageLoading({ message }) {
  return (
    <div className="flex flex-col w-full h-screen items-center justify-start gap-6 p-5">
      <Audio height={50} width={200} color="#00BFFF" ariaLabel="loading" />
      <p className="text-lg text-center px-2">{message}</p>
    </div>
  );
}
