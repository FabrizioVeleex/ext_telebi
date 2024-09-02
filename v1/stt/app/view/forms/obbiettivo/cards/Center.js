/**
 * Created by fabrizio on 13/12/2022.
 */
Ext.define('stt.view.forms.obbiettivo.cards.Center', {
  extend: 'Ext.grid.Panel',
  requires: [

  ],
  region: "center",
  bind: {
    store: '{store}',
  },
  forceFit: true,
  columns: [
    {
      text: Locale.t('stt.forms.obbiettivo.grids.articoli.columns.articolo'),
      width: 150,
      dataIndex: "cd_art",
      renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr =
          'data-qtip= "' +
          record.data.descr_art +
          '" data-qclass="tipCls" data-qwidth=350';
        return value;
      },
    },
    {
      text: '2018',
      width: 70,
      dataIndex: "2018",
      xtype: 'numbercolumn', format: '0,000'
    },
    {
      text: '2019',
      width: 70,
      dataIndex: "2019",
      xtype: 'numbercolumn', format: '0,000'
    },
    {
      text: '2020',
      width: 70,
      dataIndex: "2020",
      xtype: 'numbercolumn', format: '0,000'
    },
    {
      text: '2021',
      width: 70,
      dataIndex: "2021",
      xtype: 'numbercolumn', format: '0,000'
    },
    {
      text: '2022',
      width: 70,
      dataIndex: "2022",
      xtype: 'numbercolumn', format: '0,000'
    },
    {
      text: Locale.t('stt.forms.obbiettivo.grids.articoli.columns.media'),
      tdCls: 'bold-column',
      width: 70,
      dataIndex: "media",
      xtype: 'numbercolumn', format: '0,000'
    },
    {
      text: Locale.t('stt.forms.obbiettivo.grids.articoli.columns.max'),
      tdCls: 'bold-column',
      width: 70,
      dataIndex: "max",
      xtype: 'numbercolumn', format: '0,000'
    },
    {
      text: Locale.t('stt.forms.obbiettivo.grids.articoli.columns.pmagg'),
      width: 70,
      dataIndex: "magg",
      xtype: 'numbercolumn', format: '0,000'
    },
    {
      text: Locale.t('stt.forms.obbiettivo.grids.articoli.columns.target'),
      tdCls: 'bold-column',
      width: 70,
      dataIndex: "obbiettivo",
      xtype: 'numbercolumn', format: '0,000'
    },
  ],
  listeners: {
    itemclick: 'onitemclick',
  }
});