/**
 * Created by luke on 04/05/21.
 */
Ext.define('impexp.view.forms.importazione.cards.Importazione', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.field.HtmlEditor',
        'Ext.form.field.Text',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    items: [
        {xtype: "container", flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: "textfield", hidden:true,
                    bind: {value: "{record.codice}"}
                },
                {xtype: "htmleditor", flex: 1, readOnly:true,autoScroll: true, style: "font-size:14px;",minHeight:300,
                    bind: {value: "{record.note}"}
                }
            ]
        }
    ]
});