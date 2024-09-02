/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.view.grids.causali.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.causali',

    requires: [
        'Ext.grid.column.Action',
        'portal.util.Functions',
        'rec.model.grids.Causali',
        'rec.view.forms.causale.Panel'
    ],
    init: function () {
        //gestione menu
        this.listBtnTop = [
            {handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'}
        ]

        if (this.checkRuoli(['99','10'])){
            this.listBtnTop.push({
                tooltip: Locale.t('rec.grids.causali.btn.new.tooltip'),
                text: Locale.t('rec.grids.causali.btn.new.text'),
                ui: 'green',
                iconCls: 'x-fas fa-plus',
                handler: 'onNew'
            });
        }
        this.callParent(arguments)
    },
    onNew: function() {
        let view = this.getView().view; //view della grid
        let NewRecord = Ext.create('rec.model.grids.Causali',{
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
        this.getView().fireEvent('createTab',Ext.create('rec.view.forms.causale.Panel', {
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
            {text:Locale.t('rec.grids.causali.column.pscaus'), dataIndex: 'pscaus',width:100},
            {text:Locale.t('rec.grids.causali.column.psdesc'), dataIndex: 'psdesc', flex:1},
            {text:Locale.t('rec.grids.causali.column.giorni'), dataIndex: 'giorni',width:150},
            {text:Locale.t('rec.grids.causali.column.sito'), dataIndex: 'sito',width:150},
            {text:Locale.t('rec.grids.causali.column.obbfornitore'), dataIndex: 'obbfornitore',width:150}
        ]
        this.callParent(arguments)
    }
})