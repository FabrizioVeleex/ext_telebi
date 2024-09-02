
/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('spl.main.ViewModel', {
    extend: 'portal.v1.view.main.ViewModel',
    alias: 'viewmodel.main',

    requires: [
        'Ext.data.Store'
    ],
    stores: {
        ordina: {
            type: "store", data: [
                { id: "default", title: "Elenco completo" },
                { id: "agente", title: "Per agente" },
                { id: "trasportatore", title: "Per trasportatore" },
            ]
        }
    },
    data: {
        name: 'spl',
        tr: LOCALE.default,
        apptitle: Locale.t('spl.apptitle'),
        tag: 'SPL',
        tabActive: "bol"
    }
});
