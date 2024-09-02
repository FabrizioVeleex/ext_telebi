/**
 * Created by luke on 06/12/2019.
 */
Ext.define('vms.view.forms.prodotto.cards.GridControlli', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.ActionColumn',
        'Ext.grid.DateColumn',
        'Ext.util.Format'
    ],
    minHeight: 250,
    bind: {
        store: '{storeControlli}'
    },
    columns: [
        {xtype: 'actioncolumn', menuDisabled:true, resizable:false, sortable:false,width: 30,
            items: [{
                getClass: function(view, meta,r){
                    if (r.data.stato===0) {
                        meta.tdAttr = 'data-qtip="' + Locale.t('global.btn.openrecord')+'"';
                        return 'x-fas fa-eye';
                    } else {
                        meta.tdAttr = 'data-qtip="' + Locale.t('vms.forms.prodotto.grids.controlli.verbale')+'"';
                        return 'x-fas fa-file-pdf bd-color-red';
                    }
                },
                handler: 'onOpenControllo'
            }]
        },
        {width:100, menuDisabled: true, resizable: false, sortable: false,
            dataIndex: 'numero', text: Locale.t('vms.forms.prodotto.grids.controlli.numero')
        },
        {flex:1, menuDisabled: true, resizable: false, sortable: false,
            dataIndex: 'tipologia', text: Locale.t('vms.forms.prodotto.grids.controlli.tipologia')
        },
        {width:250, menuDisabled: true, resizable: false, sortable: false,
            dataIndex: 'matricola', text: Locale.t('vms.forms.prodotto.grids.controlli.matricola')
        },
        {width:150, menuDisabled: true, resizable: false, sortable: false,
            xtype: 'datecolumn', format: 'd/m/Y',dataIndex: 'datac', text: Locale.t('vms.forms.prodotto.grids.controlli.datacontrollo')
        },
        {width:150, menuDisabled: true, resizable: false, sortable: false,
            xtype: 'datecolumn', format: 'd/m/Y',dataIndex: 'datasca', text: Locale.t('vms.forms.prodotto.grids.controlli.datasca'),
            renderer: function (v,m,r) {
                if (r.data.stato === 0) {
                    return Ext.util.Format.date(v, 'd/m/Y')
                } else {
                    return '';
                }
            }
        }
    ],
    items: []
});