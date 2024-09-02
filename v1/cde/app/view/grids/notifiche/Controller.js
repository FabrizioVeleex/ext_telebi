/**
 * Created by luca on 16/02/2017.
 */
Ext.define('cde.view.grids.notifiche.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.v1-grid-notifiche',
    requires:[
        'Ext.grid.column.Action',
        'cde.view.forms.notifica.Panel',
        'cde.view.grids.notifiche.component.Model',
        'portal.util.Functions'
    ],
    init: function () {
        //gestione menu
        this.listBtnTop = [
            {handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'}
        ]
        if (this.checkRuoli(['99'])){
            this.listBtnTop.push({
                tooltip: Locale.t('cde.grids.notifiche.btn.new.tooltip'),
                text: Locale.t('cde.grids.notifiche.btn.new.text'),
                ui: 'green',
                iconCls: 'x-fas fa-plus',
                handler: 'onNew'
            });
        }
        this.callParent(arguments)
    },
    onNew: function() {
        let view = this.getView().view; //view della grid
        let NewRecord = Ext.create('cde.view.grids.notifiche.component.Model',{
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
        this.getView().fireEvent('createTab',Ext.create('cde.view.forms.notifica.Panel', {
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
            {text:Locale.t('cde.grids.notifiche.column.nome'), dataIndex: 'nome',width:300},
            {text:Locale.t('cde.grids.notifiche.column.risorse'), cellWrap:true,dataIndex: 'risorse', flex:1},
            {text:Locale.t('cde.grids.notifiche.column.risorse'), cellWrap:true,dataIndex: 'descrizione', width:600}
        ]
        this.callParent(arguments)
    }
})