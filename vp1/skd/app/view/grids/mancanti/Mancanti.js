/**
 * Created by fabrizio on 29/12/17.
 */
Ext.define('skd.view.grids.mancanti.Mancanti', {
  extend: 'skd.view.grids.Tabs',
  requires: [
    'skd.view.grids.mancanti.MancantiController',
    'skd.view.grids.mancanti.MancantiModel'
  ],
  controller: 'mancanti',
  viewModel: 'mancanti',
  layout: 'fit',
  title: Locale.t('skd.grids.mancanti.title'),
  iconCls: 'fas fa-ghost'
});
