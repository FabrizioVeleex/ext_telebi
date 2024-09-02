/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('sdc.view.grids.domini.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.domini',
    requires: [
        'Ext.container.Container',
        'Ext.grid.column.Action',
        'portal.util.Functions',
        'sdc.model.grids.domini.Model',
        'sdc.view.forms.dominio.Panel'
    ],
    init:function(){
        this.listBtnTop = [
            {handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'}
        ]

        if (this.checkRuoli(['99','1'])){
            this.listBtnTop.push({
                text: Locale.t('sdc.grids.domini.btn.new.text'),
                tooltip: Locale.t('sdc.grids.domini.btn.new.tooltip'),
                ui: 'green',
                iconCls: 'x-fas fa-plus',
                handler: 'onNew'
            });
        }
        this.callParent(arguments)
        this.getView().addDocked({
            type:'toolbar',
            items:[
                {
                    type:'container',
                    html:`<div style="text-align:center;height:20px;margin: 5px;text-decoration: underline">${Locale.t('sdc.grids.domini.info')}</div>`
                }
            ]
        })
    },

    onNew: function() {
        let view = this.getView().view, //view della grid
            NewRecord = Ext.create('sdc.model.grids.domini.Model',{
                id :bdFunctions.bpRandomString(32),
                isnew:1,
                status:1
            });
        this.createForm(view,NewRecord,1);
    },
    createForm: function(view,record,isnew,tipo){
        let itemId = 'f' + record.data['id'];
        if (this.getView().fireEvent('checkForm',itemId)){
            return
        }

        this.getView().fireEvent('createTab',Ext.create('sdc.view.forms.dominio.Panel', {
            itemId: 'f' + record.data['id'],
            record: record,
            storeForm: view.getStore(),
            valori: {
                id: record.data['id'],
                isnew: isnew,
                tipo: tipo
            }
        }),view)
    },

    onafterrendergrid: function (grid) {
        grid.myColumns =[
            {
                xtype: 'actioncolumn', width: 30, menuDisabled: true, resizable: false, dataIndex: 'action1',
                items: [{handler: 'onOpen', iconCls: 'x-fas fa-eye', tooltip: Locale.t('global.btn.open.text')}]
            },
            {text: Locale.t('sdc.grids.domini.column.tipo'), dataIndex: 'tipo', width: 100,
                renderer: function (value) {
                    return Locale.t('sdc.grids.domini.tipo.' + value);
                }
            },
            {text: Locale.t('sdc.grids.domini.column.valore'), dataIndex: 'valore', flex: 1}
        ]
        this.callParent(arguments)
    },

    onRowDbClick: function (view,record) {
        this.createForm(view,record,0);
    },
});