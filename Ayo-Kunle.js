/**
 * AyoKunle.js – Script of Legends 🔥
 * Author: Gabimaru x Kunle
 * Description: Logs trial info and vibes for days. TEST SCRIPT 
 */

const makino = (() => {
  const dev = 'Ayo Kunle';
  const socials = {
    WhatsApp: 'https://wa.me/2349012834275',
    GitHub: 'https://github.com/gabimaru-dev',
    Telegram: 'https://t.me/ayokunledavid',
    Channel: 'https://whatsapp.com/channel/0029VaY0Zq32P59piTo5rg0K',
    Group: 'https://chat.whatsapp.com/EKdfDFDoi5C3ck88OmbJyk'
  };

  function intro() {
    console.log(`👤 Script crafted by ${dev}`);
    Object.entries(socials).forEach(([platform, url]) => {
      console.log(`🔗 ${platform}: ${url}`);
    });
  }

  function trialInfo(expirationDateStr) {
    const expirationDate = new Date(expirationDateStr);
    const currentDate = new Date();

    if (currentDate >= expirationDate) {
      console.warn('⛔ Trial expired. Time to level up or DM the dev 😎');
      return false;
    }

    const timeLeft = expirationDate - currentDate;
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    console.log(`✅ Trial active! ${days}d ${hours}h ${minutes}m ${seconds}s remaining.`);
    return true;
  }

  return {
    intro,
    trialInfo
  };
})();

// Example usage:
makino.intro();
makino.trialInfo('2026-07-01T00:00:00Z');
