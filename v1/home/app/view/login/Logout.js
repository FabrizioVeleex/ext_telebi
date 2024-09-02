Ext.define('home.view.login.Logout', {
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
        bodyPadding: 10,
        bodyStyle:{
            'background-color':'white',
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
                'background-color':'white'
            },
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            items: [{
                action:'OUT',
                xtype: 'button',
                text: Locale.t('global.logout.btn.conferma'),
                handler: 'onLogout'
            },{
                action:'IN',
                xtype: 'button',
                text: Locale.t('global.logout.btn.annulla'),
                handler: 'onLogout'
            }]
        }]
    })]
});