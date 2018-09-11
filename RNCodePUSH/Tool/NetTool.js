import React from 'react';

var REQUEST_URL =
  "https://www.apiopen.top/";

export default class NetTool {
    /*
     *  post请求
     *  url:请求地址
     *  params:参数,这里的参数要用这种格式：'key1=value1&key2=value2'
     *  callback:回调函数
     * */
    static  postForm(urlapi,params,sucess,fail){
        let FullUrl = REQUEST_URL + urlapi
        //fetch请求
        fetch(FullUrl,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                sucess(responseJSON)
            })
            .catch((error) => {
                if(fail){
                    fail(error)
                }
            });
    };

    static postJSON(urlapi,params,header,sucess,fail){
        let FullUrl = REQUEST_URL + urlapi
        var dic = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
        if (header){
            for (key in header){
                dic[key] = header[key]
            }
        }
        //fetch请求
        fetch(FullUrl,{
            method: 'POST',
            headers: dic,
            body:JSON.stringify(params)
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                sucess(responseJSON)
            })
            .catch((error) => {
                if(fail){
                    fail(error)
                }
                console.log("error = " + error)
            });
    };

     static get(urlapi,params,sucess,fail){
        var FullUrl = REQUEST_URL + urlapi
        if(params!=null){
            let paramasArray = [];
            Object.keys(params).forEach(key => paramasArray.push(key + '=' + params[key]))
            if(FullUrl.search(/\?/) === -1){
                FullUrl += '?' + paramasArray.join('&')
            }else{
                FullUrl += '&' + paramasArray.join('&')
            }
        }
        fetch(FullUrl,{
            method:'GET'
        }).then(response => response.json()).then(responseJson => {
            sucess(responseJson)
          }).catch((error)=>{
            if(fail){
                fail(error)
            }
        })
    };
    

}

