"use strict";
const Long = require("long");

class Bytes{

    constructor(arg,endian = "LE"){

        if( arg instanceof Buffer ||  arg instanceof Array){
            this._readBuffer = Buffer.from(arg);
        }else {

            if(typeof arg == "number"){
                this._writeBuffer = Buffer.alloc(arg);
            }

            this._writeBuffer = typeof arg == "number" ? Buffer.alloc(arg) : Buffer.alloc(1024);

        }
        //position
        this._readPosition = 0;
        this._writePosition = 0;
        this._valMemery = [];//decode data memery
        //end order
        this._littleEndian = endian == "BE" ? false : true;

    }

    getInt8(){

        if(this._readBuffer.length - this._readPosition < 1){
            throw new Error("bytes remained not enough to read");
        }

        let val = this._readBuffer.readInt8(this._readPosition);
        this._readPosition ++;
        this._valMemery.push(val);
        return this;
    }

    getUInt8(){

        if(this._readBuffer.length - this._readPosition < 1){
            throw new Error("bytes remained not enough to read");
        }

        let val = this._readBuffer.readUInt8(this._readPosition);
        this._readPosition ++;
        this._valMemery.push(val);
        return this;
    }

    getUInt16(){

        if(this._readBuffer.length - this._readPosition < 2){
            throw new Error("bytes remained not enough to read");
        }

        let val = this._littleEndian ? this._readBuffer.readUInt16LE(this._readPosition)
            : this._readBuffer.readUInt16BE(this._readPosition);
        this._readPosition += 2;
        this._valMemery.push(val);
        return this;
    }

    getInt16(){
        if(this._readBuffer.length - this._readPosition < 2){
            throw new Error("bytes remained not enough to read");
        }

        let val = this._littleEndian ? this._readBuffer.readInt16LE(this._readPosition)
            : this._readBuffer.readInt16BE(this._readPosition);
        this._readPosition += 2;
        this._valMemery.push(val);
        return this;
    }

    getUInt32(){
     
        if(this._readBuffer.length - this._readPosition < 4){
            throw new Error("bytes remained not enough to read");
        }
        let val = this._littleEndian ? this._readBuffer.readUInt32LE(this._readPosition)
            : this._readBuffer.readUInt32BE(this._readPosition);
        this._readPosition += 4;
        this._valMemery.push(val);
        return this;
    }

    getInt32(){

        if(this._readBuffer.length - this._readPosition < 4){
            throw new Error("bytes remained not enough to read");
        }

        let val = this._littleEndian ? this._readBuffer.readInt32LE(this._readPosition)
            : this._readBuffer.readInt32BE(this._readPosition);
        this._readPosition += 4;
        this._valMemery.push(val);
        return this;
    }

    getUInt64(){

        if(this._readBuffer.length - this._readPosition < 8 ){
            throw new Error("bytes remained not enough to read");
        }

        const longBytes = this._readBuffer.slice(this._readPosition,this._readPosition + 8);

        let val = this._littleEndian ? Long.fromBytesLE(longBytes,true)
            : Long.fromBytesBE(longBytes,true);

        this._readPosition += 8;
        this._valMemery.push(val.toString());
        return this;
    }

    getInt64(){

        if(this._readBuffer.length - this._readPosition < 8 ){
            throw new Error("bytes remained not enough to read");
        }

        const longBytes = this._readBuffer.slice(this._readPosition,this._readPosition + 8);

        let val = this._littleEndian ? Long.fromBytesLE(longBytes,false)
            : Long.fromBytesBE(longBytes,false);

        this._readPosition += 8;
        this._valMemery.push(val.toString());
        return this;
    }

    getFloat(){

        if(this._readBuffer.length - this._readPosition < 4 ){
            throw new Error("bytes remained not enough to read");
        }

        let val = this._littleEndian ? this._readBuffer.readFloatLE(this._readPosition)
            : this._readBuffer.readFloatBE(this._readPosition);
        this._readPosition += 4;
        this._valMemery.push(val);

        return this;

    }

    getDouble(){

        if(this._readBuffer.length - this._readPosition < 8 ){
            throw new Error("bytes remained not enough to read");
        }

        let val = this._littleEndian ? this._readBuffer.readDoubleLE(this._readPosition)
            : this._readBuffer.readDoubleBE(this._readPosition);
        this._readPosition += 8;
        this._valMemery.push(val);
        return this;

    }

    format(){

        if(!this._valMemery || this._valMemery.length < 1 ){
            throw new Error("memery no data,format failed.");
        }

        if(this._valMemery.length == 1){

            let val = this._valMemery[0];
            this._valMemery = [];
            return val;

        }else if(this._valMemery.length > 1){

            let val = this._valMemery.splice(0);
            this._valMemery = [];
            return val;
        }

        return null;
    }

    checkWriteBufferOverflow(){

        if(this._writeBuffer.length - this._writePosition < 8){
            let buf = Buffer.alloc(1024);
            this._writeBuffer = this._writeBuffer.splice(this._writeBuffer.length , 0 , ...buf);
        }

    }

    skip(length){

        this.checkWriteBufferOverflow();
        this._writePosition += length;

    }

    
    setUInt8(val){

        this.checkWriteBufferOverflow();
        this._writeBuffer.writeUInt8(val,this._writePosition);
        this._writePosition ++;

        return this;

    }

    setInt8(val){

        this.checkWriteBufferOverflow();
        this._writeBuffer.writeInt8(val,this._writePosition);
        this._writePosition ++;

        return this;

    }

    setUInt16(val){
        this.checkWriteBufferOverflow();
        this._littleEndian ? this._writeBuffer.writeUInt16LE(val,this._writePosition)
            : this._readBuffer.writeUInt16BE(this._writePosition);
        this._writePosition += 2;
        return this;
    }

    setInt16(val){
        this.checkWriteBufferOverflow();
        this._littleEndian ? this._writeBuffer.writeInt16LE(val,this._writePosition)
            : this._readBuffer.writeInt16BE(this._writePosition);
        this._writePosition += 2;
        return this;
    }

    setUInt32(val){
        this.checkWriteBufferOverflow();
        this._littleEndian ? this._writeBuffer.writeUInt32LE(val,this._writePosition)
            : this._readBuffer.writeUInt32BE(this._writePosition);
        this._writePosition += 4;
        return this;
    }

    setInt32(val){
        this.checkWriteBufferOverflow();
        this._littleEndian ? this._writeBuffer.writeInt32LE(val,this._writePosition)
            : this._readBuffer.writeInt32BE(this._writePosition);
        this._writePosition += 4;
        return this;
    }

    setUInt64(val){
        this.checkWriteBufferOverflow();

        let unsignedLong = Long.fromValue(val,true);//unsigned long

        let unsignedLongByutes = this._littleEndian ? unsignedLong.toBytesLE()
            : unsignedLong.toBytesBE();
        this._writeBuffer.fill(Buffer.from(unsignedLongByutes),this._writePosition,this._writePosition + 8);

        this._writePosition += 8;
        return this;

    }

    setInt64(val){
        this.checkWriteBufferOverflow();

        let signedLong = Long.fromValue(val,false);//long

        let signedLongByutes = this._littleEndian ? signedLong.toBytesLE()
            : signedLong.toBytesBE();
        this._writeBuffer.fill(Buffer.from(signedLongByutes),this._writePosition,this._writePosition + 8);

        this._writePosition += 8;
        return this;

    }

    setFloat(val){
        this.checkWriteBufferOverflow();
        this._littleEndian ? this._writeBuffer.writeFloatLE(val,this._writePosition)
            : this._readBuffer.writeFloatBE(this._writePosition);
        this._writePosition += 4;
        return this;
    }

    setDouble(val){
        this.checkWriteBufferOverflow();
        this._littleEndian ? this._writeBuffer.writeDoubleLE(val,this._writePosition)
            : this._readBuffer.writeDoubleBE(this._writePosition);
        this._writePosition += 8;
        return this;
    }

    toBytes(){

        if(this._writePosition > 0){

            return this._writeBuffer.slice(0,this._writePosition);
        }else{
            return [];
        }

    }

}

module.exports = Bytes;