/**
 * Created by fabrizio on 15/02/21.
 */
Ext.define('portal.v1.view.main.ViewModel', {
  extend: 'Ext.app.ViewModel',
  data: {
    name: '',
    versione: '0.0.0',
    dataVersione: '01/01/2000',
    tr: {},
    apptitle: '',
    tag: ''.toUpperCase(),
    titleMenuMain: '',
    titleMenuAmm: ''
  },

  formulas: {
    showD1: {
      get: function () {
        let ruoli = ['99'] //gestore, logApp
        if (!Ext.global.Vars.infoApp && !Ext.global.Vars.infoApp.ruoli) return false
        for (let r of Ext.global.Vars.infoApp.ruoli) {
          if (ruoli.filter(el => el === r.valore).length > 0) {
            return true
          }
        }
        return false
      //  return !!(Ext.global.Vars.infoUser && Ext.global.Vars.infoUser.dev === true);
      }
    },
    showL1: {
      get: function () {
        let ruoli = ['99', '88'] //gestore, logApp
        if (!Ext.global.Vars.infoApp && !Ext.global.Vars.infoApp.ruoli) return false
        for (let r of Ext.global.Vars.infoApp.ruoli) {
          if (ruoli.filter(el => el === r.valore).length > 0) {
            return true
          }
        }
        return false
      }
    },
    appTitle: {
      bind: {
        apptitle: '{apptitle}',
        tag: '{tag}'
      },
      get: function (data) {
        return '' +
          '<div class="titleApp" id="titleApp">' +
          '   <img class="logoApp" src="/images/64/' + data.tag + '.png" alt="&nbsp;"/>' +
          '   <div class="logoRight">' +
          '      <img class="logo" src="/logos/logo_45.png" alt="&nbsp;"/>' +
          '      <div class="title">' + data.apptitle + '</div>' +
          '   </div>' +
          '   <div style="clear:both;"></div>' +
          '   <div class="appversion">Version: ' + Ext.global.Vars.infoApp.version.num + ' - ' + Ext.global.Vars.infoApp.version.data + '</div>' +
          '   <div class="copyright"><i class="fas fa-copyright" ></i> Veleex S.r.l.</div>' +
          '</div>';
      }
    }
  }
});