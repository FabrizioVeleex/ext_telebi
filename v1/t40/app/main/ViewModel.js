
/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('t40.main.ViewModel', {
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
        name: 't40',
        tr: LOCALE.default,
        apptitle: Locale.t('t40.apptitle'),
        tag: 'T40',
        tabActive: "panotec",
        footerStore: {
            dettaglio: {
                qta: "",
                data_ora_inizio: "",
                durata: ""
            },
            durata_media: "",
            durata_max: "",
            durata_min: "",
            tempo_totale: ""
        },
    }
});
