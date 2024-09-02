/**
 * Created by luca on 16/02/2017.
 */
Ext.define('ord.overrides.grid.filters.filter.Date', {
    override: "Ext.grid.filters.filter.Date",
    config: {
        fields: {
            lt: { text: Locale.t('global.gridfilter.lt') },
            gt: { text: Locale.t('global.gridfilter.gt') },
            eq: { text: Locale.t('global.gridfilter.eq') }
        }
    }
});