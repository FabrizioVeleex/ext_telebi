/**
 * Created by fabrizio on 24/10/2023.
 */
Ext.define('prd.global.cdl.Panel', {
  extend: 'Ext.form.Panel',
  title: Locale.t('global.form.caricamento'),
  bind: {
    title: "{title}",
    iconCls: "{iconCls}"
  },
  layout: {
    type: 'card',
  },

});   