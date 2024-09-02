Ext.define('portal.v1.view.forms.login.Forbidden', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.form.*',
        'Ext.layout.container.HBox',
        'portal.util.Locale'
    ],

    layout: {
        type: 'hbox',
        align: 'center',
        pack: 'center'
    },
    bodyStyle:{
        'background-color':'red'
    },
    items: [Ext.create('Ext.form.Panel',{
        bodyStyle:{
            'background-color':'transparent',
            'text-align':'center'
        },
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
                text: Locale.t('global.btn.closeapp.text'),
                handler: function(){
                    if (typeof(myFrame) !== 'undefined' )
                        myFrame.fireEvent('closeMe',myFrame);
                }
            }]
        }],
        items: [
            {
                xtype:'component',
                autoEl:{
                    tag:'div',
                    html:'<div style="align=width: 50%; margin: 0 auto;" class="defaultLogo"></div>'
                }
            },
            {
                xtype: 'component',
                anchor: '100%',
                userCls:'font-company',
                style:'font-weight: bold;padding:20px 0;',
                html: '<div style="height:40px;max-width:400px;color:white;font-weight:bold;font-size:xx-large;">403 - FORBIDDEN</div>' +
                    '<div style="line-height:1.5;max-width:400px;color:white;font-weight:bold;font-size:large;">'+Locale.t('global.login.forbidden')+'</div>'
            }
        ]
    })]
});