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

  function updateButtons(moreButton, lessButton, visibleCount, totalCount, initialCount) {
    if (moreButton) {
      if (visibleCount >= totalCount) {
        moreButton.style.display = 'none';
      } else {
        const remaining = totalCount - visibleCount;
        moreButton.style.display = '';
        moreButton.textContent =
          remaining > 6
            ? 'Show More Reviews (' + remaining + ' remaining)'
            : 'Show More Reviews';
      }
    }

    if (lessButton) {
      lessButton.style.display = visibleCount > initialCount ? '' : 'none';
    }
  }

  window.initCustomReviews = function initCustomReviews(options) {
    const root = document.querySelector(options.rootSelector);
    const list = root ? root.querySelector('[data-reviews-list]') : null;
    const moreButton = root ? root.querySelector('[data-reviews-show-more]') : null;
    const lessButton = root ? root.querySelector('[data-reviews-show-less]') : null;

    if (!root || !list || !moreButton || !options.dataUrl) {
      return;
    }

    const layout = options.layout === 'list' ? 'list' : 'grid';
    const initialCount = options.initialCount || 3;
    const batchSize = options.batchSize || 6;
    const renderCard = layout === 'list' ? renderListCard : renderGridCard;

    let reviews = [];
    let visibleCount = 0;

    function renderVisible() {
      list.innerHTML = reviews.slice(0, visibleCount).map(renderCard).join('');
      updateButtons(moreButton, lessButton, visibleCount, reviews.length, initialCount);
    }

    function showMore() {
      visibleCount = Math.min(visibleCount + batchSize, reviews.length);
      renderVisible();
    }

    function showLess() {
      visibleCount = initialCount;
      renderVisible();
      root.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    moreButton.addEventListener('click', showMore);

    if (lessButton) {
      lessButton.addEventListener('click', showLess);
    }

    fetch(options.dataUrl)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Failed to load reviews');
        }
        return response.json();
      })
      .then(function (data) {
        reviews = Array.isArray(data) ? data : [];
        visibleCount = Math.min(initialCount, reviews.length);
        renderVisible();
      })
      .catch(function () {
        moreButton.style.display = 'none';
        if (lessButton) {
          lessButton.style.display = 'none';
        }
      });
  };
})();
