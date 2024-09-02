/**
 * Created by luke on 01/08/22.
 */
Ext.define('stres.model.forms.causale.GridModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'cdcaus', type: 'string'},
        {name: 'causale', type: 'string'},
        {name: 'reso1',type: 'float'},
        {name: 'perc1',type: 'float'},
        {name: 'reso2',type: 'float'},
        {name: 'perc2',type: 'float'},
        {name: 'reso3',type: 'float'},
        {name: 'perc3',type: 'float'},
        {name: 'reso4',type: 'float'},
        {name: 'perc4',type: 'float'},
        {name: 'reso5',type: 'float'},
        {name: 'perc5',type: 'float'},
        {name: 'reso6',type: 'float'},
        {name: 'perc6',type: 'float'},
        {name: 'totreso',type: 'float'},
        {name: 'perctot',type: 'float'}
    ]
});