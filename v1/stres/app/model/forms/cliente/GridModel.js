/**
 * Created by luke on 01/08/22.
 */
Ext.define('stres.model.forms.cliente.GridModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'cdcli', type: 'string'},
        {name: 'ragsoc', type: 'string'},
        {name: 'venduto1',type: 'float'},
        {name: 'reso1',type: 'float'},
        {name: 'perc1',type: 'float'},
        {name: 'venduto2',type: 'float'},
        {name: 'reso2',type: 'float'},
        {name: 'perc2',type: 'float'},
        {name: 'venduto3',type: 'float'},
        {name: 'reso3',type: 'float'},
        {name: 'perc3',type: 'float'},
        {name: 'venduto4',type: 'float'},
        {name: 'reso4',type: 'float'},
        {name: 'perc4',type: 'float'},
        {name: 'venduto5',type: 'float'},
        {name: 'reso5',type: 'float'},
        {name: 'perc5',type: 'float'},
        {name: 'venduto6',type: 'float'},
        {name: 'reso6',type: 'float'},
        {name: 'perc6',type: 'float'},
        {name: 'totvenduto',type: 'float'},
        {name: 'totreso',type: 'float'},
        {name: 'perctot',type: 'float'}
    ]
});