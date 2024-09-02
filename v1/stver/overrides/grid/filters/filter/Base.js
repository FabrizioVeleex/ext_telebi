/**
 * Created by luca on 14/02/2017.
 */
Ext.define('stver.overrides.grid.filters.filter.Base', {
    override: 'Ext.grid.filters.filter.Base',
    createFilter: function(config, key) {
        let me = this,
            filter = me.callParent(arguments);
        filter.type = me.getInitialConfig('type');
        return filter;
    }
});