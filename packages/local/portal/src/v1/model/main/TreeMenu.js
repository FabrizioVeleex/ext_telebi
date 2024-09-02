/**
 * Created by fabrizio on 02/03/21.
 */
Ext.define('portal.v1.model.main.TreeMenu', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'text',defaultValue:''},
        {name:'iconCls',defaultValue:''},
        {name:'idtree',defaultValue:''},
        {name:'idpadre',defaultValue:''},
        'itemId'
        ]
});