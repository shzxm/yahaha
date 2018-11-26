const _data = require('./data');
// const HOMEEncode = 'aHR0cHM6Ly95YWhhaGEuY24uY29t'
const Home = _data.Home
function renderLogin() {
    $ui.render({
        props: {
            id: "body",
            title: "YAHAHA"
        },
        views: [
            {
                type: "image",
                props: {
                    src: `${Home}/img/random.jpeg`
                },
                layout: $layout.fill
            },
            {
                type: "gradient",
                props: {
                    colors: [$rgba(42, 27, 161, 0.7), $rgba(29, 210, 177, 0.7)],
                    locations: [0, 0.99, 1],
                    startPoint: $point(0.0, 1.0),
                    endPoint: $point(1.0, 0.0)
                },
                layout: $layout.fill
            },
            {
                type: "view",
                props: {
                    bgcolor: $color("#fff"),
                    radius: 6.0,
                    id: 'loginView'
                },
                layout: function (make) {
                    make.height.equalTo(250)
                    make.top.inset(120)
                    make.left.inset(15)
                    make.right.inset(15)
                }
            }, {
                type: "label",
                props: {
                    text: "Login",
                    font: $font("bold", 24),
                    align: $align.center,
                },
                layout: function (make) {
                    make.left.inset(15)
                    make.right.inset(15)
                    make.top.equalTo($("loginView").top).offset(10)
                }
            }, {
                type: "input",
                props: {
                    type: $kbType.email,
                    darkKeyboard: false,
                    placeholder: 'Email',
                    id: 'emailInput',
                    text: $cache.get("userEmail")
                },
                layout: function (make) {
                    make.left.inset(35)
                    make.right.inset(35)
                    make.top.equalTo($("loginView").top).offset(50)
                    make.height.equalTo(36)
                }
            }, {
                type: "input",
                props: {
                    type: $kbType.email,
                    darkKeyboard: false,
                    placeholder: 'Password',
                    secure: true,
                    id: 'pwdInput',
                    text: $cache.get("userPasswd")
                },
                layout: function (make) {
                    make.left.inset(35)
                    make.right.inset(35)
                    make.top.equalTo($("emailInput").top).offset(50)
                    make.height.equalTo(36)
                }
            }, {
                type: "button",
                props: {
                    title: "Let's go"
                },
                layout: function (make, view) {
                    make.left.inset(35)
                    make.right.inset(35)
                    make.top.equalTo($("pwdInput").top).offset(70)
                    make.height.equalTo(46)
                }, events: {
                    tapped: function (sender) {
                        showLoading();
                        sender.enabled = false
                        const emailVal = $("emailInput").text
                        const pwdVal = $("pwdInput").text
                        userLogin(emailVal, pwdVal, true)
                    }
                },
            }
        ]
    })
}
const colors = [
    "#e46367",
    "#e8b4b6",
    "#7dd1f0",
    "#ff6369",
    "#c2b5fa"
];
const usage = [
    {
        "y": 2.3788773137436,
        "indexLabel": "使用 2.38% 869.12MB",
        "legendText": "已用 2.38% 869.12MB"
    },
    {
        "y": 0,
        "indexLabel": "今日 0.00% 0B",
        "legendText": "今日 0.00% 0B"
    },
    {
        "y": 97.621122686256,
        "indexLabel": "剩余 97.62% 34.83GB",
        "legendText": "剩余 97.62% 34.83GB"
    }
]

function renderUserView(userInfo) {
    if ($app.env == $env.today) {

        $ui.render({
            props: {
                title: ""
            },
            views: [{
                type: "label",
                props: {
                    id: "name",
                    font: $font('ArialRoundedMTBold', 14),
                    align: $align.center,
                    text: "YAHAHA",
                    textColor: $color("#555")
                },
                layout: (make, view) => {
                    make.top.inset(8)
                    make.centerX.equalTo()
                    make.width.equalTo(200)
                }

            }, {
                type: "canvas",
                props: {
                    id: "cvs"
                },
                layout: (make, view) => {
                    make.edges.equalTo($insets(30, 20, 0, 20))
                },
                events: {
                    draw: function (view, ctx) {
                        let points = usage.map(i => i.y);


                        if (points.length < 2) return;
                        ctx.translateCTM(view.frame.width, view.frame.height);
                        ctx.rotateCTM(Math.PI);
                        ctx.setAlpha(0.9);
                        ctx.fillColor = $color(colors[2])
                        ctx.fillRect($rect(0, view.frame.height * 0.5, view.frame.width, 80));
                        for (let i = 0; i < 2; i++) {
                            ctx.saveGState();
                            ctx.fillColor = $color(colors[i])
                            ctx.fillRect($rect(0, view.frame.height * 0.5, points[i] / 100 * view.frame.width, 80));
                            ctx.restoreGState();
                        }
                    }
                }
            },
            {
                type: "label",
                props: {
                    id: "canvaslabel",
                    font: $font('ArialRoundedMTBold', 14),
                    textColor: $color("#555"),
                    autoFontSize: true,
                    align: $align.center
                },
                layout: function (make, view) {
                    make.centerX.equalTo($("cvs"));
                    make.centerY.equalTo($("cvs")).offset(25);
                    make.width.equalTo($("cvs"));
                }
            }
            ]
        })
        setText(usage)
    } else {
        $ui.render({
            props: {
                title: "YAHAHA",
                id: "body"
            },
            views: [{
                type: "image",
                props: {
                    src: `${Home}/img/random.jpeg`
                },
                layout: $layout.fill
            },
            {
                type: "gradient",
                props: {
                    colors: [$rgba(42, 27, 161, 0.7), $rgba(29, 210, 177, 0.7)],
                    locations: [0, 0.99, 1],
                    startPoint: $point(0.0, 1.0),
                    endPoint: $point(1.0, 0.0)
                },
                layout: $layout.fill
            }, {
                type: "view",
                props: {
                    id: "userInfoView"
                },
                layout: (make, view) => {
                    make.height.equalTo(0);
                    make.top.equalTo(10);
                    make.width.equalTo(view.super);
                },
                views: []
            }, {
                type: "view",
                props: {
                    clipsToBounds: false,
                    bgcolor: $color("white")
                },
                layout: (make, view) => {
                    make.height.equalTo(75);
                    make.width.equalTo(view.super).offset(-30);
                    make.centerX.equalTo(view.super);
                    make.top.equalTo(view.prev.bottom).offset(10);
                    shadow(view)
                },
                views: [{
                    type: "label",
                    props: {
                        text: "用户信息",
                        font: $font("bold", 14),
                    },
                    layout: (make, view) => {
                        make.top.equalTo(view.super).offset(5);
                        make.left.equalTo(view.super).offset(20);
                    }
                }, {
                    type: "label",
                    props: {
                        font: $font(14),
                        id: "userInfoDetailLeft",
                        text: "\n数据加载中...\n",
                        lines: 0
                    },
                    layout: (make, view) => {
                        make.top.equalTo(view.prev.bottom).offset(7);
                        make.left.equalTo(view.super).offset(20);
                        make.width.equalTo(view.super).multipliedBy(0.5).offset(-15);
                    }
                }, {
                    type: "label",
                    props: {
                        font: $font(14),
                        id: "userInfoDetailRight",
                        lines: 0,
                    },
                    layout: (make, view) => {
                        make.top.equalTo(view.prev.top);
                        make.left.equalTo(view.prev.right).offset(30);
                        make.width.equalTo(view.super).multipliedBy(0.5);
                    }
                }]
            }, {
                type: "view",
                props: {
                    clipsToBounds: false,
                    bgcolor: $color("white")
                },
                layout: (make, view) => {
                    make.height.equalTo(75);
                    make.width.equalTo(view.super).offset(-30);
                    make.centerX.equalTo(view.super);
                    make.top.equalTo(view.prev.bottom).offset(10);
                    shadow(view)
                },
                views: [{
                    type: "label",
                    props: {
                        text: "流量信息",
                        font: $font("bold", 14),
                    },
                    layout: (make, view) => {
                        make.top.equalTo(view.super).offset(5);
                        make.left.equalTo(view.super).offset(20);
                    }
                }, {
                    type: "label",
                    props: {
                        font: $font(14),
                        id: "netflowInfoDetailLeft",
                        text: "\n数据加载中...\n",
                        lines: 0
                    },
                    layout: (make, view) => {
                        make.top.equalTo(view.prev.bottom).offset(7);
                        make.left.equalTo(view.super).offset(20);
                        make.width.equalTo(view.super).multipliedBy(0.5).offset(-15);
                    }
                }, {
                    type: "label",
                    props: {
                        font: $font(14),
                        id: "netflowInfoDetailRight",
                        lines: 0,
                    },
                    layout: (make, view) => {
                        make.top.equalTo(view.prev.top);
                        make.left.equalTo(view.prev.right).offset(30);
                        make.width.equalTo(view.super).multipliedBy(0.5);
                    }
                }
                    /*,
                     {
                        type: "progress",
                        props: {
                            id: 'netflowProgress',
                            smoothRadius: 10,
                            trackColor: $color("#f7f7f7"),
                            progressColor: $color("#fbb450")
                        },
                        layout: function (make, view) {
                            make.top.equalTo(view.super).offset(75);
                            make.left.equalTo(view.super).offset(20);
                            make.right.equalTo(view.super).offset(20)
                            make.width.equalTo(view.super).offset(-40);
                            make.height.equalTo(5)
                        }
                    } */
                ]
            }, {
                type: "view",
                props: {
                    clipsToBounds: false,
                    bgcolor: $color("white")
                },
                layout: (make, view) => {
                    make.height.equalTo(140);
                    make.width.equalTo(view.super).offset(-30);
                    make.centerX.equalTo(view.super);
                    make.top.equalTo(view.prev.bottom).offset(10);
                    shadow(view)
                },
                views: [{
                    type: "label",
                    props: {
                        text: "获取Korok种子",
                        font: $font("bold", 14),
                    },
                    layout: (make, view) => {
                        make.top.equalTo(view.super).offset(5);
                        make.left.equalTo(view.super).offset(20);
                    }
                }, {
                    type: "label",
                    props: {
                        font: $font(14),
                        id: "checkinfolab",
                        text: "\n数据加载中...\n",
                        lines: 0
                    },
                    layout: (make, view) => {
                        make.top.equalTo(view.prev.bottom).offset(7);
                        make.left.equalTo(view.super).offset(20);
                        make.width.equalTo(view.super).multipliedBy(0.5).offset(-15);
                    }
                }, {
                    type: "button",
                    props: {
                        id: "checkinBtn",
                        title: "签到",
                        radius: 84 / 2,
                        hidden: true,
                        icon: $icon("125", $color("white"), $size(20, 20)),
                        titleEdgeInsets: $insets(10, 15, 10, 10)
                    },
                    layout: (make, view) => {
                        make.right.equalTo(view.super).offset(-20);
                        make.centerY.equalTo(view.super);
                        make.size.equalTo($size(84, 84))
                    },
                    events: {
                        tapped: async sender => {
                            sender.enabled = false
                            sender.titleColor = $color("#95bdf8")
                            showLoading()
                            let res = await _data.checkin();
                            $ui.toast(res.msg);
                            renderUserData()
                        }
                    }
                }]
            }, {
                type: "view",
                props: {
                    clipsToBounds: false,
                    bgcolor: $color("white")
                },
                layout: (make, view) => {
                    make.top.equalTo(view.prev.bottom).offset(10);
                    make.width.equalTo(view.super).offset(-30);
                    make.centerX.equalTo(view.super);
                    make.height.equalTo(50);
                    shadow(view);
                },
                views: [{
                    type: "label",
                    props: {
                        text: "Quantumult",
                        font: $font("bold", 16)
                    },
                    layout: (make, view) => {
                        make.height.equalTo(view.super);
                        make.left.equalTo(view.super).offset(20);
                        make.centerY.equalTo(view.super);
                    }
                }, {
                    type: "button",
                    props: {
                        title: "一键更新",
                        id: "quanSubscribeBtn",
                        font: $font(14)
                    },
                    layout: (make, view) => {
                        make.right.equalTo(view.super).offset(-20);
                        make.centerY.equalTo(view.super);
                        make.width.equalTo(84);
                    },
                    events: {
                        tapped: async sender => {
                            let data = sender.info
                            $app.openURL(data.quan)
                        }
                    }
                }, {
                    type: "button",
                    props: {
                        title: "复制并打开",
                        font: $font(14)
                    },
                    layout: (make, view) => {
                        make.right.equalTo(view.super).offset(-120);
                        make.centerY.equalTo(view.super);
                        make.width.equalTo(84);
                    },
                    events: {
                        tapped: async sender => {
                            let data = $("quanSubscribeBtn").info
                            $clipboard.text = data.url
                            $app.openURL(data.quanURLScheme)
                        }
                    }
                }]
            }, {
                type: "view",
                props: {
                    clipsToBounds: false,
                    bgcolor: $color("white")
                },
                layout: (make, view) => {
                    make.top.equalTo(view.prev.bottom).offset(10);
                    make.width.equalTo(view.super).offset(-30);
                    make.centerX.equalTo(view.super);
                    make.height.equalTo(50);
                    shadow(view);
                },
                views: [{
                    type: "label",
                    props: {
                        text: "Shadowrocket",
                        font: $font("bold", 16)
                    },
                    layout: (make, view) => {
                        make.height.equalTo(view.super);
                        make.left.equalTo(view.super).offset(20);
                        make.centerY.equalTo(view.super);
                    }
                }, {
                    type: "button",
                    props: {
                        title: "一键更新",
                        font: $font(14)
                    },
                    layout: (make, view) => {
                        make.right.equalTo(view.super).offset(-20);
                        make.centerY.equalTo(view.super);
                        make.width.equalTo(84);
                    },
                    events: {
                        tapped: async sender => {
                            let data = $("quanSubscribeBtn").info
                            $app.openURL(data.rocket)
                        }
                    }
                }, {
                    type: "button",
                    props: {
                        title: "复制并打开",
                        font: $font(14)
                    },
                    layout: (make, view) => {
                        make.right.equalTo(view.super).offset(-120);
                        make.centerY.equalTo(view.super);
                        make.width.equalTo(84);
                    },
                    events: {
                        tapped: async sender => {
                            let data = $("quanSubscribeBtn").info
                            $clipboard.text = data.url
                            $app.openURL(data.rocketURLScheme)
                        }
                    }
                }]
            }, {
                type: "view",
                props: {
                    clipsToBounds: false,
                    bgcolor: $color("white")
                },
                layout: (make, view) => {
                    make.top.equalTo(view.prev.bottom).offset(10);
                    make.width.equalTo(view.super).offset(-30);
                    make.centerX.equalTo(view.super);
                    make.height.equalTo(50);
                    shadow(view);
                },
                views: [{
                    type: "label",
                    props: {
                        text: "节点列表",
                        font: $font("bold", 16)
                    },
                    layout: (make, view) => {
                        make.height.equalTo(view.super);
                        make.left.equalTo(view.super).offset(20);
                        make.centerY.equalTo(view.super);
                    }
                }, {
                    type: "spinner",
                    props: {
                        loading: true,
                        id: 'nodesLoadingSpinner'
                    },
                    layout: function (make, view) {
                        make.right.equalTo(view.super).offset(-20);
                        make.centerY.equalTo(view.super);
                    }
                }, {
                    type: "button",
                    props: {
                        title: "查看",
                        id: "nodeList",
                        hidden: true,
                        font: $font(14)
                    },
                    layout: (make, view) => {
                        make.right.equalTo(view.super).offset(-20);
                        make.centerY.equalTo(view.super);
                        make.width.equalTo(84);
                    },
                    events: {
                        tapped: async sender => {
                            showSampleNode()
                        }
                    }
                }, {
                    type: "button",
                    props: {
                        title: "网站中打开",
                        font: $font(14)
                    },
                    layout: (make, view) => {
                        make.right.equalTo(view.super).offset(-120);
                        make.centerY.equalTo(view.super);
                        make.width.equalTo(84);
                    },
                    events: {
                        tapped: async sender => {
                            showWebNode()
                        }
                    }
                }]
            }, {
                type: "view",
                props: {
                    clipsToBounds: false,
                    bgcolor: $color("white")
                },
                layout: (make, view) => {
                    make.top.equalTo(view.prev.bottom).offset(10);
                    make.width.equalTo(view.super).offset(-30);
                    make.centerX.equalTo(view.super);
                    make.height.equalTo(50);
                    shadow(view);
                },
                views: [{
                    type: "label",
                    props: {
                        text: "重置",
                        font: $font("bold", 16)
                    },
                    layout: (make, view) => {
                        make.height.equalTo(view.super);
                        make.left.equalTo(view.super).offset(20);
                        make.centerY.equalTo(view.super);
                    }
                }, {
                    type: "button",
                    props: {
                        title: "重置端口",
                        font: $font(14)
                    },
                    layout: (make, view) => {
                        make.right.equalTo(view.super).offset(-20);
                        make.centerY.equalTo(view.super);
                        make.width.equalTo(84);
                    },
                    events: {
                        tapped: async sender => {
                            showLoading();
                            const data = await _data.resetport()
                            if (data.ret === 1) {
                                var msgs = data.msg.replace(/(\r\n\t|\n|\r\t)/gm, "|").replace(/\s+/g, "").split('|');
                                $ui.toast("同步更新连接密码...");
                                await _data.updatepwd(msgs[2].substring(4))
                                $ui.alert({
                                    title: msgs[0],
                                    message: msgs[1] + "\r\n" + msgs[2],
                                });
                            } else {
                                $ui.alert({
                                    title: '重置失败',
                                    message: data.msg
                                });
                            }
                            hideLoding();
                        }
                    }
                }, {
                    type: "button",
                    props: {
                        title: "重置订阅",
                        font: $font(14)
                    },
                    layout: (make, view) => {
                        make.right.equalTo(view.super).offset(-120);
                        make.centerY.equalTo(view.super);
                        make.width.equalTo(84);
                    },
                    events: {
                        tapped: async sender => {
                            showLoading();
                            const data = await _data.urlreset()
                            $ui.toast("订阅已重置，等待刷新");
                            renderUserData()
                        }
                    }
                }]
            }, {
                type: "view",
                props: {
                    clipsToBounds: false,
                    bgcolor: $color("white")
                },
                layout: (make, view) => {
                    make.top.equalTo(view.prev.bottom).offset(10);
                    make.width.equalTo(view.super).offset(-30);
                    make.centerX.equalTo(view.super);
                    make.height.equalTo(50);
                    shadow(view);
                },
                views: [{
                    type: "label",
                    props: {
                        text: "复制",
                        font: $font("bold", 16)
                    },
                    layout: (make, view) => {
                        make.height.equalTo(view.super);
                        make.left.equalTo(view.super).offset(20);
                        make.centerY.equalTo(view.super);
                    }
                }, {
                    type: "spinner",
                    props: {
                        loading: true,
                        id: 'copyInviteBtnSpinner'
                    },
                    layout: function (make, view) {
                        make.right.equalTo(view.super).offset(-20);
                        make.centerY.equalTo(view.super);
                    }
                }, {
                    type: "button",
                    props: {
                        title: "复制邀请链接",
                        id: "copyInviteBtn",
                        font: $font(14),
                        hidden: true
                    },
                    layout: (make, view) => {
                        make.right.equalTo(view.super).offset(-20);
                        make.centerY.equalTo(view.super);
                        make.width.equalTo(94);
                    },
                    events: {
                        tapped: async sender => {
                            let data = $("copyInviteBtn").info
                            $clipboard.text = data
                            $ui.toast("链接已复制");
                        }
                    }
                }, {
                    type: "button",
                    props: {
                        title: "复制订阅地址",
                        font: $font(14)
                    },
                    layout: (make, view) => {
                        make.right.equalTo(view.super).offset(-120);
                        make.centerY.equalTo(view.super);
                        make.width.equalTo(94);
                    },
                    events: {
                        tapped: async sender => {
                            let data = $("quanSubscribeBtn").info
                            $clipboard.text = data.url
                            $ui.toast("链接已复制");
                        }
                    }
                }]
            }]
        })
        renderUserData(userInfo)
    }
}
function setText(usage) {
    let text = `■ ${usage.map(i => i.legendText).reverse().join(" ■ ")}`
    let str = $objc("NSMutableAttributedString").invoke("alloc.initWithString", text)
    for (let i = 0, j = 2; i < text.length; i++) {
        if (text.charAt(i) === '■') str.invoke("addAttribute:value:range:", "NSColor", $color(colors[j--]), $range(i, 1))
    }
    $("canvaslabel").runtimeValue().invoke("setAttributedText", str)
}

async function renderUserData(userInfo) {
    if (userInfo === undefined) {
        hideLoding()
        showLoading()
        userInfo = await _data.userData();
        hideLoding()
    }
    $("userInfoDetailLeft").text = `${userInfo.dasboardList[0].key}：${userInfo.dasboardList[0].value}\n${userInfo.dasboardList[1].key}：${userInfo.dasboardList[1].value}`
    $("userInfoDetailRight").text = `${userInfo.dasboardList[2].key}：${userInfo.dasboardList[2].value}\n${userInfo.dasboardList[3].key}：${userInfo.dasboardList[3].value}`
    $("netflowInfoDetailLeft").text = `总流量：${userInfo.netFlowInfo[0]}\n使用流量：${userInfo.netFlowInfo[1]}`
    $("netflowInfoDetailRight").text = `剩余流量：${userInfo.netFlowInfo[2]}\n可用天数：${userInfo.netFlowInfo[3]}`
    // 单位换算
    /* if (userInfo.netFlowInfo[0].slice(-2) !== userInfo.netFlowInfo[2].slice(-2)) {
        if (userInfo.netFlowInfo[0].slice(-2) === 'TB') {
            $("netflowProgress").value = 1 - (1 - (userInfo.netFlowInfo[2].substring(0, userInfo.netFlowInfo[2].length - 2) / parseFloat(userInfo.netFlowInfo[0].substring(0, userInfo.netFlowInfo[0].length - 2)) * 1024))
        }
    } */
    if (isToday(userInfo.checkInfo[1])) {
        $("checkinBtn").enabled = false
        $("checkinBtn").titleColor = $color("#95bdf8")
    }
    $("checkinBtn").hidden = false
    $("checkinfolab").text = `Korok种子：${userInfo.checkInfo[0]}\n\n上次签到时间：${userInfo.checkInfo[1]}\n\n英雄之魂：${userInfo.checkInfo[2]}`
    $("quanSubscribeBtn").info = userInfo.subscribes
    const nodeList = await _data.getNodeList()
    $("nodeList").info = nodeList
    $("nodesLoadingSpinner").hidden = true
    $("nodeList").hidden = false
    const getUserInviteInfo = await _data.getUserInviteInfo()
    $("copyInviteBtn").info = getUserInviteInfo
    $("copyInviteBtnSpinner").hidden = true
    $("copyInviteBtn").hidden = false
}

function showWebNode() {
    $ui.push({
        props: {
            title: "节点列表"
        },
        views: [
            {
                type: "web",
                props: {
                    url: `${Home}/user/node`
                },
                layout: $layout.fill
            }
        ]
    })
}

function showSampleNode() {
    const nodeList = $("nodeList").info
    nodeList.map(obj => {
        if (obj.status.text.indexOf('在线') >= 0) {
            obj.status.textColor = $color("#23d160")
        } else {
            obj.status.textColor = $color("#ff3860")
        }
        return obj;
    })
    $ui.push({
        props: {
            title: "节点列表"
        },
        views: [
            {
                type: "list",
                props: {
                    data: nodeList,
                    rowHeight: 50,
                    template: {
                        props: {},
                        views: [
                            {
                                type: "label",
                                props: {
                                    id: "status"
                                },
                                layout: (make, view) => {
                                    make.left.equalTo(view.super).offset(5);
                                    make.height.equalTo(25);
                                    make.width.equalTo(70);
                                    make.centerY.equalTo(view.super);
                                }
                            },
                            {
                                type: "label",
                                props: {
                                    id: "name",
                                    autoFontSize: true
                                },
                                layout: (make, view) => {
                                    make.left.equalTo(70);
                                    make.centerY.equalTo(view.super);
                                    let width = $device.info.screen.width - 80;
                                    make.width.equalTo(width);
                                }
                            }
                        ]
                    }
                },
                layout: $layout.fill
            }
        ]
    });

}

function showLoading(loadingText) {
    if (!loadingText) {
        loadingText = "Loading..."
    }
    let view = {
        type: "view",
        props: {
            id: "loadingView"
        },
        layout: $layout.fill,
        views: [{
            type: "blur",
            props: {
                style: 1,
                radius: 20,
            },
            layout: (make, view) => {
                make.height.width.equalTo(130);
                make.center.equalTo(view.super);
            },
        }, {
            type: "spinner",
            props: {
                id: "loadingSpinner",
                loading: true,
                style: 0,
                color: $color("#313131")
            },
            layout: (make, view) => {
                make.centerX.equalTo(view.super);
                make.centerY.equalTo(view.super).offset(-10);
            }
        }, {
            type: "label",
            props: {
                text: "Loading...",
                font: $font("bold", 16)
            },
            layout: (make, view) => {
                make.centerX.equalTo(view.super);
                make.top.equalTo(view.prev.bottom).offset(5);
            }
        }]
    }
    $('body').add(view)
}

function hideLoding() {
    $("loadingView") && $("loadingView").remove()
}

function shadow(view) {
    var layer = view.runtimeValue().invoke("layer")
    layer.invoke("setCornerRadius", 5)
    layer.invoke("setShadowOffset", $size(3, 3))
    layer.invoke("setShadowColor", $color("gray").runtimeValue().invoke("CGColor"))
    layer.invoke("setShadowOpacity", 0.7)
    layer.invoke("setShadowRadius", 5)
}

async function userLogin(email, passwd, cacheLogin = true) {
    let res = await _data.login(email, passwd);
    if (cacheLogin) {
        if (res.ret === 1) {
            $cache.set("userEmail", email);
            $cache.set("userPasswd", passwd);
            $("body").remove();
            renderUserView();
        } else {
            $ui.alert({
                title: "登录失败",
                message: "请检查网络",
            });
            hideLoding()
            $("body").remove();
            renderLogin()
        }
    } else {
        $ui.alert({
            title: "登录错误",
            message: res.msg,
        });
        hideLoding()
        $("body").remove();
        renderLogin();
    }
}
function isToday(str) {
    var d = new Date(str.replace(/-/g, "/"));
    var todaysDate = new Date();
    if (d.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    renderLogin: renderLogin,
    renderUserView: renderUserView,
    showLoading: showLoading,
    hideLoding: hideLoding,
    userLogin: userLogin
}