/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wpre.model.GridNote', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'gz_id'},
        { name: 'gz_dipid'},
        { name: 'nominativo'},
        { name: 'dal'},
        { name: 'al'},
        { name: 'note'},
    ]
});
