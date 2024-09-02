Ext.define('home.view.start.StartController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.start',
    requires: [
        'Ext.layout.container.Card',
        'Ext.layout.container.HBox',
        'Ext.panel.Panel',
        'Ext.util.DelayedTask',
        'Ext.util.Format',
        'home.view.login.ChangePassword',
        'home.view.login.Login',
        'home.view.login.LostPassword',
        'home.view.main.Main',
        'portal.v1.view.forms.login.Forbidden',
        'portal.view.login.Login',
        'portal.view.login.LostPassword'
    ],
    init: function () {
        this.callParent(arguments);
        this.firstFocusLogin = true
        this.qtaAvvisi = 0;
        this.qtaAzioni = 0;
        document.title = this.getViewModel().get('azienda');

        Ext.util.Format.thousandSeparator = ".";
        Ext.util.Format.decimalSeparator = ",";
    },
    onAfterRender: function () {
        let me = this,
            vm = me.getViewModel(),
            element = document.getElementById("divstart");

        vm.set('azienda', LOCALE.json[LOCALE.default].translation.azienda);
        vm.set('loginMessage', "");
        vm.set('hiddenLn', !LOCALE.json[LOCALE.default].translation.infoStart.language);
        vm.set('hiddenChangePsw', !LOCALE.json[LOCALE.default].translation.infoStart.changePsw);
        vm.set('tr', LOCALE.default);

        element.parentNode.removeChild(element);
        //pannello info caricamento applicativo in corso
        this.openAppWaiting = Ext.create('Ext.panel.Panel', {
            layout: {
                type: 'hbox',
                align: 'center',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    bind: {
                        html: '<div style="background-position: center;" class="defaultLogo"></div><hr>' +
                            '<div style="text-align: center;font-weight: bold">{waiting}</div>',
                    }
                },
            ]
        })
        this.getView().add(this.openAppWaiting)
        this.getView().setActiveItem(this.openAppWaiting)
        const url = new URL(window.location.href);
        const token = url.searchParams.get("k"); //cambi password
        if (token) {
            me.changePassword(token)
        } else {
            me.checkLogin()
        }
    },
    //errore applicativo
    errorApplication: function () {//TODO gestire errore
    },
    startApplication: function () {
        this.mainPanel = Ext.create('home.view.main.Main');
        this.getView().add(this.mainPanel)
        this.getView().setActiveItem(this.mainPanel)
    },
    /* --------------------------------------------------------
     * GESTIONE LOGIN PORTALE
     * - loginApplication:
     * - checkLogin : verifico se l'utente è loggato, se si carico Backend altrimenti Login
     * --------------------------------------------------------*/
    loginApplication: function () {
        this.lostPassword = Ext.create('home.view.login.LostPassword');
        this.loginform = Ext.create('home.view.login.Login');
        this.changeform = Ext.create('home.view.login.ChangePassword');

        this.cardsPanel = Ext.create('Ext.panel.Panel', {
            layout: {
                type: 'card'
            },
            items: [
                this.loginform,
                this.lostPassword,
                this.changeform
            ]
        });


        this.loginPanel = Ext.create('Ext.panel.Panel', {
            layout: {
                type: 'hbox',
                align: 'center',
                pack: 'center'
            },
            bodyStyle: {
                'background-image': 'url(/images/v1/default-wallpaper.jpg)'
            },
            items: [
                this.cardsPanel
            ]
        });



        this.getView().add(this.loginPanel)
        this.getView().setActiveItem(this.loginPanel)
    },
    checkLogin: function () {
        let me = this;
        //verifico presenza TOKEN
        let _expire = window.localStorage.getItem('_expire')
        let _token = window.localStorage.getItem('_token')
        let _ln = window.localStorage.getItem('_ln')

        window.localStorage.removeItem('_expire');
        window.localStorage.removeItem('_token');

        if (!_expire) {
            me.loginApplication()
            return
        }
        let newDate = Date.parse(new Date())
        if (parseInt(_expire) < newDate) {
            me.loginApplication()
            return;
        }

        Ext.Ajax.on('requestexception', function (conn, response) {
            if (response.status === 403) {
                me.loginApplication()
            }
        });

        Ext.Ajax.setDefaultHeaders({
            token: _token,
            ln: _ln,
            uid: '',
            v: 'v1'
        })
        Ext.Ajax.request({
            url: Backend.REST_API + 'getmodule/',
            method: 'GET',
            success: function (response) {
                let resJson = Ext.decode(response.responseText);
                Ext.global.Vars.infoUser = resJson['infoUser']
                Ext.global.Vars.infoApp = resJson['infoApp']
                Ext.global.Vars.confMod = resJson['confMod']

                Ext.Ajax.setDefaultHeaders({
                    token: _token,
                    uid: Ext.global.Vars.infoUser.uid,
                    ln: _ln,
                    v: 'v1'
                })
                Backend.ruoliApp = resJson['ruoliApp'];
                window.localStorage.removeItem('_expire');
                window.localStorage.removeItem('_token');

                if (resJson['activeItem'] && resJson['activeItem'] !== '') {
                    me.startApplication(resJson['activeItem'])
                } else {
                    me.startApplication('app')
                }
            },
            failure: function () {
                window.localStorage.removeItem('_expire');
                window.localStorage.removeItem('_token');
                me.errorApplication()
            }
        });
    },
    onAfterRenderLogin: function (panel) {
        this.cardsPanel = Ext.create('Ext.panel.Panel', {
            layout: {
                type: 'card'
            }
        });
        this.mainLogin = panel;
        this.messageLogin = Ext.create('Ext.Component', {
            anchor: '100%',
            userCls: 'font-company',
            style: 'font-weight: bold;',
            html: ''
        });
        this.loginform = Ext.create('portal.view.login.Login');
        this.loginform.add(this.messageLogin);

        this.messageLostPassword = Ext.create('Ext.Component', {
            anchor: '100%',
            userCls: 'font-company',
            style: 'font-weight: bold;',
            html: ''
        });
        this.loginLostPassword = Ext.create('portal.view.login.LostPassword');
        this.loginLostPassword.add(this.messageLostPassword);

        this.cardsPanel.add(this.loginform);
        this.mainLogin.add(this.cardsPanel);
    },
    onAfterRenderLoginForm: function () {
        let form = this.loginform.getForm();

        new Ext.util.DelayedTask(function () {
            this.findField('user').focus()
        }, form).delay(250);
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

        Ext.Ajax.setDefaultHeaders({
            token: '',
            uid: '',
            ln: _ln,
            v: 'v1'
        })


        //setto ln header
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
                if (!Ext.Object.isEmpty(resJson)) {
                    let date = new Date();
                    date.setTime(date.getTime() + (30 * 1000));
                    window.localStorage.setItem('_token', resJson['infoUser']['token']);
                    window.localStorage.setItem('_ln', _ln);
                    window.localStorage.setItem('_expire', date);
                    // Ricarico pagina con nuovo token
                    location.reload();
                }
            },
            failure: function (data) {
                let message;
                try {
                    let rest = Ext.decode(data.responseText);
                    message = '<h3><span style="color:red">' + rest['msg'] + '</span></h3>';
                } catch (e) {
                    message = '<h3><span style="color:red">' + Locale.t('global.error.server') + '</span></h3>';
                }
                vm.set('loginMessage', message);
            }
        });
    },
    changePassword: function (token) {
        //Verifico che il token inserito nell'url esista nella tabella utenti
        Ext.Ajax.request({
            url: Backend.REST_VERSION + 'changepassword',
            scope: this,
            method: 'POST',
            params: {
                token: token
            },
            success: function () {
                this.changePassword = Ext.create('home.view.login.ChangePassword', {
                    token: token
                });
                this.changePswPanel = Ext.create('Ext.panel.Panel', {
                    layout: {
                        type: 'hbox',
                        align: 'center',
                        pack: 'center'
                    },
                    bodyStyle: {
                        'background': 'url(/images/v1/default-wallpaper.jpg)'
                    },
                    items: [
                        this.changePassword
                    ]
                });
                this.getView().add(this.changePswPanel)
                this.getView().setActiveItem(this.changePswPanel)
            },
            failure: function () {
                this.forbiddenform = Ext.create('portal.v1.view.forms.login.Forbidden');
                this.getView().add(this.forbiddenform)
                this.getView().setActiveItem(this.forbiddenform)
            }
        });
    },
    //NEW
    onBtnLostPassword: function () {
        this.cardsPanel.setActiveItem(this.lostPassword);
    },
    onBtnReturnLogin: function () {
        this.cardsPanel.setActiveItem(this.loginform);
    },
    onBtnRequestPassword: function () {
        let me = this,
            form = this.lostPassword.getForm();
        if (!form.isValid()) {
            // me.messageLostPassword.update(Locale.t('global.login.L05')); TODO
            return;
        }

        me.lostPassword.el.mask(Locale.t('global.login.wait'));
        Ext.Ajax.request({
            url: Backend.REST_VERSION + 'lostpassword',
            method: 'POST',
            params: {
                userlogin: form.findField('userlogin').getValue(),
                email: form.findField('email').getValue()
            },
            success: function () {
                me.lostPassword.el.unmask()
                form.findField('userlogin').setValue('')
                form.findField('email').setValue('')
                me.cardsPanel.setActiveItem(me.loginform)
            },
            failure: function () {
                me.lostPassword.el.unmask();
                // me.messageCode.update(Locale.t('global.login.L07')); TODO
            }
        });
    }
});
