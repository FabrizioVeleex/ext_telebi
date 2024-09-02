/**
 * Created by luca on 14/10/16.
 */
Ext.define('home.view.widgets.wvoi.Main', {
    extend: 'Ext.panel.Panel',
    requires:[
        'home.view.widgets.wvoi.MainController',
        'home.view.widgets.wvoi.MainModel',
        'home.view.widgets.wvoi.SearchDay',
        'Ext.layout.container.VBox',
        'home.store.widgets.wvoi.ComboDays',
        'Ext.form.field.ComboBox',
        'Ext.form.Label',
        'Ext.button.Button'
    ],
    controller:'widgetvoi',
    viewModel:'widgetvoi',
    bodyPadding: 15,
    ui:'blue',
    animation: !Ext.isIE9m && Ext.os.is.Desktop,
    layout: {
        type: "vbox", align: "stretch"
    },
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        reference:'widgetvoitoolbar',
        items: [
            {xtype: 'button', iconCls: 'pictos pictos-refresh',handler: 'onloadChart'},
            {xtype:'label',html:Locale.t('widgetvoice.ggstart')},
            {xtype: 'wvoi-searchday', reference:'wvoidatastart',
                bind: { value: '{dinizio}'}
            },
            {xtype: 'combo',reference:'days',
                hidden:true,
                width:80,
                store:Ext.create('home.store.widgets.wvoi.ComboDays'),
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