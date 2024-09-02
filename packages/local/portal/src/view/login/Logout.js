Ext.define('portal.view.login.Logout', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.layout.container.HBox',
        'Ext.form.*',
        'Ext.Button'
    ],

    layout: {
        type: 'hbox',
        align: 'center',
        pack: 'center'
    },
    bodyStyle:{
        'background-color':'transparent'
    },
    items: [Ext.create('Ext.form.Panel',{
        reference: 'logoutform',
        bodyPadding: 10,
        bodyStyle:{
            'background-color':'transparent',
            'text-align':'center'
        },
        items: [
            {
                xtype:'component',
                autoEl:{
                    tag:'div',
                    html:'<div class="defaultLogo"></div>'
                }
            },
            {
                xtype: 'component',
                reference:'messageLogout',
                anchor: '100%',
                userCls:'font-company',
                style:'font-weight: bold;padding:20px 0;',
                html: '<h3>'+Locale.t('global.confermilogout')+'</h3>'
            }
        ],
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            style:{
                'background-color':'transparent'
            },
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            items: [{
                action:'OUT',
                xtype: 'button',
                text: Locale.t('global.conferma'),
                handler: 'onLogout'
            },{
                action:'IN',
                xtype: 'button',
                text: Locale.t('global.annulla'),
                handler: 'onLogout'
            }]
        }]
    })]
});