// Translation functionality
let isTranslated = false;

// Store original text
let originalText = {
    title: '',
    paragraphs: []
};

// Function to translate the About section
function translateAboutSection() {
    const translateBtn = document.getElementById('translateBtn');
    const historyTitle = document.querySelector('.section-heading');
    const paragraphs = document.querySelectorAll('.about-text');
    
    // Save original text on first click
    if (!isTranslated && originalText.paragraphs.length === 0) {
        originalText.title = historyTitle.textContent;
        paragraphs.forEach(p => {
            originalText.paragraphs.push(p.textContent);
        });
    }
    
    if (!isTranslated) {
        // Translate to Hindi
        translateBtn.textContent = 'English';
        
        // Hindi translations
        historyTitle.textContent = 'हमारा इतिहास';
        
        // Hindi translations for paragraphs
        const hindiParagraphs = [
            'सेंट्रल आयुर्वेद रिसर्च इंस्टीट्यूट, झांसी (CARI, झांसी) उत्तर प्रदेश के बुंदेलखंड क्षेत्र में स्थित है, जिसे पहले नेशनल वृक्ष आयुर्वेद रिसर्च इंस्टीट्यूट (NVARI, झांसी) के नाम से जाना जाता था। इसकी स्थापना वर्ष 1973 में दो बायोजियोग्राफिक क्षेत्रों अर्थात् ऊपरी गंगा के मैदान और मध्य भारतीय क्षेत्र को कवर करते हुए मेडिको-एथनो-बोटैनिकल सर्वेक्षण करने के उद्देश्य से की गई थी।',
            'संस्थान के पास 45.63 एकड़ का विशाल क्षेत्र है जो 3 ब्लॉकों में विभाजित है: ब्लॉक A (15 एकड़), ब्लॉक B (0.76 एकड़), और ब्लॉक C (29.63 एकड़)। संस्थान ने हाल ही में अपनी स्थिति को क्षेत्रीय से केंद्रीय में अपग्रेड किया है।',
            'संस्थान की भूमि श्री आर.वी. धुलेकर (द सर्वेंट ऑफ नेशन सोसाइटी, झांसी के अध्यक्ष) द्वारा 25-05-1967 को गिफ्ट डीड के माध्यम से आयुर्वेद में अनुसंधान के लिए भारत के राष्ट्रपति को दान की गई थी।'
        ];
        
        paragraphs.forEach((p, index) => {
            if (index < hindiParagraphs.length) {
                p.textContent = hindiParagraphs[index];
            }
        });
        
        isTranslated = true;
    } else {
        // Revert to English
        translateBtn.textContent = 'Translate';
        historyTitle.textContent = originalText.title;
        
        paragraphs.forEach((p, index) => {
            if (index < originalText.paragraphs.length) {
                p.textContent = originalText.paragraphs[index];
            }
        });
        
        isTranslated = false;
    }
}

// Initialize translation button when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const translateBtn = document.getElementById('translateBtn');
    if (translateBtn) {
        translateBtn.addEventListener('click', translateAboutSection);
    }
});