/**
 * Created by luca on 14/02/2017.
 */
Ext.define('vda.overrides.util.Filter', {
    override: 'Ext.util.Filter',
    getState: function() {
        let me = this,
            state = this.callParent(arguments);
        if (me.type) {
            state.type = me.type;
        }
        return state;
    }
})