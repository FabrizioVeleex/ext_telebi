/**
 * Created by fabri on 10/01/2023.
 */
Ext.define('stt.view.forms.cliente.components.comboSoggetto.Store', {
    extend: 'Ext.data.Store',
    alias: 'store.v1-stt-form-cliente-soggetti',
    remoteSort: false,
    fields: ['id', 'cdcli', 'ragsoc', 'tipo', 'tiposoggetto'],
    listeners: {
        beforeload: 'onBeforeLoadComboSogg',
    },
    proxy: {
        type: 'ajax',
        simpleSortMode: true,
        url: Backend.REST_API + "forms/cliente/getComboSogg/",
        reader: { type: 'json', rootProperty: 'data' }
    }
});
