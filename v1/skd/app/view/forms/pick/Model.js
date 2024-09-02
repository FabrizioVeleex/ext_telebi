/**
 * Created by fabrizio on 29/12/17.
 */
Ext.define('skd.view.forms.pick.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.pickcards',

    stores: {

    },

    data: {
        posizioneCard: 'dettaglio',
        connection: '',
        record: null,
        iconFiltriDett: 'fas fa-caret-square-down',
        iconOrdinamento: 'fas fa-caret-square-down',
        statusApp: false,
        in_produzione: true,
        data_ini_preparazione: true,
        data_ini_effettivo: true,
        data_end_preparazione: true,
        completato_senza_mancanti: true,
        x: true,
    },
    formulas: {
        formTitle: {
            bind: {
                record: '{record}'
            },
            get: function (data) {
                let title = 'Caricamento in corso ...';
                if (data.record) {
                    title = data.record.descrizione + '; OC: ' + data.record.ordine_cliente + ' ' + data.record.riga_oc + '; Qta OC: ' + data.record.qty_demand;
                }
                return '<span style="font-weight: bold">' + title + "</span>";
            }
        }
    }
});
