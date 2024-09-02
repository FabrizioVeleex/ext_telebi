/**
 * Created by fabrizio on 25/10/17.
 */
Ext.define('portal.toolbar.ToolBarGrid', {
    requires:[
        'Ext.form.field.Display',
        'Ext.form.field.Text'
    ],
    extend: 'Ext.Toolbar',
    items: [
        {xtype:'textfield',
            width:300,
            hasSearch : false,
            paramName : 'query',
            triggers: {
                clear: {
                    cls: 'x-form-clear-trigger',
                    hidden:true,
                    handler: 'onClearTriggetSearch'
                },
                search: {
                    cls: 'x-form-search-trigger',
                    handler: 'onSearchTriggetSearch'
                }
            },
            listeners:{
                specialkey:'onSpecialkeySearch'
            }
        },
        {xtype:'tbfill'},
        {
            xtype:'displayfield'
        }
    ]
});