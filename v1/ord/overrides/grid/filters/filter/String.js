/**
 * Created by luca on 16/02/2017.
 */
Ext.define('ord.overrides.grid.filters.filter.String', {
    override: "Ext.grid.filters.filter.String",
    emptyText: Locale.t('global.gridfilter.emptyTextString')
});