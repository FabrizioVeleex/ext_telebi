/**
 * Created by luca on 19/10/16.
 */
Ext.define('t40.overrides.util.Filter', {
    override: 'Ext.util.Filter',
    getState: function () {
        let me = this,
            state = this.callParent(arguments);
        if (me.type) {
            state.type = me.type;
        }
        return state;
    }
});