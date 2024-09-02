/**
 * Created by luca on 16/02/2017.
 */
Ext.define('impexp.view.grids.moduli.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.moduli',

    requires: [
        'Ext.grid.column.Action',
        'impexp.model.grids.Moduli',
        'impexp.view.forms.modulo.Panel',
        'portal.util.Functions'
    ],
    init: function () {
        //gestione menu
        this.listBtnTop = [
            {handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'}
        ]
        if (this.checkRuoli(['99'])){
            this.listBtnTop.push({
                tooltip: Locale.t('impexp.grids.moduli.btn.new.tooltip'),
                text: Locale.t('impexp.grids.moduli.btn.new.text'),
                ui: 'green',
                iconCls: 'x-fas fa-plus',
                handler: 'onNew'
            });
        }
        this.callParent(arguments)
    },
    onNew: function() {
        let view = this.getView().view; //view della grid
        let NewRecord = Ext.create('impexp.model.grids.Moduli',{
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
        this.getView().fireEvent('createTab',Ext.create('impexp.view.forms.modulo.Panel', {
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
            {text:Locale.t('impexp.grids.moduli.column.codice'), dataIndex: 'codice', width:100},
            {text:Locale.t('impexp.grids.moduli.column.tipo'), dataIndex: 'tipodesc', width:150},
            {text:Locale.t('impexp.grids.moduli.column.nome'), dataIndex: 'nome', flex:1}
        ]
        this.callParent(arguments)
    }
})