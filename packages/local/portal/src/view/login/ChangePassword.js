Ext.define('portal.view.login.ChangePassword', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.layout.container.HBox',
        'Ext.form.field.Text'
    ],
    bodyPadding: 10,
    minWidth:200,
    width:400,
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
            xtype:'component',
            autoEl:{
                tag:'div',
                html:'<div style="background-position: center;" class="defaultLogo"></div>'
            }
        },
        {
            xtype:'component',
            anchor: '100%',
            userCls:'font-company',
            style:'font-weight: bold;font-size:16px;',
            html:Locale.t('global.login.changepassword')+'<hr>'
        },
        {
            xtype:'component',
            anchor: '100%',
            userCls:'font-company',
            // style:'font-weight: bold;',
            html:'<i>'+Locale.t('global.login.complpassword')+'</i><hr>'
        },
        {
            xtype: 'textfield',
            whidth: 150,
            allowBlank:false,
            cls:'bd-field-login',
            fieldLabel: Locale.t('global.login.code'),
            maxLength: 8,
            name:'code',
            triggers: {
                at: {
                    cls: 'x-fa fa-key trigger-field',
                    side: 'left'
                }
            }
        },
        {
            xtype: 'textfield',
            anchor: '100%',
            allowBlank:false,
            cls:'bd-field-login',
            fieldLabel: Locale.t('global.login.password'),
            maxLength: 50,
            inputType: 'password',
            name:'password',
            triggers: {
                lock: {
                    cls: 'x-fa fa-lock trigger-field',
                    side: 'left'
                }
            }
        },
        {
            xtype: 'textfield',
            anchor: '100%',
            allowBlank:false,
            cls:'bd-field-login',
            fieldLabel: Locale.t('global.login.password1'),
            maxLength: 50,
            inputType: 'password',
            name:'password1',
            triggers: {
                lock: {
                    cls: 'x-fa fa-lock trigger-field',
                    side: 'left'
                }
            }
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
        style:{
            'background-color':'transparent'
        },
        items: [
            {
                text: Locale.t('global.login.return'),
                iconCls:'x-fa fa-arrow-left',
                handler: 'onBtnReturnLogin'
            },
            {
                text: Locale.t('global.login.password1'),
                iconCls:'x-fa fa-key',
                handler: 'onBtnCodePassword'
            }
        ]
    }]
});