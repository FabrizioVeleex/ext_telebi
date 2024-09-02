/**
 * Created by luke on 26/01/21.
 */
Ext.define('websrv.view.grids.assoricambi.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    alias: 'controller.assoricambi',

    requires: [
        'websrv.view.forms.assoricambio.Panel'
    ],
    init: function () {
        //refresh
        this.listBtnTop = [
            {handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'}
        ]
        this.callParent(arguments)
    },
    createForm: function (view, record, isnew) {
        let itemId = 'f' + record.data['id'];

        if (this.getView().fireEvent('checkForm',itemId)){
            return
        }
        this.getView().fireEvent('createTab',Ext.create('websrv.view.forms.assoricambio.Panel', {
            itemId: 'f' + record.data['id'],
            record: record,
            storeForm: view.getStore(),
            valori: {
                id: record.data['id'],
                isnew: isnew
            }
        }))
    }
});