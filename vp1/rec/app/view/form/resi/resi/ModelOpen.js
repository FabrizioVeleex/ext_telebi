/**
 * Created by luca on 20/02/2017.
 */
Ext.define('recpub.view.form.resi.resi.ModelOpen', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.GridOpen',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'datadoc',type: 'date',dateFormat: 'Y-m-d'},
        {name: 'progressivo', type: 'string'},
        {name: 'stato', type: 'string'},
        {name: 'dossier', type: 'string'}
    ]
});