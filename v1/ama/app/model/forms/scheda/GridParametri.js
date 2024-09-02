/**
 * Created by luca on 27/09/2018.
 */
Ext.define('ama.model.forms.scheda.GridParametri', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'string' },
        { name: 'isnew', type: 'int' },
        { name: 'action', type: 'int' },
        { name: 'parametro', type: 'string' },
        { name: 'um', type: 'string' },
        { name: 'tol', type: 'string' }
    ]
});