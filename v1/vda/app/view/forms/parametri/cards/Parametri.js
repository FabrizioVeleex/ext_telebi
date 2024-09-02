/**
 * Created by luca on 16/07/2018.
 */
Ext.define('vda.view.forms.parametri.cards.Parametri', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.field.ComboBox',
        'Ext.layout.container.HBox'
    ],
    scrollable: 'y',
    items: [
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'combobox', fieldLabel: Locale.t('vda.forms.parametri.fields.idcategoria'),
                    displayField: 'descrizione', editable:false,width:400,
                    valueField: 'id',autoLoadOnValue:true,forceSelection:true,
                    bind: {
                        store: '{storeCategorie}',
                        value: '{record.idcategoria}'
                    }
                }
            ]
        }
    ]
});