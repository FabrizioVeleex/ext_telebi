Ext.define('portal.v1.view.main.start.Controller', {
  extend: 'Ext.app.ViewController',
  requires: [
    'Ext.layout.container.HBox',
    'Ext.panel.Panel',
    'Ext.util.Cookies',
    'portal.util.Functions',
    'portal.util.Locale',
    'portal.v1.view.forms.login.Forbidden'
  ],

  init: function () {
    this.callParent(arguments);
    Ext.enableAria = false;
    Ext.enableAriaButtons = false;
    Ext.enablePanels = false;

    this.qtaAvvisi = 0;
    this.qtaAzioni = 0;
    document.title = this.getViewModel().get('azienda');
  },
  onAfterRender: function () {
    let me = this,
      element = document.getElementById("divstart");

    element.parentNode.removeChild(element);
    //pannello info caricamento applicativo in corso
    this.openAppWaiting = Ext.create('Ext.panel.Panel', {
      layout: {
        type: 'hbox',
        align: 'center',
        pack: 'center'
      },
      bodyStyle: {
        'background-image': 'url(/images/v1/default-wallpaper.jpg)'
      },
      items: [
        {
          xtype: 'panel',
          bodyStyle: { 'background': 'transparent' },
          width: 300,
          height: 250,
          bind: {
            html: '<div id="">' +
              '    <div class="defaultLogo" ></div>' +
              '    <div style="clear: both;"></div>' +
              '    <div style="text-align: center;"><img src="/images/64/{tag}.png" alt="#"></div>' +
              '    <div style="text-align: center;color: white;font-weight:bold;font-size:large ; ">{title}</div><hr>' +
              '    <div style="text-align: center;color: white;font-weight:bold;font-size:large ; ">{waiting}</div>' +
              '    <div style="clear: both;"></div>' +
              '</div>'
          }
        },
      ]
    })
    this.getView().add(this.openAppWaiting)
    this.getView().setActiveItem(this.openAppWaiting)
    me.checkLogin()
  },
  //avvio applicativo
  errorApplication: function () {

  },
  onCheckDati: function () {
    this.mainPanel.fireEvent('checkDati')
  },
  /* --------------------------------------------------------
   * GESTIONE LOGIN PORTALE
   * - loginApplication:
   * - checkLogin : verifico se l'utente è loggato, se si carico Backend altrimenti Login
   * --------------------------------------------------------*/
  forbiddenApplication: function () {
    this.forbiddenform = Ext.create('portal.v1.view.forms.login.Forbidden');
    this.getView().add(this.forbiddenform)
    this.getView().setActiveItem(this.forbiddenform)
  },
  checkLogin: function () {
    let me = this
    Ext.Ajax.on('requestexception', function (conn, response) {
      if (response.status === 403) {
        me.forbiddenApplication()
      }
    });
    if (token && token.token) {
      Ext.Ajax.setDefaultHeaders({
        token: token.token,
        ln: token.language,
        v: 'v1',
        tz: Intl.DateTimeFormat().resolvedOptions().timeZone
      })
    }
    Ext.Ajax.request({
      url: Backend.REST_API + 'getmodule/',
      method: 'GET',
      success: function (response) {
        let resJson = Ext.decode(response.responseText);
        Ext.global.Vars.infoCli = resJson['infoCli']
        Ext.global.Vars.infoUser = resJson['infoUser']
        Ext.global.Vars.infoApp = resJson['infoApp']
        Ext.global.Vars.confMod = resJson['confMod']
        Ext.global.Vars.theme = themeApp
        if (resJson['activeItem'] && resJson['activeItem'] !== '') {
          me.startApplication(resJson['activeItem'])
        } else {
          me.startApplication('app')
        }
      },
      failure: function () {
        me.errorApplication()
      }
    });
  },
  onAfterRenderLoginForm: function () {
    let me = this,
      form = this.loginform.getForm();

    me.firstFocusLogin = true;
    form.findField('user').focus();
  },
  onBtnLogin: function () {
    let vm = this.getViewModel(),
      form = this.loginform.getForm();
    if (!form.isValid()) {
      vm.set('loginMessage', Locale.t('global.login.L00'));
      return;
    }
    let _username = form.findField('user').getValue(),
      _password = form.findField('password').getValue(),
      _ln = form.findField('ln').getValue();
    if (_username.trim() === '' || _password.trim() === '') {
      vm.set('loginMessage', Locale.t('global.login.L00'));
      return;
    }
    this.onLoginStart(_username, _password, _ln);
  },
  onLogin: function (field, e) {
    let vm = this.getViewModel(),
      form = this.loginform.getForm();

    if (form.isValid()) {
      if (e.getKey() === e.ENTER) {
        let _username = form.findField('user').getValue(),
          _password = form.findField('password').getValue(),
          _ln = form.findField('ln').getValue();
        if (_username.trim() === '' || _password.trim() === '') {
          vm.set('loginMessage', Locale.t('global.login.L00'));
          return;
        }
        this.onLoginStart(_username, _password, _ln);
      }
    }
  },
  onLoginStart: function (_username, _password, _ln) {
    let vm = this.getViewModel();
    Ext.Ajax.request({
      url: '/login/',
      method: 'POST',
      scope: this,
      params: {
        _username: _username,
        _password: _password,
        _ln: _ln
      },
      success: function (response) {
        let resJson = Ext.decode(response.responseText);
        if (resJson['language'] && resJson['language'] !== '') {
          Ext.util.Cookies.set('i18next', resJson['language']);
        } else {
          Ext.util.Cookies.set('i18next', _ln);
        }

        Ext.util.Cookies.set('uid', resJson.uid); //TODO verificare se serve ancora
        location.reload();
      },
      failure: function () {
        vm.set('loginMessage', Locale.t('global.login.L02'));
      }
    });
  },
  sizeFormat: function (value) {
    return bdFunctions.sizeformat(value);
  }
});
