/**
 * Created by luke on 06/12/2019.
 */
Ext.define('fmc.view.forms.scheda.cards.CorsiPrevisti', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.ActionColumn',
        'Ext.grid.DateColumn'
    ],
    minHeight: 120,
    bind: {
        store: '{storePrevisti}'
    },
    columns: [
        {xtype: 'actioncolumn', width: 30, menuDisabled:true, resizable:false,
            items: [{
                tooltip: Locale.t('global.openrecord'), iconCls: 'x-fas fa-eye',
                handler: 'onOpenCorso'
            }]
        },
        {xtype: 'actioncolumn', width: 30, menuDisabled:true,resizable:false, sortable:false,
            items: [{
                getClass: function(v, metadata, r) {
                    if(r.get('aggiornato') !== '') {
                        metadata.tdAttr = 'data-qtip="' + Locale.t('fmc.forms.schedascheda.gridcorsi.aggiornato')+r.get('aggiornato')+ '"';
                        return "bd-action-null x-fas fa-info-circle bd-color-blue";
                    }
                    return "bd-action-null";
                }
            }]
        },
        {width:120, menuDisabled: true, resizable: false, sortable: false,
            xtype: 'datecolumn', format: 'd/m/Y',dataIndex: 'datac', text: Locale.t('fmc.forms.scheda.gridcorsi.datac')
        },
        {flex:1, menuDisabled: true, resizable: false, sortable: false,
            dataIndex: 'tipologia', text: Locale.t('fmc.forms.scheda.gridcorsi.titolo')
        }
    ],
    items: []
});