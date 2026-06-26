(function () {
  function stars(rating) {
    return '★★★★★'.slice(0, rating) + '☆☆☆☆☆'.slice(rating);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderGridCard(review) {
    const verifiedHtml = review.verified
      ? '<div style="font-size: 12px; opacity: 0.6;">Verified Buyer</div>'
      : '';

    return (
      '<div class="review-card">' +
      '<div class="review-stars">' + stars(review.rating) + '</div>' +
      '<div class="review-text">"' + escapeHtml(review.text) + '"</div>' +
      '<div class="review-author">' +
      '<div>' +
      '<div class="review-author-name">' + escapeHtml(review.name) + '</div>' +
      verifiedHtml +
      '</div>' +
      '</div>' +
      '</div>'
    );
  }

  function renderListCard(review) {
    const verifiedHtml = review.verified
      ? '<div class="verified-badge">Verified Buyer</div>'
      : '';

    return (
      '<div class="review-card">' +
      '<div class="reviewer-info">' +
      '<div class="reviewer-name">' + escapeHtml(review.name) + '</div>' +
      verifiedHtml +
      '</div>' +
      '<div class="review-content">' +
      '<div class="stars">' + stars(review.rating) + '</div>' +
      '<div class="review-title">Verified Selection</div>' +
      '<div class="review-text">"' + escapeHtml(review.text) + '"</div>' +
      '</div>' +
      '</div>'
    );
  }

  function updateButton(button, visibleCount, totalCount) {
    if (!button) return;

    if (visibleCount >= totalCount) {
      button.style.display = 'none';
      return;
    }

    const remaining = totalCount - visibleCount;
    button.style.display = '';
    button.textContent =
      remaining > 6
        ? 'Show More Reviews (' + remaining + ' remaining)'
        : 'Show More Reviews';
  }

  window.initCustomReviews = function initCustomReviews(options) {
    const root = document.querySelector(options.rootSelector);
    const list = root ? root.querySelector('[data-reviews-list]') : null;
    const button = root ? root.querySelector('[data-reviews-show-more]') : null;

    if (!root || !list || !button || !options.dataUrl) {
      return;
    }

    const layout = options.layout === 'list' ? 'list' : 'grid';
    const initialCount = options.initialCount || 3;
    const batchSize = options.batchSize || 6;
    const renderCard = layout === 'list' ? renderListCard : renderGridCard;

    let reviews = [];
    let visibleCount = 0;

    function renderBatch(count) {
      const nextCount = Math.min(visibleCount + count, reviews.length);
      const fragment = reviews.slice(visibleCount, nextCount).map(renderCard).join('');
      list.insertAdjacentHTML('beforeend', fragment);
      visibleCount = nextCount;
      updateButton(button, visibleCount, reviews.length);
    }

    button.addEventListener('click', function () {
      renderBatch(batchSize);
    });

    fetch(options.dataUrl)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Failed to load reviews');
        }
        return response.json();
      })
      .then(function (data) {
        reviews = Array.isArray(data) ? data : [];
        list.innerHTML = '';
        visibleCount = 0;
        renderBatch(initialCount);
      })
      .catch(function () {
        button.style.display = 'none';
      });
  };
})();
