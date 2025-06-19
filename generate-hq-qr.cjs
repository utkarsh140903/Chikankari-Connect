const QRCode = require('qrcode');

const websiteURL = 'https://chikankari-connect.vercel.app/';

// Generate high-quality QR code for printing
QRCode.toFile('chikankari-connect-qr-hq.png', websiteURL, {
  color: {
    dark: '#000000',  // Black squares
    light: '#FFFFFF' // White background
  },
  width: 800,  // High resolution
  margin: 4,   // More margin for printing
  errorCorrectionLevel: 'H' // High error correction for damaged prints
}, function (err) {
  if (err) {
    console.error('Error generating high-quality QR code:', err);
  } else {
    console.log('✅ High-quality QR code generated successfully!');
    console.log('📄 File saved as: chikankari-connect-qr-hq.png');
    console.log('📏 Resolution: 800x800 pixels');
    console.log('🖨️  Perfect for printing on posters, flyers, or business cards');
    console.log('🌐 URL: https://chikankari-connect.vercel.app/');
  }
});

