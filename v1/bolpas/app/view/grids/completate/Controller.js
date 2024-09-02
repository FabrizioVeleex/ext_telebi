/**
 * Created by luca on 16/02/2017.
 */
Ext.define('bolpas.view.grids.completate.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.completate',
    requires:[
        'Ext.grid.column.Action',
        'Ext.grid.column.Date',
        'bolpas.view.forms.bolla.Panel'
    ],
    init: function () {
        //gestione menu
        this.listBtnTop = [
            {handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'}
        ]
        this.callParent(arguments)
    },
    checkColumn: function (griglia) {
        let nodo = this.getView().infoNode
        if (!nodo) {
            return;
        }
        let colonne = griglia.getColumns()
        //ciclo le colonne x nascondere/visualizzare cliente
        for (let i = 0, l = colonne.length; i < l; i++) {
            if (colonne[i].dataIndex === 'tipobolla') {
                if (nodo['idpadre'] !== 'NaN') {
                    colonne[i].hide();
                } else {
                    colonne[i].show();
                }
            }
            if (colonne[i].dataIndex === 'numreg') {
                if (nodo['idpadre'] === '1' || nodo['idpadre'] === '2') {
                    colonne[i].hide();
                } else {
                    colonne[i].show();
                }
            }
            if (colonne[i].dataIndex === 'datareg') {
                if (nodo['idpadre'] === '1' || nodo['idpadre'] === '2') {
                    colonne[i].hide();
                } else {
                    colonne[i].show();
                }
            }
        }
    },
    createForm: function(view,record,isnew){
        let itemId = 'f' + record.data['id'];
        if (this.getView().fireEvent('checkForm',itemId)){
            return
        }
        this.getView().fireEvent('createTab',Ext.create('bolpas.view.forms.bolla.Panel', {
            itemId: 'f' + record.data['id'],
            record: record,
            valori: {
                id: record.data['id'],
                isnew: isnew
            }
        }),view)
    },
    onafterrendergrid: function (grid) {
        grid.myColumns =[
            {xtype: 'actioncolumn', width: 30, menuDisabled:true, resizable:false,dataIndex:'action1',
                items: [{handler: 'onOpen', iconCls: 'x-fas fa-eye', tooltip: Locale.t('global.btn.open.text')}]
            },
            {text: Locale.t('bolpas.grids.column.tipobolla'), dataIndex: 'tipobolla', width:180,filter: {type: 'string'}},
            {text: Locale.t('bolpas.grids.column.datadoc'),dataIndex: 'datadoc', width: 100, xtype: 'datecolumn', format: 'd/m/Y', filter: {type: 'date',dateFormat: 'Ymd'}},
            {text: Locale.t('bolpas.grids.column.numero'), dataIndex: 'numero', width:180,filter: {type: 'string'}},
            {text: Locale.t('bolpas.grids.column.numreg'),dataIndex: 'numreg', width: 150,filter: {type: 'string'}},
            {text: Locale.t('bolpas.grids.column.datareg'),dataIndex: 'datareg', width: 100, xtype: 'datecolumn', format: 'd/m/Y', filter: {type: 'date',dateFormat: 'Ymd'}},
            {text: Locale.t('bolpas.grids.column.dataclose'),dataIndex: 'dataclose', width: 100, xtype: 'datecolumn', format: 'd/m/Y', filter: {type: 'date',dateFormat: 'Ymd'}},
            {text: Locale.t('bolpas.grids.column.soggetto'), dataIndex: 'soggetto',flex:1,filter: {type: 'string'}}
        ]
        this.callParent(arguments)
    }
})