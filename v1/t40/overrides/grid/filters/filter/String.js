/**
 * Created by luca on 19/10/16.
 */
Ext.define('t40.overrides.grid.filters.filter.String', {
    override: "Ext.grid.filters.filter.String",
    emptyText: Locale.t('global.gridfilter.emptyTextString')
});