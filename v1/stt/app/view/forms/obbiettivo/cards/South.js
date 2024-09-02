/**
 * Created by fabrizio on 13/12/2022.
 */
Ext.define('stt.view.forms.obbiettivo.cards.South', {
  extend: 'Ext.grid.Panel',
  requires: [
    'Ext.container.Container',
  ],
  region: 'south',
  minHeight: 250,
  title: 'Dettaglio articolo',
  collapsible: true,
  bind: {
    store: '{storeDet}',
  },
  forceFit: true,
  columns: [
    {
      text: 'Anno',
      width: 70,
      dataIndex: "year",
    },
    {
      text: Locale.t('stt.forms.obbiettivo.grids.dett.columns.m01'),
      width: 60,
      dataIndex: "01",
      xtype: 'numbercolumn', format: '0,000'
    },
    {
      text: Locale.t('stt.forms.obbiettivo.grids.dett.columns.m02'),
      width: 60,
      dataIndex: "02",
      xtype: 'numbercolumn', format: '0,000'
    },
    {
      text: Locale.t('stt.forms.obbiettivo.grids.dett.columns.m03'),
      width: 60,
      dataIndex: "03",
      xtype: 'numbercolumn', format: '0,000'
    },
    {
      text: Locale.t('stt.forms.obbiettivo.grids.dett.columns.m04'),
      width: 60,
      dataIndex: "04",
      xtype: 'numbercolumn', format: '0,000'
    },
    {
      text: Locale.t('stt.forms.obbiettivo.grids.dett.columns.m05'),
      width: 60,
      dataIndex: "05",
      xtype: 'numbercolumn', format: '0,000'
    },
    {
      text: Locale.t('stt.forms.obbiettivo.grids.dett.columns.m06'),
      width: 60,
      dataIndex: "06",
      xtype: 'numbercolumn', format: '0,000'
    },
    {
      text: Locale.t('stt.forms.obbiettivo.grids.dett.columns.m07'),
      width: 60,
      dataIndex: "07",
      xtype: 'numbercolumn', format: '0,000'
    },
    {
      text: Locale.t('stt.forms.obbiettivo.grids.dett.columns.m08'),
      width: 60,
      dataIndex: "08",
      xtype: 'numbercolumn', format: '0,000'
    },
    {
      text: Locale.t('stt.forms.obbiettivo.grids.dett.columns.m09'),
      width: 60,
      dataIndex: "09",
      xtype: 'numbercolumn', format: '0,000'
    },
    {
      text: Locale.t('stt.forms.obbiettivo.grids.dett.columns.m10'),
      width: 60,
      dataIndex: "10",
      xtype: 'numbercolumn', format: '0,000'
    },
    {
      text: Locale.t('stt.forms.obbiettivo.grids.dett.columns.m11'),
      width: 60,
      dataIndex: "11",
      xtype: 'numbercolumn', format: '0,000'
    },
    {
      text: Locale.t('stt.forms.obbiettivo.grids.dett.columns.m12'),
      width: 60,
      dataIndex: "12",
      xtype: 'numbercolumn', format: '0,000'
    },
    {
      text: Locale.t('stt.forms.obbiettivo.grids.dett.columns.tot'),
      width: 60,
      dataIndex: "tot",
      xtype: 'numbercolumn', format: '0,000'
    },

  ],
});