/**
 * Created by fabrizio on 18/06/16.
 */
Ext.define('sdc.overrides.grid.filters.filter.Date', {
    override: "Ext.grid.filters.filter.Date",
    config:{fields: {
        lt: {text: Locale.t('global.gridfilter.lt')},
        gt: {text: Locale.t('global.gridfilter.gt')},
        eq: {text: Locale.t('global.gridfilter.eq')}
    }}
})