class Torrent {
    #_webTransport;
    #_datagramWriter;
    #_datagramReader;
    constructor(url){
       this.initTransport(url).then(() => {
        console.log(this.#_webTransport);
       });
    }

    async initTransport(url) {
        // Initialize transport connection
        this.#_webTransport = new WebTransport(url);
        
        // The connection can be used once ready fulfills
        await this.#_webTransport.ready;
        this.#_datagramWriter = this.#_webTransport.datagrams.writable.getWriter();
        this.#_datagramReader = this.#_webTransport.datagrams.readable.getReader();
        return transport;
    }

    async  receiveUnidirectional() {
        const uds = this.#_webTransport.incomingUnidirectionalStreams;
        const reader = uds.getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          // value is an instance of WebTransportReceiveStream
          await this.readData(value);
        }
      }
      
      async  readData(receiveStream) {
        const reader = receiveStream.getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          // value is a Uint8Array
          console.log(value);
        }
      }
      
    
    writeData(data) {
        this.#_datagramWriter.write(data);
    }
}