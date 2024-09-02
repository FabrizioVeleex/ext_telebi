/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define('stt.view.forms.modulo.components.gridRisorse.Store', {
    extend: 'Ext.data.Store',
    alias: 'store.stt-v1-form-modulo-gridrisorse',
    requires: [
        'stt.view.forms.modulo.components.gridRisorse.Model'
    ],
    model: 'stt.view.forms.modulo.components.gridRisorse.Model'
});