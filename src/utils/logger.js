import { useState } from 'react';

export const useLogger = () => {
  const [logs, setLogs] = useState([]);

  const logger = {
    info: (message) => {
      const logMessage = `INFO : ${message}`;
      setLogs((prevLogs) => [...prevLogs, logMessage]);
      console.log(logMessage);
    },
    error: (message) => {
      const errorMessage = `ERROR: ${message}`;
      setLogs((prevLogs) => [...prevLogs, errorMessage]);
      console.error(errorMessage);
    },
  };

  return { logs, logger };
};
