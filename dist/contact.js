/**
 * POWAI Mission Control — Contact Form & Direct Connection Logic
 * Production-ready frontend with explicit backend integration hooks
 */

// 1. CONFIGURATION FOR BACKEND ENDPOINT
// TODO: When backend API (REST endpoint, CRM webhook, etc.) is ready, configure the URL here.
// Example: export const CONTACT_ENDPOINT = 'https://api.yourdomain.vn/leads';
export const CONTACT_ENDPOINT = null;

// 2. OFFICIAL BUSINESS CONTACT INFORMATION CONFIGURATION
// TODO: Update these fields with officially verified business details from POWAI.
// When null or empty, UI displays a clear "Đang cập nhật" status instead of fake info.
export const businessContactConfig = {
  hotline: null,       // e.g. "1900 xxxx" or "09xx xxx xxx"
  email: null,         // e.g. "contact@powai.vn"
  zalo: null,          // e.g. "https://zalo.me/..."
  facebook: null,      // e.g. "https://facebook.com/..."
  address: null,       // e.g. "Tòa nhà ..., Hà Nội / TP.HCM"
  responseSLA: 'Thứ 2 – Thứ 6: 09:00 – 18:00 (Phản hồi trong vòng 24 giờ làm việc)'
};

/**
 * Initialize Direct Contact Information Panel
 */
function renderBusinessContactInfo() {
  const hotlineEl = document.getElementById('contact-hotline');
  const emailEl = document.getElementById('contact-email');
  const zaloEl = document.getElementById('contact-zalo');
  const addressEl = document.getElementById('contact-address');
  const slaEl = document.getElementById('contact-sla');

  if (hotlineEl) {
    if (businessContactConfig.hotline) {
      hotlineEl.innerHTML = `<a href="tel:${businessContactConfig.hotline}">${businessContactConfig.hotline}</a>`;
    } else {
      hotlineEl.innerHTML = `<span class="placeholder-tag">[Đang cập nhật số chính thức]</span>`;
    }
  }

  if (emailEl) {
    if (businessContactConfig.email) {
      emailEl.innerHTML = `<a href="mailto:${businessContactConfig.email}">${businessContactConfig.email}</a>`;
    } else {
      emailEl.innerHTML = `<span class="placeholder-tag">[Đang cập nhật email tiếp nhận]</span>`;
    }
  }

  if (zaloEl) {
    if (businessContactConfig.zalo) {
      zaloEl.innerHTML = `<a href="${businessContactConfig.zalo}" target="_blank" rel="noopener noreferrer">Kết nối qua Zalo OA ↗</a>`;
    } else {
      zaloEl.innerHTML = `<span class="placeholder-tag">[Đang cập nhật Zalo OA]</span>`;
    }
  }

  if (addressEl) {
    if (businessContactConfig.address) {
      addressEl.textContent = businessContactConfig.address;
    } else {
      addressEl.innerHTML = `<span class="placeholder-tag">[Đang cập nhật địa chỉ trụ sở]</span>`;
    }
  }

  if (slaEl && businessContactConfig.responseSLA) {
    slaEl.textContent = businessContactConfig.responseSLA;
  }
}

/**
 * Helper: Export form data as a downloaded .txt brief file
 */
function downloadBriefFile(data) {
  const lines = [
    '========================================',
    'POWAI — YÊU CẦU TƯ VẤN & BÀI TOÁN TĂNG TRƯỞNG',
    '========================================',
    `Thời gian ghi nhận: ${new Date().toLocaleString('vi-VN')}`,
    '',
    `1. THÔNG TIN LIÊN HỆ:`,
    `- Họ và tên: ${data.name}`,
    `- Số điện thoại: ${data.phone}`,
    `- Email: ${data.email || '(Chưa cung cấp)'}`,
    `- Doanh nghiệp / Website: ${data.company || '(Chưa cung cấp)'}`,
    '',
    `2. NHU CẦU TRIỂN KHAI:`,
    `- Dịch vụ quan tâm: ${data.service}`,
    `- Mục tiêu ưu tiên: ${data.goal || '(Chưa xác định)'}`,
    `- Ngân sách dự kiến: ${data.budget || '(Chưa xác định)'}`,
    '',
    `3. MÔ TẢ BÀI TOÁN:`,
    data.message || '(Chưa có mô tả chi tiết)',
    '',
    '========================================',
    'Tệp này được tạo tự động để lưu trữ dữ liệu tại máy của bạn.',
    'Bạn có thể gửi tệp này trực tiếp cho chuyên viên tư vấn của POWAI.'
  ];

  const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `POWAI-yeu-cau-${Date.now()}.txt`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 1000);
}

/**
 * Initialize Contact Form Validation & Submission
 */
export function initContact() {
  renderBusinessContactInfo();

  const form = document.getElementById('project-inquiry-form');
  const statusBox = document.getElementById('form-status-box');
  const submitBtn = document.getElementById('submit-inquiry-btn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Gather Form Values
    const formData = new FormData(form);
    const name = (formData.get('name') || '').toString().trim();
    const phone = (formData.get('phone') || '').toString().trim();
    const email = (formData.get('email') || '').toString().trim();
    const company = (formData.get('company') || '').toString().trim();
    const service = (formData.get('service') || '').toString().trim();
    const goal = (formData.get('goal') || '').toString().trim();
    const budget = (formData.get('budget') || '').toString().trim();
    const message = (formData.get('message') || '').toString().trim();
    const consent = formData.get('consent');

    // Validation
    if (!name || name.length < 2) {
      showStatus('Vui lòng nhập họ và tên đầy đủ (tối thiểu 2 ký tự).', 'error');
      form.querySelector('[name="name"]')?.focus();
      return;
    }

    const phoneRegex = /^[+0-9\s().-]{9,20}$/;
    if (!phone || !phoneRegex.test(phone) || phone.replace(/\D/g, '').length < 9) {
      showStatus('Vui lòng nhập số điện thoại hợp lệ (từ 9 đến 15 chữ số).', 'error');
      form.querySelector('[name="phone"]')?.focus();
      return;
    }

    if (email && (!email.includes('@') || !email.includes('.'))) {
      showStatus('Vui lòng nhập địa chỉ email hợp lệ hoặc để trống.', 'error');
      form.querySelector('[name="email"]')?.focus();
      return;
    }

    if (!service) {
      showStatus('Vui lòng chọn ít nhất một dịch vụ bạn đang quan tâm.', 'error');
      return;
    }

    if (!consent) {
      showStatus('Vui lòng đánh dấu đồng ý điều khoản liên hệ trước khi tiếp tục.', 'error');
      return;
    }

    const payload = {
      name,
      phone,
      email,
      company,
      service,
      goal,
      budget,
      message,
      submittedAt: new Date().toISOString()
    };

    // NON-FAKE SUBMISSION RULE:
    // If backend endpoint is NOT configured, inform the user clearly and offer local brief download.
    if (!CONTACT_ENDPOINT) {
      statusBox.className = 'form-status-box show info';
      statusBox.innerHTML = `
        <strong>Cổng gửi thông tin trực tuyến đang chờ kết nối API máy chủ.</strong><br>
        Thông tin yêu cầu của bạn đã được kiểm tra hợp lệ. Để không làm mất dữ liệu vừa nhập, bạn có thể tải bản tóm tắt bài toán về máy để trao đổi với POWAI:
        <br>
        <button type="button" class="download-brief-btn" id="download-brief-action">
          Tải tệp yêu cầu (.txt) về máy ↓
        </button>
      `;

      const downloadBtn = document.getElementById('download-brief-action');
      if (downloadBtn) {
        downloadBtn.onclick = () => {
          downloadBriefFile(payload);
        };
      }
      return;
    }

    // If backend endpoint IS configured, execute real network request
    try {
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Đang gửi thông tin…';
      showStatus('Đang truyền dữ liệu yêu cầu đến hệ thống POWAI…', 'info');

      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error(`Server status: ${res.status}`);

      showStatus('Yêu cầu tư vấn của bạn đã được gửi thành công. Đội ngũ POWAI sẽ phản hồi theo lịch hẹn.', 'info');
      form.reset();
    } catch (err) {
      showStatus(`Không thể gửi yêu cầu trực tuyến: ${err.message}. Vui lòng liên hệ trực tiếp.`, 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'GỬI YÊU CẦU TƯ VẤN <span>→</span>';
    }
  });

  function showStatus(text, type) {
    statusBox.className = `form-status-box show ${type}`;
    statusBox.textContent = text;
  }
}

// Auto-run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initContact);
} else {
  initContact();
}
