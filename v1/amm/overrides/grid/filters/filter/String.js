/**
 * Created by luca on 14/02/2017.
 */
Ext.define('amm.overrides.grid.filters.filter.String', {
    override: "Ext.grid.filters.filter.String",
    emptyText:Locale.t('global.gridfilter.emptyTextString')
})