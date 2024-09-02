/**
 * Created by fabrizio on 29/12/17.
 */
Ext.define('skd.view.grids.lab.LabModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.lab',
    requires: [

    ],
    stores: {

    },

    data: {
        msgMove: '',
        id: 'gridLab',
        selectCell: null,
        statusApp: false
    }
});