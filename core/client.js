const Event = require("events").EventEmitter;
const net = require("net");
const Packet = require("./packet");

class Client extends Event{
    constructor(opts){
        super();

        opts = opts||{};
        if(!opts.host || !opts.port){
            throw new Error("the host and port of remote socket server must't empty.")
        }

        // if(!opts.handlePacket || !typeof opts.handlePacket === "Function"){
        //     throw new Error("handlePacket must be function.");
        // }

        this.host = opts.host;
        this.port = opts.port;
        // this.handlePacket = this.handlePacket;
        this.reconnectTime = opts.reconnectTime || 15 *1000;// socket 连接超时时间设置
        this.requestTime = opts.requestTime || 15 * 1000;       // 请求超时时间设置

        this.connnetActive = false;//socket 连接状态
        this.waitingResponse = false;//等待响应
        this.noConnectCount = 0;//连接失败计数器
        this.reconnectTimer = null;//连接超时定时器
        this.requestTimer = null;//请求超时定时器
        this.queue = [];//请求队列

        //create socket connection

        this.connect = net.connect(this.port,this.host);
        let client = this;
        let connect = this.connect;

        this.packetParse = new Packet((pack)=>{
            // packet 预处理
            this.handlePacket(pack);//监听 PackageParse package 生成时调用 
        });

        connect.on("connect",()=>{

            console.log("connected to Game Server");

            this.noConnectCount = 0;//无法连接计数器置0
            this.active = true;//连接成功
            this.clearReconnectTimer();

        });

        connect.on("error",(err)=>{

            this.handleNetworkError(err);

        });

        //socket 接收到数据
        connect.on("data",(data)=>{

            // data packet parser
            this.packetParse.excute(data);

        });

        connect.on("close",()=>{

            this.active = false; //失去连接

            this.reconnectTimer = setTimeout(()=>{
                connection.connect(this.port,this.host);
            },config.reconnectTime);

        });

        client.on("data",(data)=>{

            if(this.queue.length > 0){
                try{
                    let {cb} = this.queue.shift();

                    cb(null,data);

                }catch(e){

                    console.log(e);

                }

                this.waitingResponse = false;
                this.clearRequestTimer();//发送成功，收到响应，清除定时器
                this.flush();//发送下一条数据
                
            }

        });
    }

    handleNetworkError(err){

        this.noConnectCount ++;

        if(this.queue&&this.queue.length > 0){
            //有暂存请求,全部返回网络错误
            this.queue.forEach((row)=>{
                let {req,cb}  = row;
                cb(new Error("lose connect to game server."));
            });
            this.active = false;//失去连接
            this.waitingResponse = false;//未等待响应
            this.clearRequestTimer();//清除请求超时设置定时器
            this.clearReconnectTimer();//清除连接超时定时器
        }

    }

    clearRequestTimer(){
        clearTimeout(this.requestTimer);
        this.requestTimer = null;
    }
    clearReconnectTimer(){
        clearTimeout(this.reconnectTimer);
        this.reconnectTimer = null;
    }

    handlePacket(packet){

        // let dataParser = null;

        // client.emit(packet)
        // if(pack && pack.length > 0){

        //     dataParser = handlePacket(pack);
        // }

        // let readBuffer = new ReadBuffer(Buffer.from(pack));
        // let base = BaseMsg.unPackageMsg(readBuffer);
        // let msgType = GM_C2S_ACTION(base.msgTypeId);
    
        // if(msgType){
        //     //有效消息
        //     this.emit("data",readBuffer);
        // }
    }

     request(req,handleRes){

            if(!this.active){

                return handleRes(new Error("Network Error:connection to remote server losing!")) ;

            }

            this.queue.push({req,cb:handleRes});

            if(!this.waitingResponse){

                this.flush();//空闲，发送下一个请求
            }
    }

    flush(){
        // let pair = this.queue.shift();
        if(this.waitingResponse) return;//上个请求未处理完成，等待

        if(this.queue && this.queue.length > 0){

            //有缓存的请求
            let {req,cb} = this.queue[0];
            
            connect.write(req,(err)=>{
                if(err){

                    cb(err);

                }else{
                    this.waitingResponse = true;//请求发出成功后，设置等待响应状态
                    //设定tcp 请求超时时间
                    this.requestTimer = setTimeout(()=>{
                        cb(new Error("connect to Game Server timeout!"));
                        this.waitingResponse = false;//取消等待状态
                    },this.requestTime);
                }
            });
        }

    }
}

module.exports = Client;


