Ext.define('sgv.view.forms.segnalazione.cards.Esito', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.field.TextArea',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    items: [
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textarea',flex:1,autoScroll: true, overflow: 'auto',name:'note', hideLabel:true,
                    height: 100,bind:{value:'{record.esito}',readOnly: '{readOnlyGestore}'}
                }
            ]
        }
    ]
});