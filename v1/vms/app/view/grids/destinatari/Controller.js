/**
 * Created by luca on 16/02/2017.
 */
Ext.define('vms.view.grids.destinatari.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.destinatari',
    requires:[
        'Ext.grid.column.Action',
        'portal.util.Functions',
        'vms.model.grids.Destinatari',
        'vms.view.forms.destinatario.Panel'
    ],
    init: function () {
        //gestione menu
        this.listBtnTop = [
            {handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'}
        ]
        this.listBtnTop.push({
            tooltip: Locale.t('vms.grids.destinatari.btn.new.tooltip'),
            text: Locale.t('vms.grids.destinatari.btn.new.text'),
            ui: 'green',
            iconCls: 'x-fas fa-plus',
            handler: 'onNew'
        });
        this.callParent(arguments)
    },
    onNew: function() {
        let view = this.getView().view; //view della grid
        let NewRecord = Ext.create('vms.model.grids.Destinatari',{
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
        this.getView().fireEvent('createTab',Ext.create('vms.view.forms.destinatario.Panel', {
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
            {text:Locale.t('vms.grids.destinatari.column.nome'), dataIndex: 'nome',width:300},
            {text:Locale.t('vms.grids.destinatari.column.stabilimento'), dataIndex: 'stabilimento',width:300},
            {text:Locale.t('vms.grids.destinatari.column.risorse'), cellWrap:true,dataIndex: 'risorse', flex:1}
        ]
        this.callParent(arguments)
    }
})