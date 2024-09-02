/**
 * Created by luke on 06/12/2019.
 */
Ext.define('fmc.view.forms.scheda.cards.GridCheck', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.ActionColumn',
        'Ext.grid.DateColumn'
    ],
    minHeight: 120,
    bind: {
        store: '{storeCheck}'
    },
    columns: [
        {xtype: 'actioncolumn', width: 30, menuDisabled:true, resizable:false,
            items: [{
                tooltip: Locale.t('global.openrecord'),iconCls: 'x-fas fa-eye',iduser:false,
                handler: 'onOpenCheck',
            }]
        },
        {xtype: 'actioncolumn', width: 30, menuDisabled:true,
            items: [{
                getClass: function(v, metadata, r) {
                    metadata.tdAttr = 'data-qtip="' + r.get('statocheck')+'"';
                    if(r.get('esito') === 1) {
                        return "bd-action-null x-fas fa-circle bd-color-green";
                    }
                    if(r.get('esito') === -1) {
                        return "bd-action-null x-fas fa-circle bd-color-red";
                    }
                    return "bd-action-null x-fas fa-circle bd-color-yellow";
                }
            }]
        },
        {xtype: 'actioncolumn', width: 30, menuDisabled:true,
            items: [{
                getClass: function(v, metadata, r) {
                    if(r.get('stato') === 0) {
                        return "bd-action-null";
                    }
                    metadata.tdAttr = 'data-qtip="' + Locale.t('fmc.forms.scheda.gridcheck.verbale')+'"';
                    return 'x-fas fa-file-pdf bd-color-red';
                },
                iduser:true,handler: 'onOpenCheck'
            }]
        },
        {width:350, menuDisabled: true, resizable: false, sortable: false,
            dataIndex: 'titolo', text: Locale.t('fmc.forms.scheda.gridcheck.titolo')
        },
        {width:120, menuDisabled: true, resizable: false, sortable: false,
            xtype: 'datecolumn', format: 'd/m/Y',dataIndex: 'datachk', text: Locale.t('fmc.forms.scheda.gridcheck.datachk')
        },
        {width:250, menuDisabled: true, resizable: false, sortable: false,
            dataIndex: 'mansione', text: Locale.t('fmc.forms.scheda.gridcheck.mansione')
        },
        {text: Locale.t('fmc.forms.scheda.gridcheck.corso'), menuDisabled:true,
            resizable:false, sortable:false, dataIndex: 'corso', flex:1
        }
    ],
    items: []
});