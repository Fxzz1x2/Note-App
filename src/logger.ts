class Logger {
  private static instance: Logger;

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  log(message: string): void {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
  }

  error(message: string, error?: Error): void {
    if (error) {
      console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error);
    } else {
      console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
    }
  }
}

export default Logger;
