/**
 * Created by fabrizio on 23/01/21.
 */
Ext.define('portal.v1.view.main.global.upload.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.v1-uploadfile',

    data: {
        hideDrop: true,
        hideCancel: false,
        hideProgress: true,
        progress: 0,
        textProgress: ''
    },
    formulas: {

    }
});