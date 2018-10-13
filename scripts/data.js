const HOMEEncode = 'aHR0cHM6Ly95YWhhaGEuY24uY29t'
const Home = $text.base64Decode(HOMEEncode)

async function userData() {
    try {
        let resp = await $http.get(`${Home}/user/`);
        let data = resp.data;
        let userInfo = getUserInfo(data);
        if (userInfo === null) {
            // 用户未登录
            return null;
        } else {
            // 用户已登录
            return userInfo;
        }
    } catch (e) {
        return null
    }
}

function getUserNameBySpan(content) {
    const regex = /<span>([\s\S]*?)<\/span>/m;
    const array_matches = regex.exec(content);
    if (array_matches !== null && array_matches.length > 1) {
        return array_matches[1].substring(0, array_matches[1].indexOf('&nbsp;&nbsp;')).trim()
    }
    return "";
}

function getDashboardInfo(content) {
    const regex = /\<div class="dash-card-content">((.|[\n\r])*?)<\/div>/ig;
    let m;
    let infoList = new Array();
    while ((m = regex.exec(content)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        const infoString = m[0]
        infoList.push(infoString)
    }
    const keyRegex = /<p class="category"((.|[\n\r])*?)>((.|[\n\r])*?)<\/p>/i;
    const valueRegex = /<h3 class="title"((.|[\n\r])*?)>((.|[\n\r])*?)<\/h3>/i;
    const dasboardList = new Array();
    infoList.forEach(info => {
        const key = keyRegex.exec(info)[3].replace(/(\r\n\t|\n|\r\t)/gm, "")
        let value = valueRegex.exec(info)[3].trim().replace(/(\r\n\t|\n|\r\t)/gm, "").replace(/(\r\n\t|\n|\r\t)/gm, "")
        const unitRegex = /<small>((.|[\n\r])*?)<\/small>/i;
        const dasboardInfo = { key: key, value: value.replace(unitRegex, "") }
        dasboardList.push(dasboardInfo)
    })
    return dasboardList
}

function getCheckInfo(content) {
    const regex = /\<div class="card-content">((.|[\n\r])*?)<\/div>/igm;
    let m;
    let infoList = new Array();
    let checkInfo = ""
    while ((m = regex.exec(content)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        if (m[0].indexOf('英雄之魂') >= 0) {
            checkInfo = m[0]
            break;
        }
    }
    const chekcInfoRegex = /<i((.|[\n\r])*?)>((.|[\n\r])*?)<\/dd>/gim;
    let chekcInfoM
    while ((chekcInfoM = chekcInfoRegex.exec(checkInfo)) !== null) {
        if (chekcInfoM.index === chekcInfoRegex.lastIndex) {
            chekcInfoRegex.lastIndex++;
        }
        infoList.push(chekcInfoM[3].split("&nbsp;")[1])
    }
    return infoList
}

function getSubscribe(content) {
    const regex = /\<span class="tage is-prelast is-warning is-sub mrb-no">((.|[\n\r])*?)<\/span>/mi
    let subscribeLink = regex.exec(content)[1]
    const base64subscribeLink = $text.base64Encode(subscribeLink)
    const subscribes = {
        url: subscribeLink,
        rocket: `Shadowrocket://add/sub://${base64subscribeLink}?remarks=yahaha`,
        rocketURLScheme: "Shadowrocket://",
        quan: `quantumult://configuration?server=${base64subscribeLink}`,
        quanURLScheme: "quantumult://"
    }
    return subscribes
}
function groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
        var key = obj[property];
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
    }, {});
}
async function getNodeList() {
    let resp = await $http.get(`${Home}/user/node`);
    let data = resp.data;
    let nodeHtmlList = new Array()
    let nodeStatusList = new Array()
    let nodeNameList = new Array()
    let nodeList = new Array()
    if (data) {
        const nodeStatusRegex = /\<span class="tag ((.|[\n\r])*?)">((.|[\n\r])*?)<\/span>/mig
        const nodeNameRegex = /\<div class="node-header-title">((.|[\n\r])*?)<\/div>/mig
        let nodeNameM
        while ((nodeNameM = nodeNameRegex.exec(data)) !== null) {
            if (nodeNameM.index === nodeNameRegex.lastIndex) {
                nodeNameRegex.lastIndex++;
            }
            const nodeStatusM = nodeStatusRegex.exec(data)
            let nodeInfo = new Object();
            nodeInfo.status = nodeStatusM[0].replace(/(\r\n\t|\n|\r\t)/gm, "").replace(/"/g, "'")
            nodeInfo.name = nodeNameM[0].replace(/(\r\n\t|\n|\r\t)/gm, "").replace(/"/g, "'").replace(/network_check/g, "").replace(/data_usage/g, "").replace(/cloud_download/g, "")
            nodeList.push(nodeInfo)
        }
    }
    return await getNodesInfoByHtml(nodeList)
}

async function getNodesInfoByHtml(nodeList) {
    var nodeListString = JSON.stringify(nodeList)
    return await $browser.exec({
        script: ` 
        let nodeList = ${nodeListString};
        var parser = new DOMParser();
nodeList = nodeList.map(node => {
    var nameDoc = parser.parseFromString(node.name, "text/html");
    var statusDoc = parser.parseFromString(node.status, "text/html");
    var status = statusDoc.body.textContent || ""
    return { status:{text: "【"+ status +"】"} , name:{text:nameDoc.body.textContent || ""}  };
});
return nodeList; `
    })
}
function getUserInfo(data) {
    //用户名称
    const username = getUserNameBySpan(data)
    if (username === "") return null
    // 用户基础信息
    const dasboardList = getDashboardInfo(data)
    const checkInfo = getCheckInfo(data)
    const subscribes = getSubscribe(data)
    const userInfo = { usernmae: username, dasboardList: dasboardList, checkInfo: checkInfo, subscribes: subscribes }
    return userInfo
}

async function login(email, passwd) {
    let resp = await $http.upload({
        url: `${Home}/auth/login`,
        form: {
            email: email,
            passwd: passwd
        }
    })
    return resp.data;
}
async function checkin() {
    let resp = await $http.post({
        url: `${Home}/user/checkin`
    });
    return resp.data;
}
async function logout() {
    await $http.get(`${Home}/user/logout`);
}

async function resetport() {
    let resp = await $http.post({
        url: `${Home}/user/resetport`
    });
    return resp.data;
}
async function updatepwd(pwd) {
    let resp = await $http.upload({
        url: `${Home}/user/sspwd`,
        form: {
            sspwd: pwd
        }
    })
    return resp.data;
}
async function urlreset() {
    let resp = await $http.get({
        url: `${Home}/user/url_reset`
    });
    return resp.data;
}

module.exports = {
    userData: userData,
    getUserInfo: getUserInfo,
    login: login,
    logout: logout,
    checkin: checkin,
    getNodeList: getNodeList,
    resetport: resetport,
    updatepwd: updatepwd,
    urlreset: urlreset
}