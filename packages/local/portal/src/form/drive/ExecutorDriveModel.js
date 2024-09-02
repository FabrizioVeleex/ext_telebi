/**
 * Created by fabrizio on 29/07/17.
 */
Ext.define('portal.form.drive.ExecutorDriveModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.executordrive',

    stores: {
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:

        users: {
            model: 'ExecutorDrive',
            autoLoad: true
        }
        */
    },

    data: {
        nomefile:''
    }
});