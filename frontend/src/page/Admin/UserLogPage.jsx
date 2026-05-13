import React, { useState, useEffect } from 'react';
import useNotif from '../../hooks/useNotif';
import { useUserAuth } from '../../hooks/useUserAuth';

export default function UserLogPage() {
  const [logs, setLogs] = useState([]);
  const { accessToken } = useUserAuth();
  const {userLogUpdate, userLogInfo} = useNotif();

  const formatTimestamp = (iso) => {
    const date = new Date(iso);
    return date.toLocaleString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: 'numeric', minute: '2-digit', hour12: true
    }).replace(',', ' —');
  };

  const fetchUserLog = async () => {
    
  }

  useEffect(() => {
    if(!accessToken) return;

  }, []);

  useEffect(() => {
    if(!userLogInfo) return;
    logs.push({userLogInfo});
  }, [userLogUpdate])

  return (
    <>
      <div className="page-header">
        <h1 className="page-title"><span></span>User Log</h1>
      </div>

      <div className="info-table">
        <table>
          <thead>
            <tr>
              <th>LID</th>
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
              <tr><td colSpan="7" className="empty-row">No activity logs found.</td></tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id}>
                  <td>{log.id}</td>
                  <td>{log.uid}</td>
                  <td>{log.email}</td>
                  <td>{log.role}</td>
                  <td>{formatTimestamp(log.timestamp)}</td>
                  <td>{log.action}</td>
                  <td>
                    <span className={`status ${log.status.toLowerCase()}`}>
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