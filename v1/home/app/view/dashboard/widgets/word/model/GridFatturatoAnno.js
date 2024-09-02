/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.word.model.GridFatturatoAnno', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'codcli',default:''},
        { name: 'ragsoc',default:''},
        { name: 'mese',default:''},
        { name: 'fatturato',default:0},
        { name: 'notec',default:0}
    ]
});
