/**
 * Created by fabrizio on 18/06/16.
 */
Ext.define('dip.overrides.grid.filters.filter.Base', {
    override: 'Ext.grid.filters.filter.Base',
    createFilter: function(config, key) {
        let me = this,
            filter = me.callParent(arguments);
        filter.type = me.getInitialConfig('type');
        return filter;
    }
});