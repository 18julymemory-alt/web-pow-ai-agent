/* ===================================================
   POWAI / MISSION ARCHIVE — PROJECTS CLIENT LOGIC
   Client-side filtering, accessible Drawer & Case Preview
   =================================================== */

// Project entries database from verified source
const projectDatabase = {
  'quoc-anh-door': {
    code: 'DA-01',
    name: 'Quốc Anh Door',
    industry: 'Nhôm kính kiến trúc & Công trình hoàn thiện',
    services: ['Website doanh nghiệp', 'SEO tổng thể', 'Google Ads', 'CRM & Dữ liệu'],
    category: ['Website', 'SEO', 'Quảng cáo', 'Data & Analytics'],
    challenge: 'Tỷ lệ chuyển đổi từ traffic tự nhiên và các chiến dịch quảng cáo bị phân tán; khách hàng quan tâm các công trình lớn khó theo dõi xuyên suốt và thiếu công cụ bám sát tiến độ báo giá.',
    diagnosis: 'Hệ thống thông tin sản phẩm và công trình mẫu chưa làm rõ năng lực thi công thực tế; biểu mẫu tiếp nhận yêu cầu rời rạc với quy trình tư vấn kỹ thuật nội bộ.',
    strategy: 'Xây dựng website dự án chuẩn kiến trúc, tinh chỉnh cụm từ khóa tìm kiếm theo ý định mua hàng (high commercial intent) và kết nối luồng ghi nhận lead trực tiếp vào bảng quản lý khách hàng.',
    system: [
      'Kiến trúc số: Website tối ưu trải nghiệm tra cứu danh mục công trình thực tế',
      'Phễu tiếp cận: Chiến dịch Google Search đón đầu nhu cầu lắp đặt dự án',
      'Tích hợp dữ liệu: Biểu mẫu tiếp nhận liên kết bảng quản lý tiến độ báo giá'
    ],
    execution: 'Quy hoạch lại toàn bộ cây danh mục sản phẩm nhôm kính, triển khai nội dung kỹ thuật giải đáp thắc mắc của chủ đầu tư, thiết lập tracking sự kiện gửi yêu cầu và bàn giao tài liệu vận hành cho đội ngũ kinh doanh.',
    measurement: 'Tỷ lệ gửi yêu cầu tư vấn kỹ thuật, chi phí tiếp cận trên mỗi liên hệ tiềm năng đủ điều kiện (Qualified Lead) và thời gian phản hồi đầu tiên.',
    results: 'Hồ sơ sơ bộ đang hoàn thiện sau khi đối chiếu số liệu nghiệm thu chính thức với khách hàng.',
    learning: 'Trong ngành kiến trúc công trình, sự rõ ràng về hồ sơ năng lực và hình ảnh thực tế quyết định hơn 70% niềm tin ban đầu của khách hàng doanh nghiệp.',
    status: 'Hồ sơ đang cập nhật'
  },
  'nextgo': {
    code: 'DA-02',
    name: 'NextGo',
    industry: 'Giải pháp công nghệ & Vận tải thông minh',
    services: ['Tự động hóa quy trình', 'Website nền tảng', 'Tư vấn chiến lược tăng trưởng'],
    category: ['AI & Automation', 'Website', 'Strategy'],
    challenge: 'Quy trình tiếp nhận và phân loại nhu cầu đối tác thủ công gây chậm trễ thời gian phản hồi; thông điệp giá trị nền tảng công nghệ chưa được truyền tải rõ ràng tới từng nhóm khách hàng mục tiêu.',
    diagnosis: 'Điểm nghẽn nằm ở khâu thu thập thông tin ban đầu: thiếu biểu mẫu động xác định quy mô đội xe và lộ trình di chuyển của khách hàng trước khi chuyển tiếp cho chuyên viên tư vấn.',
    strategy: 'Thiết kế cổng thông tin số tinh gọn, ứng dụng luồng tự động hóa phân loại nhu cầu và xây dựng kịch bản tư vấn theo từng phân khúc khách hàng B2B.',
    system: [
      'Cổng thông tin tương tác: Giao diện mô tả giải pháp trực quan theo từng mô hình vận tải',
      'Quy trình tự động hóa: Tự động phân luồng yêu cầu đối tác dựa trên quy mô và khu vực',
      'Cẩm nang chiến lược: Bộ tài liệu định vị giải pháp dành cho đội ngũ phát triển kinh doanh'
    ],
    execution: 'Tối ưu hóa hành trình đăng ký tư vấn giải pháp, tích hợp tự động phân bổ cơ hội kinh doanh cho đúng bộ phận phụ trách và cấu hình thông báo tức thì.',
    measurement: 'Tốc độ phản hồi yêu cầu đối tác (Speed-to-lead), tỷ lệ thông tin hợp lệ sau sàng lọc tự động và mức độ hài lòng của khách hàng trong bước trao đổi đầu tiên.',
    results: 'Dữ liệu vận hành đang được chuẩn hóa để công bố báo cáo tổng kết giai đoạn 1.',
    learning: 'Tự động hóa chỉ phát huy tối đa sức mạnh khi quy trình nghiệp vụ phía sau đã được tinh chỉnh gọn gàng và phân công trách nhiệm minh bạch.',
    status: 'Hồ sơ đang cập nhật'
  },
  'edu-trade': {
    code: 'DA-03',
    name: 'EDU Trade',
    industry: 'Giáo dục & Đào tạo thực chiến',
    services: ['Quảng cáo đa kênh', 'Chăm sóc Fanpage & Social', 'Tư vấn phễu tuyển sinh'],
    category: ['Quảng cáo', 'Social Media', 'Strategy'],
    challenge: 'Thị trường đào tạo có mức độ cạnh tranh cao; chi phí thu hút học viên mới có xu hướng gia tăng nếu chỉ phụ thuộc vào quảng cáo trực diện mà thiếu bước xây dựng niềm tin dài hạn.',
    diagnosis: 'Khách hàng mục tiêu cần thời gian kiểm chứng kiến thức thực tế trước khi đăng ký khóa học chuyên sâu; việc thúc đẩy đăng ký ngay lập tức tạo tâm lý e ngại.',
    strategy: 'Xây dựng phễu nội dung hai tầng: tầng 1 chia sẻ case study thực tiễn và kiến thức cốt lõi; tầng 2 mở đăng ký các buổi workshop trải nghiệm có giới hạn số lượng.',
    system: [
      'Phễu quảng cáo đa kênh: Phối hợp Facebook & YouTube Ads tiếp cận đúng tệp quan tâm',
      'Kho nội dung chuyên sâu: Hệ thống bài phân tích thực tế khẳng định uy tín chuyên môn',
      'Luồng chăm sóc học viên: Quy trình cung cấp thông tin khóa học minh bạch và chu đáo'
    ],
    execution: 'Sản xuất chuỗi bài học chuyên môn chất lượng cao, thiết lập landing page đăng ký workshop với đầy đủ lộ trình học và hệ thống nhắc lịch tự động.',
    measurement: 'Tỷ lệ tham gia thực tế (Show-up rate), chi phí tiếp cận trên mỗi người học tiềm năng và tỷ lệ chuyển đổi sau buổi học thử nghiệm.',
    results: 'Hồ sơ chi tiết và bài học thực tiễn đang được chuẩn hóa.',
    learning: 'Đối với ngành giáo dục, giá trị thực sự trao đi trước khi bán hàng là đòn bẩy bền vững nhất để giảm chi phí chuyển đổi trung bình.',
    status: 'Hồ sơ đang cập nhật'
  },
  'saluvietnam': {
    code: 'DA-04',
    name: 'SaluVietnam',
    industry: 'Thương mại & Tiêu dùng đa kênh',
    services: ['Thương mại điện tử', 'Quản trị Social Media', 'Dữ liệu & Đo lường'],
    category: ['E-commerce', 'Social Media', 'Data & Analytics'],
    challenge: 'Kênh bán hàng sàn thương mại và mạng xã hội vận hành phân tán, tồn tại chênh lệch về mặt hình ảnh nhận diện và thiếu bức tranh tổng thể về tỷ suất sinh lời theo từng dòng sản phẩm.',
    diagnosis: 'Thiếu dashboard hợp nhất báo cáo doanh số, chi phí quảng cáo sàn và phản hồi khách hàng; hoạt động sáng tạo nội dung chưa bám sát hành vi tìm kiếm thực tế.',
    strategy: 'Đồng bộ hóa nhận diện gian hàng trên Shopee/Lazada và Fanpage, quy hoạch lịch đăng bài theo chu kỳ ưu đãi và thiết lập bảng theo dõi chi phí đa kênh tập trung.',
    system: [
      'Gian hàng chuẩn hóa: Bộ nhận diện chuẩn hóa gian hàng điện tử và bao bì thông điệp',
      'Nhịp độ nội dung: Lịch nội dung tương tác đều đặn gắn liền với chương trình xúc tiến',
      'Bảng theo dõi hiệu suất: Theo dõi chi phí quảng cáo và hiệu quả từng mã sản phẩm'
    ],
    execution: 'Chỉnh sửa toàn bộ visual sản phẩm chính, tối ưu SEO tiêu đề và mô tả trên sàn TMĐT, tích hợp bảng tính theo dõi biên lợi nhuận sau trừ chi phí kênh.',
    measurement: 'Tỷ lệ khách mua lặp lại, chi phí quảng cáo trên doanh thu (ACOS/ROAS) và mức độ tương tác tự nhiên trên các kênh sở hữu.',
    results: 'Đang tiến hành đối chiếu số liệu giai đoạn vận hành mở rộng.',
    learning: 'Tăng trưởng thương mại điện tử bền vững không đến từ việc giảm giá ồ ạt, mà từ khả năng kiểm soát chặt chẽ biên lợi nhuận và trải nghiệm khách hàng nhất quán.',
    status: 'Hồ sơ đang cập nhật'
  }
};

function init() {
  console.log('[POWAI] projects.js initialized');
  initProjectFilters();
  initCaseDrawer();
}
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}

/* 01 / Filter Logic */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.mission-card');
  const counter = document.getElementById('filter-results-count');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      let visibleCount = 0;

      cards.forEach(card => {
        const categories = (card.getAttribute('data-categories') || '').split(',');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (counter) {
        counter.textContent = `${visibleCount} / ${cards.length} DỰ ÁN`;
      }
    });
  });
}

/* 02 / Case Study Drawer Logic */
function initCaseDrawer() {
  const overlay = document.getElementById('case-drawer-overlay');
  const drawer = document.getElementById('case-drawer');
  const closeBtn = document.getElementById('case-drawer-close');
  const drawerBody = document.getElementById('drawer-body');
  const drawerTitle = document.getElementById('drawer-title');
  const drawerKicker = document.getElementById('drawer-kicker');

  if (!overlay || !drawer) return;

  let lastActiveElement = null;

  function openDrawer(projectId) {
    const data = projectDatabase[projectId];
    if (!data) return;

    lastActiveElement = document.activeElement;

    drawerKicker.textContent = `${data.code} // ${data.industry.toUpperCase()}`;
    drawerTitle.textContent = data.name;

    drawerBody.innerHTML = `
      <div class="project-brief-block" style="margin-bottom: 24px;">
        <span class="brief-label">01 / TỔNG QUAN DỰ ÁN</span>
        <p><strong>Khách hàng:</strong> ${data.name}</p>
        <p><strong>Lĩnh vực:</strong> ${data.industry}</p>
        <p><strong>Dịch vụ chính:</strong> ${data.services.join(' · ')}</p>
      </div>

      <div class="project-brief-block" style="margin-bottom: 20px;">
        <span class="brief-label">02 / BÀI TOÁN & THỬ THÁCH</span>
        <p>${data.challenge}</p>
      </div>

      <div class="project-brief-block" style="margin-bottom: 20px;">
        <span class="brief-label">03 / CHẨN ĐOÁN ĐIỂM NGHẼN</span>
        <p>${data.diagnosis}</p>
      </div>

      <div class="project-brief-block" style="margin-bottom: 20px;">
        <span class="brief-label">04 / CHIẾN LƯỢC TIẾP CẬN</span>
        <p>${data.strategy}</p>
      </div>

      <div class="project-brief-block" style="margin-bottom: 20px;">
        <span class="brief-label">05 / HỆ THỐNG ĐƯỢC THIẾT KẾ</span>
        <ul style="padding-left: 18px; margin: 8px 0; color: #b0c9db; font-size: 13px; line-height: 1.7;">
          ${data.system.map(s => `<li>${s}</li>`).join('')}
        </ul>
      </div>

      <div class="project-brief-block" style="margin-bottom: 20px;">
        <span class="brief-label">06 / CÁCH TRIỂN KHAI</span>
        <p>${data.execution}</p>
      </div>

      <div class="project-brief-block" style="margin-bottom: 20px;">
        <span class="brief-label">07 / ĐO LƯỜNG HIỆU QUẢ</span>
        <p>${data.measurement}</p>
      </div>

      <div class="project-data-notice">
        <div>
          <strong>08 / KẾT QUẢ XÁC MINH</strong>
          <p style="margin: 4px 0 0; color: #d0c098;">${data.results}</p>
        </div>
      </div>

      <div class="project-brief-block" style="margin-bottom: 24px;">
        <span class="brief-label">09 / BÀI HỌC VẬN HÀNH</span>
        <p>${data.learning}</p>
      </div>

      <div style="padding-top: 16px; border-top: 1px solid rgba(145, 185, 203, 0.2); display: flex; gap: 14px; flex-wrap: wrap;">
        <a href="/lien-he/" class="btn-primary-cyan" style="font-size: 12px; padding: 12px 20px;">Trao đổi bài toán tương tự →</a>
        <a href="/dich-vu/" class="btn-secondary-link" style="font-size: 12px;">Khám phá các dịch vụ liên quan</a>
      </div>
    `;

    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    drawer.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastActiveElement) lastActiveElement.focus();
  }

  document.querySelectorAll('[data-open-case]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-open-case');
      openDrawer(projectId);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeDrawer();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeDrawer();
    }
  });
}
