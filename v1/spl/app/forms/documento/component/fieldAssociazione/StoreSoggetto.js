/**
 * Created by fabrizio on 19/02/2022.
 */
Ext.define('spl.forms.documento.component.fieldAssociazione.StoreSoggetto', {
    extend: 'Ext.data.Store',
    alias: 'store.v1-spl-form-documento-soggetti',
    remoteSort: false,
    fields: ['id', 'cdcli', 'ragsoc', 'tipo', 'tiposoggetto'],
    listeners: {
        beforeload: 'onBeforeLoadComboSogg',
    },
    proxy: {
        type: 'ajax',
        simpleSortMode: true,
        url: Backend.REST_API + "functions/form/getsoggetto/",
        reader: { type: 'json', rootProperty: 'data' }
    }
});
