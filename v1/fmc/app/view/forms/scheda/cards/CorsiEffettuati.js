/**
 * Created by luke on 06/12/2019.
 */
Ext.define('fmc.view.forms.scheda.cards.CorsiEffettuati', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.ActionColumn',
        'Ext.grid.DateColumn'
    ],
    minHeight: 120,
    bind: {
        store: '{storeEffettuati}'
    },
    columns: [
        {xtype: 'actioncolumn', width: 30, menuDisabled:true,
            items: [{
                getClass: function(v, metadata, r) {
                    if(r.get('valido')===1) {
                        metadata.tdAttr = 'data-qtip="'+Locale.t('fmc.forms.scheda.gridcorsi.valido')+'"';
                        return "bd-action-null x-fas fa-circle bd-color-green";
                    } else {
                        if(r.get('valido')===0) {
                            metadata.tdAttr = 'data-qtip="'+Locale.t('fmc.forms.scheda.gridcorsi.inscadenza')+'"';
                            return "bd-action-null x-fas fa-circle bd-color-orange";
                        } else {
                            if(r.get('valido')===-1) {
                                metadata.tdAttr = 'data-qtip="'+Locale.t('fmc.forms.scheda.gridcorsi.scaduto')+'"';
                                return "bd-action-null x-fas fa-circle bd-color-red";
                            } else {
                                metadata.tdAttr = 'data-qtip="' +Locale.t('fmc.forms.scheda.gridcorsi.storico')+'"';
                                return "bd-action-null x-fas fa-circle bd-color-grey";
                            }
                        }
                    }
                }
            }]
        },
        {xtype: 'actioncolumn', width: 30, menuDisabled:true, resizable:false,
            items: [{tooltip: Locale.t('global.openrecord'), iconCls: 'x-fas fa-eye',iduser:false,
                handler: 'onOpenCorso'
        }]
        },
        {xtype: 'actioncolumn', width: 30, menuDisabled:true,resizable:false, sortable:false,
            items: [{
                getClass: function(v, metadata, r) {
                    if(r.get('aggiornato') !== '') {
                        metadata.tdAttr = 'data-qtip="' + Locale.t('fmc.forms.scheda.gridcorsi.aggiornato')+r.get('aggiornato')+ '"';
                        return "bd-action-null x-fas fa-info-circle bd-color-blue";
                    }
                    return "bd-action-null";
                }
            }]
        },
        {xtype: 'actioncolumn', menuDisabled:true, resizable:false, sortable:false,width: 30,
            items: [{
                getClass: function(view, meta){
                    meta.tdAttr = 'data-qtip="' + Locale.t('fmc.forms.scheda.gridcorsi.verbale')+'"';
                    return 'x-fas fa-file-pdf bd-color-red';
                },
                iduser:true,handler: 'onOpenCorso'
            }]
        },
        {flex:1, menuDisabled: true, resizable: false, sortable: false,
            dataIndex: 'tipologia', text: Locale.t('fmc.forms.scheda.gridcorsi.titolo')
        },
        {width:120, menuDisabled: true, resizable: false, sortable: false,
            xtype: 'datecolumn', format: 'd/m/Y',dataIndex: 'datac', text: Locale.t('fmc.forms.scheda.gridcorsi.datac')
        },
        {width:120, menuDisabled: true, resizable: false, sortable: false,
            xtype: 'datecolumn', format: 'd/m/Y',dataIndex: 'datasca', text: Locale.t('fmc.forms.scheda.gridcorsi.datasca')
        },
        {width:250, menuDisabled: true, resizable: false, sortable: false,
            dataIndex: 'mansione', text: Locale.t('fmc.forms.scheda.gridcorsi.mansione')
        }
    ],
    items: []
});