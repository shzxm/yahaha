const _view = require('./view');
const _data = require('./data');

async function initAppView() {
  $ui.render({
    props: {
      id: "body",
      title: "YAHAHA"
    },
    views: [
      {
        type: "image",
        props: {
          src: `${_data.Home}/img/random.jpeg`
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
    ]
  })
  _view.showLoading()
  const userInfo = await _data.userData()
  _view.hideLoding()
  if (userInfo === null) {
    if (!$cache.get("userPasswd")) {
      $("body").remove()
      _view.renderLogin()
    } else {
      _view.showLoading("自动登录中...")
      await _view.userLogin($cache.get("userEmail"), $cache.get("userPasswd"), true)
    }
  } else {
    _view.renderUserView(userInfo)
  }
}

module.exports = {
  initAppView: initAppView
}