const QRCode = require('qrcode');
const fs = require('fs');

const websiteURL = 'https://chikankari-connect.vercel.app/';

// Generate QR code as PNG image
QRCode.toFile('chikankari-connect-qr.png', websiteURL, {
  color: {
    dark: '#000000',  // Black squares
    light: '#FFFFFF' // White background
  },
  width: 300,
  margin: 2,
  errorCorrectionLevel: 'M'
}, function (err) {
  if (err) {
    console.error('Error generating QR code:', err);
  } else {
    console.log('✅ QR code generated successfully!');
    console.log('📄 File saved as: chikankari-connect-qr.png');
    console.log('🌐 URL encoded:', websiteURL);
    console.log('\n📱 Instructions:');
    console.log('1. Open the generated PNG file');
    console.log('2. Print it or display it on screen');
    console.log('3. People can scan it with their phone camera or QR scanner app');
    console.log('4. They will be redirected to your Chikankari Connect website');
  }
});

// Also generate QR code as SVG for better scalability
QRCode.toString(websiteURL, { type: 'svg' }, function (err, string) {
  if (err) {
    console.error('Error generating SVG QR code:', err);
  } else {
    fs.writeFileSync('chikankari-connect-qr.svg', string);
    console.log('✅ SVG QR code also generated as: chikankari-connect-qr.svg');
  }
});

// Generate a text version for terminal display
QRCode.toString(websiteURL, { type: 'terminal' }, function (err, string) {
  if (err) {
    console.error('Error generating terminal QR code:', err);
  } else {
    console.log('\n📱 Terminal QR Code:');
    console.log(string);
  }
});

