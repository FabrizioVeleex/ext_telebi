/**
 * Created by fabri on 19/02/2022.
 */
Ext.define('pak.forms.documento.component.comboSoggetto.Store', {
    extend: 'Ext.data.Store',
    alias: 'store.v1-pak-form-documento-soggetti',
    remoteSort: false,
    fields: ['id', 'cdcli', 'ragsoc', 'tipo', 'tiposoggetto'],
    listeners: {
        beforeload: 'onBeforeLoadComboSogg',
    },
    proxy: {
        type: 'ajax',
        simpleSortMode: true,
        url: Backend.REST_API + "forms/documento/getsogg/",
        reader: { type: 'json', rootProperty: 'data' }
    }
});
