/**
 * Created by luke on 26/08/21.
 */
Ext.define('home.view.dashboard.widgets.worf.view.note.Panel', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.field.TextArea',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'Ext.panel.Panel',
        'home.view.dashboard.widgets.worf.view.note.Controller',
        'home.view.dashboard.widgets.worf.view.note.Model'
    ],
    ui:'worf',
    border:true,
    viewModel:'v1-worfnote',
    controller:'v1-worfnote',
    layout: {
        type: "vbox", align: "stretch"
    },
    header: {
        itemPosition: 1,
        items: [
            {xtype:'button', margin :'10 10 10 10', iconCls: 'x-fas fa-check-circle',ui:'green',tooltip:Locale.t('worf.note.salva'), handler: 'onSaveNota',
                bind:{hidden:'{hidesavenote}'}
            },
            {xtype:'button', margin :'10 10 10 10', iconCls: 'x-fas fa-window-close',tooltip:Locale.t('worf.note.chiudi'), handler: 'onClosePannelloNote'}
        ]
    },
items: [
        {xtype:'container', flex:1,
            layout: {type: "hbox", align: "stretch"},
            items:[
                {xtype: 'textarea', margin: 5, flex:1, autoScroll: true, overflow: 'auto',
                    bind: {value: '{recnote}',readOnly: '{readOnlyNote}'
                    }
                }
            ]
        }
    ],
    listeners:{
        afterRender:'onAfterRender'
    }
});