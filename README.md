# BTVN_PHAT-TRIEN-UNG-DUNG-TREN-NEN-WEB
BTVN môn Phát triển ứng dụng trên nền Web được thực hiện bởi Sinh viên Nguyễn Phạm Đan Linh - Lớp K59.KMT - Trường Đại học Kỹ thuật Công nghiệp Thái Nguyên
## Yêu cầu Bài tập về nhà môn Lập trình web:
## Bài tập 1:
1. giả lập linux os: hyperV, virtualBox, vmware, wsl
2. cài đặt docker compose trên os đó
3. cài trên docker compose : các dịch vụ: nginx, nodered, mariadb, phpmyadmin, cloudflared (cần domain xịn)
4. cấu hình nginx có thể chạy 2 website  với 2 domain khác nhau.
## Bài tập 2:
1. sử dụng nodered: dùng node http_in + http_response => tạo api đơn giản
2. cấu hình nginx để web dùng js gọi đc API trên nodered, thuật toán cho api (tự nghĩ)
   ví dụ api trả về json:
   https://tnut.cuong.id.vn/api/tacke
   trả về json dạng: 
   {"ok":1,"msg":"thành công","dssv":[{"name":"Cốp","money":123},{"name":"David","money":456}]}
3. code js vào trang html để gọi đc api trên
   
<h1 align="center">Bài làm</h1>
<h2 align="center">Bước 1: Đăng ký Domain và cấu hình DNS trên Cloudflare</h2>

### 1. Đăng ký tên miền xịn free .id.vn
   <img width="1515" height="722" alt="image" src="https://github.com/user-attachments/assets/4413e0f3-b175-4200-b558-bbc88d820b6d" />
 <p align="center"> 01-dang-ky-ten-mien-id-vn.png</p>
 
### 2. Đăng ký Cloudflared
<img width="1535" height="862" alt="image" src="https://github.com/user-attachments/assets/50fba481-3fe1-46d8-8a86-273cac4e630b" />
<p align="center"> 02-dang-ky-cloudeflared.png</p>

### 3. Add tên miền vào Cloudflare để Cloudflare quản lý (thay 2 chuỗi)
<img width="1535" height="862" alt="image" src="https://github.com/user-attachments/assets/0955400d-47ca-465c-b6a2-11540324aacf" />
<p align="center"> 03-add ten mien vao Cloudflare.png</p>

<img width="1535" height="862" alt="image" src="https://github.com/user-attachments/assets/731faf7a-80e4-490f-a2f0-73280ab9e955" />
<p align="center"> 04-add ten mien vao Cloudflare.png</p>

### 4. Cài đặt tunnel trên máy tính
<img width="1535" height="862" alt="image" src="https://github.com/user-attachments/assets/d4d718c3-a7ee-4318-a335-e709879b899a" />

<p align="center">05-Cai-dat-tunnel-tren-may-tinh.png</p>

<img width="1535" height="862" alt="image" src="https://github.com/user-attachments/assets/376356fb-4dc5-45f5-82b5-8ba13c5f88d8" />
<p align="center">06-Add-routes-vao-duong-ham.png</p>

<img width="1533" height="862" alt="image" src="https://github.com/user-attachments/assets/31bbf6c9-e7f0-4387-bf5d-32f851a8c438" />
<p align="center"> 07-Ket-qua-add-duong-ham-vao-routes.png</p>


<h2 align="center">Bước 2: Cài đặt Môi trường Ubuntu & Docker</h2>

# Yêu cầu:
Cài đặt môi trường, chọn 1 trong các thứ sau:
1.Dùng wsl có sẵn, cài đặt ubuntu trên wsl
2.cài ubuntu trên virtual box
3.cài ubuntu trên hyperV có sẵn của windows
4.cài ubuntu trên vmware

Trên ubuntu đó cài đặt:
1. Cài docker compose
2. Tạo thư mục làm việc
3. Vào thư mục làm việc, tạo file docker-compose.yml với y/c tạo các service: nodered, cloudflare, nginx
Cần token của cloudflare : phải đăng nhập cloudflare để lấy token khi tạo tunnel.
Cloudflare cũng cần có domain xịn trước khi sử dụng tính năng router (đăng ký domain free *.id.vn free tại nhà cung cấp Mắt bão)
4. Dùng lệnh để chạy nó: docker compose up -d

5. Edit cấu hình cho nginx, edit xong dùng lệnh để reload hoặc restart lại nginx để áp dụng cấu hình vừa edit: mục tiêu chạy đc 1 web đơn giản (cần có index.html tại đúng thư mục, đọc kỹ để hiểu thư mục này ở đâu)

6. Dùng nodered làm backend:
Tạo node http_in để nhận request , nối với node function để lập trình xử lý đầu vào/ra, node http_response để trả json.

7. Thêm cấu hình cho nginx để nhập http_in của nodered làm api cho js trong index.html gọi tới, nhận về json và hiển thị giá trị trong json lên giao diện.`. Hãy liệt kê chi tiết các bước cần làm để có được kết quả giống thầy: ai ai trên internet cũng truy cập được vào web trên máy của tôi.
# Bài làm:
## Phần 1 — Cài môi trường Linux
Chọn 1 trong 4 cách, nhưng WSL2 là dễ nhất và được khuyên dùng cho bài này:
Mở PowerShell (Run as Administrator), gõ:
powershell
wsl --install -d Ubuntu
Khởi động lại máy nếu được yêu cầu, mở Ubuntu từ Start Menu, đặt username/password cho Linux.
Kiểm tra: lsb_release -a, uname -a.
(Nếu chọn VirtualBox/Hyper-V/VMware, bạn tự cài Ubuntu Server hoặc Desktop trong máy ảo như bình thường, rồi các bước dưới đây giống hệt.)

<img width="752" height="808" alt="image" src="https://github.com/user-attachments/assets/94c01668-3e2f-401c-bb0b-6a17f3ea60c7" />
<p align="center"> 09-Cai-ubuntu.png</p>

<img width="1177" height="602" alt="image" src="https://github.com/user-attachments/assets/52863e33-68c3-4855-b802-21340776df0b" />
<p align="center"> 10-Giao-dien-Ubuntu.png</p>

## Phần 2 — Cài Docker & Docker Compose trong Ubuntu
Các bước cài đặt:
Trước tiên,cài Docker Desktop trên Windows (không phải trong Ubuntu):
Tải và cài Docker Desktop cho Windows tại: https://www.docker.com/products/docker-desktop/

<img width="766" height="150" alt="image" src="https://github.com/user-attachments/assets/82346a1d-6c66-4e95-a44e-78fd0429b071" />
<p align="center"> 11-Cai-dat-Docker</p>

Cài xong, mở Docker Desktop → vào Settings → Resources → WSL Integration → bật (toggle) cho Ubuntu.

<img width="937" height="807" alt="image" src="https://github.com/user-attachments/assets/3f0cf289-276e-4ba0-8437-c15947862ed0" />
<p align="center"> 12-Bat-toggle-cho-Ubuntu</p>

Sau đó, quay lại cửa sổ Ubuntu, gõ lần lượt từng lệnh (Enter sau mỗi dòng):
# 1. Cập nhật hệ thống và cài đặt gói phụ thuộc
sudo apt update
sudo apt install -y ca-certificates curl gnupg

<img width="1535" height="862" alt="image" src="https://github.com/user-attachments/assets/44b5511c-2bc6-4353-8ed3-cf58bffaa9e9" />

<p align="center"> 12-sudo apt update</p>

<img width="1535" height="862" alt="image" src="https://github.com/user-attachments/assets/ad33a85e-2ca8-4d3b-b586-feb29d2db219" />

<p align="center"> 13-sudo apt install -y ca-certificates curl gnupg
</p>

# 2. Thêm khóa GPG chính thức của Docker
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
Thêm kho lưu trữ (repository) Docker vào nguồn APT
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

<img width="1535" height="862" alt="image" src="https://github.com/user-attachments/assets/6a6c0c85-700b-459c-8d37-ce630ac70d9c" />

<p align="center"> 14.Thêm khóa GPG chính thức của Docker</p>

# 4. Cập nhật APT và cài Docker Compose
sudo apt update
sudo apt install -y docker-compose-plugin

<img width="1535" height="862" alt="image" src="https://github.com/user-attachments/assets/05cabda4-b893-4714-88bd-aec84b991729" />
<p align="center"> 15.Cập nhật APT và cài Docker Compose</p>

Kiểm tra lại:
docker compose version
docker --version

<img width="642" height="202" alt="image" src="https://github.com/user-attachments/assets/b90af1af-c7dd-4254-87a9-2a941d484a09" />

<p align="center"> 16.Kiểm tra lại</p>

# Phần 3 — Tạo thư mục làm việc & docker-compose.yml
mkdir -p ~/mysite/nginx/conf.d ~/mysite/www
cd ~/mysite

<img width="753" height="87" alt="image" src="https://github.com/user-attachments/assets/65493d94-a539-4949-91f0-6c9884580896" />

<p align="center"> 17.</p>

# 3.1. Lấy Cloudflare Tunnel Token
- Đăng ký domain miễn phí *.id.vn tại Mắt Bão, thêm domain đó vào tài khoản Cloudflare (đổi nameserver theo hướng dẫn Cloudflare). 
- Vào one.dash.cloudflare.com → Networks → Tunnels → Create a tunnel → chọn loại Cloudflared, đặt tên (vd: mysite-tunnel).
- Ở bước cài đặt, Cloudflare cho bạn 1 lệnh cài đặt có chứa token (chuỗi dài bắt đầu bằng eyJhIjoi...). Copy token này — không chạy lệnh đó, vì container cloudflared sẽ tự làm việc đó.
- Ở tab Published application routes (Public Hostname), khai báo:
Subdomain: ví dụ web
Domain: domain .id.vn của bạn
Type: HTTP
URL: nginx:80 (tên service nginx trong docker-compose, cổng 80 nội bộ)
*Phần 3.1 này em đã làm ở trên

# 3.2. File docker-compose.yml

Tạo file docker-compose.yml:

yaml
services:
  nodered:
    image: nodered/node-red:latest
    container_name: nodered
    restart: unless-stopped
    volumes:
      - ./nodered_data:/data
    networks:
      - webnet

  nginx:
    image: nginx:latest
    container_name: nginx
    restart: unless-stopped
    volumes:
      - ./www:/usr/share/nginx/html
      - ./nginx/conf.d:/etc/nginx/conf.d
    networks:
      - webnet

  cloudflared:
    image: cloudflare/cloudflared:latest
    container_name: cloudflared
    restart: unless-stopped
    command: tunnel --no-autoupdate run
    environment:
      - TUNNEL_TOKEN=DAN-TOKEN-O-DOCKER-CUA-BAN-VAO-DAY
    networks:
      - webnet

networks:
  webnet:
    driver: bridge

Lưu ý: không expose port ra ngoài (ports:) cho nginx/nodered — vì mọi traffic từ internet đi qua cloudflared, không cần mở port trên router/firewall.

<img width="1535" height="862" alt="image" src="https://github.com/user-attachments/assets/5f214fe7-6086-44a2-b82a-57f9f0ac0cd6" />

<p align="center"> 18.Kết quả.</p>

<img width="1153" height="603" alt="image" src="https://github.com/user-attachments/assets/6a02c001-9df0-4adb-afe4-b164745d51ce" />

<p align="center"> 19.Kết quả.</p>

# Khai báo Public Hostname trên Cloudflare
Vào cấu hình route của tunnel
Quay lại trang quản lý tunnel trên https://one.dash.cloudflare.com (Networks → Tunnels), bấm vào tunnel bạn vừa tạo (ví dụ `mysite-tunnel`), rồi vào tab **Published application routes** (có phiên bản cũ gọi là **Public Hostname**).

3.3. Chạy stack
bash
docker compose up -d
docker compose ps

Kiểm tra tunnel: docker compose logs cloudflared (thấy dòng "Registered tunnel connection" là ổn).

# Phần 4 — Cấu hình Nginx & trang index.html
Thư mục chứa index.html chính là ~/mysite/www trên máy host (vì đã mount vào /usr/share/nginx/html bên trong container nginx).
bash
cat > ~/mysite/www/index.html << 'EOF'
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>My Site</title></head>
<body>
  <h1>Xin chào!</h1>
  <div id="result">Đang tải...</div>
  <script>
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => {
        document.getElementById('result').innerText = JSON.stringify(data);
      });
  </script>
</body>
</html>
EOF
File cấu hình nginx nằm ở ~/mysite/nginx/conf.d/default.conf (mount vào /etc/nginx/conf.d trong container). Tạo file:
bash
cat > ~/mysite/nginx/conf.d/default.conf << 'EOF'
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    location /api/ {
        proxy_pass http://nodered:1880/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
EOF
Sau khi sửa cấu hình, reload nginx (không cần khởi động lại toàn bộ container):
bash
docker exec nginx nginx -s reload
hoặc restart hẳn container:
docker compose restart nginx
# Phần 5 — Node-RED làm backend
Mở Node-RED tạm thời qua trình duyệt để lập trình flow. Vì bạn không expose port ra ngoài trong compose, hãy tạm thời mở port để chỉnh sửa (thêm ports: ["1880:1880"] vào service nodered, chạy docker compose up -d, sau khi xong flow thì bỏ dòng port đi vì đã có nginx/cloudflare lo việc truy cập từ ngoài). Rồi truy cập http://localhost:1880 (hoặc IP WSL) trên máy host.
Kéo node http in: method GET, URL /hello.
Nối vào node function, code ví dụ:
javascript
msg.payload = {
    message: "Hello from Node-RED!",
    time: new Date().toISOString()
};
return msg;
Nối tiếp vào node http response.
Bấm Deploy (góc trên phải).

Endpoint thật sự sẽ là http://nodered:1880/hello (nội bộ trong mạng docker webnet) — đây là lý do trong nginx conf ở trên dùng proxy_pass http://nodered:1880/;.

# Phần 6 — Nối nginx với endpoint /hello thực tế

Sửa lại location /api/ cho khớp đường dẫn bạn đặt trong Node-RED, ví dụ nếu http-in là /hello:

nginx
location /api/hello {
    proxy_pass http://nodered:1880/hello;
    proxy_set_header Host $host;
}

Reload lại nginx như bước 4. Sau đó JS trong index.html gọi fetch('/api/hello') sẽ nhận JSON từ Node-RED và hiển thị lên trang.

Kiểm tra kết quả cuối cùng
Trên máy bạn: mở http://localhost (nếu có map port test) — kiểm tra trang tải được, JSON hiển thị đúng.
Từ điện thoại 4G (không cùng wifi) hoặc nhờ bạn ở xa: truy cập https://web.tencuaban.id.vn — nếu load được trang và thấy JSON, tức là ai trên internet cũng vào được máy bạn qua Cloudflare Tunnel, không cần mở port hay có IP tĩnh.





