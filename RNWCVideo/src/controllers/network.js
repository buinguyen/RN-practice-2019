import React from 'react';
import Log from '../common/Log'

var tag = 'Network: '

export default class Network {

    static fetchUrl(url, callback) {
        Log.log(tag, "Start...............................")
        
        fetch(url)
        .then((resp)=>{ 
            return resp.text() 
        })
        .then((text)=>{
            callback(text)
        })
        .catch((error)=>{
            Log.log(tag, "Error = " + error)
        })
    }

    static fetchUrlMore(url, more, callback) {
        Log.log(tag, "Start...............................")
        
        fetch(url, {
            method: 'POST',
            
            data: {
                category_id : 110,
                page : 10
            },
            dataType: 'html'
        })
        .then((resp)=>{ 
            return resp.text()
        })
        .then((text)=>{
            callback(text)
        })
        .catch((error)=>{
            Log.log(tag, "Error = " + error)
        })
    }
}