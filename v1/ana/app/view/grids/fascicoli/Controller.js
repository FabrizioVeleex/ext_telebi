/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.view.grids.fascicoli.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.fascicoli',

    requires: [
        'ana.model.grids.Fascicoli',
        'ana.view.forms.fascicolo.Panel'
    ],
    init: function () {
        //gestione menu
        this.listBtnTop = [
            {handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'}
        ]

        if (this.checkRuoli(['99','10'])){
            this.listBtnTop.push({
                tooltip: Locale.t('ana.grids.fascicoli.btn.new.tooltip'),
                text: Locale.t('ana.grids.zone.btn.new.text'),
                ui: 'green',
                iconCls: 'x-fas fa-plus',
                handler: 'onNew'
            })
        }
        this.callParent(arguments)
    },
    //nuovo
    onNew: function() {
        let view = this.getView().view; //view della grid
        let NewRecord = Ext.create('ana.model.grids.Fascicoli',{
            id :bdFunctions.bpRandomString(32),
            isnew:1,
            status:1
        });
        this.createForm(view,NewRecord,1);
    },
    createForm: function (view, record, isnew) {
        let itemId = 'f' + record.data['id'];
        if (this.getView().fireEvent('checkForm',itemId)){
            return
        }
        this.getView().fireEvent('createTab',Ext.create('ana.view.forms.fascicolo.Panel', {
            itemId: 'f' + record.data['id'],
            record: record,
            valori: {
                id: record.data['id'],
                isnew: isnew
            }
        }),view)
    }
});