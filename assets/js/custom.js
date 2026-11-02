// Custom site-wide scripts for all layouts

// Floating bubbles
window.addEventListener('DOMContentLoaded', function() {
  var bubbleContainer = document.querySelector('.bubbles-container');
  if (bubbleContainer) {
    var numBubbles = 25;
    var bubbles = [];
    for(var i=0;i<numBubbles;i++){
      var bubble = document.createElement('div');
      bubble.classList.add('bubble');
      var size=Math.random()*20+10;
      bubble.style.width=size+"px";
      bubble.style.height=size+"px";
      bubble.style.left=Math.random()*100+"%";
      bubble.style.animationDuration=(5 + Math.random()*10)+"s";
      bubble.style.animationDelay=(Math.random()*5)+"s";
      bubbleContainer.appendChild(bubble);
      bubbles.push(bubble);
    }
    window.addEventListener('mousemove', function(e){
      bubbles.forEach(function(bubble){
        var rect = bubble.getBoundingClientRect();
        var dx = e.clientX - (rect.left + rect.width/2);
        var dy = e.clientY - (rect.top + rect.height/2);
        var dist = Math.sqrt(dx*dx+dy*dy);
        if(dist<100){
          bubble.style.transform="translate("+(dx/4)+"px, "+(dy/4)+"px)";
          setTimeout(function(){bubble.style.transform='';},200);
        }
      });
    });
  }
});

// Fade-in posts/cards
window.addEventListener('DOMContentLoaded', function() {
  var posts = document.querySelectorAll('.post-card');
  var fadeInPosts = function() {
    var triggerBottom = window.innerHeight * 0.85;
    posts.forEach(function(post) {
      var postTop = post.getBoundingClientRect().top;
      if(postTop < triggerBottom) post.classList.add('fade-in');
    });
  };
  window.addEventListener('scroll', fadeInPosts);
  window.addEventListener('load', fadeInPosts);

  // Post date only 'ago'
  function timeSince(date) {
    var seconds = Math.floor((new Date() - new Date(date))/1000);
    var interval = Math.floor(seconds/31536000);
    if(interval>=1) return interval+" year"+(interval>1?"s":"")+" ago";
    interval=Math.floor(seconds/2592000);
    if(interval>=1) return interval+" month"+(interval>1?"s":"")+" ago";
    interval=Math.floor(seconds/86400);
    if(interval>=1) return interval+" day"+(interval>1?"s":"")+" ago";
    interval=Math.floor(seconds/3600);
    if(interval>=1) return interval+" hour"+(interval>1?"s":"")+" ago";
    interval=Math.floor(seconds/60);
    if(interval>=1) return interval+" minute"+(interval>1?"s":"")+" ago";
    return "just now";
  }
  document.querySelectorAll('.post-card').forEach(function(card) {
    var dateStr = card.getAttribute('data-post-date');
    var dateElem = card.querySelector('.post-date');
    if(dateStr && dateElem) {
      var ago = timeSince(dateStr);
      dateElem.textContent = ago;
    }
  });
});

// Fade-in for page/post content
window.addEventListener('load', function() {
  var postContent = document.querySelector('.post-content');
  if(postContent) postContent.classList.add('fade-in-on-load');
  var pageContent = document.querySelector('.page-content');
  if(pageContent) pageContent.classList.add('fade-in-on-load');
});

// Human-readable post date for post layout
window.addEventListener('DOMContentLoaded', function() {
  var dateElem = document.querySelector('.post-date');
  if(dateElem) {
    var dateStr = dateElem.getAttribute('data-post-date');
    if(dateStr) {
      function timeSince(date) {
        var seconds = Math.floor((new Date() - new Date(date))/1000);
        var interval = Math.floor(seconds/31536000);
        if(interval>=1) return interval+" year"+(interval>1?"s":"")+" ago";
        interval=Math.floor(seconds/2592000);
        if(interval>=1) return interval+" month"+(interval>1?"s":"")+" ago";
        interval=Math.floor(seconds/86400);
        if(interval>=1) return interval+" day"+(interval>1?"s":"")+" ago";
        interval=Math.floor(seconds/3600);
        if(interval>=1) return interval+" hour"+(interval>1?"s":"")+" ago";
        interval=Math.floor(seconds/60);
        if(interval>=1) return interval+" minute"+(interval>1?"s":"")+" ago";
        return "just now";
      }
      var ago = timeSince(dateStr);
      dateElem.textContent = ago;
    }
  }
});

// Wrap post/page tables so wide ones scroll sideways on phones.
window.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.post-content table, .page-content table').forEach(function(table) {
    if (table.parentElement.classList.contains('table-scroll')) return;
    var wrap = document.createElement('div');
    wrap.className = 'table-scroll';
    table.parentNode.insertBefore(wrap, table);
    wrap.appendChild(table);
  });
  // Keep the active menu button in view when the menu is a swipeable row.
  var active = document.querySelector('.site-nav .menu-btn.active');
  var nav = document.querySelector('.site-nav');
  if (active && nav && nav.scrollWidth > nav.clientWidth) {
    nav.scrollLeft = active.offsetLeft - (nav.clientWidth - active.offsetWidth) / 2;
  }
});

// Theme switcher: dropdown in the header, or press "T" to cycle.
window.addEventListener('DOMContentLoaded', function() {
  var root = document.documentElement;
  var select = document.getElementById('theme-select');
  if (!select) return;
  var themes = Array.prototype.map.call(select.options, function(o) { return o.value; });

  function setTheme(name) {
    root.setAttribute('data-theme', name);
    select.value = name;
    try { localStorage.setItem('site-theme', name); } catch (e) {}
  }

  // A saved theme that no longer exists falls back to the site default.
  if (themes.indexOf(root.getAttribute('data-theme')) === -1) {
    setTheme(root.getAttribute('data-default-theme') || themes[0]);
  }
  select.value = root.getAttribute('data-theme');
  select.addEventListener('change', function() { setTheme(select.value); });

  document.addEventListener('keydown', function(e) {
    var tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select' || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === 't' || e.key === 'T') {
      var i = themes.indexOf(root.getAttribute('data-theme'));
      var step = e.shiftKey ? -1 : 1;
      setTheme(themes[(i + step + themes.length) % themes.length]);
    }
  });
});
