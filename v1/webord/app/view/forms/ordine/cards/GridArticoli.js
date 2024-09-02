/**
 * Created by luke on 13/05/2020.
 */
Ext.define('webord.view.forms.ordine.cards.GridArticoli', {
    extend: 'Ext.grid.Panel',
    minHeight: 120,
    bind: {
        store: '{storeArticoli}'
    },
    columns: [
        {text: Locale.t('webord.forms.ordine.articoli.progressivo_riga'),
        width:70, menuDisabled: true, resizable: false, sortable: false, dataIndex: 'progressivo_riga'
        },
        {text: Locale.t('webord.forms.ordine.articoli.codice_articolo'),
            width:200, menuDisabled: true, resizable: false, sortable: false, dataIndex: 'codice_articolo'
        },
        {text: Locale.t('webord.forms.ordine.articoli.descrizione'),
            flex:1, menuDisabled: true, resizable: false, sortable: false, dataIndex: 'descrizione'
        },
        {text: Locale.t('webord.forms.ordine.articoli.qta'),
            width:150, menuDisabled: true, resizable: false, sortable: false, dataIndex: 'qta'
        },
        {text: Locale.t('webord.forms.ordine.articoli.note'),
            width:300, menuDisabled: true, resizable: false, sortable: false, dataIndex: 'note'
        },
    ],
    items: [],
    listeners:{
        celldblclick  :function(cella, td, cellIndex, record) {
            if (record.data.note==='') {
                return false
            }
            if (cellIndex===4) {
                let wdwpanel = Ext.create('Ext.form.Panel', {
                    border: false, items: [
                        {xtype: 'box', html:record.data.codice_articolo+' - '+record.data.descrizione},
                        {xtype: 'box', html:record.data.note}
                    ]
                });
                let wndw = Ext.create('Ext.Window', {
                    title: Locale.t('webord.forms.ordine.articoli.note'),
                    width: 550, autoHeight: true, closable: true,
                    bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
                    modal: true, border: false, resizable: false, draggable: false,
                    items: [wdwpanel]
                });
                wndw.show();
            }
        }
    }
});