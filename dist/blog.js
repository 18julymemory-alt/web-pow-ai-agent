/**
 * POWAI Knowledge Orbit — Blog Logic & Seed Data Architecture
 * Ready for CMS / API Integration
 */

// Configuration for newsletter integration
// TODO: When email provider/backend API is available, insert endpoint URL here.
export const NEWSLETTER_ENDPOINT = null;

// Structured seed articles representing POWAI practical knowledge
export const blogArticles = [
  {
    id: 'google-ads-metrics-2026',
    slug: 'google-ads-2026-chi-so-thuc-su-can-theo-doi',
    title: 'Google Ads 2026: Doanh nghiệp thực sự cần theo dõi chỉ số nào?',
    category: 'Quảng cáo',
    categoryId: 'quang-cao',
    excerpt: 'Giữa hàng chục chỉ số hiển thị, nhấp chuột và tương tác, các doanh nghiệp tăng trưởng bền vững thường chỉ tập trung vào tỷ lệ khách hàng tiềm năng đủ điều kiện, chi phí thực tế trên mỗi chuyển đổi và giá trị vòng đời khách hàng.',
    date: '14 Tháng 9, 2026',
    readTime: '6 phút đọc',
    image: '/assets/campaign-scenes/search.svg?v=20260911-scenes2',
    imageAlt: 'Minh họa phân tích chỉ số và ý định tìm kiếm Google Ads',
    isFeatured: true
  },
  {
    id: 'facebook-ads-budget-scaling',
    slug: 'khong-phai-cu-tang-ngan-sach-la-quang-cao-se-tang-truong',
    title: 'Không phải cứ tăng ngân sách là quảng cáo sẽ tăng trưởng',
    category: 'Quảng cáo',
    categoryId: 'quang-cao',
    excerpt: 'Tăng ngân sách khi tệp đối tượng bão hòa hoặc thông điệp chưa đủ mạnh chỉ làm CPA tăng vọt. Hãy nhìn vào nhịp làm mới creative, tần suất tiếp cận và chu kỳ mua hàng trước khi nhân rộng quy mô.',
    date: '12 Tháng 9, 2026',
    readTime: '5 phút đọc',
    image: '/assets/campaign-scenes/demand.svg?v=20260911-scenes2',
    imageAlt: 'Minh họa phân bổ ngân sách và thử nghiệm creative',
    layoutType: 'lead'
  },
  {
    id: 'seo-search-assets',
    slug: 'seo-khong-chi-la-thu-hang-xay-tai-san-tim-kiem',
    title: 'SEO không chỉ là thứ hạng: Xây tài sản tìm kiếm cho doanh nghiệp',
    category: 'SEO',
    categoryId: 'seo',
    excerpt: 'Thứ hạng từ khóa có thể dao động theo từng đợt cập nhật thuật toán. Tài sản thực sự là cấu trúc nội dung giải quyết đúng vấn đề của khách hàng và uy tín thương hiệu tích lũy theo thời gian.',
    date: '08 Tháng 9, 2026',
    readTime: '7 phút đọc',
    image: '/assets/service-products/seo--seo-tong-the.svg',
    imageAlt: 'Minh họa cấu trúc thực thể SEO tổng thể',
    layoutType: 'twin'
  },
  {
    id: 'ai-agent-marketing-workflows',
    slug: 'ai-agent-thay-doi-quy-trinh-marketing-nhu-the-nao',
    title: 'AI Agent có thể thay đổi quy trình Marketing như thế nào?',
    category: 'AI & Automation',
    categoryId: 'ai-automation',
    excerpt: 'Không dừng lại ở việc tạo văn bản đơn thuần, AI Agent hỗ trợ phân loại yêu cầu tư vấn, đồng bộ dữ liệu đa nền tảng và cung cấp thông tin kịp thời cho đội ngũ vận hành.',
    date: '05 Tháng 9, 2026',
    readTime: '8 phút đọc',
    image: '/assets/service-products/ai-tu-dong-hoa--ai-agent.svg',
    imageAlt: 'Minh họa quy trình hoạt động của AI Agent',
    layoutType: 'twin'
  },
  {
    id: 'website-conversion-factors',
    slug: 'website-dep-chua-du-7-diem-anh-huong-truc-tiep-den-chuyen-doi',
    title: 'Website đẹp chưa đủ: 7 điểm ảnh hưởng trực tiếp đến chuyển đổi',
    category: 'Website',
    categoryId: 'website',
    excerpt: 'Tốc độ tải trang, thông điệp rõ ràng trong 5 giây đầu, độ tương phản của nút kêu gọi và luồng biểu mẫu tối giản là những yếu tố quyết định người xem ở lại hay rời đi.',
    date: '01 Tháng 9, 2026',
    readTime: '5 phút đọc',
    image: '/assets/service-products/website-landing-page--website-doanh-nghiep.svg',
    imageAlt: 'Minh họa cấu trúc trang web tối ưu chuyển đổi',
    layoutType: 'list'
  },
  {
    id: 'ga4-gtm-data-foundations',
    slug: 'ga4-gtm-du-lieu-chuyen-doi-doanh-nghiep-nen-bat-dau-tu-dau',
    title: 'GA4, GTM và dữ liệu chuyển đổi: Doanh nghiệp nên bắt đầu từ đâu?',
    category: 'Data & Analytics',
    categoryId: 'data-analytics',
    excerpt: 'Trước khi thiết lập hàng trăm thẻ theo dõi, hãy xác định đâu là các hành vi then chốt tạo ra doanh thu: hoàn tất biểu mẫu, nhấp gọi hotline hoặc tiến hành đặt hàng.',
    date: '28 Tháng 8, 2026',
    readTime: '6 phút đọc',
    image: '/assets/service-products/du-lieu-phan-tich--ga4.svg',
    imageAlt: 'Minh họa cấu trúc đo lường và phân tích dữ liệu GA4',
    layoutType: 'list'
  },
  {
    id: 'social-content-revenue-gap',
    slug: 'content-nhieu-nhung-khong-tao-doanh-thu-van-de-o-dau',
    title: 'Content nhiều nhưng không tạo doanh thu: Vấn đề thường nằm ở đâu?',
    category: 'Social Media',
    categoryId: 'social-media',
    excerpt: 'Sự chênh lệch giữa lượt xem và doanh thu thường xuất hiện khi nội dung chỉ dừng ở giải trí mà thiếu bước liên kết giá trị sản phẩm với nhu cầu thực tế của khách hàng.',
    date: '24 Tháng 8, 2026',
    readTime: '5 phút đọc',
    image: '/assets/service-products/social-media--quan-tri-fanpage.svg',
    imageAlt: 'Minh họa lập kế hoạch nội dung mạng xã hội',
    layoutType: 'list'
  },
  {
    id: 'ecommerce-channel-priority',
    slug: 'shopee-tiktok-shop-hay-website-dau-la-kenh-nen-uu-tien',
    title: 'Shopee, TikTok Shop hay Website: Đâu là kênh nên ưu tiên?',
    category: 'E-commerce',
    categoryId: 'ecommerce',
    excerpt: 'Mỗi kênh có một đặc thù riêng về hành vi mua sắm, biên lợi nhuận và quyền sở hữu dữ liệu khách hàng. Bài viết phân tích các tiêu chí để doanh nghiệp chọn kênh đi đầu.',
    date: '19 Tháng 8, 2026',
    readTime: '7 phút đọc',
    image: '/assets/service-products/thuong-mai-dien-tu--shopee.svg',
    imageAlt: 'Minh họa so sánh các kênh bán hàng thương mại điện tử',
    layoutType: 'list'
  }
];

export const blogCategories = [
  { id: 'all', name: 'Tất cả' },
  { id: 'quang-cao', name: 'Quảng cáo' },
  { id: 'seo', name: 'SEO' },
  { id: 'ai-automation', name: 'AI & Automation' },
  { id: 'website', name: 'Website' },
  { id: 'social-media', name: 'Social Media' },
  { id: 'ecommerce', name: 'E-commerce' },
  { id: 'data-analytics', name: 'Data & Analytics' }
];

// Helper: Escape HTML entities
function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

/**
 * Initialize Blog Page Components
 */
export function initBlog() {
  const filterPillsContainer = document.getElementById('category-filter-pills');
  const articlesContainer = document.getElementById('articles-display-grid');
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterStatus = document.getElementById('newsletter-status');

  let currentCategory = 'all';

  // Calculate counts for each category
  function getCategoryCount(catId) {
    if (catId === 'all') return blogArticles.length;
    return blogArticles.filter(a => a.categoryId === catId).length;
  }

  // Render Category Filter Buttons
  if (filterPillsContainer) {
    filterPillsContainer.innerHTML = blogCategories.map(cat => {
      const count = getCategoryCount(cat.id);
      const isSelected = cat.id === currentCategory;
      return `
        <button
          type="button"
          class="filter-btn"
          data-category="${cat.id}"
          aria-pressed="${isSelected}"
        >
          <span>${escapeHtml(cat.name)}</span>
          <span class="filter-count" aria-hidden="true">${count}</span>
        </button>
      `;
    }).join('');

    filterPillsContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-category]');
      if (!btn) return;
      const targetCat = btn.dataset.category;
      if (targetCat === currentCategory) return;

      currentCategory = targetCat;

      // Update button states
      filterPillsContainer.querySelectorAll('.filter-btn').forEach(b => {
        b.setAttribute('aria-pressed', String(b.dataset.category === currentCategory));
      });

      // Re-render articles
      renderArticles(currentCategory);
    });
  }

  // Render Article Grid based on selected category
  function renderArticles(categoryId) {
    if (!articlesContainer) return;

    const filtered = categoryId === 'all'
      ? blogArticles.filter(a => !a.isFeatured) // Featured article is in hero section
      : blogArticles.filter(a => a.categoryId === categoryId);

    if (filtered.length === 0) {
      articlesContainer.innerHTML = `
        <div class="filter-empty" role="status">
          <h3>Chưa có bài viết trong danh mục này</h3>
          <p>POWAI đang biên soạn nội dung chuyên sâu cho chủ đề này. Vui lòng quay lại sau.</p>
        </div>
      `;
      return;
    }

    // Split by editorial roles
    const lead = filtered.find(a => a.layoutType === 'lead') || filtered[0];
    const restAfterLead = filtered.filter(a => a !== lead);
    const twins = restAfterLead.slice(0, 2);
    const listItems = restAfterLead.slice(2);

    let html = '';

    // 1. Lead Article
    if (lead) {
      html += `
        <article class="article-lead" data-category="${lead.categoryId}">
          <figure class="article-thumb">
            <img src="${lead.image}" alt="${escapeHtml(lead.imageAlt)}" width="480" height="280" loading="lazy">
          </figure>
          <div class="article-info">
            <span class="article-cat">${escapeHtml(lead.category)}</span>
            <h3 class="article-title">${escapeHtml(lead.title)}</h3>
            <p class="article-desc">${escapeHtml(lead.excerpt)}</p>
            <div class="article-foot">
              <span>${escapeHtml(lead.date)} · ${escapeHtml(lead.readTime)}</span>
              <a class="article-read-link" href="#stay-in-orbit">Đọc tiếp <span>→</span></a>
            </div>
          </div>
        </article>
      `;
    }

    // 2. Twin Articles
    if (twins.length > 0) {
      html += `<div class="article-twins">`;
      twins.forEach(item => {
        html += `
          <article class="article-card" data-category="${item.categoryId}">
            <figure class="article-thumb">
              <img src="${item.image}" alt="${escapeHtml(item.imageAlt)}" width="400" height="200" loading="lazy">
            </figure>
            <div class="article-info">
              <span class="article-cat">${escapeHtml(item.category)}</span>
              <h3 class="article-title">${escapeHtml(item.title)}</h3>
              <p class="article-desc">${escapeHtml(item.excerpt)}</p>
              <div class="article-foot">
                <span>${escapeHtml(item.date)} · ${escapeHtml(item.readTime)}</span>
                <a class="article-read-link" href="#stay-in-orbit">Đọc tiếp <span>→</span></a>
              </div>
            </div>
          </article>
        `;
      });
      html += `</div>`;
    }

    // 3. List Articles
    if (listItems.length > 0) {
      html += `<div class="article-list">`;
      listItems.forEach(item => {
        html += `
          <article class="article-row-item" data-category="${item.categoryId}">
            <figure class="article-thumb">
              <img src="${item.image}" alt="${escapeHtml(item.imageAlt)}" width="130" height="96" loading="lazy">
            </figure>
            <div class="article-info">
              <span class="article-cat">${escapeHtml(item.category)}</span>
              <h4 class="article-title">${escapeHtml(item.title)}</h4>
              <p class="article-desc">${escapeHtml(item.excerpt)}</p>
              <div class="article-foot">
                <span>${escapeHtml(item.readTime)}</span>
                <a class="article-read-link" href="#stay-in-orbit">Xem <span>→</span></a>
              </div>
            </div>
          </article>
        `;
      });
      html += `</div>`;
    }

    articlesContainer.innerHTML = html;
  }

  // Initial render
  renderArticles(currentCategory);

  // Newsletter form submission handling
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const email = emailInput ? emailInput.value.trim() : '';

      if (!email || !email.includes('@') || !email.includes('.')) {
        if (newsletterStatus) {
          newsletterStatus.className = 'newsletter-status error';
          newsletterStatus.textContent = 'Vui lòng nhập địa chỉ email hợp lệ để nhận bản tin.';
        }
        return;
      }

      // Check if backend endpoint is configured
      if (!NEWSLETTER_ENDPOINT) {
        if (newsletterStatus) {
          newsletterStatus.className = 'newsletter-status info';
          newsletterStatus.innerHTML = `
            Hệ thống nhận bản tin đang được kết nối với dịch vụ email doanh nghiệp.
            Email <strong>${escapeHtml(email)}</strong> đã được ghi nhận tại phiên duyệt này.
            Bạn có thể liên hệ trực tiếp với POWAI qua trang <a href="/lien-he/" style="color:var(--cyan);text-decoration:underline;">Liên hệ</a>.
          `;
        }
        return;
      }

      // If backend endpoint is configured:
      try {
        if (newsletterStatus) {
          newsletterStatus.className = 'newsletter-status';
          newsletterStatus.textContent = 'Đang gửi thông tin đăng ký…';
        }
        const response = await fetch(NEWSLETTER_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, timestamp: new Date().toISOString() })
        });
        if (response.ok) {
          newsletterStatus.className = 'newsletter-status info';
          newsletterStatus.textContent = 'Đã đăng ký nhận bản tin thành công. Cảm ơn bạn!';
          newsletterForm.reset();
        } else {
          throw new Error('Server returned ' + response.status);
        }
      } catch (err) {
        if (newsletterStatus) {
          newsletterStatus.className = 'newsletter-status error';
          newsletterStatus.textContent = 'Không thể kết nối đến máy chủ gửi thư. Vui lòng thử lại sau.';
        }
      }
    });
  }
}

// Auto-run when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBlog);
} else {
  initBlog();
}
