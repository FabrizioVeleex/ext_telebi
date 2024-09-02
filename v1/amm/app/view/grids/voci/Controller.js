/**
 * Created by luca on 16/02/2017.
 */
Ext.define('amm.view.grids.voci.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.voci',
    requires:[
        'Ext.grid.column.Action',
        'amm.model.grids.Voci',
        'amm.view.forms.voce.Panel',
        'portal.util.Functions'
    ],
    init: function () {
        //gestione menu
        this.listBtnTop = [
            {handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'}
        ]
        if (this.checkRuoli(['99','1'])){
            this.listBtnTop.push({
                tooltip: Locale.t('amm.grids.voci.btn.new.tooltip'),
                text: Locale.t('amm.grids.voci.btn.new.text'),
                ui: 'green',
                iconCls: 'x-fas fa-plus',
                handler: 'onNew'
            })
        }
        this.callParent(arguments)
    },
    onNew: function() {
        let view = this.getView().view; //view della grid
        let NewRecord = Ext.create('amm.model.grids.Voci',{
            id :bdFunctions.bpRandomString(32),
            isnew:1,
            status:1
        });
        this.createForm(view,NewRecord,1);
    },
    createForm: function(view,record,isnew){
        let itemId = 'f' + record.data['id'];
        if (this.getView().fireEvent('checkForm',itemId)){
            return
        }
        this.getView().fireEvent('createTab',Ext.create('amm.view.forms.voce.Panel', {
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
            {text:Locale.t('amm.grids.voci.column.tipovoce'), dataIndex: 'tipovoce', width:200, filter: {type: 'string'},
                renderer:function(value){if(value==='LINK'){return 'Link'} else {return 'Applicazione'}}
            },
            {text:Locale.t('amm.grids.voci.column.voce'), dataIndex: 'voce',width:350, filter: {type: 'string'}},
            {text:Locale.t('amm.grids.voci.column.descrizione'), dataIndex: 'descrizione',flex:1, filter: {type: 'string'}}
        ]
        this.callParent(arguments)
    }
})