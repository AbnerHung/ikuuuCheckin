const axios = require("axios");

const NAME = process.env.NAME;
const SENDKEY = process.env.SENDKEY;

axios.defaults.headers.common.cookie = process.env.COOKIE;

const checkIn = async () => {
    return axios({
        method: 'post',
        url: 'https://'+NAME+'/user/checkin'
    })
}

const server = (status, msg) => {
    return axios({
        method: 'get',
        url: 'https://sctapi.ftqq.com/${SENDKEY}.send',
        params: {
            title: '状态：${status}',
            desp: '${msg}'
        }
    })
}

const ikuuuCheckin = async () => {
    const checkinData = (await checkIn())?.data;
    const status = checkinData.ret
    const msg = checkinData.msg
    console.log(status, msg);
    if (SCKEY) {
        server(status, msg);
    }
}

ikuuuCheckin();
