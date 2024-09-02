/**
 * Created by luca on 20/02/2017.
 */
Ext.define('bofpub.overrides.grid.filters.filter.String', {
    override: "Ext.grid.filters.filter.String",
    emptyText: Locale.t('global.gridfilter.emptyTextString')
});