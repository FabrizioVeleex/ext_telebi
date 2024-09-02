/**
 * Created by fabrizio on 14/12/17.
 */
Ext.define('portal.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Ext.container.Container',
        'Ext.layout.container.Border',
        'Ext.layout.container.Card',
        'Ext.panel.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.util.Cookies',
        'Ext.util.DelayedTask',
        'Ext.window.Window',
        'portal.util.Locale',
        'portal.view.login.Login',
        'portal.view.login.LostPassword'
    ],
    /**
     * Called when the view is created
     */
    init: function() {
        this.setConfModRun =0;
    },
    /* ---------------------------------------------------------------------------------
    * GESTIONE LOGIN
    * onAfterRenderLogin: caricamento card login
    * onAfterRenderLoginForm: gestione interfaccia (lingua)
    * onBtnLostPassword: cambio password
    * onBtnReturnLogin: btn da lost password
    * onBtnRequestPassword: invio email
    * onBtnCodePassword: inserimento codice
    * onBtnLogin: azione su tasto login
    * onLogin: azione su enter campi
    * onLoginStart: avvio richiesta di login al server
    * isOkPass: complessità password
    * ---------------------------------------------------------------------------------*/
    onAfterRenderLogin: function(panel){
        this.cardsPanel = Ext.create('Ext.panel.Panel',{
            layout:{
                type:'card'
            }
        });
        this.mainLogin = panel;
        this.messageLogin = Ext.create('Ext.Component',{
            anchor: '100%',
            userCls:'font-company',
            style:'font-weight: bold;',
            html:''
        });
        this.loginform = Ext.create('portal.view.login.Login');
        this.loginform.add(this.messageLogin);

        this.messageLostPassword = Ext.create('Ext.Component',{
            anchor: '100%',
            userCls:'font-company',
            style:'font-weight: bold;',
            html:''
        });
        this.loginLostPassword = Ext.create('portal.view.login.LostPassword');
        this.loginLostPassword.add(this.messageLostPassword);

        this.cardsPanel.add(this.loginform);
        this.mainLogin.add(this.cardsPanel);
    },
    onAfterRenderLoginForm: function(panel){
        let me = this,
            vm = this.getViewModel(),
            form = this.loginform.getForm();

        Ext.Ajax.request({
            url: Backend.API_ADDRESS + 'Main.php',
            method :'GET',
            params	: {'_fn':'checkAzienda'},
            success: function (response) {
                let resp = Ext.decode(response.responseText, true);
                vm.set('azienda',resp['azienda']);
                if (resp['azienda']!=='CRF' && resp['azienda']!=='ACR'){
                    me.cardsPanel.add(me.loginLostPassword);
                }
                if (!me.firstFocusLogin){
                    me.firstFocusLogin = true;
                    form.findField('user').focus();
                }
            }
        });

    },

    onBtnLogin: function () {
        var me = this,
            vm = this.getViewModel(),
            form = this.loginform.getForm();
        if (!form.isValid()) {
            me.messageLogin.update(Locale.t('global.login.L00'));
            return;
        }
        var _username = form.findField('user').getValue(),
            _password= form.findField('password').getValue(),
            _ln= form.findField('ln').getValue();
        if (_username.trim()==='' || _password.trim()===''){
            me.messageLogin.update(Locale.t('global.login.L00'));
            return;
        }
        this.onLoginStart(_username,_password,_ln);
    },
    onLogin: function (field, e) {
        let me = this,
            vm = this.getViewModel(),
            form = this.loginform.getForm();

        if (form.isValid()) {
            if (e.getKey() === e.ENTER ) {
                let _username = form.findField('user').getValue(),
                    _password= form.findField('password').getValue(),
                    _ln= form.findField('ln').getValue();
                if (_username.trim()==='' || _password.trim()===''){
                    me.messageLogin.update(Locale.t('global.login.L00'));
                    return;
                }
                this.onLoginStart(_username,_password,_ln);
            }
        }
    },
    onLoginStart: function (_username,_password,_ln) {
        let me = this;
        Ext.Ajax.request({
            url: Backend.API_ADDRESS + 'Main.php',
            method: 'POST',
            scope: this,
            params: {
                _fn: 'login',
                _username: _username,
                _password: _password,
                _ln: _ln
            },
            success: function (response) {
                let resJson = Ext.decode(response.responseText);
                if (!Ext.Object.isEmpty(resJson)) {
                    if (resJson['success'] === true) {
                        if (resJson['language'] && resJson['language']!=='') {
                            Ext.util.Cookies.set('i18next', resJson['language']);
                        } else {
                            Ext.util.Cookies.set('i18next',_ln);
                        }
                        Ext.util.Cookies.set('uid', resJson['uid']);
                        //Ext.util.Cookies.set('i18next', _ln);
                        location.reload();
                    } else {
                        me.messageLogin.update(Locale.t(resJson['msg']));
                    }
                }
                else {
                    me.messageLogin.update(Locale.t('global.login.L07'));
                }
            },
            failure: function () {
                me.messageLogin.update(Locale.t('global.login.L07'));
            }
        });
    },

    /* ---------------------------------------------------------------------------------
     * onOpenPdf: apertura pdf TODO
     * onCheckDati: azione su apertura con parametri iniziali
     * onCloseApp: azione che lancia la ciusura dal portale (home)
     * setConfMod: impostazioni applicativo personali
     * onResizeWest: midifica larghezza pannello di sinistra
     * ---------------------------------------------------------------------------------*/
    onOpenPdf: function(){
        var win = Ext.create('Ext.window.Window', {
            width: Ext.getBody().getViewSize().width - 100,
            height: Ext.getBody().getViewSize().height - 100,
            modal: true,
            border: false,
            shadow: true,
            title:'_Visualizzazione pdf',
            items:[
                {
                    xtype:'panel',
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [{
                                text: 'Chiudi',
                                scope:win,
                                handler:function(){
                                    this.up('window').close();
                                }
                            }]
                        }
                    ],
                    html:'visualizzo pdf'
                }
            ]
        });
        win.show();
    },
    onCheckDati:function(){
        if (datiApertura) {
            this.onRunApertura(datiApertura);
        }
    },
    onCloseApp: function () {
        if (typeof(myFrame) !== 'undefined' )
            myFrame.fireEvent('closeMe',myFrame);
    },
    setConfMod : function() {
        this.setConfModRun++;
        let count = this.setConfModRun,
            task =new Ext.util.DelayedTask(function(count){
            if (count === this.setConfModRun){
                Ext.Ajax.request({params:{'_fn':'setConfMod','data':Ext.encode(Backend.confMod)},url:Backend.API_ADDRESS+'Main.php'});
            }
        },this,[count]);
       task.delay(3000);
    },
    onResizeWest:function(panel){
        if (this.isFirstResize){
            this.isFirstResize=false;
        }else{
            Backend.confMod.main.west.width = panel.width;
            this.setConfMod();
        }
    }
});