Ext.define('home.view.imp.cards.ChangePassword', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.layout.container.HBox',
        'Ext.panel.Panel',
        'portal.v1.view.forms.fields.AfterLabelInfo'
    ],
    width:450,
    defaults: {
        msgTarget: 'under',
        labelAlign: 'top',
        margin: 5
    },
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            layout: {
                pack: 'center'
            },
            style: {'background-color': 'transparent'},
            items: [
                {
                    scale: 'large', text: Locale.t('home.impostazioni.profilo'),
                    cls: 'bd-btn-radius', iconCls: 'x-fas fa-user fa-size-32',
                    ui: 'ocra',
                    handler: 'goToInfo'
                }
            ]
        }],
    items: [
        {
            xtype: 'panel',
            hidden: true,
            title:Locale.t('global.login.change.titlenext'),
            itemId:'completePanel',
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
                    labelWidth: 180,
                    itemId: 'oldpsw',
                    width: 430,
                    fieldLabel: Locale.t('global.login.oldpsw'),
                    value: '',
                    enableKeyEvents: true,
                    inputType: 'password'
                },
                {
                    xtype: 'textfield',
                    labelWidth: 180,
                    itemId: 'psw',
                    width: 430,
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
                    width: 245,
                    style: 'margin-left:185px;padding-bottom:10px;',
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
                    labelWidth: 180,
                    fieldLabel: Locale.t('global.login.pswr'),
                    width: 430,
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
                    width: 245,
                    style: 'margin-left:185px;padding-bottom:5px;',
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
});