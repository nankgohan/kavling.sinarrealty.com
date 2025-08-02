// Navbar Scroll Effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});



// Initialize carousel
const myCarousel = new bootstrap.Carousel(document.getElementById('aboutCarousel'), {
    interval: 5000,
    wrap: true
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Lazy load video for better performance
document.addEventListener('DOMContentLoaded', function () {
    const video = document.querySelector('.hero-video');
    video.setAttribute('autoplay', '');
    video.setAttribute('loop', '');
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.load();
});

Fancybox.bind("[data-fancybox]", {
    // Custom options
});

// Initialize Fancybox
Fancybox.bind("[data-fancybox]", {
    Thumbs: {
        autoStart: false,
    },
    Toolbar: {
        display: {
            left: [],
            middle: [],
            right: ["close"],
        },
    },
});
// Ending

document.addEventListener('DOMContentLoaded', function () {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function () {
            const answer = document.getElementById(this.getAttribute('aria-controls'));
            const isExpanded = this.getAttribute('aria-expanded') === 'true';

            // Close all other items
            if (!isExpanded) {
                faqQuestions.forEach(q => {
                    if (q !== question) {
                        q.setAttribute('aria-expanded', 'false');
                        document.getElementById(q.getAttribute('aria-controls')).style.maxHeight = null;
                    }
                });
            }

            // Toggle current item
            this.setAttribute('aria-expanded', !isExpanded);
            answer.style.maxHeight = isExpanded ? null : answer.scrollHeight + 'px';
        });
    });

    // Open first item by default
    if (faqQuestions.length > 0) {
        faqQuestions[0].setAttribute('aria-expanded', 'true');
        document.getElementById(faqQuestions[0].getAttribute('aria-controls')).style.maxHeight =
            document.getElementById(faqQuestions[0].getAttribute('aria-controls')).scrollHeight + 'px';
    }
});
// Ending

document.addEventListener('DOMContentLoaded', function () {
    // Get elements
    const whatsappBtn = document.querySelector('.btn-whatsapp');
    const whatsappPopup = document.getElementById('whatsappPopup');
    const popupClose = document.querySelector('.popup-close');
    const whatsappForm = document.getElementById('whatsappForm');

    // Open popup
    whatsappBtn.addEventListener('click', function (e) {
        e.preventDefault();
        whatsappPopup.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });

    // Close popup
    popupClose.addEventListener('click', function () {
        whatsappPopup.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close when clicking overlay
    whatsappPopup.addEventListener('click', function (e) {
        if (e.target === this.querySelector('.popup-overlay')) {
            whatsappPopup.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Form submission
    whatsappForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('waName').value;
        const address = document.getElementById('waAddress').value;
        const question = document.getElementById('waQuestion').value;

        // Validate
        if (!name || !question) {
            alert('Mohon isi nama dan pertanyaan Anda');
            return;
        }

        // Format WhatsApp message
        const message = `Halo, saya ingin bertanya tentang Kavling Wisata Sukamakmur:%0A%0A` +
            `*Nama:* ${name}%0A` +
            `*Alamat:* ${address || '-'}%0A` +
            `*Pertanyaan:* ${question}%0A%0A` +
            `Mohon info lebih lanjut. Terima kasih.`;

        // Open WhatsApp
        window.open(`https://wa.me/6285691472722?text=${message}`, '_blank');

        // Close popup
        whatsappPopup.style.display = 'none';
        document.body.style.overflow = 'auto';

        // Reset form
        this.reset();
    });
});

// POPUP ORDER KAVLING

// Nomor WhatsApp tujuan (6285691472722)
const TARGET_WHATSAPP_NUMBER = "6285691472722";

function generateOrderNumber() {
    const now = new Date();
    const datePart = now.getFullYear().toString().substr(-2) +
        (now.getMonth() + 1).toString().padStart(2, '0') +
        now.getDate().toString().padStart(2, '0');
    const randomPart = Math.floor(1000 + Math.random() * 9000);
    return `ORD-${datePart}-${randomPart}`;
}

function openKavlingModal(blockName) {
    const orderNumber = generateOrderNumber();
    document.getElementById('selectedBlock').value = blockName;
    document.getElementById('orderNumber').value = orderNumber;
    document.getElementById('displayOrderNumber').textContent = orderNumber;
    document.getElementById('kavlingModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('kavlingModal').style.display = 'none';
}

function sendToWhatsApp() {
    const block = document.getElementById('selectedBlock').value;
    const nama = document.getElementById('nama').value;
    const alamat = document.getElementById('alamat').value;
    const orderNumber = document.getElementById('orderNumber').value;

    if (!nama || !alamat) {
        alert('Harap lengkapi nama dan alamat!');
        return;
    }

    // Pesan yang akan dikirim ke admin
    const message = `*PEMESANAN KAVLING KWS BARU*\n\n` +
        `*No. Pemesanan:* ${orderNumber}\n` +
        `*Blok Kavling:* ${block}\n` +
        `* 👤 Nama Pemesan:* ${nama}\n` +
        `* 🏠 Alamat:* ${alamat}\n\n` +
        `_Pesan ini dikirim melalui website_`;

    // Encode message untuk URL
    const encodedMessage = encodeURIComponent(message);

    // Redirect ke WhatsApp admin
    window.open(`https://wa.me/${TARGET_WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');

    // Tutup modal setelah mengirim
    closeModal();

    // Reset form
    document.getElementById('kavlingForm').reset();
}

// Tutup modal jika klik di luar area modal
window.onclick = function (event) {
    const modal = document.getElementById('kavlingModal');
    if (event.target == modal) {
        closeModal();
    }
}

// ending modal

// Form WhatsApp Submission// Pastikan kode ini dijalankan setelah DOM selesai dimuat
// Pastikan kode ini dijalankan setelah DOM siap
document.getElementById('whatsappSurveyForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Ambil nilai form
    const namaEl = document.getElementById('surveyNama');
    const alamatEl = document.getElementById('surveyAlamat');
    const tanggal = document.getElementById('tanggal').value;
    const waktuSurvey = document.getElementById('waktuSurvey').value;
    const kendaraan = document.getElementById('kendaraan').value;
    const nopol = document.getElementById('nopol').value.trim();
    const rencanaBeli = document.getElementById('rencanaBeli').value;

    const nama = namaEl.value.trim();
    const alamat = alamatEl.value.trim();

    // Reset error state
    namaEl.classList.remove('is-invalid');
    alamatEl.classList.remove('is-invalid');

    // Validasi Nama dan Alamat
    let valid = true;
    if (!nama) {
        namaEl.classList.add('is-invalid');
        valid = false;
    }
    if (!alamat) {
        alamatEl.classList.add('is-invalid');
        valid = false;
    }

    if (!valid) {
        alert('Nama dan Alamat wajib diisi!');
        return;
    }

    // Format tanggal Indonesia
    const formattedDate = tanggal
        ? new Date(tanggal).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : 'Belum ditentukan';

    // Buat pesan WhatsApp
    const lines = [
        `*📋 FORM SURVEY KAVLING WISATA SUKAMAKMUR*%0A` +
        `_================================_%0A%0A` +
        `*👤 Nama Lengkap*%0A${nama}%0A%0A` +
        `*🏠 Alamat*%0A${alamat}%0A%0A` +
        `*📅 Rencana Survey*%0A${formattedDate}%0A%0A` +
        `*⏰ Waktu Survey:* ${waktuSurvey || 'Belum dipilih'}` +
        `*🚗 Kendaraan Survey*%0A${kendaraan}` +
        `${nopol ? '%0ANo. Plat: ' + nopol : ''}%0A%0A` +
        `*💰 Rencana Pembelian*%0A${rencanaBeli}%0A%0A` +
        `_================================_%0A` +
        `📌 Mohon konfirmasi ketersediaan jadwal survey%0A` +
        `Terima kasih 🙏%0A%0A` +
        `_Pesan ini dikirim otomatis melalui website_`
    ];

    const message = lines.join('\n');
    const whatsappNumber = '6285691472722';
    const encoded = encodeURIComponent(message);

    window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, '_blank');

    // Reset form
    this.reset();
});
// form ending

// Pastikan kode ini dijalankan setelah DOM selesai dimuat
document.addEventListener('DOMContentLoaded', function () {
    // Cek apakah form benar-benar ada
    const form = document.getElementById('whatsappSurveyForm');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values - pastikan ID ini sesuai dengan HTML Anda
            const nama = document.getElementById('nama')?.value || '';
            const alamat = document.getElementById('alamat')?.value || '';
            const tanggal = document.getElementById('tanggal')?.value || '';
            const kendaraan = document.getElementById('kendaraan')?.value || '';
            const nopol = document.getElementById('nopol')?.value || '';
            const rencanaBeli = document.getElementById('rencanaBeli')?.value || '';

            // Validasi field wajib
            if (!nama || !alamat) {
                alert('Nama dan Alamat wajib diisi!');
                return;
            }

            // Format date hanya jika tanggal diisi
            const formattedDate = tanggal
                ? new Date(tanggal).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
                : 'Belum ditentukan';

            // Create message
            const message = `*📋 FORM SURVEY KAVLING WISATA SUKAMAKMUR*\n` +
                `_================================_\n\n` +
                `*👤 Nama Lengkap: *${nama}\n` +
                `*🏠 Alamat: *${alamat}\n` +
                `*📅 Rencana Survey:*${formattedDate}\n` +
                `*⏰ Waktu Survey: *${waktuSurvey || 'Belum dipilih'}\n` +
                `*🚗 Kendaraan Survey: *${kendaraan}\n` +
                `${nopol ? 'No. Plat: ' + nopol : ''}\n` +
                `*💰 Rencana Pembelian*%0A${rencanaBeli}\n` +
                `_================================\n\n` +
                `📌 Mohon konfirmasi ketersediaan jadwal survey` +
                `Terima kasih 🙏\n\n` +
                `_Pesan ini dikirim otomatis melalui website_`;

            // Open WhatsApp
            window.open(`https://wa.me/6285691472722?text=${message}`, '_blank');

            // Reset form
            this.reset();
            alert('Terima kasih! Pesan survey Anda akan dikirim via WhatsApp.');
        });
    } else {
        console.error('Form dengan ID whatsappSurveyForm tidak ditemukan!');
    }
});