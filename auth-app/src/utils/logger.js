const logToTerminal = (type, ...args) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${type}]`, ...args);
  };
  
  export const logger = {
    info: (...args) => logToTerminal('INFO', ...args),
    error: (...args) => logToTerminal('ERROR', ...args),
    warn: (...args) => logToTerminal('WARN', ...args),
    debug: (...args) => logToTerminal('DEBUG', ...args),
  };