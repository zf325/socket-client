# Socket-client

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

 1. 