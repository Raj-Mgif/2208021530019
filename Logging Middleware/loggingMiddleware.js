import axios from 'axios';

export const log = async (level, pkg, message) => {
  const timestamp = new Date().toISOString();
  const logData = {
    timestamp,
    level,
    package: pkg,
    message,
  };

  // 1. Print to console
  console.log(`${timestamp} ${level} ${pkg} ${message}`);

  // 2. Send to test server
  try {
    await axios.post('http://20.244.56.144/evaluation-service/logs', logData);
  } catch (error) {
    console.error("Failed to send log to server:", error.message);
  }
};