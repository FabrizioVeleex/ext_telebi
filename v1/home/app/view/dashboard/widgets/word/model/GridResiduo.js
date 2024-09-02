/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.word.model.GridResiduo', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'codcli',default:''},
        { name: 'ragsoc',default:''},
        { name: 'residuo88',default:0},
        { name: 'residuo99',default:0},
        { name: 'residuo98',default:0},
        { name: 'residuo97',default:0},
        { name: 'residuo',default:0}
    ]
});
