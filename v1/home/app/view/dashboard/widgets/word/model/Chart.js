/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.word.model.Chart', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'mouth', type: 'string' },
        { name: 'data0', type: 'number' },
        { name: 'data1', type: 'number' },
        { name: 'data2', type: 'number' }
    ]
});
