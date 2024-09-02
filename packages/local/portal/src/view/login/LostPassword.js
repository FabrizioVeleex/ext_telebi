Ext.define('portal.view.login.LostPassword', {
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
            html:Locale.t('global.login.requestpassword')+'<hr>'
        },
        {
            xtype:'component',
            anchor: '100%',
            userCls:'font-company',
            // style:'font-weight: bold;',
            html:'<i>'+Locale.t('global.login.infolost')+'</i><hr>'
        },
        {
            xtype: 'textfield',
            anchor: '100%',
            allowBlank:false,
            cls:'bd-field-login',
            fieldLabel: Locale.t('global.login.email'),
            maxLength: 50,
            name:'email',
            triggers: {
                at: {
                    cls: 'x-fa fa-user trigger-field',
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
                text: Locale.t('global.login.send'),
                iconCls:'x-fa fa-paper-plane',
                handler: 'onBtnRequestPassword'
            }]
    }]
});