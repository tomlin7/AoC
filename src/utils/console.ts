type ConsoleMethod = 'log' | 'error' | 'warn' | 'info';

export class ConsoleCapture {
  private output: string[] = [];
  private originalConsole: Record<ConsoleMethod, typeof console.log>;

  constructor() {
    this.originalConsole = {
      log: console.log,
      error: console.error,
      warn: console.warn,
      info: console.info
    };
  }

  start() {
    this.output = [];
    
    const methods: ConsoleMethod[] = ['log', 'error', 'warn', 'info'];
    methods.forEach(method => {
      console[method] = (...args: any[]) => {
        this.output.push(args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' '));
        this.originalConsole[method](...args);
      };
    });
  }

  stop() {
    Object.entries(this.originalConsole).forEach(([method, fn]) => {
      console[method] = fn;
    });
  }

  getOutput() {
    return this.output;
  }

  clear() {
    this.output = [];
  }
}