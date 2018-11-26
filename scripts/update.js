function getLocalVersion() {
    const localVersion = JSON.parse($file.read("version.json").string).version
    console.log(`本地版本：${localVersion}`)
    return localVersion;
}

async function getRemoteVersion() {
    var url = `https://raw.githubusercontent.com/xyranger/yahaha/master/version.json?tmp=${Math.floor(Date.now() / 1000)}`;
    var resp = await $http.get(url);
    let getVersion = resp.data.version
    if (!getVersion) {
        getVersion = "20181007020715";
    }
    console.log(`服务器版本：${getVersion}`)
    return getVersion;
}

async function updateLocalBox() {
    var url = `https://raw.githubusercontent.com/xyranger/yahaha/master/.output/yahaha.box?tmp=${Math.floor(Date.now() / 1000)}`;
    $http.download({
        url: url,
        handler: resp => {
            $addin.save({
                name: "yahaha",
                data: resp.data,
                handler: status => {
                    if (status) {
                        $ui.toast("已更新到最新版");
                        $delay(1, function () {
                            $app.openExtension($addin.current.name);
                        });
                    }
                }
            });
        }
    });
}

async function checkVersion() {
    const localVersion = getLocalVersion()
    const getVersion = await getRemoteVersion()
    if (getVersion > localVersion) {
        await updateLocalBox()
    }
}

module.exports = {
    checkVersion: checkVersion
};
