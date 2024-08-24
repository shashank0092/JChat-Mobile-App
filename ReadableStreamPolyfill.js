class ReadableStream {
    constructor() {
      console.warn('ReadableStream is not supported in this environment.');
    }
  }
  
  global.ReadableStream = global.ReadableStream || ReadableStream;