/**
 * Created by luke on 06/12/2019.
 */
Ext.define('vms.view.forms.prodotto.cards.GridControlliChiusi', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.ActionColumn',
        'Ext.grid.DateColumn',
        'Ext.util.Format'
    ],
    minHeight: 250,
    bind: {
        store: '{storeControlliChiusi}'
    },
    columns: [
        {xtype: 'actioncolumn', width: 30, menuDisabled:true,
            items: [{
                getClass: function(v, metadata, r) {
                    if(r.get('valido')===1) {
                        metadata.tdAttr = 'data-qtip="'+Locale.t('vms.forms.prodotto.grids.controlli.valido')+'"';
                        return "bd-action-null x-fas fa-check-square bd-color-green";
                    } else {
                        if(r.get('valido')===0) {
                            metadata.tdAttr = 'data-qtip="'+Locale.t('vms.forms.prodotto.grids.controlli.inscadenza')+'"';
                            return "bd-action-null x-fas fa-check-square bd-color-orange";
                        } else {
                            if(r.get('valido')===-1) {
                                metadata.tdAttr = 'data-qtip="'+Locale.t('vms.forms.prodotto.grids.controlli.scaduto')+'"';
                                return "bd-action-null x-fas fa-check-square bd-color-red";
                            } else {
                                metadata.tdAttr = 'data-qtip="' +Locale.t('vms.forms.prodotto.grids.controlli.storico')+'"';
                                return "bd-action-null x-fas fa-check-square bd-color-grey";
                            }
                        }
                    }
                }
            }]
        },
        {xtype: 'actioncolumn', width: 30, menuDisabled:true,
            items: [{
                getClass: function(v, metadata, r) {
                    if(r.get('esito')===1) {
                        metadata.tdAttr = 'data-qtip="'+Locale.t('vms.forms.prodotto.grids.controlli.positivo')+'"';
                        return "bd-action-null x-fas fa-circle bd-color-green";
                    } else {
                        metadata.tdAttr = 'data-qtip="'+Locale.t('vms.forms.prodotto.grids.controlli.negativo')+'"';
                        return "bd-action-null x-fas fa-circle bd-color-red";
                    }
                }
            }]
        },
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