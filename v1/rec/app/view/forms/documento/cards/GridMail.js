/**
 * Created by luke on 17/03/21.
 */
Ext.define('rec.view.forms.documento.cards.GridMail', {
    extend:'portal.v1.view.forms.grids.DefaultGrid',
    requires: [
        'Ext.grid.column.Action',
        'Ext.grid.column.Date'
    ],
    minHeight: 120,
    bind: {
        store: '{storemail}'
    },
    columns: [
        {xtype: 'actioncolumn', width: 30, menuDisabled:true,
            items: [{
                handler: 'onOpenmail', iconCls: 'x-fas fa-eye', tooltip: Locale.t('global.openrecord')
            }]
        },
        {xtype: 'actioncolumn', width: 30, menuDisabled:true,
            items: [{
                getClass: function(v, metadata, r) {
                    if(r.data.letto === 'S') {
                        if (r.data.dataletto!=='') {
                            let dataletto =Ext.Date.format(r.data.dataletto, 'd/m/Y H:i:s');
                            metadata.tdAttr = 'data-qtip="' + Locale.t('rec.forms.documento.gridmail.letto') + ' '+dataletto+'"';
                        } else {
                            metadata.tdAttr = 'data-qtip="' + Locale.t('rec.forms.documento.gridmail.letto');
                        }
                        return "x-fas fa-envelope bd-color-orange";
                    }
                    //scaricato
                    if(r.data.letto === 'T') {
                        let dataletto =Ext.Date.format(r.data.dataletto, 'd/m/Y H:i:s');
                        metadata.tdAttr = 'data-qtip="' + Locale.t('rec.forms.documento.gridmail.scaricato') + ' '+dataletto+'"';
                        return "x-fas fa-envelope bd-color-green";
                    }
                    return "null";
                }
            }]
        },
        {text: Locale.t('rec.forms.documento.gridmail.datedoc'), width:180, menuDisabled: true,
            dataIndex: 'creationdate',xtype: 'datecolumn', format: 'd/m/Y H:i:s'
        },
        {text: Locale.t('rec.forms.documento.gridmail.autore'), width:200, menuDisabled: true,
            dataIndex: 'autore'
        },
        {text: Locale.t('rec.forms.documento.gridmail.mailto'), width:250, menuDisabled: true,
            dataIndex: 'mailto'
        },
        {text: Locale.t('rec.forms.documento.gridmail.subject'), flex:1, menuDisabled: true,
            dataIndex: 'subject'
        }
    ],
    items: [
        /* include child components here */
    ]
});