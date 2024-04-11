const axios = require("axios");

const HOST = process.env.HOST;
const EMAIL = process.env.EMAIL;
const PASSWD = process.env.PASSWD;
const SENDKEY = process.env.SENDKEY;

const login = async () => {
    try {
        const response = await axios.post('https://' + HOST + '/auth/login', {
            host: HOST,
            email:EMAIL,
            passwd: PASSWD
        });
        return response.headers['set-cookie'];
    } catch (error) {
        console.error("Login failed:", error.response.data);
        throw new Error("Login failed");
    }
};

const checkIn = async (cookie) => {
    try {
        const response = await axios.post('https://' + HOST + '/user/checkin', {}, {
            headers: {
                Cookie: cookie
            }
        });
        return response.data;
    } catch (error) {
        console.error("Check-in failed:", error.response.data);
        throw new Error("Check-in failed");
    }
};

const server = async (status, msg) => {
    if (SENDKEY) {
        try {
            await axios.get('https://sctapi.ftqq.com/' + SENDKEY + '.send', {
                params: {
                    title: '状态：' + status,
                    desp: '# ' + msg
                }
            });
        } catch (error) {
            console.error("Failed to send notification:", error);
        }
    }
};

const ikuuuCheckin = async () => {
    try {
        const cookie = await login();
        console.log("Login successful. Cookie:", cookie);
        axios.defaults.headers.common.cookie = cookie;
        const checkinData = await checkIn(cookie);
        const status = checkinData.ret;
        const msg = checkinData.msg;
        console.log("Check-in status:", status, msg);
        await server(status, msg);
    } catch (error) {
        console.error("Error occurred:", error.message);
    }
}

ikuuuCheckin();
