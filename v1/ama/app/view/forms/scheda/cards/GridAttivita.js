/**
 * Created by luke on 30/01/23.
 */
Ext.define('ama.view.forms.scheda.cards.GridAttivita', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.ActionColumn',
        'Ext.grid.DateColumn',
        'Ext.button.Button'
    ],
    minHeight: 120,
    bind: {
        store: '{storeAttivita}'
    },
    viewConfig:{
        getRowClass: function(record){
            return (record.get('action')===2) ? "bd-deleterow" : "";
        }
    },
    dockedItems: [{
        xtype: 'toolbar', dock: 'top', items: [
            {xtype: 'button', iconCls: 'fa fa-plus', text: Locale.t('ama.forms.scheda.gridattivita.nuovo'),
                tooltip: Locale.t('ama.forms.scheda.gridattivita.nuovotooltip'),
                handler: 'onNuovaAttivita',
                bind:{hidden:'{readOnly}'}
            }
        ]
    }],
    columns: [{
        xtype: 'actioncolumn',
        menuDisabled:true,
        resizable:false,
        sortable:false,
        width: 30,
        items: [{
            getClass: function(view, meta, record ){
                let vm = this.lookupViewModel()
                if (vm.get('readOnly')) {
                    return false
                }
                if (record.get('step')===90) {
                    return false;
                }
                return 'x-fas fa-minus-circle';
            },
            handler: 'onRimuoviAttivita'
        }]},
        {xtype: 'actioncolumn', width: 30, menuDisabled:true, resizable:false,
            items: [{
                handler: 'onCarica', iconCls: 'x-fas fa-eye',
                tooltip: Locale.t('global.openrecord')
            }]
        },
        {text: Locale.t('ama.forms.scheda.gridattivita.descrizione'), menuDisabled:true,
            resizable:false, sortable:false, dataIndex: 'descrizione', flex:1
        },
        {width:250, text: Locale.t('ama.forms.scheda.gridattivita.risorsa'), menuDisabled: true, resizable: false, sortable: false,
            dataIndex: 'risorsa'
        },
        {width:120,  text: Locale.t('ama.forms.scheda.gridattivita.fine'),menuDisabled: true, resizable: false, sortable: false,
            xtype: 'datecolumn', format: 'd/m/Y',dataIndex: 'fine'
        },
        {width:100, text: Locale.t('ama.forms.scheda.gridattivita.chiusa'), menuDisabled: true, resizable: false, sortable: false,
            xtype: 'datecolumn', format: 'd/m/Y',dataIndex: 'chiusa'
        },
        {width:150,text: Locale.t('ama.forms.scheda.gridattivita.stato'), menuDisabled: true, resizable: false, sortable: false,
            dataIndex: 'stato'
        }
    ],
    items: [
        /* include child components here */
    ]
});