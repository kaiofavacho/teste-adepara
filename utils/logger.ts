class Logger {
    private logs: string[];

    constructor() {
        this.logs = [];
    }

    log(message: string): void {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] ${message}`;
        this.logs.push(logMessage);
        console.log(logMessage);
    }

    getLogs(): string[] {
        return this.logs;
    }
}

const logger = new Logger();
export default logger;
