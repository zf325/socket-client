"use strict";

const Bytes = require("./bytes");

class Packet {

    constructor(callback,opts = {}){

        const {headerLength = 2 ,size = 1024} = opts;

        this._readBuffer = [];
        this._writeBuffer = [];
        this._headerLength = headerLength;// default 2 bytes

        if(callback && typeof callback === "function"){
            this._callback = callback;
        }else{
            throw new Error("constructor first paramster must be function");
        }
    };

    excute(data){
        //put data from socket into _readBuffer
        if(data && data instanceof Array &&  data.length > 0){

            this._readBuffer.splice(this._readBuffer.length , 0 , ...data);//put data from socket into buffer

            if(this._readBuffer > this._headerLength){//buffer data enough to get a packet header
                //get packet length
                let packetLength = new Bytes(this._readBuffer).getUInt16();//return one packet length 
    
                if(this._readBuffer.length > packetLength || this._readBuffer.length > packetLength){
                    //get one packet
                    let packet = this._readBuffer.slice(0,packetLength);
                    this._readBuffer.splice(packetLength);

                    this._callback(packet);
                }
    
            }

        }

    }

}


module.exports = Packet;