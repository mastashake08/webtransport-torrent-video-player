class Torrent {
    #_webTransport;
    #_datagramWriter;
    #_datagramReader;
    #_mediaSource;
    #_sourceBuffer;
    constructor(url, mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'){
       this.initTransport(url).then(() => {
        console.log(this.#_webTransport);
        this.#_mediaSource = new MediaSource();
        this.#_sourceBuffer = this.#_mediaSource.addSourceBuffer(mimeCodec);    
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
          this.#_sourceBuffer.appendBuffer(value);
        }
      }
      
    
    writeData(data) {
        this.#_sourceBuffer.addEventListener("updateend", () => {
            this.#_mediaSource.endOfStream();
            console.log(mediaSource.activeSourceBuffers);
            
            console.log(mediaSource.readyState); // ended
            });
        this.#_datagramWriter.write(data);
    }
}