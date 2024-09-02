/**
 * Created by fabrizio on 09/10/17.
 */
Ext.define('portal.model.email.Email', {
    extend: 'Ext.data.Model',

    fields: [
        { name:'name', type:'string' },
        { name:'email', type:'string' },
        { name:'isnew', type:'number',defaultValue:0 },
        { name:'action', type:'number',defaultValue:0 }
    ]
});