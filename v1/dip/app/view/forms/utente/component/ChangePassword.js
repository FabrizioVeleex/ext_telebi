/**
 * inserisci nuova password
 * o genera password ed invia email alla casella di default
 *
 */
Ext.define('dip.view.forms.utente.component.ChangePassword', {
    extend: 'Ext.panel.Panel',
    mixins:['portal.v1.global.Util'],
    requires: [
        'Ext.container.Container',
        'Ext.form.FieldSet',
        'Ext.form.field.*',
        'Ext.layout.container.Fit',
        'Ext.layout.container.VBox',
        'Ext.panel.Panel',
        'portal.v1.view.forms.fields.AfterLabelInfo'
    ],
    defaultListenerScope: true,
    width: 500,
    height: 525,
    floating: true,
    modal: true,
    title: Locale.t('dip.forms.utente.changepsw.title'),
    bodyPadding: '0 15',
    iconCls: 'fas fa-key',
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    text: Locale.t('dip.forms.utente.changepsw.btn.undo.text'),
                    iconCls: 'fas fa-window-close',
                    tooltip: Locale.t('dip.forms.utente.changepsw.btn.undo.tooltip'),
                    ui: 'ocra',
                    handler: 'onCloseChangePsw'
                }
            ]
        }
    ],
    items: [
        { //definizione campi nascosti aggiornamento record
            xtype: 'container',
            hidden: true,
            items: []
        },
        {
            xtype: 'container',
            itemId: 'msgerror',
            height: 20,
            html: ''
        },
        {
            xtype: 'fieldset',
            cls: 'fildset-transparent',
            title: Locale.t('dip.forms.utente.changepsw.btn.change.title'),
            items: [
                {
                    xtype: 'panel',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            items: [
                                {
                                    text: Locale.t('dip.forms.utente.changepsw.btn.change.text'),
                                    iconCls: 'fas fa-key',
                                    itemId: 'savPassword',
                                    disabled: true,
                                    tooltip: Locale.t('dip.forms.utente.changepsw.btn.change.tooltip'),
                                    ui: 'green',
                                    handler: 'onChangePsw'
                                }
                            ]
                        }
                    ],
                    items: [
                        {
                            xtype: 'textfield',
                            labelWidth: 150,
                            itemId: 'psw',
                            anchor: '100%',
                            fieldLabel: Locale.t('dip.forms.utente.changepsw.psw'),
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
                            fieldLabel: Locale.t('dip.forms.utente.changepsw.pswr'),
                            anchor: '100%',
                            itemId: 'pswr',
                            value: '',
                            enableKeyEvents: true,
                            inputType: 'password',
                            plugins: [{
                                ptype: 'afterlabelinfo',
                                qtip: 'The text appearing after hovering over the icon'
                            }],
                            listeners: {
                                keyup: 'checkPsw'
                            }

                        },
                        {
                            xtype: 'container',
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
                }
            ]
        },
        {
            xtype: 'fieldset',
            cls: 'fildset-transparent',
            title: Locale.t('dip.forms.utente.changepsw.btn.reset.title'),
            items: [
                {
                    xtype: 'panel',
                    layout: 'fit',
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            itemId: 'send',
                            disabled: true,
                            items: [
                                {
                                    text: Locale.t('dip.forms.utente.changepsw.btn.reset.text'),
                                    iconCls: 'fas fa-paper-plane',
                                    tooltip: Locale.t('dip.forms.utente.changepsw.btn.reset.tooltip'),
                                    ui: 'green',
                                    handler: 'onResetSend'
                                }
                            ]
                        }
                    ],
                    items: [
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            itemId: 'email',
                            enableKeyEvents: true,
                            fieldLabel: Locale.t('dip.forms.utente.fields.email'),
                            value: '',
                            vtype: 'email',
                            listeners: {
                                keyup: 'checkEmail'
                            }
                        },
                    ]

                }
            ]
        }
    ],
    initComponent: function () {
        this.callParent(arguments);
        if (this.email !== '') {
            this.down('#email').setValue(this.email)
            this.down('#send').enable()
        }
    },
    onCloseChangePsw: function () {
      this.scopeThis.onCloseChangePsw();
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
                'iduser': id
            },
            url: Backend.REST_API + 'resetpsw',
            success: function () {
                view.el.unmask()
                view.tipsHome.msg('',Locale.t('dip.forms.utente.changepsw.btn.change.successchange'));
                view.scopeThis.onCloseChangePsw();
            },
            failure: function (response) {
                view.el.unmask()
                let resp = Ext.decode(response.responseText);
                Ext.Msg.show({
                    title: Locale.t('global.errore'),
                    msg: resp['msg'],
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        });
    },
    onResetSend: function () {
        let view = this;
        let msgerror = this.down('#msgerror')
        msgerror.update('')
        const id = this.userId
        view.el.mask(Locale.t('global.actions.incorso') )
        Ext.Ajax.request({
            method: 'POST',
            params: {
                'email': this.down('#email').value,
                'iduser': id
            },
            url: Backend.REST_API + 'sendpsw',
            success: function () {
                view.el.unmask()
                view.tipsHome.msg('',Locale.t('dip.forms.utente.changepsw.btn.change.successsend'));
                view.scopeThis.onCloseChangePsw();
            },
            failure: function (response) {
                view.el.unmask()
                let resp = Ext.decode(response.responseText);
                Ext.Msg.show({
                    title: Locale.t('global.errore'),
                    msg: resp['msg'],
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.ERROR
                });
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
        if (psw !== pswr || strength<5) {
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
    validateEmail: function (email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});