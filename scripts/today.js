const _data = require('./data');

let buttons = ["个人信息", "订阅链接", "邀请链接", "签到"];
$ui.render({
    props: {
        title: 'Yahaha',
        id: "body"
    },
    views: [
        {
            type: "label",
            props: {
                id: 'tips',
                text: "正在获取登录状态...",
                align: $align.center
            },
            layout: function (make, view) {
                // make.center.equalTo(view.super)
            }
        }
    ]
});
let userInfo;
renderView();

async function renderView() {
    let renderView;
    if (!$cache.get("userPasswd")) {
        renderView = loginView;
    } else {
        await _data.logout();
        let res = await _data.login($cache.get("userEmail"), $cache.get("userPasswd"));
        if (res.ret === 1) {
            userInfo = await _data.userData();
            $keyboard.insert(userInfo.subscribeType);
            if (userInfo.subscribeType === "ss") {
                buttons = ["个人信息", "Surge托管", "Clash配置", "邀请链接", "签到"];
            }
            renderView = {
                type: "matrix",
                props: {
                    bgcolor: $color("#cfd2d8"),
                    id: "main-matrix",
                    columns: 2,
                    itemHeight: 44,
                    spacing: 8,
                    template: [
                        {
                            type: "label",
                            props: {
                                id: "tile",
                                bgcolor: $color("#ffffff"),
                                radius: 5,
                                align: $align.center,
                                font: $font("medium", 16),
                            },
                            layout: $layout.fill
                        }
                    ],
                    data: buttons.map((item) => {
                        return {
                            tile: {
                                text: "" + item
                            }
                        };
                    })
                },
                events: {
                    didSelect: async function (sender, indexPath, data) {
                        var token = data.tile.text;
                        if (token === "个人信息") {
                            let txt = '';
                            if ($keyboard.hasText) {
                                txt = "\n"
                            }
                            txt += `${userInfo.dasboardList[0].key}：${userInfo.dasboardList[0].value}\n${userInfo.dasboardList[1].key}：${userInfo.dasboardList[1].value}`.trim() + "\n";
                            txt += `${userInfo.dasboardList[2].key}：${userInfo.dasboardList[2].value}\n${userInfo.dasboardList[3].key}：${userInfo.dasboardList[3].value}`.trim() + "\n";
                            txt += `总流量：${userInfo.netFlowInfo[0]}\n使用流量：${userInfo.netFlowInfo[1]}`.trim() + "\n";
                            txt += `剩余流量：${userInfo.netFlowInfo[2]}\n可用天数：${userInfo.netFlowInfo[3]}`.trim() + "\n";
                            txt += `Korok种子：${userInfo.checkInfo[0]}\n上次签到时间：${userInfo.checkInfo[1]}\n英雄之魂：${userInfo.checkInfo[2]}`.trim();
                            $keyboard.insert(txt);
                        } else if (token === "订阅链接") {
                            let txt = '';
                            if ($keyboard.hasText) {
                                txt = "\n"
                            }
                            const link = txt + userInfo.subscribes.url;
                            $keyboard.insert(link);
                        } else if (token === "邀请链接") {
                            const getUserInviteInfo = await _data.getUserInviteInfo()
                            let txt = '';
                            if ($keyboard.hasText) {
                                txt = "\n"
                            }
                            $keyboard.insert(txt + getUserInviteInfo);
                        } else if (token === "签到") {
                            let res = await _data.checkin();
                            $keyboard.insert(res.msg);
                        } else if (token === "Surge托管") {
                            let txt = '';
                            if ($keyboard.hasText) {
                                txt = "\n"
                            }
                            const link = txt + userInfo.subscribes.url;
                            $keyboard.insert(link);
                        } else if (token === "Clash配置") {
                            let txt = '';
                            if ($keyboard.hasText) {
                                txt = "\n"
                            }
                            const link = txt + userInfo.subscribes.clashurl;
                            $keyboard.insert(link);
                        }
                    }
                },
                layout: $layout.fill,
            };
        } else {
            renderView = loginView;
        }
    }
    $("tips").remove();
    $("body").add(renderView);
}

const loginView = {
    type: "label",
    props: {
        text: "未登录，请前往主应用登录再继续使用!",
        align: $align.center,
        textColor: $color('red')
    },
    layout: function (make, view) {
        // make.center.equalTo(view.super)
    }
}

const button = (title, layout, handler) => {
    return {
        type: "button",
        props: {
            title: title,
            font: $font("medium", 14),
            bgcolor: $color("#bdc1c6"),
            titleColor: $color("black")
        },
        events: {
            tapped: handler
        },
        layout: layout
    }
}