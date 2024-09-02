/**
 * Created by luke on 01/08/22.
 */
Ext.define('stres.model.forms.globale.GridModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'anno', type: 'int'},
        {name: 'venduto',type: 'float'},
        {name: 'reso',type: 'float'}
    ]
});