/**
 * Created by luca on 19/10/16.
 */
Ext.define('t40.overrides.grid.filters.filter.Date', {
    override: "Ext.grid.filters.filter.Date",
    config: {
        fields: {
            lt: { text: Locale.t('global.gridfilter.lt') },
            gt: { text: Locale.t('global.gridfilter.gt') },
            eq: { text: Locale.t('global.gridfilter.eq') }
        }
    }
});