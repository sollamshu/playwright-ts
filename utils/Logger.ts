/**
 * A simple console logger with timestamps and class context.
 */
export class Logger {
  private context: string;

  constructor(context: string) {
    this.context = context;
  }

  private getTimeStamp(): string {
    return new Date().toISOString();
  }

  private log(level: 'INFO' | 'WARN' | 'ERROR', message: string, ...args: any[]) {
    console.log(`[${this.getTimeStamp()}] [${level}] [${this.context}] ${message}`, ...args);
  }

  info(message: string, ...args: any[]) {
    this.log('INFO', message, ...args);
  }

  warn(message: string, ...args: any[]) {
    this.log('WARN', message, ...args);
  }

  error(message: string, ...args: any[]) {
    this.log('ERROR', message, ...args);
  }
}