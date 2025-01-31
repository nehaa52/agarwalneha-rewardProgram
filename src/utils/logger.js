import { useState } from 'react';

export const useLogger = () => {
  const [logs, setLogs] = useState([]);

  const logger = {
    info: (message) => {
      setLogs((prevLogs) => [...prevLogs, `INFO: ${message}`]);
    },
    error: (message) => {
      setLogs((prevLogs) => [...prevLogs, `ERROR: ${message}`]);
    },
  };

  return { logs, logger };
};
