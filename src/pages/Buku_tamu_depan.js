import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import BukuTamu from "../features/bukuTamu";
import { setPageTitle } from "../features/common/headerSlice";
import FormBukuTamu from "../features/user/FormBukuTamu";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Form Add Buku Tamu" }));
  }, []);
  return <FormBukuTamu />;
}

export default InternalPage;
