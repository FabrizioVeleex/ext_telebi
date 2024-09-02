/**
 * Created by fabrizio on 26/06/16.
 */
Ext.define('portal.model.blog.Comment', {
    extend: 'Ext.data.Model',
    fields: [

        { name: 'id',       type: 'int' },
        { name: 'idrif',    type: 'int' },
        { name: 'idrecord', type: 'string', defaultValue:'' },
        { name: 'comment',                  defaultValue:'' },
        { name: 'idrisorsa',type: 'string', defaultValue:'' },
        { name: 'risorsa',  type: 'string', defaultValue:''},
        { name: 'creationdata',    type: 'date' }
    ],

    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: false,
        limitParam: false,
        noCache: false,
        url: Backend.API_GLOBAL + 'Blog.php',
        extraParams: {'_fn': 'getComment'},
        appendId: false,
        reader: {
            type: 'json',
            rootProperty: 'data'}
    }
});