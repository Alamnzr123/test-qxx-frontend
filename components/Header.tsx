'use client'

import React from "react";
import SearchList from "../components/SearchList";
export default function Index({ onSearch } : any) {
  return (
    <>
    <SearchList onSearch={onSearch} />
    </>
  );
}
