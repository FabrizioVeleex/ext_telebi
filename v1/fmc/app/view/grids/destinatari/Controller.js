/**
 * Created by luca on 16/02/2017.
 */
Ext.define('fmc.view.grids.destinatari.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.destinatari',
    requires:[
        'Ext.grid.column.Action',
        'fmc.model.grids.Destinatari',
        'fmc.view.forms.destinatario.Panel',
        'portal.util.Functions'
    ],
    init: function () {
        //gestione menu
        this.listBtnTop = [
            {handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'}
        ]
        if (this.checkRuoli(['99','10'])){
            this.listBtnTop.push({
                tooltip: Locale.t('vms.grids.destinatari.btn.new.tooltip'),
                text: Locale.t('fmc.grids.destinatari.btn.new.text'),
                ui: 'green',
                iconCls: 'x-fas fa-plus',
                handler: 'onNew'
            });
        }
        this.callParent(arguments)
    },
    onNew: function() {
        let view = this.getView().view; //view della grid
        let NewRecord = Ext.create('fmc.model.grids.Destinatari',{
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
        this.getView().fireEvent('createTab',Ext.create('fmc.view.forms.destinatario.Panel', {
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
            {text:Locale.t('fmc.grids.destinatari.column.nome'), dataIndex: 'nome',width:300},
            {text:Locale.t('fmc.grids.destinatari.column.risorse'), cellWrap:true,dataIndex: 'risorse', flex:1},
            {text:Locale.t('fmc.grids.destinatari.column.sede'), dataIndex: 'sede',width:400}
        ]
        this.callParent(arguments)
    }
})