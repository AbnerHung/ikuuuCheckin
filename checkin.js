const axios = require("axios");
const SCKEY = process.env.SCKEY;
const COOKIE = process.env.COOKIE;
const AUTHORIZATION = process.env.AUTHORIZATION
axios.defaults.headers.common.cookie = process.env.COOKIE;
axios.defaults.headers.common['Authorization'] = 'Bearer ' +  process.env.b2token

const fuck = require('got');
const tunnel = require('tunnel');

let baseUrl='https://www.vikacg.com/'
let step1url='/wp-json/b2/v1/getUserMission'
let step2url='/wp-json/b2/v1/userMission'
let stepArr=[step1url,step2url]


const server = (checkMessage) => {
    return axios({
        method: 'get',
        url: `https://sctapi.ftqq.com/${SCKEY}.send`,
        params: {
            title: `获得${checkMessage}积分`
        }
    })
}

const checkIn = async()=>{
    for(let i=0;i<stepArr.length;i++){
        let url=stepArr[i]
        await fuck.post(`${baseUrl}${url}`,{
            data: {
                authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvd3d3LnZpa2FjZy5jb20iLCJpYXQiOjE2MjgxNTc4MDMsIm5iZiI6MTYyODE1NzgwMywiZXhwIjoxNjYwMjk4NjAzLCJkYXRhIjp7InVzZXIiOnsiaWQiOiIxNTY1NjIifX19.q_8hqKDz6if_BoqdZ5bz_TvzsfxldeK06XuZ5iQ_q2E"
            },
            hooks: {
                beforeRequest: [
                    options => {
                        let obj =
                            [
                                {
                                    "name": "content-length",
                                    "value": "0"
                                },
                                {
                                    "name": "accept",
                                    "value": "application/json, text/plain, */*"
                                },
                                {
                                    "name": "user-agent",
                                    "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.64"
                                },
                                
                                {
                                    "name": "cookie",
                                    "value": COOKIE
                                },
                                {
                                    "name": "sec-ch-ua",
                                    "value": '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"'
                                },
                                {
                                    "name": "origin",
                                    "value": "https://www.vikacg.com"
                                },
                                {
                                    "name": "referer",
                                    "value": "https://www.vikacg.com/mission/today"
                                },
                                {
                                    "name": "sec-ch-ua-mobile",
                                    "value": "?0"
                                },
                                {
                                    "name": "sec-fetch-site",
                                    "value": "same-origin"
                                },
                                {
                                    "name": "sec-fetch-mode",
                                    "value": "cors"
                                },
                                {
                                    "name": "sec-fetch-dest",
                                    "value": "empty"
                                }
                            ]
                        let headerObj = options.headers
                        obj.map(v => headerObj[v.name] = v.value)
                        headerObj['Accept-Charset'] = 'UTF-8'
                        headerObj['Charset'] = 'UTF-8'
                        headerObj['lathesky'] = 'Hello, which is a crawler for automatic check-in.'
                    }
                ]
            }
        }).then(res => {
            //console.log(res);
            let j = eval("(" + res.body + ")");
            console.log("fuck: " + j.mission.credit);
            console.log(res.body);
            if (SCKEY) {
                server(j.mission.credit);
            }
        })
            .catch(err => {
                console.log(err);
            })
    }
}

checkIn();