export type PrivacyLocale = 'en' | 'ms'

export interface PrivacySection {
  title: string
  paragraphs?: string[]
  list?: string[]
}

export interface PrivacyPolicyContent {
  dialogTitle: string
  lastUpdated: string
  sections: PrivacySection[]
}

export const privacyPolicy: Record<PrivacyLocale, PrivacyPolicyContent> = {
  en: {
    dialogTitle: 'Privacy Policy',
    lastUpdated: 'Last updated: 20 May 2026',
    sections: [
      {
        title: '1. Introduction',
        paragraphs: [
          'This Privacy Policy explains how Jasper Lee Hau Jun (“we”, “us”, or “our”) collects, uses, stores, and protects your personal data when you visit this portfolio website or contact us through the contact form, in accordance with the Personal Data Protection Act 2010 (PDPA) of Malaysia.',
          'By using this website or submitting the contact form, you acknowledge that you have read and understood this policy.',
        ],
      },
      {
        title: '2. Data Controller',
        paragraphs: [
          'Data User / Data Controller: Jasper Lee Hau Jun',
          'Location: Malaysia',
          'Email for privacy enquiries: jasperleehaujun88@gmail.com',
        ],
      },
      {
        title: '3. Personal Data We Collect',
        list: [
          'Contact form: your name, email address, and message content.',
          'Technical data: basic server logs (e.g. IP address, browser type, timestamps) that may be processed by our hosting provider when you access the site.',
          'We do not intentionally collect sensitive personal data (such as health, religious, or biometric data) through this website.',
        ],
      },
      {
        title: '4. Purpose of Collection and Use',
        list: [
          'To respond to your enquiries and communicate with you about potential work or collaboration.',
          'To operate, secure, and improve this website.',
          'To comply with applicable legal obligations.',
        ],
      },
      {
        title: '5. Legal Basis and Consent',
        paragraphs: [
          'We process contact form data based on your explicit consent given when you tick the consent checkbox before submitting the form. You may withdraw consent at any time by emailing us; withdrawal does not affect processing that was lawful before withdrawal.',
        ],
      },
      {
        title: '6. Disclosure to Third Parties',
        paragraphs: [
          'We do not sell your personal data. We may share data only with service providers who help us run this site, such as:',
        ],
        list: [
          'Email delivery (Resend) — to deliver messages you send via the contact form.',
          'Hosting and infrastructure (e.g. Vercel) — to serve the website and related logs.',
        ],
      },
      {
        title: '7. Retention',
        paragraphs: [
          'Contact enquiries are retained only as long as needed to handle your request and for reasonable business record-keeping, unless a longer period is required by law. You may request deletion earlier where applicable.',
        ],
      },
      {
        title: '8. Security',
        paragraphs: [
          'We take reasonable technical and organisational measures to protect personal data against unauthorised access, loss, or misuse. No method of transmission over the Internet is completely secure; we cannot guarantee absolute security.',
        ],
      },
      {
        title: '9. Your Rights under the PDPA',
        list: [
          'Request access to your personal data held by us.',
          'Request correction of inaccurate or incomplete data.',
          'Withdraw consent to processing (where processing is based on consent).',
          'Limit processing in certain circumstances, subject to applicable law.',
          'Lodge a complaint with the Department of Personal Data Protection (JPDP) if you believe your rights have been infringed.',
        ],
      },
      {
        title: '10. Cross-Border Transfers',
        paragraphs: [
          'Some service providers may process data outside Malaysia. Where this occurs, we rely on appropriate safeguards permitted under the PDPA and contractual protections offered by those providers.',
        ],
      },
      {
        title: '11. Changes to This Policy',
        paragraphs: [
          'We may update this Privacy Policy from time to time. The “Last updated” date at the top will reflect changes. Continued use of the website after changes constitutes notice of the updated policy.',
        ],
      },
      {
        title: '12. Contact',
        paragraphs: [
          'For any privacy-related questions, access requests, or complaints, contact: jasperleehaujun88@gmail.com',
        ],
      },
    ],
  },
  ms: {
    dialogTitle: 'Dasar Privasi',
    lastUpdated: 'Kemas kini terakhir: 20 Mei 2026',
    sections: [
      {
        title: '1. Pengenalan',
        paragraphs: [
          'Dasar Privasi ini menerangkan bagaimana Jasper Lee Hau Jun (“kami”) mengumpul, menggunakan, menyimpan, dan melindungi data peribadi anda apabila anda melawat laman portfolio ini atau menghubungi kami melalui borang hubungan, selaras dengan Akta Perlindungan Data Peribadi 2010 (APDP) Malaysia.',
          'Dengan menggunakan laman web ini atau menghantar borang hubungan, anda mengakui bahawa anda telah membaca dan memahami dasar ini.',
        ],
      },
      {
        title: '2. Pengguna Data',
        paragraphs: [
          'Pengguna Data / Pengawal Data: Jasper Lee Hau Jun',
          'Lokasi: Malaysia',
          'E-mel untuk pertanyaan privasi: jasperleehaujun88@gmail.com',
        ],
      },
      {
        title: '3. Data Peribadi Yang Dikumpul',
        list: [
          'Borang hubungan: nama, alamat e-mel, dan kandungan mesej anda.',
          'Data teknikal: log pelayan asas (contohnya alamat IP, jenis pelayar, cap masa) yang mungkin diproses oleh pembekal hosting apabila anda mengakses laman ini.',
          'Kami tidak sengaja mengumpul data peribadi sensitif (seperti kesihatan, agama, atau biometrik) melalui laman web ini.',
        ],
      },
      {
        title: '4. Tujuan Pengumpulan dan Penggunaan',
        list: [
          'Untuk membalas pertanyaan anda dan berkomunikasi mengenai kerja atau kerjasama yang berpotensi.',
          'Untuk mengendalikan, melindungi, dan menambah baik laman web ini.',
          'Untuk mematuhi kewajipan undang-undang yang berkenaan.',
        ],
      },
      {
        title: '5. Asas Undang-undang dan Persetujuan',
        paragraphs: [
          'Kami memproses data borang hubungan berdasarkan persetujuan nyata anda apabila anda menanda kotak persetujuan sebelum menghantar borang. Anda boleh menarik balik persetujuan pada bila-bila masa dengan e-mel kepada kami; penarikan balik tidak menjejaskan pemprosesan yang sah sebelum penarikan.',
        ],
      },
      {
        title: '6. Pendedahan kepada Pihak Ketiga',
        paragraphs: [
          'Kami tidak menjual data peribadi anda. Kami hanya boleh berkongsi data dengan pembekal perkhidmatan yang membantu kami mengendalikan laman ini, seperti:',
        ],
        list: [
          'Penghantaran e-mel (Resend) — untuk menghantar mesej yang anda hantar melalui borang hubungan.',
          'Hosting dan infrastruktur (contohnya Vercel) — untuk menyampaikan laman web dan log berkaitan.',
        ],
      },
      {
        title: '7. Penyimpanan',
        paragraphs: [
          'Pertanyaan hubungan disimpan hanya selama diperlukan untuk mengendalikan permintaan anda dan untuk rekod perniagaan yang munasabah, melainkan tempoh yang lebih lama dikehendaki oleh undang-undang. Anda boleh meminta pemadaman lebih awal jika berkenaan.',
        ],
      },
      {
        title: '8. Keselamatan',
        paragraphs: [
          'Kami mengambil langkah teknikal dan organisasi yang munasabah untuk melindungi data peribadi daripada akses tanpa kebenaran, kehilangan, atau penyalahgunaan. Tiada kaedah penghantaran melalui Internet yang benar-benar selamat; kami tidak dapat menjamin keselamatan mutlak.',
        ],
      },
      {
        title: '9. Hak Anda di bawah APDP',
        list: [
          'Meminta akses kepada data peribadi anda yang dipegang oleh kami.',
          'Meminta pembetulan data yang tidak tepat atau tidak lengkap.',
          'Menarik balik persetujuan untuk pemprosesan (apabila pemprosesan berdasarkan persetujuan).',
          'Menghadkan pemprosesan dalam keadaan tertentu, tertakluk kepada undang-undang yang berkenaan.',
          'Membuat aduan kepada Jabatan Perlindungan Data Peribadi (JPDP) jika anda percaya hak anda telah dilanggar.',
        ],
      },
      {
        title: '10. Pemindahan Rentas Sempadan',
        paragraphs: [
          'Sesetengah pembekal perkhidmatan mungkin memproses data di luar Malaysia. Apabila ini berlaku, kami bergantung pada perlindungan yang sesuai dibenarkan di bawah APDP dan perlindungan kontrak yang ditawarkan oleh pembekal tersebut.',
        ],
      },
      {
        title: '11. Perubahan kepada Dasar Ini',
        paragraphs: [
          'Kami boleh mengemas kini Dasar Privasi ini dari semasa ke semasa. Tarikh “Kemas kini terakhir” di atas akan mencerminkan perubahan. Penggunaan berterusan laman web selepas perubahan dianggap sebagai notis dasar yang dikemas kini.',
        ],
      },
      {
        title: '12. Hubungi',
        paragraphs: [
          'Untuk sebarang pertanyaan privasi, permintaan akses, atau aduan, hubungi: jasperleehaujun88@gmail.com',
        ],
      },
    ],
  },
}
