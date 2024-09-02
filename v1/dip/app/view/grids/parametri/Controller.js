Ext.define('dip.view.grids.parametri.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    alias: 'controller.parametri',

    requires: [
        'dip.view.forms.parametro.Panel'
    ],

    init: function () {
        //gestione menu
        this.listBtnTop = [
            {handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'}
        ]
        this.callParent(arguments)
    },
    createForm: function (view, record, isnew, tipo) {
        let itemId = 'f' + record.data['id'];

        if (this.getView().fireEvent('checkForm',itemId)){
            return
        }

        this.getView().fireEvent('createTab',Ext.create('dip.view.forms.parametro.Panel', {
            itemId: 'f' + record.data['id'],
            record: record,
            storeForm: view.getStore(),
            valori: {
                id: record.data['id'],
                isnew: isnew,
                tipo: tipo
            }
        }),view)
    }
});