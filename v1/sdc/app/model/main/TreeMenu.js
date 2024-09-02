/**
 * Created by fabrizio on 11/10/21.
 */
Ext.define('sdc.model.main.TreeMenu', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.treemenuStore',
    fields: ['model','text','iconCls','itemId','tipodoc','setCfgPer']
});