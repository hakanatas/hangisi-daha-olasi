/* ─────────────────────────────────────────────────────────────
   ALTYAZILAR / CAPTIONS — düzenlenebilir.
   Kısa, tek fikir, 5. sınıf dili. start/end saniye cinsinden.
   note: öğretmen için önerilen seslendirme cümlesi.
   ───────────────────────────────────────────────────────────── */
(function (root) {
  const CAPTIONS = [
    { scene: 1, start: 3.6, end: 9.6, tr: 'Çark döner, hangi renkte durur?', en: 'The spinner turns: which colour will it stop on?',
      note: 'Nokta’nın bir çarkı var. Çarkın büyük bölümü amber, küçük bir bölümü siyah. Çark döndüğünde hangi renkte durması daha olası?' },
    { scene: 2, start: 10.6, end: 15.8, tr: 'Olayları “az olası” ve “çok olası” diye ayıralım', en: 'Let’s sort events into “less likely” and “more likely”',
      note: 'Olayları iki gruba ayıracağız: az olası ve çok olası.' },
    { scene: 2, start: 16.2, end: 24.0, tr: 'Çarkı 8 kez çevirelim: 6 amber, 2 siyah', en: 'Spin 8 times: 6 amber, 2 black',
      note: 'Çarkı sekiz kez çevirelim. Altı kez amber, iki kez siyah geldi.' },
    { scene: 2, start: 24.4, end: 29.8, tr: 'Amber bölge daha büyük: amber çok olası', en: 'The amber part is bigger: amber is more likely',
      note: 'Neden? Çünkü amber bölge, çarkın dörtte üçü kadar; siyah bölge ise dörtte biri. Amberde durmak çok olası, siyahta durmak az olası.' },
    { scene: 3, start: 30.6, end: 35.4, tr: 'Torbada 6 top var: 5 amber, 1 siyah', en: 'The bag has 6 balls: 5 amber, 1 black',
      note: 'Bu torbada altı top var. Beşi amber, biri siyah.' },
    { scene: 3, start: 35.8, end: 40.8, tr: 'Siyah top tek başına: az olası', en: 'Only one black ball: less likely',
      note: 'Bakmadan bir top çekersek siyah gelmesi az olası; çünkü siyah top tek.' },
    { scene: 3, start: 41.2, end: 47.4, tr: 'Amber top çok: çok olası', en: 'Many amber balls: more likely',
      note: 'Amber gelmesi çok olası; çünkü altı topun beşi amber.' },
    { scene: 4, start: 48.6, end: 52.2, tr: 'Zar atınca 6 mı gelir, 6’dan küçük mü?', en: 'A die: will it show 6, or less than 6?',
      note: 'Bir zar atalım. 6 gelmesi mi daha olası, 6’dan küçük bir sayı gelmesi mi?' },
    { scene: 4, start: 52.6, end: 57.0, tr: '6 gelmesi 1 durum, 6’dan küçük 5 durum', en: 'Six is 1 outcome, less than six is 5',
      note: '6 gelmesi tek bir durum. 6’dan küçük gelmesi ise 1, 2, 3, 4 ve 5; yani beş durum.' },
    { scene: 4, start: 57.4, end: 65.4, tr: 'Daha çok durum: daha çok olası', en: 'More outcomes: more likely',
      note: 'Beş durum, bir durumdan fazla. Zarda 6’dan küçük gelmesi çok olası, 6 gelmesi az olası.' },
    { scene: 5, start: 66.6, end: 71.2, tr: 'Kar yağması: Ocakta mı, Temmuzda mı?', en: 'Snow: in January or in July?',
      note: 'Bazen bildiklerimize göre karar veririz. Kar yağması Ocakta mı daha olası, Temmuzda mı?' },
    { scene: 5, start: 71.6, end: 79.6, tr: 'Ocak kış, Temmuz yaz: Ocakta kar çok olası', en: 'January is winter, July is summer: snow in January is more likely',
      note: 'Ocak kış ayı, hava soğuk; Temmuz yaz ayı, hava sıcak. Ocakta kar yağması çok olası, Temmuzda az olası.' },
    { scene: 6, start: 80.6, end: 86.2, tr: 'Daha büyük pay, daha çok durum: daha çok olası', en: 'Bigger share, more outcomes: more likely',
      note: 'Bir olayın payı daha büyükse ya da daha çok durumu varsa, o olay daha çok olasıdır.' },
    { scene: 6, start: 86.6, end: 91.0, tr: 'Nedenini söyle: az mı, çok mu olası?', en: 'Say why: less likely or more likely?',
      note: 'Bir olayın az mı çok mu olası olduğunu söylerken nedenini de söyleyelim!' },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = CAPTIONS;
  else { root.LI = root.LI || {}; root.LI.CAPTIONS = CAPTIONS; }
})(typeof window !== 'undefined' ? window : globalThis);
