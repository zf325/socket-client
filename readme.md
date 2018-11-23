# Socket-client

node 实现与其他语言完成 TCP 通信的方案。
1. Bytes 模块：提供各类型数据与二进制数据互转的方法，提供了二进制协议自定义的能力，有效扩展 RPC 的通用性；

2. Packet 模块：完成对 TCP 包的封包和拆包实现；

3. client 模块： 完成 NodeJS socket 客户端连接的实现。

## 1. bytes

 ### 1.1 decode

将二进制数据转换成对应的类型数据，支持链式调用。

1. format () 

    返回解析出来的数据。如果使用链式调用，最后使用该方法，则会按照之前格式化的数据顺序，放置在数组进行返回。

2. getInt8()

    将 1 个字节的二进制数据转化成 char 类型。
    
    返回 Bytes 对象。

3. getUInt8()

    将 1 个字节的二进制数据转化成 unsigned char 类型。

    返回 Bytes 对象。

4. getUInt16()

    将 2 个字节的二进制数据转化成 short 类型。

    返回 Bytes 对象。

5. getInt16()

    将 2 个字节的二进制数据转化成 unsigned short 类型。

    返回 Bytes 对象。

6. getUInt32()

    将 4 个字节的二进制数据转化成 int 类型。

    返回 Bytes 对象。

7. getInt32()

    将 4 个字节的二进制数据转化成 unsigned int 类型。

    返回 Bytes 对象。

8. getUInt64()

    将 8 个字节的二进制数据转化成 long int 类型。
    返回 Bytes 对象。

9. getInt64()

    将 8 个字节的二进制数据转化成 unsigned long int 类型。

    返回 Bytes 对象。

10. getFloat()

    将 4 个字节的二进制数据转化成 float 类型。

    返回 Bytes 对象。

11. getDouble()

    将 8 个字节的二进制数据转化成 double 类型。

    返回 Bytes 对象。


 ### 1.2 encode 

 1. toBytes()
    
    将对应类型的数据转成二进制数组。

 2. setInt8()

    将 char 类型 转成 1 个字节的二进制数据。
    
    返回 Bytes 对象。

 3. setUInt8()

    将 unsigned char 类型 转成 1 个字节的二进制数据。

    返回 Bytes 对象。

 4. setUInt16()

    将 unsigned short 类型 转成 2 个字节的二进制数据。

    返回 Bytes 对象。

 5. setInt16()

    将 short 类型 转成 2 个字节的二进制数据。

    返回 Bytes 对象。

 6. setUInt32()

    将 unsigned int 类型 转成 4 个字节的二进制数据。

    返回 Bytes 对象。

 7. setInt32()

    将 int 类型 转成 4 个字节的二进制数据。

    返回 Bytes 对象。

 8. setUInt64()

   将 unsigned long int 类型 转成 8 个字节的二进制数据。

    返回 Bytes 对象。

 9. setInt64()

    将 long int 类型 转成 8 个字节的二进制数据。

    返回 Bytes 对象。

 10. setFloat()

    将 float 类型 转成 4 个字节的二进制数据。

    返回 Bytes 对象。

 11. setDouble()

     将 double 类型 转成 8 个字节的二进制数据。

    返回 Bytes 对象。