import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import BukuTamu from "../features/bukuTamu";
import { setPageTitle } from "../features/common/headerSlice";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Buku Tamu" }));
  }, []);
  return <BukuTamu />;
}

export default InternalPage;
