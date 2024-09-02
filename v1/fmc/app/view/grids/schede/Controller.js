/**
 * Created by luca on 16/02/2017.
 */
Ext.define('fmc.view.grids.schede.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.schede',
    requires:[
        'Ext.grid.column.Action',
        'fmc.model.grids.Schede',
        'fmc.view.forms.scheda.Panel',
        'portal.util.Functions'
    ],
    init: function () {
        this.callParent(arguments)
    },
    //funzione x gestire tasti
    checkColumn: function() {
        let nodo=this.getView().infoNode;
        if (!nodo) {
            return;
        }
        this.toolbar.removeAll(true)
        this.toolbar.add({handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'})
        if (nodo.itemId==='attivi' && this.checkRuoli(['99','10','1'])){
            this.toolbar.add({
                tooltip: Locale.t('fmc.grids.schede.btn.new.tooltip'),
                text: Locale.t('fmc.grids.schede.btn.new.text'),
                ui: 'green',
                iconCls: 'x-fas fa-plus',
                handler: 'onNew'
            });
        }
    },
    onNew: function() {
        let view = this.getView().view; //view della grid
        let NewRecord = Ext.create('fmc.model.grids.Schede',{
            id :bdFunctions.bpRandomString(32),
            isnew:1
        });
        this.createForm(view,NewRecord,1);
    },
    createForm: function(view,record,isnew){
        let itemId = 'f' + record.data['id'];
        if (this.getView().fireEvent('checkForm',itemId)){
            return
        }
        this.getView().fireEvent('createTab',Ext.create('fmc.view.forms.scheda.Panel', {
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
            {text: Locale.t('fmc.grids.schede.column.matricola'), dataIndex: 'matricola', width:90,filter: {type: 'string'}},
            {text: Locale.t('fmc.grids.schede.column.nome'), dataIndex: 'nome', width:200,filter: {type: 'string'}},
            {text: Locale.t('fmc.grids.schede.column.cognome'), dataIndex: 'cognome', width:200,filter: {type: 'string'}},
            {text: Locale.t('fmc.grids.schede.column.sede'), dataIndex: 'sede', width:200,filter: {type: 'string'}},
            {text: Locale.t('fmc.grids.schede.column.mansione'), dataIndex: 'mansione', width:300,filter: {type: 'string'}},
            {text: Locale.t('fmc.grids.schede.column.mansioni'), dataIndex: 'mansioni', flex:1,filter: {type: 'string'}}
        ]
        this.callParent(arguments)
    }
})