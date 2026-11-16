---
layout: page-no-sidebar
title: About Me
permalink: /about/
hide_title: true
---

<div class="about-intro">
  <!-- Each row: GIF in its own column on the left, paragraph on the right -->
  <div class="about-row">
    <img src="/assets/images/cloud.gif" alt="" class="icon-gif gif-lightbox">
    <p>
      I am a <strong>Security Engineer</strong> specializing in cloud and AI. I've been at it for four years now spanning from different industries like financial services, healthcare, media, and real estate.
    </p>
  </div>

  <div class="about-row">
    <img src="/assets/images/security.gif" alt="" class="icon-gif gif-lightbox">
    <p>
      Mostly focused in Microsoft 365 & Azure Security but I am knowledgable in AWS as well.
    </p>
  </div>

  <div class="about-row">
    <img src="/assets/images/open.gif" alt="" class="icon-gif gif-lightbox">
    <p>
      Currently open to <strong> full-time Cloud and AI Security Engineering roles</strong>.
    </p>
  </div>
</div>

## Timeline

{% include timeline.html %}

<div class="gif-lightbox-overlay" id="gifLightbox">
  <img id="gifLightboxImg" src="" alt="">
</div>

<script>
(function() {
  var overlay = document.getElementById('gifLightbox');
  var overlayImg = document.getElementById('gifLightboxImg');

  document.querySelectorAll('.gif-lightbox').forEach(function(gif) {
    gif.addEventListener('click', function() {
      overlayImg.src = gif.src;
      overlay.classList.add('active');
    });
  });

  overlay.addEventListener('click', function() {
    overlay.classList.remove('active');
    overlayImg.src = '';
  });
})();
</script>

<!--
## Accolades

<div class="accolades-grid">
  <div class="accolade-item">
    <img src="https://via.placeholder.com/150/4a5568/ffffff?text=AWS+Builder" alt="AWS Community Builder">
  </div>
  <div class="accolade-item">
    <img src="https://via.placeholder.com/150/4a5568/ffffff?text=Top+5" alt="Top 5 Nominee">
  </div>
  <div class="accolade-item">
    <img src="https://via.placeholder.com/150/4a5568/ffffff?text=Alumni" alt="Alumni">
  </div>
  <div class="accolade-item">
    <img src="https://via.placeholder.com/150/4a5568/ffffff?text=Cloud+Native" alt="Cloud Native Security">
  </div>
  <div class="accolade-item">
    <img src="https://via.placeholder.com/150/4a5568/ffffff?text=Award" alt="Small Business Award">
  </div>
</div>
-->
