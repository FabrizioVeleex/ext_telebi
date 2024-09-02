/**
 * Created by luca on 19/10/16.
 */
Ext.define('t40.overrides.grid.filters.filter.Number', {
    override: "Ext.grid.filters.filter.Number",
    emptyText: Locale.t('global.gridfilter.emptyTextNumber')
});