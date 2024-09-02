/**
 * Created by luca on 08/03/2017.
 */
Ext.define('ana.overrides.util.Filter', {
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