import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { Outlet } from "react-router-dom";
import Spinner from "./Spinner";
import axios from "axios";

const AdminRoute = () => {
  const [status, setStatus] = useState("fail");
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const response = await axios.get("/api/v1/users/admin-dashboard", {
          headers: { Authorization: `Bearer ${auth?.token}` },
        });

        if (response.data.status === "success") {
          setStatus("success");
        } else {
          setStatus("fail");
        }
      } catch (error) {
        setStatus("fail");
      }
    };

    if (auth?.token) {
      authCheck();
    } else {
      setStatus("fail");
    }
  }, [auth?.token]);

  return status === "success" ? <Outlet /> : <Spinner path="" />;
};

export default AdminRoute;
