Ext.define('home.view.imp.cards.upload.WindowUploadModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.v1-imp-windowuplad',

    stores: {
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:

        users: {
            model: 'WindowUplad',
            autoLoad: true
        }
        */
    },

    data: {
        progress: 0,
        textProgress: '0',
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});