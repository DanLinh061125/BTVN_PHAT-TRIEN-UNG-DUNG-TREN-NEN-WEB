-- Khởi tạo cơ sở dữ liệu mẫu cho ứng dụng Web Bán Hàng
CREATE DATABASE IF NOT EXISTS `shopdb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `shopdb`;

-- Bảng sinh viên đóng quỹ / khách hàng
CREATE TABLE IF NOT EXISTS `students` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `money` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Thêm dữ liệu mẫu ban đầu
INSERT INTO `students` (`name`, `money`) VALUES
('Đan Linh', 123.00),
('David', 456.00),
('Thầy Cốp', 789.00),
('Minh Anh', 250.00),
('Văn Hoàng', 320.00);

-- Bảng sản phẩm bán hàng
CREATE TABLE IF NOT EXISTS `products` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `price` DECIMAL(12, 2) NOT NULL,
    `category` VARCHAR(100) NOT NULL,
    `image_url` VARCHAR(500),
    `description` TEXT,
    `stock` INT DEFAULT 100,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `products` (`name`, `price`, `category`, `image_url`, `description`) VALUES
('Laptop Gaming Dell G15', 22500000, 'Laptop', 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45', 'Laptop cấu hình mạnh mẽ cho lập trình viên và sinh viên kỹ thuật'),
('Bàn phím cơ Không dây RGB', 1250000, 'Phụ kiện', 'https://images.unsplash.com/photo-1587829741301-dc798b83add3', 'Bàn phím gõ êm, đèn nền RGB sống động hỗ trợ code ban đêm'),
('Chuột công thái học Wireless', 890000, 'Phụ kiện', 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46', 'Chuột chống mỏi cổ tay khi làm việc văn phòng và học tập'),
('Tai nghe chống ồn Bluetooth', 1850000, 'Âm thanh', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e', 'Tai nghe âm thanh trung thực, tập trung học tập tối đa');
