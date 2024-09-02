Ext.define('home.view.login.Login', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.form.field.ComboBox',
        'Ext.form.field.Text',
        'Ext.layout.container.HBox'
    ],
    bodyPadding: 10,
    minWidth: 200,
    width: 400,
    defaults: {
        msgTarget: 'under',
        labelAlign: 'top',
        margin: 5
    },
    items: [
        {
            flex: 1,
            layout: {
                type: "hbox",
                align: 'center'
            },
            xtype: 'component',
            autoEl: {
                tag: 'div',
                html: '<div style="background-position: center;" class="defaultLogo"></div><hr>'
            }
        },
        {
            xtype: 'textfield',
            anchor: '100%',
            allowBlank: false,
            cls: 'bd-field-login',
            fieldLabel: Locale.t('global.login.user'),
            maxLength: 50,
            name: 'user',
            triggers: {
                at: {
                    cls: 'x-fa fa-user trigger-field',
                    side: 'left'
                }
            },
            listeners: {
                specialkey: 'onLogin'
            }
        },
        {
            xtype: 'textfield',
            anchor: '100%',
            allowBlank: false,
            cls: 'bd-field-login',
            fieldLabel: Locale.t('global.login.password'),
            maxLength: 50,
            inputType: 'password',
            name: 'password',
            triggers: {
                lock: {
                    cls: 'x-fa fa-lock trigger-field',
                    side: 'left'
                }
            },
            listeners: {
                specialkey: 'onLogin'
            }
        },
        {
            xtype: 'component',
            anchor: '100%',
            style: 'color: red;font-weight: bold;',
            bind: {
                html: '{loginMessage}'
            }
        },
        {
            xtype: 'combo',
            cls: 'bd-field-login',
            fieldLabel: 'Language',
            hidden: true,
            bind: {
                store: '{ll}',
                value: '{tr}',
                hidden: '{hiddenLn}'
            },
            width: 100,
            queryMode: 'local',
            forceSelection: true,
            name: 'ln',
            listConfig: {
                getInnerTpl: function (displayField) {
                    return '<img alt="Language" src="/images/language/{id}-icon.png" class="icon"/> {' + displayField + '}';
                }
            },
            displayField: 'label',
            valueField: 'id'
        }
    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        ui: 'footer',
        layout: {
            type: 'hbox',
            pack: 'center'
        },
        style: {
            'background-color': 'white'
        },
        items: [
            {
                iconCls: 'x-fas fa-lock-open',
                hidden: true,
                bind: {
                    hidden: '{hiddenChangePsw}'
                },
                text: Locale.t('global.login.lostpassword'),
                handler: 'onBtnLostPassword'
            },
            {
                iconCls: 'x-fas fa-sign-in-alt',
                text: Locale.t('global.login.login'),
                ui: 'green',
                handler: 'onBtnLogin'
            }]
    }],
    listeners: {
        afterRender: 'onAfterRenderLoginForm',
        keysubmit: 'onLogin'
    }
});