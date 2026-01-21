import jsPDF from 'jspdf';

interface InvoiceData {
  transaksiId: number;
  pemesananId: number;
  namaLayanan: string;
  namaPelanggan: string;
  rute: string;
  jumlahKursi: number;
  hargaSatuan: number;
  jumlahBayar: number;
  metodeBayar: string;
  tanggalTransaksi: string;
}

export async function generateInvoicePDF(data: InvoiceData) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  let yPosition = margin;

  // ===== HEADER =====
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('BUKTI PEMBAYARAN', pageWidth / 2, yPosition, { align: 'center' });

  yPosition += 8;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Travel Booking System', pageWidth / 2, yPosition, { align: 'center' });

  yPosition += 10;
  doc.setDrawColor(0, 0, 0);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);

  // ===== INFO TRANSAKSI =====
  yPosition += 8;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Informasi Transaksi', margin, yPosition);

  yPosition += 6;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  const infoData = [
    ['No. Transaksi', `: ${data.transaksiId}`],
    ['No. Pemesanan', `: ${data.pemesananId}`],
    ['Tanggal', `: ${new Date(data.tanggalTransaksi).toLocaleString('id-ID')}`],
    ['Metode Pembayaran', `: ${data.metodeBayar}`],
  ];

  infoData.forEach(([label, value]) => {
    doc.text(label, margin + 2, yPosition);
    doc.text(value, margin + 45, yPosition);
    yPosition += 5;
  });

  // ===== INFO PELANGGAN & LAYANAN =====
  yPosition += 4;
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);

  yPosition += 6;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Detail Pelanggan & Layanan', margin, yPosition);

  yPosition += 6;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  const detailData = [
    ['Nama Pelanggan', `: ${data.namaPelanggan}`],
    ['Nama Layanan', `: ${data.namaLayanan}`],
    ['Rute', `: ${data.rute}`],
  ];

  detailData.forEach(([label, value]) => {
    doc.text(label, margin + 2, yPosition);
    doc.text(value, margin + 45, yPosition);
    yPosition += 5;
  });

  // ===== TABEL DETAIL =====
  yPosition += 6;
  doc.setDrawColor(0, 0, 0);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);

  yPosition += 6;
  doc.setFont('helvetica', 'bold');
  doc.text('Deskripsi', margin + 2, yPosition);
  doc.text('Jumlah', pageWidth / 2 + 20, yPosition);
  doc.text('Harga', pageWidth - margin - 30, yPosition);

  yPosition += 5;
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);

  yPosition += 5;
  doc.setFont('helvetica', 'normal');

  const hargaPerKursi = data.hargaSatuan * data.jumlahKursi;
  doc.text(`Tiket (${data.jumlahKursi} kursi)`, margin + 2, yPosition);
  doc.text(`${data.jumlahKursi}`, pageWidth / 2 + 20, yPosition);
  doc.text(`Rp ${hargaPerKursi.toLocaleString('id-ID')}`, pageWidth - margin - 30, yPosition, {
    align: 'right',
  });

  yPosition += 8;
  doc.setDrawColor(0, 0, 0);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);

  yPosition += 6;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);

  doc.text('Total Pembayaran', margin + 2, yPosition);
  doc.text(`Rp ${data.jumlahBayar.toLocaleString('id-ID')}`, pageWidth - margin - 2, yPosition, {
    align: 'right',
  });

  // ===== CATATAN =====
  yPosition += 12;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(100, 100, 100);
  doc.text('Terima kasih telah mempercayai layanan kami.', pageWidth / 2, yPosition, {
    align: 'center',
  });

  yPosition += 4;
  doc.text('Silahkan simpan bukti pembayaran ini untuk referensi Anda.', pageWidth / 2, yPosition, {
    align: 'center',
  });

  // ===== FOOTER =====
  yPosition = doc.internal.pageSize.getHeight() - 10;
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(
    `Generated on ${new Date().toLocaleString('id-ID')}`,
    pageWidth / 2,
    yPosition,
    { align: 'center' },
  );

  // ===== DOWNLOAD =====
  const fileName = `Invoice-${data.transaksiId}-${data.pemesananId}.pdf`;
  doc.save(fileName);
}
