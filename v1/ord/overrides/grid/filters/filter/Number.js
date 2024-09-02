/**
 * Created by luca on 16/02/2017.
 */
Ext.define('ord.overrides.grid.filters.filter.Number', {
    override: "Ext.grid.filters.filter.Number",
    emptyText: Locale.t('global.gridfilter.emptyTextNumber')
});