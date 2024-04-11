const axios = require("axios");

const HOST = process.env.HOST;
const EMAIL = process.env.EMAIL;
const PASSWD = process.env.PASSWD;
const SENDKEY = process.env.SENDKEY;

const loginAndGetCookie = async () => {
    const response = await axios({
        method: 'post',
        url: 'https://'+HOST+'/auth/login',
        data: {
            host: HOST,
            email: EMAIL,
            passwd: PASSWD
        }
    });
    const cookie = response.headers['set-cookie']; // 获取响应中的cookie
    axios.defaults.headers.common.cookie = cookie; // 将获取到的cookie设置为axios的默认header之一
};

const checkIn = async () => {
    return axios({
        method: 'post',
        url: 'https://'+HOST+'/user/checkin'
    })
}

const server = (status, msg) => {
    return axios({
        method: 'get',
        url: 'https://sctapi.ftqq.com/'+SENDKEY+'.send',
        params: {
            title: '状态：'+status,
            desp: '# '+msg
        }
    })
}

const ikuuuCheckin = async () => {
    loginAndGetCookie();
    const checkinData = (await checkIn())?.data;
    const status = checkinData.ret
    const msg = checkinData.msg
    console.log(status, msg);
    if (SENDKEY) {
        server(status, msg);
    }
}

ikuuuCheckin();
