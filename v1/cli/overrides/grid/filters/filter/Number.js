/**
 * Created by luca on 14/02/2017.
 */
Ext.define('cli.overrides.grid.filters.filter.Number', {
    override: "Ext.grid.filters.filter.Number",
    emptyText:Locale.t('global.gridfilter.emptyTextNumber')
})