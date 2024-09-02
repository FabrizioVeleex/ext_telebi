/**
 * Created by fabrizio on 18/06/16.
 */
Ext.define('atp.overrides.grid.filters.filter.Date', {
    override: "Ext.grid.filters.filter.Date",
    config: {
        fields: {
            lt: { text: Locale.t('global.grid.filter.lt') },
            gt: { text: Locale.t('global.grid.filter.gt') },
            eq: { text: Locale.t('global.grid.filter.eq') }
        }
    }
});