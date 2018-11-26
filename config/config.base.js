"use strict";
const merge = require("merge");
const devConfig = require("./config.dev");
const testConfig = require("./config.test");
const prodConfig = require("./config.prod");


const baseConfig = {

    logPath:"./log"

};

module.exports = function(){

    if(process.env.NODE_ENV == "devlopment" || process.env.NODE_ENV == "dev"){

        return merge(baseConfig,devConfig);

    }else if(process.env.NODE_ENV == "test"){

        return merge(baseConfig,testConfig);

    }else{

        return merge(baseConfig,prodConfig);
    }

}
