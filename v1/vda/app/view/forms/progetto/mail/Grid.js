/**
 * Created by luke on 17/03/21.
 */
Ext.define('vda.view.forms.progetto.mail.Grid', {
    extend:'portal.v1.view.forms.grids.DefaultGrid',
    requires: [
        'Ext.grid.column.Action',
        'Ext.grid.column.Date'
    ],
    minHeight: 120,
    bind: {
        store: '{storeMail}'
    },
    columns: [
        {xtype: 'actioncolumn', width: 30, menuDisabled:true,
            items: [{
                handler: 'onOpenMail', iconCls: 'x-fas fa-eye', tooltip: Locale.t('global.openrecord')
            }]
        },
        {text: Locale.t('vda.forms.progetto.gridmail.columns.creationdate'), width:180, menuDisabled: true,
            dataIndex: 'creationdate',xtype: 'datecolumn', format: 'd/m/Y H:i:s'
        },
        {text: Locale.t('vda.forms.progetto.gridmail.columns.autore'), width:200, menuDisabled: true,
            dataIndex: 'autore'
        },
        {text: Locale.t('vda.forms.progetto.gridmail.columns.mailto'), width:250, menuDisabled: true,
            dataIndex: 'mailto'
        },
        {xtype: 'actioncolumn', width: 20, menuDisabled:true,
            items: [{
                getClass: function(v, metadata, r) {
                    if(r.data.attachments > 0) {
                        metadata.tdAttr = 'data-qtip="' + Locale.t('vda.forms.progetto.gridmail.columns.allegati') + ' '+r.data.attachments+'"';
                        return "fas fa-paperclip";
                    }
                    return "null";
                }
            }]
        },
        {text: Locale.t('vda.forms.progetto.gridmail.columns.subject'), flex:1, menuDisabled: true,
            dataIndex: 'subject'
        },
        {text: Locale.t('vda.forms.progetto.gridmail.columns.descit'), width:200, menuDisabled: true,
            dataIndex: 'descit'
        }
    ],
    items: [
        /* include child components here */
    ]
})