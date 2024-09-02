Ext.define('nsm.overrides.data.AbstractStore', {
    override: 'Ext.data.AbstractStore',

    // Skip first load caused by filters initialization if autoLoad=false and Store has never been loaded
    onFilterEndUpdate: function () {
        var me = this,
            mustSkipLoad = !me.getAutoLoad() && !me.isLoaded(),
            originalSuppressNext = me.suppressNextFilter;

        if (mustSkipLoad) {
            me.suppressNextFilter = true;
            me.callParent(arguments);
            me.suppressNextFilter = originalSuppressNext;
        } else {
            me.callParent(arguments);
        }
    }
});