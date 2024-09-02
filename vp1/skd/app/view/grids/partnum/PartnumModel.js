/**
 * Created by fabrizio on 29/12/17.
 */
Ext.define('skd.view.grids.partnum.PartnumModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.partnum',
    requires:[

    ],
    stores: {

    },

    data: {
        id:'gridPartnum',
        selectCell:null,
        statusApp:false
    }
});