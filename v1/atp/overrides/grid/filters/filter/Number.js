/**
 * Created by fabrizio on 18/06/16.
 */
Ext.define('atp.overrides.grid.filters.filter.Number', {
    override: "Ext.grid.filters.filter.Number",
    emptyText: Locale.t('global.grid.filter.emptyTextNumber')
});