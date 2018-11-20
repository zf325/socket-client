"use strict";

const assert = require("assert");
const expect = require("expect");
const Byte = require("./../core/bytes");

describe("Bytes",()=>{

     it("Get unsigned int8,should return 5",()=>{
          expect(new Byte([ 225 ]).getUInt8().format()).toEqual(225);
     });  
 
     it("Get int8,should return 120",()=>{
          expect(new Byte([ 120]).getInt8().format()).toEqual(120);
     });  


    it("Get unsigned Int32,should return 5",()=>{
          expect(new Byte([ 5, 0 ,0, 0]).getUInt32().format()).toEqual(5);
    });  

    it("Get unsigned Int32, should return [0,8]",()=>{

          expect(new Byte([ 0, 0 ,0, 0, 8, 0, 0, 0]).getUInt32().getInt32().format()).toEqual([0,8]);
     });


});