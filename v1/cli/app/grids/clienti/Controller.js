/**
 * Created by luca on 16/02/2017.
 */
Ext.define('cli.grids.clienti.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.v1-clienti',
    requires:[
        'Ext.grid.column.Action',
        'cli.forms.cliente.Panel',
        'cli.grids.clienti.Model',
        'portal.util.Functions'
    ],
    init: function () {
        this.callParent(arguments)
    },
    //funzione x gestire tasti
    checkColumn: function(griglia) {
        let nodo=this.getView().infoNode;
        if (!nodo) {
            return;
        }
        this.toolbar.removeAll(true)
        this.toolbar.add({handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'})
        if (nodo.itemId==='clienti' && this.checkRuoli(['99','2'])){
            this.toolbar.add({
                tooltip: Locale.t('cli.grids.clienti.btn.new.tooltip'),
                text: Locale.t('cli.grids.clienti.btn.new.text'),
                ui: 'green',
                iconCls: 'x-fas fa-plus',
                handler: 'onNew'
            });
        }
        //visualizzo le colonne a seconda della vista
        let colonne = griglia.getColumns()
        for (let i = 0, l = colonne.length; i < l; i++) {
            if (colonne[i].dataIndex === 'provincia') {
                if (nodo.itemId==='clientiestero') {
                    colonne[i].hide();
                } else {
                    colonne[i].show();
                }
            }
            if (colonne[i].dataIndex === 'cdnaz') {
                if (nodo.itemId==='clientiita') {
                    colonne[i].hide();
                } else {
                    colonne[i].show();
                }
            }
            if (colonne[i].dataIndex === 'nazionalita') {
                if (nodo.itemId==='clienti') {
                    colonne[i].show();
                } else {
                    colonne[i].hide();
                }
            }
        }
    },
    onNew: function() {
        let view = this.getView().view; //view della grid
        let NewRecord = Ext.create('cli.grids.clienti.Model',{
            id :bdFunctions.bpRandomString(32),
            isnew:1
        });
        this.createForm(view,NewRecord,1,'');
    },
    createForm: function(view,record,isnew){
        let itemId = 'f' + record.data['id'];
        if (this.getView().fireEvent('checkForm',itemId)){
            return
        }
        this.getView().fireEvent('createTab',Ext.create('cli.forms.cliente.Panel', {
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
            {text:Locale.t('cli.grids.clienti.column.cdcli'), dataIndex: 'cdcli', width:80, filter: {type: 'string'}},
            {text:Locale.t('cli.grids.clienti.column.attivo'), dataIndex: 'attivo', width:80},
            {text:Locale.t('cli.grids.clienti.column.ragsoc'), dataIndex: 'ragsoc',flex:1, filter: {type: 'string'}},
            {text:Locale.t('cli.grids.clienti.column.nazionalita'), dataIndex: 'nazionalita',width:60, filter: {type: 'string'}},
            {text:Locale.t('cli.grids.clienti.column.cdnaz'), dataIndex: 'cdnaz',width:100, filter: {type: 'string'}},
            {text:Locale.t('cli.grids.clienti.column.indirizzo'), dataIndex: 'indirizzo', width:200, filter: {type: 'string'}},
            {text:Locale.t('cli.grids.clienti.column.comune'), dataIndex: 'comune', width:200, filter: {type: 'string'}},
            {text:Locale.t('cli.grids.clienti.column.provincia'), dataIndex: 'provincia', width:70, filter: {type: 'string'}}
        ]
        this.callParent(arguments)
    }
})