/**
 * Created by fabrizio on 18/06/16.
 */
Ext.define('skd.overrides.util.Filter', {
    override: 'Ext.util.Filter',
    getState: function() {
        var me = this,
         state = this.callParent(arguments);
        if (me.type) {
            state.type = me.type;
        }
        return state;
    }
});