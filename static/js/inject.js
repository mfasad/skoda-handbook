// Yandex.Metrika — counter 108730181
(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();
for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)}
)(window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');
ym(108730181,'init',{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});




// ============================================================
//  HOTFIX: Fix search URL generation
//  Search results incorrectly include category slug in URL:
//    /voennaya-forma/kakie-berety.html
//  Correct format is hash_dirs:
//    /articles/k/ka/kakie-berety.html
//  This observer watches search dropdowns and fixes URLs.
// ============================================================
(function(){
    var dd = document.getElementById('globalSearchDropdown') || document.getElementById('searchDropdown');
    if (!dd) return;
    new MutationObserver(function(){
        var links = dd.querySelectorAll('a[href]');
        for (var i = 0; i < links.length; i++) {
            var a = links[i];
            if (a._urlFixed) continue;
            a._urlFixed = true;
            var href = a.getAttribute('href');
            if (!href) continue;
            if (href.indexOf('/articles/') !== -1) continue;
            var parts = href.split('/');
            var filename = parts[parts.length - 1];
            if (!filename.endsWith('.html')) continue;
            var slug = filename.replace('.html', '').toLowerCase();
            var c1 = slug[0] || '';
            var c2 = slug.substring(0, Math.min(2, slug.length));
            var newUrl = '/articles/' + c1 + '/' + c2 + '/' + filename;
            a.setAttribute('href', newUrl);
            var slugEl = a.querySelector('.sd-slug');
            if (slugEl) slugEl.textContent = newUrl;
        }
    }).observe(dd, {childList: true, subtree: true});
})();

// Market-Place / MPSU ads for skoda-handbook.vercel.app
// Articles only: horizontal after 1st, 5th, and 9th safe paragraphs, corner sticker
(function () {
  var MPSU_SCRIPT_SRC = 'https://statika.mpsuadv.ru/scripts/11434.js';

  function isArticlePage() {
    if (!document.body) return false;
    if (document.body.classList.contains('home')) return false;
    if (document.body.classList.contains('category')) return false;
    if (document.body.classList.contains('archive')) return false;

    return !!document.querySelector('article, .article-body');
  }

  function getArticleRoot() {
    return document.querySelector('article') || document.querySelector('.article-body');
  }

  function isUnsafeAdParent(node, root) {
    while (node && node !== root && node !== document.body) {
      if (node.matches && node.matches('ol, ul, li, blockquote, table, thead, tbody, tr, td, th, figure, figcaption, aside, details, summary, pre, code')) return true;
      if (node.matches && node.matches('.important, .note, .warning, .alert, .callout, .highlight, .tip, .info, .notice, .attention, .danger, .success, .faq, .steps, .pros-cons, .toc, .contents')) return true;
      if (node.className && typeof node.className === 'string' && /(important|note|warning|alert|callout|highlight|tip|info|notice|attention|danger|success|faq|steps|pros-cons|toc|contents)/i.test(node.className)) return true;
      node = node.parentElement;
    }
    return false;
  }

  function getSafeParagraphs(root) {
    if (!root) return [];
    return Array.prototype.filter.call(root.querySelectorAll('p'), function (paragraph) {
      if (!paragraph || !paragraph.parentElement) return false;
      if (isUnsafeAdParent(paragraph.parentElement, root)) return false;
      return paragraph.textContent && paragraph.textContent.replace(/\s+/g, '').length >= 40;
    });
  }

  function loadMpsuScript() {
    if (document.querySelector('script[src="' + MPSU_SCRIPT_SRC + '"]')) return;

    var script = document.createElement('script');
    script.async = true;
    script.src = MPSU_SCRIPT_SRC;
    document.head.appendChild(script);
  }

  function startWidget(widgetId) {
    window.mpsuStart = window.mpsuStart || [];
    window.mpsuStart.push(widgetId);
  }

  function createWidget(widgetId) {
    if (document.getElementById('mp_custom_' + widgetId)) return null;

    var block = document.createElement('div');
    block.id = 'mp_custom_' + widgetId;
    return block;
  }

  function insertAfterParagraph(widgetId, paragraphNumber) {
    var article = getArticleRoot();
    var paragraphs = getSafeParagraphs(article);

    if (paragraphs.length < paragraphNumber) return;

    var block = createWidget(widgetId);
    if (!block) return;

    paragraphs[paragraphNumber - 1].insertAdjacentElement('afterend', block);
    startWidget(widgetId);
  }

  function insertFloatingWidget(widgetId) {
    var block = createWidget(widgetId);
    if (!block) return;

    document.body.appendChild(block);
    startWidget(widgetId);
  }

  function initAds() {
    if (!isArticlePage()) return;

    loadMpsuScript();

    // Rotator Static ZBT skoda-handbook.vercel.app horizontal 1 №41885
    insertAfterParagraph(41885, 1);
    // Rotator Static ZBT skoda-handbook.vercel.app horizontal 2 №41886
    insertAfterParagraph(41886, 5);
    // Rotator Static ZBT skoda-handbook.vercel.app horizontal 3 №41887
    insertAfterParagraph(41887, 9);
    // Rotator Recom V skoda-handbook.vercel.app №41888
    insertFloatingWidget(41888);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAds);
  } else {
    initAds();
  }
})();
