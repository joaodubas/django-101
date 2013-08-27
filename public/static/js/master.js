Reveal.initialize({
  controls: true,
  progress: true,
  history: true,
  center: true,

  transition: 'default', // default/cube/page/concave/zoom/linear/fade/none

  width: '85%',
  height: '85%',
  margin: 0.1,

  multiplex: {
    secret: '13753255010694591859',
    id: 'ed8fedfef1ea150f',
    url: 'revealjs.jit.su:80'
  },

  // Optional libraries used to extend on reveal.js
  dependencies: [
    {
      src: '/static/bower_components/reveal.js//lib/js/classList.js',
      condition: function () { return !document.body.classList; }
    },
    {
      src: '/static/bower_components/reveal.js//plugin/markdown/marked.js',
      condition: function () { return !!document.querySelector( '[data-markdown]' ); }
    },
    {
      src: '/static/bower_components/reveal.js//plugin/markdown/markdown.js',
      condition: function () { return !!document.querySelector( '[data-markdown]' ); }
    },
    {
      src: '/static/bower_components/reveal.js//plugin/highlight/highlight.js',
      async: true,
      callback: function () { hljs.initHighlightingOnLoad(); } },
    {
      src: '/static/bower_components/reveal.js//plugin/zoom-js/zoom.js',
      async: true,
      condition: function () { return !!document.body.classList; } },
    {
      src: '/static/bower_components/reveal.js//plugin/notes/notes.js',
      async: true,
      condition: function () { return !!document.body.classList; } },
    {
      src: '/static/bower_components/reveal.js//plugin/socket.io/socket.io.min.js',
      async: true
    },
    {
      src: '/static/bower_components/reveal.js//plugin/multiplex/master.js', async: true
    }
  ]
});
