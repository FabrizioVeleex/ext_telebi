Ext.define('home.view.login.ChangePassword', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.layout.container.HBox',
        'Ext.panel.Panel',
        'portal.v1.view.forms.fields.AfterLabelInfo'
    ],
    defaultListenerScope: true,
    width:400,
    defaults: {
        msgTarget: 'under',
        labelAlign: 'top',
        margin: 5
    },
    items: [
        {
            xtype: 'panel',
            hidden: true,
            title:Locale.t('global.login.change.titlenext'),
            itemId:'completePanel',
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    layout:{
                        pack: 'center'
                    },
                    items: [
                        {
                            text: Locale.t('global.login.change.reload'),
                            iconCls: 'fas fa-home',
                            tooltip: Locale.t('global.login.change.tooltip'),
                            ui: 'green',
                            handler: 'reoladUrl'
                        }
                    ]
                }
            ],
            items:[
                {
                    flex: 1,
                    layout: {
                        type: "hbox",
                        align: 'center'
                    },
                    xtype:'component',
                    autoEl:{
                        tag:'div',
                        html:'<div style="background-position: center;" class="defaultLogo"></div><hr>'
                    }
                },
            ]
        },
        {
            xtype:'panel',
            title:Locale.t('global.login.change.title'),
            itemId:'changePanel',

            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    layout:{
                        pack: 'center'
                    },
                    items: [
                        {
                            text: Locale.t('global.login.change.text'),
                            iconCls: 'fas fa-home',
                            itemId: 'savPassword',
                            disabled: true,
                            tooltip: Locale.t('global.login.change.tooltip'),
                            ui: 'green',
                            handler: 'onChangePsw'
                        },
                        {
                            text: Locale.t('global.login.change.back'),
                            iconCls: 'fas fa-key',
                            tooltip: Locale.t('global.login.change.tooltip'),
                            handler: 'reoladUrl'
                        }
                    ]
                },

            ],
            items:[
                {
                    flex: 1,
                    layout: {
                        type: "hbox",
                        align: 'center'
                    },
                    xtype:'component',
                    autoEl:{
                        tag:'div',
                        html:'<div style="background-position: center;" class="defaultLogo"></div><hr>'
                    }
                },
                {
                    xtype: 'container',
                    itemId: 'msgerror',
                    height: 20,
                    html: ''
                },
                {
                    xtype: 'textfield',
                    labelWidth: 150,
                    itemId: 'psw',
                    width: 380,
                    fieldLabel: Locale.t('global.login.psw'),
                    value: '',
                    enableKeyEvents: true,
                    inputType: 'password',
                    plugins: [{
                        ptype: 'afterlabelinfo',
                        qtip: Locale.t('global.login.info')
                    }],
                    listeners: {
                        keyup: 'checkPsw'
                    }
                },
                {
                    xtype: 'container',
                    width: 225,
                    style: 'margin-left:155px;padding-bottom:10px;',
                    items: [
                        {
                            itemId: 'psw-progress',
                            xtype: "progress",
                            anchor: '100%',
                            value: 0,
                            height: 10,
                        }
                    ]
                },
                {
                    xtype: 'textfield',
                    labelWidth: 150,
                    fieldLabel: Locale.t('global.login.pswr'),
                    width: 380,
                    itemId: 'pswr',
                    value: '',
                    enableKeyEvents: true,
                    inputType: 'password',
                    plugins: [{
                        ptype: 'afterlabelinfo',
                        qtip: Locale.t('global.login.info')
                    }],
                    listeners: {
                        keyup: 'checkPsw'
                    }

                },
                {
                    xtype: 'container',
                    width: 225,
                    style: 'margin-left:155px;padding-bottom:5px;',
                    items: [
                        {
                            itemId: 'pswr-progress',
                            xtype: "progress",
                            value: 0,
                            height: 10,
                            anchor: '100%'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    itemId: 'match',
                    height: 20,
                    html: ''
                }
            ]
        },


    ],
    reoladUrl: function(){
        window.location = window.location.href.split("?")[0];
    },
    onChangePsw: function () {
        this.down('#msgerror').update('')
        let view = this;
        const psw = this.down('#psw').value
        const msgerror = this.down('#msgerror')
        const id = this.userId
        view.el.mask('Richiesta inviata...')
        Ext.Ajax.request({
            method: 'POST',
            params: {
                'password': psw,
                'token': view.token
            },
            url: Backend.REST_VERSION + 'completechangepsw/',
            success: function (response) {
                view.el.unmask()
                view.down('#changePanel').hide();
                view.down('#completePanel').show();

            },
            failure: function (response, opts) {
                view.el.unmask()
                if (response) {
                    if (response.responseText==='Forbidden'){
                        msgerror.update('<b style="color:red">Forbidden</b>')
                    }else {
                        try{
                            let res = Ext.decode(response.responseText);
                            if (res['msg']) {
                                msgerror.update('<b style="color:red">' + res['msg'] + '</b>')
                                return
                            }
                        }catch(err){
                            msgerror.update('<b style="color:red">' + Locale.t('global.psw.error') + '</b>')
                        }
                    }
                msgerror.update('<b style="color:red">' + Locale.t('global.psw.error') + '</b>')
                }
            }
        });
    },
    checkEmail: function (field) {
        if (this.validateEmail(field.value)){
            this.down('#send').enable()
        }else{
            this.down('#send').disable()
        }
    },
    checkPsw: function (field) {
        this.down('#msgerror').update('')
        const savPassword = this.down('#savPassword')
        const psw = this.down('#psw').value
        const pswr = this.down('#pswr').value
        const progress = this.down('#' + field.itemId + '-progress')
        const match = this.down('#match')
        let password = field.getValue()
        let color = 'red';

        let strength = 0;
        if (password.match(/[a-z]+/)) {
            strength += 1;
        }
        if (password.match(/[A-Z]+/)) {
            strength += 1;
        }
        if (password.match(/[0-9]+/)) {
            strength += 1;
        }
        if (password.match(/[$@#&!()]+/)) { //TODO verificare tiuti caratteri speciali consigliati
            strength += 1;
        }
        if (password.length > 7) {
            strength += 1;
        }

        if (strength > 3) {
            color = 'orange'
        }
        if (strength > 4) {
            color = 'green'
        }
        if (psw !== pswr) {
            if (strength < 5) {
                match.update('<b style="color: red;">Requisiti password non soddisfatti</b>')
                savPassword.disable()
            } else {
                match.update('<b style="color: red;">password sono differenti</b>')
                savPassword.disable()
            }

        } else {
            match.update('<b style="color: green">Le password coincidono</b>')
            savPassword.enable()
        }

        progress.el.child(".x-progress-bar", true).style.backgroundColor = color
        progress.setValue(strength / 5)
    },
});