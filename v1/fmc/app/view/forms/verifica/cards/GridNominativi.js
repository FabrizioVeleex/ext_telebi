/**
 * Created by luca on 17/06/2017.
 */
Ext.define('fmc.view.forms.verifica.cards.GridNominativi', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.ActionColumn'
    ],
    minHeight: 120,
    bind: {
        store: '{storeNominativi}'
    },
    viewConfig:{
        getRowClass: function(record){
            return (record.get('action')===2) ? "bd-deleterow bd-defaultrow" : "bd-defaultrow";
        }
    },
    columns: [
        {xtype: 'actioncolumn', menuDisabled:true, resizable:false, sortable:false, width: 30,
            items: [{
                getClass: function(){
                    return 'x-fas fa-minus-circle';
                },
                handler: function(view, rowIndex, colIndex, item, event, record){
                    let vm = this.lookupViewModel(),
                        grid = view.up('grid'),
                        lastrecord = grid.getStore().last();
                    if (vm.get('readOnly')) {
                        return false;
                    }
                    if (record.get('action') === 2) {
                        record.set('action', 0)
                    }else{
                        if (record.data.isnew===0){
                            record.set('action', 2)
                        }else{
                            if(lastrecord!==record){
                                view.getStore().remove(record);
                            }
                        }
                    }
                }
            }]
        },
        {text: Locale.t('fmc.forms.corso.gridutenti.nominativo'),
            width:500, menuDisabled: true, resizable: false, sortable: false, dataIndex: 'nomecognome'
        },
        {xtype: 'actioncolumn', menuDisabled:true, resizable:false, sortable:false,
            width: 30,
            items: [{
                getClass: function(view, meta, record){
                    if (record.get('readOnly')===true) {
                        return null;
                    }
                    meta.tdAttr = 'data-qtip="' + Locale.t('corso.firmautente')+'"';
                    return 'x-fas fa-pencil-alt';
                },
                handler: 'onFirmaUtente'
            }]
        },
        {text: Locale.t('fmc.forms.corso.gridutenti.firma'),headerWrap:true,
            flex:1, menuDisabled: true, resizable: false, sortable: false,
            dataIndex: 'firma',
            renderer: function(value,meta,record){
                if (value) {
                    return '<img src="/v1/getfirmauser/'+record.data.idrecord+'&'+value+'.png?dc=' + new Date().getTime()+'" width="300" height="23"  alt="Firma"/></src>';
                }
            }
        },
        {xtype: 'actioncolumn', menuDisabled:true, resizable:false, sortable:false,
            width: 30,
            items: [{
                getClass: function(view, meta, record){
                    if (record.get('readOnly')===true) {
                        return null;
                    }
                    if (record.get('isnew')===1) {
                        return null;
                    }
                    meta.tdAttr = 'data-qtip="' + Locale.t('fmc.forms.corso.gridutenti.pdfuser')+'"';
                    return 'x-fas fa-file-pdf bd-color-red';
                },
                handler: 'onGeneraPdf'
            }]
        }
    ]
});