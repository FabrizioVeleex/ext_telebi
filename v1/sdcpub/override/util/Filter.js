/**
 * Created by luca on 20/02/2017.
 */
Ext.define('sdcpub.util.Filter', {
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