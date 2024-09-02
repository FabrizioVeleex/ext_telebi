Ext.define('portal.view.login.BeforeChangePassword', {
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
                html:'<div style="background-position: center;" class="defaultLogo"></div><hr>'
            }
        },
        {
            xtype:'component',
            anchor: '100%',
            userCls:'font-company',
            style:'font-weight: bold;',
            html:Locale.t('global.login.beforelost')
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
                iconCls:'x-fa fa-support',
                handler: 'onBtnReturnLogin'
            }
        ]
    }]
});