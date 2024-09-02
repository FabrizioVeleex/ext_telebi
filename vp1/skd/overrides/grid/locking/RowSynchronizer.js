/**
 * Created by fabrizio on 29/06/18.
 */
Ext.define('skd.overrides.grid.locking.RowSynchronizer', {
    override: 'Ext.grid.locking.RowSynchronizer',


    finish: function (other) {
        //FP aggionto eccezione per rottura cariucamento griglia!!!
        if (other) {
            var me = this,
                els = me.els,
                otherEls = other.els,
                otherEl,
                growth = 0,
                otherGrowth = 0,
                delta, name, otherHeight;

            for (name in els) {
                otherEl = otherEls[name];

                // Partner RowSynchronizer may not have the element.
                // For example, group summary may not be wanted in locking side.
                otherHeight = otherEl ? otherEl.height : 0;
                delta = otherHeight - els[name].height;

                if (delta > 0) {
                    growth += delta;
                    Ext.fly(els[name].el).setHeight(otherHeight);
                } else {
                    otherGrowth -= delta;
                }
            }

            // Compare the growth to both rows and see if this row is lacking.
            otherHeight = other.rowHeight + otherGrowth;

            //<feature legacyBrowser>
            // IE9 uses content box sizing on table, so height must not include border
            if (Ext.isIE9 && me.view.ownerGrid.rowLines) {
                otherHeight--;
            }
            //</feature>

            if (me.rowHeight + growth < otherHeight) {
                Ext.fly(me.rowEl).setHeight(otherHeight);
            }
        }
    }
});