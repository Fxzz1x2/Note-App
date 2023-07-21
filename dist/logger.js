class Logger {
    constructor() { }
    static getInstance() {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    log(message) {
        console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
    }
    error(message, error) {
        if (error) {
            console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error);
        }
        else {
            console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
        }
    }
}
export default Logger;
//# sourceMappingURL=logger.js.map