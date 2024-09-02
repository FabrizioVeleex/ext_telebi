/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wvoi.Main', {
    extend: 'portal.v1.widget.Panel',
    requires:[
        'Ext.button.Button',
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'home.view.dashboard.widgets.wvoi.MainController',
        'home.view.dashboard.widgets.wvoi.MainModel',
        'home.view.dashboard.widgets.wvoi.SearchDay',
        'home.view.dashboard.widgets.wvoi.store.ComboDays'
    ],
    controller:'v1-widgetvoi',
    viewModel:'v1-widgetvoi',
    ui:'blue',
    height: 400,
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        reference:'widgetvoitoolbar',
        items: [
            {xtype: 'button', iconCls: 'pictos pictos-refresh',handler: 'onloadChart'},
            {xtype:'label',html:Locale.t('widgetvoice.ggstart')},
            {xtype: 'v1-wvoi-searchday', reference:'wvoidatastart',
                bind: { value: '{dinizio}'}
            },
            {xtype: 'combo',reference:'days',
                hidden:true,
                width:80,
                store:Ext.create('home.view.dashboard.widgets.wvoi.store.ComboDays'),
                queryMode: 'local',
                displayField: 'day',
                valueField: 'day',
                forceSelection:true,
                editable:false,
                bind: { value: '{dayscombo}'}
            }
        ]
    }],
    items: [

    ],
    listeners:{
        afterRender:'onAfterRender'
    }
});
