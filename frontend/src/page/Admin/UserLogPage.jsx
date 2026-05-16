import React, { useState, useEffect } from "react";
import { useNotif } from "../../context/NotificationContext";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useToast } from "../../context/ToastContext";

export default function UserLogPage() {
  const [logs, setLogs] = useState([]);
  const { accessToken } = useUserAuth();
  const { showToast } = useToast();
  const { userLogUpdate, userLogInfo } = useNotif();

  const formatTimestamp = (iso) => {
    const date = new Date(iso);
    return date
      .toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .replace(",", " - ");
  };

  const fetchUserLog = async () => {
    try {
      const res = await fetch("/api/admin/getUserLog", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      });

      const result = await res.json();

      if (!result.success) {
        showToast("error", "SSK-TRUCKING", result.messsage);
        return;
      }
      setLogs(result.log);
    } catch (error) {
      console.log("fetchUserLog ERROR: ", error);
    }
  };

  useEffect(() => {
    if (!accessToken) return;
    fetchUserLog();
  }, []);

  useEffect(() => {
    if (!userLogInfo?.UID) return;
    setLogs((prevLogs) => [userLogInfo, ...prevLogs]);
  }, [userLogUpdate]);

  return (
    <>
      <div className="page-header">
        <h1 className="page-title" style={{ color: "yellow" }}>
          <span></span>User Log
        </h1>
      </div>

      <div className="info-table">
        <table>
          <thead>
            <tr>
              <th>UID</th>
              <th>Email</th>
              <th>Role</th>
              <th>Date & Time</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty-row">
                  No activity logs found.
                </td>
              </tr>
            ) : (
              logs.map((log, id) => (
                <tr key={id}>
                  <td>{log.UID}</td>
                  <td>{log.email}</td>
                  <td>{log.role}</td>
                  <td>{log.Created_at == "Today" ? log.Created_at : formatTimestamp(log.Created_at)}</td>
                  <td>{log.action}</td>
                  <td>
                    <span className={`status ${log.status?.toLowerCase()}`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
