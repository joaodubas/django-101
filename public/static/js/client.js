Reveal.initialize({
  controls: false,
  keyboard: false,
  progress: true,
  history: true,
  center: true,

  transition: 'fade', // default/cube/page/concave/zoom/linear/fade/none

  width: '85%',
  height: '85%',
  margin: 0.1,

  multiplex: {
    secret: null,
    id: 'ed8fedfef1ea150f',
    url: 'revealjs.jit.su:80'
  },

  // Optional libraries used to extend on reveal.js
  dependencies: [
    { src: '/lib/js/classList.js', condition: function() { return !document.body.classList; } },
    { src: '/plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
    { src: '/plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
    { src: '/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
    { src: '/plugin/zoom-js/zoom.js', async: true, condition: function() { return !!document.body.classList; } },
    { src: '/plugin/notes/notes.js', async: true, condition: function() { return !!document.body.classList; } },
    { src: '/plugin/socket.io/socket.io.min.js', async: true },
    { src: '/plugin/multiplex/client.js', async: true }
  ]
});
