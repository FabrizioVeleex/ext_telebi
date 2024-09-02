/**
 * Created by luke on 06/12/2019.
 */
Ext.define('vms.view.forms.prodotto.cards.GridInterventi', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.ActionColumn',
        'Ext.grid.DateColumn'
    ],
    minHeight: 250,
    bind: {
        store: '{storeInterventi}'
    },
    columns: [
        {xtype: 'actioncolumn', width: 30, menuDisabled:true,
            items: [{
                getClass: function(v, metadata, r) {
                    if(r.get('stato')===0) {
                        metadata.tdAttr = 'data-qtip="'+Locale.t('vms.forms.prodotto.grids.interventi.previsto')+'"';
                        return "bd-action-null x-fas fa-calendar-check bd-color-green";
                    } else {
                        if(r.get('valido')===1) {
                            metadata.tdAttr = 'data-qtip="'+Locale.t('vms.forms.prodotto.grids.interventi.valido')+'"';
                            return "bd-action-null x-fas fa-check-square bd-color-green";
                        } else {
                            if(r.get('valido')===0) {
                                metadata.tdAttr = 'data-qtip="'+Locale.t('vms.forms.prodotto.grids.interventi.inscadenza')+'"';
                                return "bd-action-null x-fas fa-check-square bd-color-orange";
                            } else {
                                if(r.get('valido')===-1) {
                                    metadata.tdAttr = 'data-qtip="'+Locale.t('vms.forms.prodotto.grids.interventi.scaduto')+'"';
                                    return "bd-action-null x-fas fa-check-square bd-color-red";
                                } else {
                                    metadata.tdAttr = 'data-qtip="' +Locale.t('vms.forms.prodotto.grids.interventi.storico')+'"';
                                    return "bd-action-null x-fas fa-check-square bd-color-grey";
                                }
                            }
                        }
                    }
                }
            }]
        },
        {xtype: 'actioncolumn', width: 30, menuDisabled:true,
            items: [{
                getClass: function(v, metadata, r) {
                    if(r.get('stato')>0) {
                        if(r.get('esito')===1) {
                            metadata.tdAttr = 'data-qtip="'+Locale.t('vms.forms.prodotto.grids.interventi.positivo')+'"';
                            return "bd-action-null x-fas fa-circle bd-color-green";
                        } else {
                            metadata.tdAttr = 'data-qtip="'+Locale.t('vms.forms.prodotto.grids.interventi.negativo')+'"';
                            return "bd-action-null x-fas fa-circle bd-color-red";
                        }
                    } else {
                        return "bd-action-null";
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
                        meta.tdAttr = 'data-qtip="' + Locale.t('vms.forms.prodotto.grids.interventi.verbale')+'"';
                        return 'x-fas fa-file-pdf bd-color-red';
                    }
                },
                handler: 'onOpenControllo'
            }]
        },
        {width:100, menuDisabled: true, resizable: false, sortable: false,
            dataIndex: 'numero', text: Locale.t('vms.forms.prodotto.grids.interventi.numero')
        },
        {width:250, menuDisabled: true, resizable: false, sortable: false,
            dataIndex: 'matricola', text: Locale.t('vms.forms.prodotto.grids.interventi.matricola')
        },
        {width:150, menuDisabled: true, resizable: false, sortable: false,
            xtype: 'datecolumn', format: 'd/m/Y',dataIndex: 'datac', text: Locale.t('vms.forms.prodotto.grids.interventi.datac')
        }
    ],
    items: []
});