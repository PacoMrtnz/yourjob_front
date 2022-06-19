window.onload = function() {
  googleTranslateElementInit();
};

function googleTranslateElementInit() {
  if (google.translate.TranslateElement) {
    new google.translate.TranslateElement (
      {
        pageLanguage: 'es', includedLanguages: 'ca,eu,gl,es,en,fr,it,pt,ar,hi,ar,zh-CN',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
      },
      'google_translate_element');

    // new google.translate.TranslateElement({ pageLanguage: 'es', layout: google.translate.TranslateElement.InlineLayout.SIMPLE }, 'google_translate_element');
  //   new google.translate.TranslateElement (
  //       {
  //         pageLanguage: 'es', includedLanguages: 'af,ca,eu,gl,es,en,uk,fr,it,pt,de,ga,sq,ar,ja,az,kn,ko,bn,la,be,lv,bg,lt,mk,zh-CN,ms,zh-TW,mt,hr,no,cs,fa,da,pl,nl,ro,eo,ru,et,sr,tl,sk,fi,sl,sw,ka,sv,ta,el,te,gu,th,ht,tr,iw,hi,ur,hu,vi,is,cy,id',
  //         layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  //       },
  //       'google_translate_element');

  }
}