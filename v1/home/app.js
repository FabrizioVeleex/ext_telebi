Ext.onReady(function () {
  //aspetto che Locale sia inizializzato
  const timer = ms => new Promise(res => setTimeout(res, ms))
  async function pollingLocale() {
    for (let i = 0; i < 10; i++) {
      let locale_app = window.localStorage.getItem('locale')
      if (locale_app.trim() !== '') {
        await timer(100);
        Ext.application({
          extend: "home.Application",
          name: "portale",
          requires: [
            "home.view.start.Start",
            "portal.v1.global.Vars",
            "portal.util.Locale",
          ],
          mainView: "home.view.start.Start",
        });
        i = 11;
      } else {
        await timer(500);
      }
    }
    if (!LOCALE.json) {
      alert('errore caricameto dati riprovare più tardi')
    }
  }
  pollingLocale().then(r => '')
});
