"use strict";
const expect = require("expect");
const Byte = require("./../core/bytes");

describe("convert from bytes by LE ",()=>{

     const buf = [0x03, 0xfe, 0x48, 0x09, 0xb8, 0xf6, 0x6c, 0xc2, 
          0x0e, 0x00, 0x94, 0x3d, 0xf1, 0xff, 0x77, 0xbe, 0x9f, 
          0x1a, 0x2f, 0xdd, 0x5e, 0x40, 0xea, 0x08, 0x05, 0x47];

     it(`bytes should covert to be [3,-2,2376,-2376,967276,-967276,123.456,34056.9140625]`,()=>{
               expect(
                    new Byte(buf)
                    .getUInt8()
                    .getInt8()
                    .getUInt16()
                    .getInt16()
                    .getUInt32()
                    .getInt32()
                    .getDouble()
                    .getFloat()
                    .format()
               ).toEqual([3,-2,2376,-2376,967276,-967276,123.456,34056.9140625]);
            });

     it("bytes [0] should return 0",()=>{
          expect(new Byte([0]).getInt8().format()).toEqual(0);
     });

     it("bytes to be (uint64) 46744073709551616 and (uint64) -2294967296",()=>{
          expect(
               new Byte([0x00, 0x00, 0xd0, 0xc4, 0x7c, 0x11, 0xa6, 0x00, 0x00, 0x94, 0x35, 0x77, 0xff, 0xff, 0xff, 0xff])
               .getUInt64()
               .getInt64()
               .format()
          ).toEqual(["46744073709551616","-2294967296"]);
     });

    

});


describe("convert to be bytes by LE ",()=>{

     it("covert some data to bytes",()=>{
          expect(
               new Byte().setUInt8(3)
                         .setInt8(-2)
                         .setUInt16(2376)
                         .setInt16(-2376)
                         .setUInt32(967276)
                         .setInt32(-967276)
                         .setDouble(123.456)
                         .setFloat(34056.9140625)
                         .toBytes()
               ).toEqual(Buffer.from([0x03, 0xfe, 0x48, 0x09, 0xb8, 0xf6, 0x6c, 0xc2, 0x0e, 0x00, 0x94,
                    0x3d, 0xf1, 0xff, 0x77, 0xbe, 0x9f, 0x1a, 0x2f, 0xdd, 0x5e, 0x40,
                    0xea, 0x08, 0x05, 0x47]));
     });

     it("0 should return [0]",()=>{
          expect(new Byte().setInt8(0).toBytes()).toEqual(Buffer.from([0]));
     });

     it("(uint64) 46744073709551616 and (uint64) -2294967296 convert to bytes",()=>{
          expect(new Byte().setUInt64("46744073709551616")
          .setInt64("-2294967296").toBytes()).
          toEqual(Buffer.from([0x00, 0x00, 0xd0, 0xc4, 0x7c, 0x11, 0xa6, 0x00, 0x00, 0x94, 0x35, 0x77, 0xff, 0xff, 0xff, 0xff]));
     });

});


describe("convert from bytes by BE ",()=>{

     const buf = [0x03, 0xfe, 0x09, 0x48, 0xf6, 0xb8,
           0x00, 0x0e, 0xc2, 0x6c, 0xff, 0xf1, 0x3d, 0x94,
           0x40, 0x5e, 0xdd, 0x2f, 0x1a, 0x9f, 0xbe, 0x77,
           0x47, 0x05, 0x08, 0xea];

     it(`bytes should covert to be [3,-2,2376,-2376,967276,-967276,123.456,34056.9140625]`,()=>{
               expect(
                    new Byte(buf,"BE")
                    .getUInt8()
                    .getInt8()
                    .getUInt16()
                    .getInt16()
                    .getUInt32()
                    .getInt32()
                    .getDouble()
                    .getFloat()
                    .format()
               ).toEqual([3,-2,2376,-2376,967276,-967276,123.456,34056.9140625]);
            });

     it("bytes [0] should return 0",()=>{
          expect(new Byte([0,0],"BE").getInt16().format()).toEqual(0);
     });

     it("bytes to be (uint64) 46744073709551616 and (uint64) -2294967296",()=>{
          expect(
               new Byte([
                    0x00, 0xa6, 0x11, 0x7c, 0xc4, 0xd0, 0x00, 0x00, 
                    0xff, 0xff, 0xff, 0xff, 0x77, 0x35, 0x94, 0x00, 
                    ],"BE")
               .getUInt64()
               .getInt64()
               .format()
          ).toEqual(["46744073709551616","-2294967296"]);
     });

    

});


describe("convert to be bytes by BE ",()=>{

     it("covert some data to bytes",()=>{
          expect(
               new Byte(undefined,"BE").setUInt8(3)
                         .setInt8(-2)
                         .setUInt16(2376)
                         .setInt16(-2376)
                         .setUInt32(967276)
                         .setInt32(-967276)
                         .setDouble(123.456)
                         .setFloat(34056.9140625)
                         .toBytes()
               ).toEqual(Buffer.from([0x03, 0xfe, 0x09, 0x48, 0xf6, 0xb8,
                    0x00, 0x0e, 0xc2, 0x6c, 0xff, 0xf1, 0x3d, 0x94,
                    0x40, 0x5e, 0xdd, 0x2f, 0x1a, 0x9f, 0xbe, 0x77,
                    0x47, 0x05, 0x08, 0xea]));
     });

     it("0 should return [0]",()=>{
          expect(new Byte().setInt8(0).toBytes()).toEqual(Buffer.from([0]));
     });

     it("(uint64) 46744073709551616 and (uint64) -2294967296 convert to bytes",()=>{
          expect(new Byte().setUInt64("46744073709551616")
          .setInt64("-2294967296").toBytes()).
          toEqual(Buffer.from([0x00, 0x00, 0xd0, 0xc4, 0x7c, 0x11, 0xa6, 0x00, 0x00, 0x94, 0x35, 0x77, 0xff, 0xff, 0xff, 0xff]));
     });

});

describe("#Byte",()=>{
     describe("#skip()",()=>{
          it("setInt8(2).skip().setInt16(12) should return [2,0,12]",()=>{
               expect(new Byte().setInt8(2).skip().setInt16(12).toBytes())
                    .toEqual(Buffer.from([2,0,12,0]));
          });
     });
});

