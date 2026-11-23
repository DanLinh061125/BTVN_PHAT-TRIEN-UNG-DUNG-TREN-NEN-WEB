/**
 * =============================================================================
 * JAVASCRIPT FETCH API - KẾT NỐI API NODE-RED (/api/tacke)
 * Môn: Phát triển ứng dụng trên nền Web
 * Sinh viên: Nguyễn Phạm Đan Linh - K59.KMT - TNUT
 * =============================================================================
 */

// Hàm gọi API /api/tacke qua Reverse Proxy Nginx
async function loadStudentData() {
    const tableBody = document.getElementById('student-table-body');
    const totalCountEl = document.getElementById('total-students');
    const totalMoneyEl = document.getElementById('total-money');
    const topStudentEl = document.getElementById('top-student');
    const apiStatusEl = document.getElementById('api-status');

    // Hiển thị trạng thái đang tải
    apiStatusEl.innerHTML = '<span class="status-badge" style="background:#e0e7ff; color:#4338ca;">Đang tải dữ liệu từ API...</span>';

    try {
        // Gửi HTTP GET Request tới /api/tacke (cùng origin qua Nginx reverse proxy)
        const response = await fetch('/api/tacke', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        // 1. Kiểm tra HTTP Status
        if (!response.ok) {
            throw new Error(`Lỗi máy chủ: HTTP ${response.status} (${response.statusText})`);
        }

        // 2. Parse dữ liệu JSON
        const data = await response.json();

        // 3. Kiểm tra trường ok và cấu trúc dữ liệu theo đúng đề bài
        if (data.ok !== 1 || !Array.isArray(data.dssv)) {
            throw new Error(`Dữ liệu JSON không hợp lệ hoặc cờ 'ok' khác 1: ${data.msg || 'Không rõ'}`);
        }

        // 4. Lấy mảng sinh viên
        const dssv = data.dssv;

        // 5. Xóa dữ liệu cũ trong bảng
        tableBody.innerHTML = '';

        // 6. Tính toán thống kê trên frontend (hoặc lấy từ summary backend)
        let totalMoney = 0;
        let topStudent = { name: 'Chưa có', money: -1 };

        dssv.forEach((student, index) => {
            const moneyVal = Number(student.money) || 0;
            totalMoney += moneyVal;

            if (moneyVal > topStudent.money) {
                topStudent = { name: student.name, money: moneyVal };
            }

            // Tạo hàng dữ liệu HTML
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>#${index + 1}</strong></td>
                <td>
                    <div style="font-weight:600; color:#1e293b;">${escapeHtml(student.name)}</div>
                </td>
                <td style="color:#059669; font-weight:700;">
                    ${moneyVal.toLocaleString('vi-VN')} đ
                </td>
                <td>
                    <span class="status-badge success">Đã xác nhận</span>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // 7. Cập nhật các thẻ thông số thống kê
        totalCountEl.innerText = dssv.length;
        totalMoneyEl.innerText = totalMoney.toLocaleString('vi-VN') + ' đ';
        topStudentEl.innerText = topStudent.name;

        // 8. Thông báo thành công
        apiStatusEl.innerHTML = `<span class="status-badge success">Kết nối thành công (API: ${escapeHtml(data.msg)})</span>`;

    } catch (error) {
        console.error('Lỗi khi gọi API /api/tacke:', error);
        
        // Hiển thị thông báo lỗi chi tiết ra giao diện
        apiStatusEl.innerHTML = `<span class="status-badge error">Lỗi: ${escapeHtml(error.message)}</span>`;
        tableBody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center; color:#ef4444; padding:20px;">
                    Không thể kết nối đến API Node-RED (/api/tacke).<br>
                    <small>Vui lòng kiểm tra container Node-RED và cấu hình Nginx reverse proxy.</small>
                </td>
            </tr>
        `;
    }
}

// Hàm hỗ trợ ngăn chặn XSS khi hiển thị text
function escapeHtml(text) {
    if (!text) return '';
    return text.toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Tự động nạp dữ liệu khi trang tải xong
document.addEventListener('DOMContentLoaded', () => {
    loadStudentData();
});
