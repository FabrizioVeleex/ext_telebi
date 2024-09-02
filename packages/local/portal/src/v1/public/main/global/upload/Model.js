/**
 * Created by fabrizio on 23/01/21.
 */
Ext.define('portal.v1.public.main.global.upload.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.v1-public-uploadfile',

    data: {
        hideDrop: true,
        hideProgress:true,
        progress: 0,
        textProgress:''
    },
    formulas: {

    }
});