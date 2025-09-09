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
