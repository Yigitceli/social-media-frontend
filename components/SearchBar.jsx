import axios from "axios";
import React, { useMemo } from "react";
import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useDispatch } from "react-redux";
import { searchPin } from "../redux/pinsSlice";
import debounce from "lodash.debounce";
import { useEffect } from "react";

export default function SearchBar() {  
  const dispatch = useDispatch();

  const handleChange = debounce((e) => {
    dispatch(searchPin(e.target.value));
  }, 300);

  return (
    <form className="flex bg-white items-center gap-2 px-3 py-3 rounded-lg w-full">
      <IoMdSearch fontSize={21} />
      <input        
        onChange={handleChange}
        type={"text"}
        placeholder="Search"
        className="outline-none w-full"
      />
    </form>
  );
}
