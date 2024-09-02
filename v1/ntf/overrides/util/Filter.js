/**
 * Created by fabrizio on 18/06/16.
 */
Ext.define('ntf.overrides.util.Filter', {
    override: 'Ext.util.Filter',
    getState: function() {
        let me = this,
         state = this.callParent(arguments);
        if (me.type) {
            state.type = me.type;
        }
        return state;
    }
});