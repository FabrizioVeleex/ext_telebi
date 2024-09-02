/**
 * Created by luke on 11/07/24.
 */
Ext.define('home.view.dashboard.widgets.word.view.residuo.ModelDettaglio', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'cdcli',default:''},
        { name: 'cdart',default:''},
        { name: 'ragsoc',default:''},
        { name: 'descart',default:''},
        { name: 'qta',default:0},
        { name: 'imptot',default:0}
    ]
});