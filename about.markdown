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
      I am a <strong>Cloud Security & DevSecOps Engineer</strong> specializing in building secure cloud delivery systems across Azure and AWS. With four years of experience spanning financial services, healthcare, media, and real estate, I embed security into the design, automation, and deployment of infrastructure. Not as an afterthought, but as a foundation.
    </p>
  </div>

  <div class="about-row">
    <img src="/assets/images/security.gif" alt="" class="icon-gif gif-lightbox">
    <p>
      My work centers on three disciplines: <strong> cloud security, DevSecOps, & security automation</strong>. I believe security should be <strong> frictionless for engineering teams</strong>. Whether it is a Terraform policy-as-code gate catching misconfigurations at commit time, a SOAR playbook reducing mean time to resolution, or a federated identity model enforcing least privilege across hybrid cloud, I build solutions that hold up in production.
    </p>
  </div>

  <div class="about-row">
    <img src="/assets/images/open.gif" alt="" class="icon-gif gif-lightbox">
    <p>
      Currently open to <strong> full-time Cloud Security, DevSecOps, and Security Automation Engineering roles</strong>.
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
