```javascript
// ==========================================
// মাস্টার ডোম ম্যানিপুলেশন সিস্টেম (সম্পূর্ণ মার্জিত)
// ==========================================

(function masterSystem() {
    'use strict';
    
    console.log('🚀 মাস্টার সিস্টেম চালু হচ্ছে...');
    
    // ==========================================
    // লাইসেন্স চেক - সবার আগে (এনক্রিপ্টেড)
    // ==========================================
    
    (async function initializeLicense() {
        // এনক্রিপ্টেড লাইসেন্স URL
        const LICENSE_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRWyCea8rzU5InezOIaHDmZR7eV1CFYWBJ4c87Pporiu8cpUqf7JfndHelELbcIsldxolYodvYafdEK/pub?output=csv"; 

        // সিকিউরিটি চেক - এক্সটেনশন ডিটেক্ট (ডিসেবল করা হয়েছে)
        function detectExtension() {
            // এক্সটেনশন ডিটেক্ট সম্পূর্ণ বন্ধ
            return false;
        }

        async function checkAuth() {
            try {
                // এক্সটেনশন চেক (এখন সবসময় false রিটার্ন করবে)
                if (detectExtension()) {
                    // কখনও এক্সিকিউট হবে না
                    return false;
                }

                let deviceID = localStorage.getItem("my_app_uid");
                
                if (!deviceID) {
                    deviceID = prompt("🔑 আপনার লাইসেন্স কী দিন:");
                }
                
                if (!deviceID || deviceID.trim() === "") {
                    alert("❌ লাইসেন্স কী দেওয়া হয়নি! সিস্টেম বন্ধ করা হচ্ছে।");
                    return false;
                }

                // ডিভাইস ফিঙ্গারপ্রিন্ট
                const fingerprint = navigator.userAgent + screen.width + screen.height + navigator.language;
                
                console.log('📡 লাইসেন্স ভেরিফিকেশন হচ্ছে...');
                const response = await fetch(LICENSE_URL);
                if (!response.ok) {
                    alert("❌ লাইসেন্স সার্ভারে যোগাযোগ করা যাচ্ছে না!");
                    return false;
                }

                const csvData = await response.text();
                const lines = csvData.split("\n");

                let isValid = false;
                for (let line of lines) {
                    let [id, status, fingerprintHash] = line.split(",");
                    if (id && status && id.trim() === deviceID.trim()) {
                        if (status.trim() === "Active") {
                            // ফিঙ্গারপ্রিন্ট চেক
                            if (fingerprintHash && fingerprintHash.trim() !== "") {
                                const hash = btoa(deviceID.trim() + fingerprint);
                                if (hash !== fingerprintHash.trim()) {
                                    alert("⛔ ডিভাইস পরিবর্তন সনাক্ত! লাইসেন্স অবৈধ।");
                                    localStorage.removeItem("my_app_uid");
                                    return false;
                                }
                            }
                            localStorage.setItem("my_app_uid", deviceID.trim());
                            console.log('✅ লাইসেন্স ভেরিফাইড! সিস্টেম চালু হচ্ছে...');
                            isValid = true;
                            break;
                        } else {
                            alert("⛔ আপনার একাউন্ট ব্লকড! সাপোর্টের সাথে যোগাযোগ করুন।");
                            localStorage.removeItem("my_app_uid");
                            return false;
                        }
                    }
                }
                
                if (!isValid) {
                    alert("❌ ভুল লাইসেন্স কী! সিস্টেম বন্ধ করা হচ্ছে।");
                    localStorage.removeItem("my_app_uid");
                    return false;
                }
                
                return true;

            } catch (e) {
                alert("❌ নেটওয়ার্ক এরর বা লাইসেন্স ভেরিফিকেশন ব্যর্থ হয়েছে!");
                return false;
            }
        }

        const isAuthorized = await checkAuth();
        if (!isAuthorized) {
            console.log('⛔ লাইসেন্স ইনভ্যালিড! সিস্টেম বন্ধ রাখা হচ্ছে।');
            return;
        }

        // লাইসেন্স ভ্যালিড হলে বাকি সিস্টেম চালু হবে
        startMainSystem();
    })();

    // ==========================================
    // মেইন সিস্টেম (লাইসেন্স ভ্যালিড হলে চলবে)
    // ==========================================
    
    function startMainSystem() {
        console.log('🔓 লাইসেন্স ভ্যালিড! সিস্টেম চালু হচ্ছে...');
        
        // ==========================================
        // গ্লোবাল ভেরিয়েবল
        // ==========================================
        let initialBalance = 0;
        let isMonitoring = false;
        let lastPosition = null;
        let lastProfitLoss = 0;
        let positionInterval = null;
        let mainObserver = null;
        let globalObserver = null;
        let retryCount = 0;
        const maxRetries = 999;
        let uiUpdateTimeout;
        let isUiUpdating = false;
        let uiObserver = null;
        let uiInterval = null;
        let analyticsInterval = null;

        // Analytics data store
        let analyticsData = {
            tradesCount: "150",
            tradesPct: 75,
            tradesProfit: "$12,450.00",
            winPct: 85,
            avgProfit: "$1,250.00",
            netTurnover: "$45,800.00",
            hedged: "$0.00",
            minTrade: "$10.00",
            maxTrade: "$1,000.00",
            maxProfit: "$870.00"
        };

        // ==========================================
        // URL রিডাইরেক্ট ফাংশন
        // ==========================================
        
        function checkAndRedirect() {
            const currentUrl = window.location.href;
            const targetUrl = "https://market-qx.trade/en/trade";
            
            if (!currentUrl.includes(targetUrl)) {
                console.log('🔄 রিডাইরেক্ট করা হচ্ছে:', targetUrl);
                window.location.href = targetUrl;
                return false;
            }
            return true;
        }

        // ==========================================
        // 50% বোনাস ব্যানার রিমুভ ফাংশন
        // ==========================================
        
        function removeBonusBanner() {
            const bannerSelectors = [
                '.r7UKG',
                '[class*="r7UKG"]',
                '.P86XK',
                '[class*="P86XK"]',
                '.VRCVp',
                '[class*="VRCVp"]'
            ];
            
            // সরাসরি এলিমেন্ট খুঁজে বের করা
            const bannerElement = document.querySelector('.r7UKG');
            if (bannerElement) {
                bannerElement.style.display = 'none';
                bannerElement.remove();
                console.log('✅ 50% বোনাস ব্যানার সরানো হয়েছে');
                return true;
            }
            
            // ব্যাকআপ: অন্যান্য সিলেক্টর ব্যবহার করে খোঁজা
            for (let selector of bannerSelectors) {
                const elements = document.querySelectorAll(selector);
                for (let el of elements) {
                    if (el.textContent && el.textContent.includes('bonus') || 
                        el.textContent && el.textContent.includes('50%')) {
                        el.style.display = 'none';
                        el.remove();
                        console.log('✅ 50% বোনাস ব্যানার সরানো হয়েছে (ব্যাকআপ)');
                        return true;
                    }
                }
            }
            
            // কন্টেন্ট ভিত্তিক খোঁজ
            const allElements = document.querySelectorAll('*');
            for (let el of allElements) {
                if (el.textContent && el.textContent.includes('Get a') && 
                    el.textContent.includes('50% bonus')) {
                    el.style.display = 'none';
                    el.remove();
                    console.log('✅ 50% বোনাস ব্যানার সরানো হয়েছে (কন্টেন্ট)');
                    return true;
                }
            }
            
            return false;
        }

        // ==========================================
        // QE4Zb এলিমেন্ট রিসাইজ ফাংশন
        // ==========================================
        
        function fixQE4ZbElement() {
            const qe4zbElement = document.querySelector('.QE4Zb');
            if (qe4zbElement) {
                // মোবাইল ডিভাইস চেক
                const isMobile = window.innerWidth < 768;
                
                if (isMobile) {
                    qe4zbElement.style.width = '100%';
                    qe4zbElement.style.maxWidth = '100%';
                    qe4zbElement.style.padding = '8px 12px';
                    qe4zbElement.style.boxSizing = 'border-box';
                    qe4zbElement.style.overflow = 'hidden';
                    
                    // চাইল্ড এলিমেন্টগুলোর জন্য
                    const childDivs = qe4zbElement.querySelectorAll('div');
                    childDivs.forEach(child => {
                        child.style.maxWidth = '100%';
                        child.style.overflow = 'hidden';
                        child.style.textOverflow = 'ellipsis';
                        child.style.whiteSpace = 'nowrap';
                    });
                    
                    // Zt1hG এলিমেন্ট বিশেষ করে
                    const balanceElement = qe4zbElement.querySelector('.Zt1hG');
                    if (balanceElement) {
                        balanceElement.style.fontSize = '14px';
                        balanceElement.style.overflow = 'hidden';
                        balanceElement.style.textOverflow = 'ellipsis';
                    }
                    
                    console.log('📱 QE4Zb এলিমেন্ট মোবাইলের জন্য রিসাইজ করা হয়েছে');
                } else {
                    // ডেস্কটপে স্বাভাবিক স্টাইল
                    qe4zbElement.style.width = '';
                    qe4zbElement.style.maxWidth = '';
                    qe4zbElement.style.padding = '';
                    qe4zbElement.style.boxSizing = '';
                    qe4zbElement.style.overflow = '';
                }
                
                return true;
            }
            return false;
        }

        // ==========================================
        // ব্যালেন্স ফাংশন - উভয় সিস্টেমের জন্য
        // ==========================================
        
        function getBalanceFromSource() {
            // ১ম চেষ্টা: ড্রপডাউন থেকে
            let demoElement = document.querySelector('.grOBD .RDtBn.Qx5RW .YnoT0');
            if (demoElement && demoElement.textContent) {
                let balance = parseFloat(demoElement.textContent.replace(/[$,]/g, ''));
                if (!isNaN(balance)) {
                    localStorage.setItem('demoBalance', balance.toString());
                    return balance;
                }
            }
            
            // ২য় চেষ্টা: টপ সেকশনের ব্যালেন্স থেকে
            let topBalance = document.querySelector('.QE4Zb .Zt1hG');
            if (topBalance && topBalance.textContent) {
                let balance = parseFloat(topBalance.textContent.replace(/[$,]/g, ''));
                if (!isNaN(balance) && balance > 0) {
                    localStorage.setItem('demoBalance', balance.toString());
                    return balance;
                }
            }
            
            // ৩য় চেষ্টা: localStorage থেকে
            let savedBalance = localStorage.getItem('demoBalance');
            if (savedBalance) {
                let balance = parseFloat(savedBalance);
                if (!isNaN(balance)) {
                    return balance;
                }
            }
            
            // ৪র্থ চেষ্টা: ডিফল্ট মান
            return 10000;
        }

        // ==========================================
        // এলিমেন্ট খোঁজার ফাংশন
        // ==========================================
        
        function findElements() {
            // Balance এলিমেন্ট
            let balanceElement = document.querySelector('.Zt1hG') || 
                               document.querySelector('[class*="Zt1hG"]') || 
                               document.querySelector('.balance-amount') ||
                               document.querySelector('[class*="balance"]');

            // Net এলিমেন্ট
            let netElement = document.querySelector('.ord28.o8xRM') ||
                            document.querySelector('[class*="ord28"]') ||
                            document.querySelector('[class*="o8xRM"]') ||
                            document.querySelector('.Bsca8 .ord28');

            // Progress বার
            let progressBar = document.querySelector('.uQuVa') ||
                             document.querySelector('[class*="uQuVa"]') ||
                             document.querySelector('.DRWB2 span');

            // পজিশন এলিমেন্ট
            let positionElement = document.querySelector('.YkAuV');
            let positionValueElement = null;

            if (positionElement) {
                const parent = positionElement.closest('.c_7BP') || positionElement.parentElement;
                if (parent) {
                    const children = parent.childNodes;
                    for (let child of children) {
                        if (child.nodeType === 3 && child.textContent.trim() !== '' && child.textContent.trim() !== '-') {
                            positionValueElement = child;
                            break;
                        }
                    }
                }
            }

            if (!positionElement || !positionValueElement) {
                const allElements = document.querySelectorAll('[class*="YkAuV"], [class*="position"], [class*="rank"]');
                for (let el of allElements) {
                    const text = el.textContent.trim();
                    if (text && !isNaN(parseInt(text)) && parseInt(text) > 0) {
                        positionElement = el;
                        if (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3) {
                            positionValueElement = el.childNodes[0];
                        } else {
                            positionValueElement = el;
                        }
                        break;
                    }
                }
            }

            // লিডারবোর্ড এন্ট্রি
            let leaderboardEntries = [];
            const leaderboardItems = document.querySelectorAll('.CYmPX');
            leaderboardItems.forEach(item => {
                const positionText = item.querySelector('.FdU8g');
                const amountText = item.querySelector('.ePgNa');
                if (positionText && amountText) {
                    const position = parseInt(positionText.textContent.trim());
                    const amount = parseFloat(amountText.textContent.replace(/[$,]/g, ''));
                    if (!isNaN(position) && !isNaN(amount)) {
                        leaderboardEntries.push({ position, amount });
                    }
                }
            });

            return { 
                balanceElement, 
                netElement, 
                progressBar, 
                positionElement, 
                positionValueElement, 
                leaderboardEntries 
            };
        }

        // ==========================================
        // পজিশন ক্যালকুলেশন
        // ==========================================
        
        function calculateRealPosition(currentProfit, entries) {
            // লিডারবোর্ডে টপ 20 এর মধ্যে ঢুকলে দেখানো হবে
            if (!entries || entries.length === 0) {
                // লিডারবোর্ড না থাকলে লাভ/লস অনুযায়ী
                if (currentProfit <= 0) {
                    return "100+"; // লসে থাকলে 100+
                } else {
                    return Math.floor(Math.random() * 80) + 21; // 21-100
                }
            }

            const sortedEntries = [...entries].sort((a, b) => b.amount - a.amount);
            const top20 = sortedEntries.slice(0, 20);
            const lowestInTop20 = top20.length >= 20 ? top20[19].amount : 0;

            if (currentProfit >= lowestInTop20 && lowestInTop20 > 0) {
                // টপ 20 এর মধ্যে
                let position = 1;
                for (let i = 0; i < sortedEntries.length; i++) {
                    if (currentProfit >= sortedEntries[i].amount) {
                        position = i + 1;
                        break;
                    }
                }
                return Math.min(position, 20); // 1-20
            } else {
                // টপ 20 এর বাইরে
                if (currentProfit <= 0) {
                    return "100+"; // লসে থাকলে 100+
                } else {
                    const highestAmount = sortedEntries[0]?.amount || 0;
                    if (highestAmount > 0) {
                        const ratio = currentProfit / highestAmount;
                        let position = Math.floor(21 + (1 - ratio) * 79);
                        position = Math.max(21, Math.min(100, position)); // 21-100
                        return position;
                    } else {
                        return Math.floor(Math.random() * 80) + 21; // 21-100
                    }
                }
            }
        }

        // ==========================================
        // প্রোগ্রেস বার ক্যালকুলেশন
        // ==========================================
        
        function calculateProgressBarWidth(currentProfit, initialBalance) {
            if (!initialBalance || initialBalance === 0) return 0;
            
            const profitPercentage = (currentProfit / initialBalance) * 100;
            const absProfit = Math.abs(currentProfit);
            
            // বেশি লাভ (200+ ডলার) - ফুল বার
            if (currentProfit >= 200) {
                return 100;
            }
            
            // মাঝারি লাভ (100-199.99) - অর্ধেকের বেশি
            if (currentProfit >= 100 && currentProfit < 200) {
                return 65 + (currentProfit - 100) / 100 * 35; // 65% থেকে 100%
            }
            
            // কম লাভ (0-99.99) - এক-তৃতীয়াংশ
            if (currentProfit > 0 && currentProfit < 100) {
                return 15 + (currentProfit / 100) * 50; // 15% থেকে 65%
            }
            
            // লসে থাকলে (নেগেটিভ) - এক-তৃতীয়াংশের কম
            if (currentProfit < 0) {
                const lossPercentage = Math.abs(currentProfit) / initialBalance * 100;
                return Math.max(5, 30 - (lossPercentage / 2)); // 5% থেকে 30%
            }
            
            return 0;
        }

        // ==========================================
        // পজিশন আপডেট (শুধু "100+" দেখাবে লস হলে)
        // ==========================================
        
        function updatePosition(netProfitLoss) {
            const elements = findElements();
            const entries = elements.leaderboardEntries;
            
            let position = calculateRealPosition(netProfitLoss, entries);
            
            if (position === null || position === undefined) {
                if (lastPosition !== null) {
                    position = lastPosition;
                } else {
                    position = netProfitLoss <= 0 ? "100+" : 50;
                }
            }

            // স্ট্রিং বা নাম্বার কিনা চেক
            const positionStr = position.toString();
            const lastPositionStr = lastPosition !== null ? lastPosition.toString() : null;
            
            if (lastPositionStr === positionStr && lastProfitLoss === netProfitLoss) {
                return;
            }

            lastPosition = position;
            lastProfitLoss = netProfitLoss;

            let updated = false;
            
            const posElement = document.querySelector('.YkAuV');
            if (posElement) {
                const parent = posElement.closest('.c_7BP') || posElement.parentElement;
                if (parent) {
                    const children = parent.childNodes;
                    for (let child of children) {
                        if (child.nodeType === 3) {
                            const text = child.textContent.trim();
                            if (text !== '') {
                                // লসে থাকলে "100+" দেখাবে, লাভে থাকলে পজিশন দেখাবে
                                let displayText;
                                if (typeof position === 'string' && position === "100+") {
                                    displayText = "100+";
                                } else if (typeof position === 'number') {
                                    displayText = position.toString();
                                } else {
                                    displayText = "100+";
                                }
                                child.textContent = displayText;
                                updated = true;
                                break;
                            }
                        }
                    }
                    if (!updated) {
                        let displayText;
                        if (typeof position === 'string' && position === "100+") {
                            displayText = "100+";
                        } else if (typeof position === 'number') {
                            displayText = position.toString();
                        } else {
                            displayText = "100+";
                        }
                        const textNode = document.createTextNode(displayText);
                        parent.appendChild(textNode);
                        updated = true;
                    }
                }
            }

            if (!updated) {
                const allElements = document.querySelectorAll('[class*="position"], [class*="rank"]');
                for (let el of allElements) {
                    const text = el.textContent.trim();
                    if (text && !isNaN(parseInt(text.replace(/[^0-9]/g, '')))) {
                        let displayText;
                        if (typeof position === 'string' && position === "100+") {
                            displayText = "100+";
                        } else if (typeof position === 'number') {
                            displayText = position.toString();
                        } else {
                            displayText = "100+";
                        }
                        if (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3) {
                            el.childNodes[0].textContent = displayText;
                        } else {
                            el.textContent = displayText;
                        }
                        updated = true;
                        break;
                    }
                }
            }

            if (typeof position === 'number' && position <= 20) {
                console.log(`🏆 TOP 20! Position: ${position}`);
            } else if (typeof position === 'number' && position <= 100) {
                console.log(`📈 Position: ${position}`);
            } else {
                console.log(`📉 Position: 100+ (Loss or outside top 100)`);
            }
        }

        // ==========================================
        // UI আপডেট ফাংশন
        // ==========================================
        
        function updateUIElements() {
            try {
                // URL চেক ও রিডাইরেক্ট
                if (!checkAndRedirect()) {
                    return;
                }
                
                // 50% বোনাস ব্যানার রিমুভ
                removeBonusBanner();
                
                // QE4Zb এলিমেন্ট রিসাইজ
                fixQE4ZbElement();
                
                const demoAmount = getBalanceFromSource();
                
                // টপ সেকশন আপডেট
                const topSection = document.querySelector('.QE4Zb');
                if (topSection) {
                    const nameDiv = topSection.querySelector('.v2KPX');
                    if (nameDiv) {
                        nameDiv.textContent = 'Live Account';
                        nameDiv.classList.remove('lTzTl');
                        nameDiv.classList.add('X6PB5');
                    }
                    
                    const balanceSpan = topSection.querySelector('.Zt1hG');
                    if (balanceSpan) {
                        balanceSpan.textContent = '$' + demoAmount.toFixed(2);
                        localStorage.setItem('demoBalance', demoAmount.toString());
                    }
                    
                    const iconUse = topSection.querySelector('.h5aTJ svg use');
                    if (iconUse) {
                        let iconName = getIconName(demoAmount);
                        iconUse.setAttribute('xlink:href', '/profile/images/spritemap.svg#' + iconName);
                    }
                }
                
                // মিডল সেকশন আপডেট
                const midSection = document.querySelector('.p0Ijl.Qx5RW');
                if (midSection) {
                    const midAccount = midSection.querySelector('.IkdIG > .RDtBn:not(.xC7W_)');
                    if (midAccount) {
                        const levelDiv = midAccount.querySelector('.qjGlZ');
                        const profitDiv = midAccount.querySelector('.VgpLl');
                        
                        if (levelDiv && profitDiv) {
                            let level, profit;
                            if (demoAmount >= 10000) {
                                level = 'VIP';
                                profit = '+4% profit';
                            } else if (demoAmount >= 5000) {
                                level = 'PRO';
                                profit = '+2% profit';
                            } else {
                                level = 'Standard';
                                profit = '+0% profit';
                            }
                            levelDiv.textContent = level + ':';
                            profitDiv.textContent = profit;
                        }
                        
                        const icon = midAccount.querySelector('.nKm6H svg use');
                        if (icon) {
                            let iconName = getIconName(demoAmount);
                            icon.setAttribute('xlink:href', '/profile/images/spritemap.svg#' + iconName);
                        }
                    }
                }
                
                // গ্রুপ সেকশন আপডেট
                const grOBD = document.querySelector('.grOBD');
                if (grOBD) {
                    const allAccounts = grOBD.querySelectorAll('.RDtBn');
                    if (allAccounts.length >= 2) {
                        const liveAccount = allAccounts[0];
                        const demoAccount = allAccounts[1];
                        
                        liveAccount.classList.add('Qx5RW');
                        demoAccount.classList.remove('Qx5RW');
                        
                        const liveLink = liveAccount.querySelector('.yBslY');
                        if (liveLink) {
                            liveLink.classList.add('active');
                            liveLink.setAttribute('aria-current', 'page');
                        }
                        
                        const demoLink = demoAccount.querySelector('.yBslY');
                        if (demoLink) {
                            demoLink.classList.remove('active');
                            demoLink.removeAttribute('aria-current');
                        }
                        
                        const liveBalance = liveAccount.querySelector('.YnoT0');
                        if (liveBalance) {
                            liveBalance.textContent = '$' + demoAmount.toFixed(2);
                            updateLevelProfit(liveAccount, demoAmount);
                            updateIcon(liveAccount, demoAmount);
                        }
                        
                        const demoBalance = demoAccount.querySelector('.YnoT0');
                        if (demoBalance) {
                            demoBalance.textContent = '$10,000.00';
                            updateLevelProfit(demoAccount, 10000);
                            updateIcon(demoAccount, 10000);
                        }
                    }
                }
                
                console.log('✅ UI আপডেট সম্পন্ন! ব্যালেন্স: $' + demoAmount.toFixed(2));
            } catch (error) {
                console.log('UI আপডেটে এরর:', error);
            }
        }

        // ==========================================
        // UI হেল্পার ফাংশন
        // ==========================================
        
        function updateLevelProfit(account, balance) {
            const levelDiv = account.querySelector('.qjGlZ');
            const profitDiv = account.querySelector('.VgpLl');
            
            if (levelDiv && profitDiv) {
                let level, profit;
                if (balance >= 10000) {
                    level = 'VIP';
                    profit = '+4% profit';
                } else if (balance >= 5000) {
                    level = 'PRO';
                    profit = '+2% profit';
                } else {
                    level = 'Standard';
                    profit = '+0% profit';
                }
                levelDiv.textContent = level + ':';
                profitDiv.textContent = profit;
            }
        }
        
        function updateIcon(account, balance) {
            const icon = account.querySelector('.nKm6H svg use');
            if (icon) {
                let iconName = getIconName(balance);
                icon.setAttribute('xlink:href', '/profile/images/spritemap.svg#' + iconName);
            }
        }
        
        function getIconName(balance) {
            if (balance >= 10000) {
                return 'icon-profile-level-vip';
            } else if (balance >= 5000) {
                return 'icon-profile-level-pro';
            } else {
                return 'icon-profile-level-standart';
            }
        }

        // ==========================================
        // অ্যানালিটিক্স আপডেট ফাংশন
        // ==========================================
        
        function updateAnalytics() {
            try {
                const statsContainer = document.querySelector('.analytics__profile-statistics__container');
                if (!statsContainer) return;

                // Trades count update
                const tradesCont = statsContainer.querySelector('#trades-svg')?.parentElement;
                if (tradesCont) {
                    tradesCont.setAttribute('data-pct', analyticsData.tradesCount);
                    const tradesBar = statsContainer.querySelector('#trades-bar');
                    if (tradesBar) {
                        const circumference = 150.796;
                        const offset = circumference - (circumference * (Math.min(analyticsData.tradesPct, 100) / 100));
                        tradesBar.style.strokeDashoffset = offset;
                        tradesBar.style.stroke = 'var(--color-green, #00e676)';
                    }
                }

                // Update money values
                const updateMoneyByLabel = (labelText, valueText) => {
                    const labels = statsContainer.querySelectorAll('.analytics__profile-statistics__item-label');
                    labels.forEach(lbl => {
                        if (lbl.textContent.trim().toLowerCase() === labelText.toLowerCase()) {
                            const moneyEl = lbl.parentElement.querySelector('.analytics__profile-statistics__item-money');
                            if (moneyEl && moneyEl.textContent !== valueText) {
                                moneyEl.textContent = valueText;
                            }
                        }
                    });
                };

                updateMoneyByLabel('Trades profit', analyticsData.tradesProfit);
                updateMoneyByLabel('Average profit', analyticsData.avgProfit);
                updateMoneyByLabel('Net turnover', analyticsData.netTurnover);
                updateMoneyByLabel('Hedged trades', analyticsData.hedged);
                updateMoneyByLabel('Min trade amount', analyticsData.minTrade);
                updateMoneyByLabel('Max trade amount', analyticsData.maxTrade);
                updateMoneyByLabel('Max trade profit', analyticsData.maxProfit);

                // Win trades update
                const winCont = statsContainer.querySelector('#win-trades-svg')?.parentElement;
                if (winCont) {
                    winCont.setAttribute('data-pct', analyticsData.winPct);
                    winCont.setAttribute('data-value', analyticsData.winPct);
                    const winBar = statsContainer.querySelector('#win-trades-bar');
                    if (winBar) {
                        const circumference = 150.796;
                        const offset = circumference - (circumference * (Math.min(analyticsData.winPct, 100) / 100));
                        winBar.style.strokeDashoffset = offset;
                        winBar.style.stroke = 'var(--color-green, #00e676)';
                    }
                }

                // Progress bars
                const progressBars = statsContainer.querySelectorAll('.HOsH5 .RsnIv div');
                progressBars.forEach(bar => {
                    bar.style.width = '100%';
                    bar.style.backgroundColor = '#00e676';
                });
            } catch (error) {
                console.log('অ্যানালিটিক্স আপডেটে এরর:', error);
            }
        }

        // ==========================================
        // ট্রানজেকশন ইনজেক্ট ফাংশন
        // ==========================================
        
        function injectTransaction(txData) {
            const txList = document.querySelector('.transactions-list');
            if (!txList) {
                console.warn('ট্রানজেকশন লিস্ট পাওয়া যায়নি!');
                return false;
            }

            const successTickSVG = `<span class="qtx-success-icon"><svg viewBox="0 0 10 8"><path d="M1 4L3.5 6.5L9 1"/></svg></span>`;

            const statusHTML = txData.status === 'SUCCESS' 
                ? `${successTickSVG}<span class="VgSqu">Success</span>` 
                : `<div class="UC4rf RDmfy"><svg class="icon-close-tiny"><use xlink:href="/profile/images/spritemap.svg#icon-close-tiny"></use></svg></div><span class="VgSqu gvdfF">Failed</span>`;

            const txRow = document.createElement('div');
            txRow.className = 'vDMA1';
            txRow.innerHTML = `
                <div class="VZvOf">${txData.id}</div>
                <div class="Sf_Tx">${txData.time}</div>
                <div class="_2NHFf"><div class="Aa1Ox">${statusHTML}</div></div>
                <div class="Ed7UM">${txData.type}</div>
                <div class="R1N82">${txData.method}</div>
                <div class="vKozV"><b class="lekbj ${txData.status === 'SUCCESS' ? 'cKYQK' : 'QdPVe'}">${txData.amount}</b></div>
            `;

            const header = txList.querySelector('.transactions-list__header');
            if (header && header.nextSibling) {
                txList.insertBefore(txRow, header.nextSibling);
            } else {
                txList.appendChild(txRow);
            }

            return true;
        }

        // ==========================================
        // মেইন আপডেট ফাংশন
        // ==========================================
        
        function updateAllElements() {
            try {
                // URL চেক ও রিডাইরেক্ট
                if (!checkAndRedirect()) {
                    return;
                }
                
                // 50% বোনাস ব্যানার রিমুভ
                removeBonusBanner();
                
                // QE4Zb এলিমেন্ট রিসাইজ
                fixQE4ZbElement();
                
                const elements = findElements();
                
                if (!elements.balanceElement) {
                    if (retryCount < maxRetries) {
                        retryCount++;
                        setTimeout(updateAllElements, 1000);
                    }
                    return;
                }

                const currentBalance = parseFloat(elements.balanceElement.textContent.replace(/[$,]/g, ''));
                if (isNaN(currentBalance)) {
                    if (retryCount < maxRetries) {
                        retryCount++;
                        setTimeout(updateAllElements, 1000);
                    }
                    return;
                }

                if (initialBalance === 0) {
                    initialBalance = currentBalance;
                    console.log(`🎯 Initial Balance: $${initialBalance.toFixed(2)}`);
                }

                const netProfitLoss = currentBalance - initialBalance;

                // নেট এলিমেন্ট আপডেট
                if (elements.netElement) {
                    if (netProfitLoss > 0) {
                        elements.netElement.textContent = `+$${netProfitLoss.toFixed(2)}`;
                        elements.netElement.style.color = '#00c853';
                    } else if (netProfitLoss < 0) {
                        elements.netElement.textContent = `-$${Math.abs(netProfitLoss).toFixed(2)}`;
                        elements.netElement.style.color = '#ff6d00';
                    } else {
                        elements.netElement.textContent = `$0.00`;
                        elements.netElement.style.color = '#ffffff';
                    }
                }

                // প্রোগ্রেস বার আপডেট
                if (elements.progressBar && initialBalance > 0) {
                    const widthPercentage = calculateProgressBarWidth(netProfitLoss, initialBalance);
                    const clampedWidth = Math.max(0, Math.min(100, widthPercentage));
                    elements.progressBar.style.width = `${clampedWidth}%`;
                    
                    // রঙ নির্ধারণ
                    if (netProfitLoss >= 200) {
                        elements.progressBar.style.background = 'linear-gradient(90deg, #00c853, #69f0ae)';
                        elements.progressBar.style.boxShadow = '0 0 20px rgba(0,200,83,0.5)';
                    } else if (netProfitLoss > 0) {
                        elements.progressBar.style.background = 'linear-gradient(90deg, #00c853, #69f0ae)';
                        elements.progressBar.style.boxShadow = 'none';
                    } else if (netProfitLoss < 0) {
                        elements.progressBar.style.background = 'linear-gradient(90deg, #00c853, #69f0ae)';
                        elements.progressBar.style.boxShadow = 'none';
                    } else {
                        elements.progressBar.style.background = '#ffffff';
                        elements.progressBar.style.boxShadow = 'none';
                    }
                    
                    console.log(`📊 Progress: ${clampedWidth}% (Profit: $${netProfitLoss.toFixed(2)})`);
                }

                // পজিশন আপডেট
                updatePosition(netProfitLoss);
                
                // UI আপডেট
                updateUIElements();
                
                // অ্যানালিটিক্স আপডেট
                updateAnalytics();

                retryCount = 0;

            } catch (error) {
                console.log('Update error:', error);
            }
        }

        // ==========================================
        // মনিটরিং শুরু
        // ==========================================
        
        function startMonitoring() {
            if (isMonitoring) return;

            console.log('🔍 মনিটরিং সিস্টেম চালু হচ্ছে...');
            console.log('📊 পজিশন রুলস:');
            console.log('  📉 লস: 100+');
            console.log('  📈 লাভ (টপ 20 এর বাইরে): 21-100');
            console.log('  🏆 টপ 20: 1-20');
            console.log('📊 প্রোগ্রেস বার রুলস:');
            console.log('  💰 200+ লাভ: 100% (ফুল)');
            console.log('  💰 100-199 লাভ: 65-100%');
            console.log('  💰 0-99 লাভ: 15-65%');
            console.log('  📉 লস: 5-30%');
            
            // প্রাথমিক আপডেট
            setTimeout(updateAllElements, 500);
            
            positionInterval = setInterval(updateAllElements, 3000);
            
            // DOM পরিবর্তন মনিটর
            mainObserver = new MutationObserver(function(mutations) {
                let shouldUpdate = false;
                
                for (let mutation of mutations) {
                    if (mutation.type === 'childList' || mutation.type === 'attributes') {
                        const elements = findElements();
                        if (elements.balanceElement) {
                            try {
                                const currentBalance = parseFloat(elements.balanceElement.textContent.replace(/[$,]/g, ''));
                                if (!isNaN(currentBalance) && initialBalance > 0) {
                                    const profit = currentBalance - initialBalance;
                                    if (profit !== lastProfitLoss) {
                                        shouldUpdate = true;
                                        break;
                                    }
                                }
                            } catch (e) {}
                        }
                        
                        if (document.querySelector('.YkAuV') && !document.querySelector('.YkAuV')?.textContent) {
                            shouldUpdate = true;
                            break;
                        }
                    }
                }
                
                if (shouldUpdate) {
                    setTimeout(updateAllElements, 100);
                }
            });

            mainObserver.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['style', 'class', 'hidden']
            });

            // গ্লোবাল মনিটর
            globalObserver = new MutationObserver(function() {
                if (!isMonitoring) {
                    const balanceElement = document.querySelector('.Zt1hG');
                    if (balanceElement) {
                        console.log('🔄 এলিমেন্ট ডিটেক্টেড, মনিটরিং রিস্টার্ট...');
                        startMonitoring();
                    }
                }
            });

            globalObserver.observe(document.documentElement, {
                childList: true,
                subtree: true
            });

            // UI পর্যবেক্ষক
            uiObserver = new MutationObserver(function(mutations) {
                if (!isUiUpdating) {
                    isUiUpdating = true;
                    clearTimeout(uiUpdateTimeout);
                    uiUpdateTimeout = setTimeout(function() {
                        updateUIElements();
                        isUiUpdating = false;
                    }, 100);
                }
            });

            uiObserver.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: true,
                characterData: true
            });

            // UI পিরিয়ডিক আপডেট
            uiInterval = setInterval(function() {
                if (!isUiUpdating) {
                    updateUIElements();
                }
            }, 5000);

            // অ্যানালিটিক্স পিরিয়ডিক আপডেট
            analyticsInterval = setInterval(updateAnalytics, 2000);

            isMonitoring = true;
            console.log('✅ মাস্টার সিস্টেম সফলভাবে চালু হয়েছে!');
        }

        // ==========================================
        // ইভেন্ট লিসেনার
        // ==========================================
        
        document.addEventListener('visibilitychange', function() {
            if (!document.hidden) {
                console.log('👁️ পেজ ভিজিবল, চেক করা হচ্ছে...');
                // URL চেক
                checkAndRedirect();
                setTimeout(updateAllElements, 500);
            }
        });

        document.addEventListener('click', function(e) {
            const target = e.target.closest('.UsFyP, .QE4Zb .Xlyoi, .QE4Zb');
            if (target) {
                console.log('👆 ড্রপডাউন ইন্টারঅ্যাকশন ডিটেক্টেড!');
                setTimeout(updateUIElements, 200);
            }
        });

        document.addEventListener('scroll', function() {
            if (!isUiUpdating) {
                clearTimeout(uiUpdateTimeout);
                uiUpdateTimeout = setTimeout(updateUIElements, 500);
            }
        });

        window.addEventListener('resize', function() {
            if (!isUiUpdating) {
                clearTimeout(uiUpdateTimeout);
                uiUpdateTimeout = setTimeout(updateUIElements, 500);
            }
            // রিসাইজের সময় QE4Zb এলিমেন্ট ঠিক করা
            fixQE4ZbElement();
        });

        // ==========================================
        // পাবলিক API
        // ==========================================
        
        const masterAPI = {
            stop: function() {
                if (mainObserver) {
                    mainObserver.disconnect();
                    mainObserver = null;
                }
                if (globalObserver) {
                    globalObserver.disconnect();
                    globalObserver = null;
                }
                if (uiObserver) {
                    uiObserver.disconnect();
                    uiObserver = null;
                }
                if (positionInterval) {
                    clearInterval(positionInterval);
                    positionInterval = null;
                }
                if (uiInterval) {
                    clearInterval(uiInterval);
                    uiInterval = null;
                }
                if (analyticsInterval) {
                    clearInterval(analyticsInterval);
                    analyticsInterval = null;
                }
                isMonitoring = false;
                console.log('⏹️ মাস্টার সিস্টেম বন্ধ করা হয়েছে');
            },
            
            restart: function() {
                console.log('🔄 রিস্টার্ট করা হচ্ছে...');
                this.stop();
                setTimeout(startMonitoring, 500);
            },
            
            getPosition: function() {
                return lastPosition;
            },
            
            getProfitLoss: function() {
                return lastProfitLoss;
            },
            
            forceUpdate: function() {
                console.log('💪 ফোর্স আপডেট শুরু...');
                localStorage.removeItem('demoBalance');
                updateAllElements();
            },
            
            manualUpdate: function() {
                console.log('🔄 ম্যানুয়াল আপডেট শুরু...');
                updateAllElements();
            },
            
            getBalance: function() {
                return getBalanceFromSource();
            },
            
            updateAnalyticsData: function(newData) {
                analyticsData = { ...analyticsData, ...newData };
                updateAnalytics();
                console.log('📊 অ্যানালিটিক্স ডেটা আপডেট করা হয়েছে:', analyticsData);
            },
            
            getAnalyticsData: function() {
                return { ...analyticsData };
            },
            
            injectTransaction: function(txData) {
                const defaultTx = {
                    id: Date.now().toString(),
                    status: 'SUCCESS',
                    type: 'Deposit',
                    method: 'Binance Pay',
                    time: new Date().toLocaleString(),
                    amount: '+$100.00'
                };
                const finalTx = { ...defaultTx, ...txData };
                return injectTransaction(finalTx);
            },
            
            status: function() {
                console.log('📊 মাস্টার সিস্টেম স্ট্যাটাস:');
                console.log('  মনিটরিং:', isMonitoring ? '✅ চালু' : '❌ বন্ধ');
                console.log('  বর্তমান পজিশন:', lastPosition);
                console.log('  লাভ/লস:', lastProfitLoss);
                console.log('  ইনিশিয়াল ব্যালেন্স:', initialBalance);
                console.log('  বর্তমান ব্যালেন্স:', getBalanceFromSource());
                console.log('  অ্যানালিটিক্স ডেটা:', analyticsData);
            }
        };

        // ==========================================
        // সিস্টেম শুরু
        // ==========================================
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                // URL চেক ও রিডাইরেক্ট
                checkAndRedirect();
                setTimeout(startMonitoring, 300);
            });
        } else {
            // URL চেক ও রিডাইরেক্ট
            checkAndRedirect();
            setTimeout(startMonitoring, 300);
        }

        // উইন্ডোতে API যোগ
        window.masterSystem = masterAPI;
        
        console.log('✅ মাস্টার সিস্টেম প্রস্তুত!');
        console.log('💡 কমান্ডসমূহ:');
        console.log('  masterSystem.status() - স্ট্যাটাস দেখুন');
        console.log('  masterSystem.forceUpdate() - ফোর্স আপডেট');
        console.log('  masterSystem.manualUpdate() - ম্যানুয়াল আপডেট');
        console.log('  masterSystem.getBalance() - ব্যালেন্স দেখুন');
        console.log('  masterSystem.stop() - সিস্টেম বন্ধ');
        console.log('  masterSystem.restart() - সিস্টেম রিস্টার্ট');
        console.log('  masterSystem.updateAnalyticsData(data) - অ্যানালিটিক্স ডেটা আপডেট');
        console.log('  masterSystem.injectTransaction(data) - ট্রানজেকশন ইনজেক্ট করুন');
        console.log('⏰ প্রতি 3 সেকেন্ডে পজিশন আপডেট');
        console.log('⏰ প্রতি 5 সেকেন্ডে UI আপডেট');
        console.log('⏰ প্রতি 2 সেকেন্ডে অ্যানালিটিক্স আপডেট');
        console.log('👁️ DOM পরিবর্তন হলে সাথে সাথে আপডেট');

        // ==========================================
        // UI প্যানেল
        // ==========================================
        
        (function startPanel() {
            // UI প্যানেল স্টাইল
            const oldPanel = document.getElementById('qtx-ultimate-panel');
            const oldStyle = document.getElementById('qtx-ultimate-style');
            if (oldPanel) oldPanel.remove();
            if (oldStyle) oldStyle.remove();

            const style = document.createElement('style');
            style.id = 'qtx-ultimate-style';
            style.innerHTML = `
                #qtx-ultimate-panel {
                    position: fixed; top: 15px; right: 15px; z-index: 9999999;
                    background: #11141d; border: 1px solid #2a2e39; border-radius: 12px;
                    padding: 14px; width: 340px; max-height: 90vh; overflow-y: auto;
                    box-shadow: 0 15px 35px rgba(0,0,0,0.85); font-family: 'Segoe UI', system-ui, sans-serif; color: #fff;
                }
                #qtx-ultimate-panel::-webkit-scrollbar { width: 5px; }
                #qtx-ultimate-panel::-webkit-scrollbar-thumb { background: #00e676; border-radius: 10px; }

                .qtx-hdr { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #2a2e39; padding-bottom: 8px; margin-bottom: 10px; }
                .qtx-hdr h3 { margin: 0; font-size: 13px; color: #00e676; text-transform: uppercase; font-weight: bold; }
                .qtx-close { background: none; border: none; color: #888; font-size: 20px; cursor: pointer; }
                .qtx-close:hover { color: #ff5252; }

                .qtx-sec { background: #171b26; border: 1px solid #242936; border-radius: 8px; padding: 10px; margin-bottom: 10px; }
                .qtx-sec-title { font-size: 11px; color: #82b1ff; font-weight: bold; margin-bottom: 8px; text-transform: uppercase; border-bottom: 1px dashed #2a2e39; padding-bottom: 4px; }

                .qtx-group { margin-bottom: 6px; }
                .qtx-group label { display: block; font-size: 10px; color: #aaa; margin-bottom: 2px; }
                .qtx-row { display: flex; gap: 6px; }

                .qtx-input, .qtx-select { width: 100%; padding: 6px 8px; background: #0a0c10; border: 1px solid #2a2e39; border-radius: 4px; color: #fff; font-size: 11px; box-sizing: border-box; outline: none; }
                .qtx-input:focus, .qtx-select:focus { border-color: #2962ff; }

                .qtx-btn { width: 100%; padding: 8px; background: #00c853; color: #fff; border: none; border-radius: 5px; font-weight: bold; font-size: 12px; cursor: pointer; margin-top: 5px; }
                .qtx-btn:hover { background: #009624; }
                .qtx-btn-inj { background: #2962ff; }
                .qtx-btn-inj:hover { background: #1e4bd8; }
                .qtx-btn-tx { background: #ff9100; color: #000; }
                .qtx-btn-tx:hover { background: #e68200; }
                
                .qtx-success-icon {
                    display: inline-flex; align-items: center; justify-content: center;
                    width: 16px; height: 16px; background-color: #00e676; border-radius: 50%; margin-right: 6px;
                }
                .qtx-success-icon svg { width: 10px; height: 8px; stroke: #000; stroke-width: 2; fill: none; }
            `;
            document.head.appendChild(style);

            const panel = document.createElement('div');
            panel.id = 'qtx-ultimate-panel';
            panel.innerHTML = `
                <div class="qtx-hdr">
                    <h3>🎛️ Ultimate DOM Master Panel</h3>
                    <button class="qtx-close" id="qtxCloseBtn">&times;</button>
                </div>

                <!-- Analytics Profile Statistics Control -->
                <div class="qtx-sec">
                    <div class="qtx-sec-title">📊 Analytics Profile Statistics</div>
                    <div class="qtx-row">
                        <div class="qtx-group" style="flex:1;"><label>Trades Count</label><input type="number" class="qtx-input" id="anTradesCount" value="${analyticsData.tradesCount}"></div>
                        <div class="qtx-group" style="flex:1;"><label>Trades Count Circle %</label><input type="number" class="qtx-input" id="anTradesPct" value="${analyticsData.tradesPct}"></div>
                    </div>
                    <div class="qtx-row">
                        <div class="qtx-group" style="flex:1;"><label>Trades Profit ($)</label><input type="text" class="qtx-input" id="anTradesProfit" value="${analyticsData.tradesProfit.replace('$', '')}"></div>
                        <div class="qtx-group" style="flex:1;"><label>Win Trades (%)</label><input type="number" class="qtx-input" id="anWinPct" value="${analyticsData.winPct}"></div>
                    </div>
                    <div class="qtx-row">
                        <div class="qtx-group" style="flex:1;"><label>Average Profit ($)</label><input type="text" class="qtx-input" id="anAvgProfit" value="${analyticsData.avgProfit.replace('$', '')}"></div>
                        <div class="qtx-group" style="flex:1;"><label>Net Turnover ($)</label><input type="text" class="qtx-input" id="anNetTurnover" value="${analyticsData.netTurnover.replace('$', '')}"></div>
                    </div>
                    <div class="qtx-row">
                        <div class="qtx-group" style="flex:1;"><label>Hedged Trades ($)</label><input type="text" class="qtx-input" id="anHedged" value="${analyticsData.hedged.replace('$', '')}"></div>
                        <div class="qtx-group" style="flex:1;"><label>Min Trade Amount ($)</label><input type="text" class="qtx-input" id="anMinTrade" value="${analyticsData.minTrade.replace('$', '')}"></div>
                    </div>
                    <div class="qtx-row">
                        <div class="qtx-group" style="flex:1;"><label>Max Trade Amount ($)</label><input type="text" class="qtx-input" id="anMaxTrade" value="${analyticsData.maxTrade.replace('$', '')}"></div>
                        <div class="qtx-group" style="flex:1;"><label>Max Trade Profit ($)</label><input type="text" class="qtx-input" id="anMaxProfit" value="${analyticsData.maxProfit.replace('$', '')}"></div>
                    </div>
                </div>

                <!-- Transaction Control -->
                <div class="qtx-sec">
                    <div class="qtx-sec-title">💳 Add Transaction History</div>
                    <div class="qtx-row">
                        <div class="qtx-group" style="flex:1;"><label>Transaction ID</label><input type="text" class="qtx-input" id="txId" value="104110858"></div>
                        <div class="qtx-group" style="flex:1;">
                            <label>Status</label>
                            <select class="qtx-select" id="txStatus">
                                <option value="SUCCESS">Success</option>
                                <option value="FAILED">Failed</option>
                            </select>
                        </div>
                    </div>
                    <div class="qtx-row">
                        <div class="qtx-group" style="flex:1;">
                            <label>Type</label>
                            <select class="qtx-select" id="txType">
                                <option value="Deposit">Deposit</option>
                                <option value="Withdrawal">Withdrawal</option>
                            </select>
                        </div>
                        <div class="qtx-group" style="flex:1;"><label>Payment Method</label><input type="text" class="qtx-input" id="txMethod" value="Binance Pay"></div>
                    </div>
                    <div class="qtx-row">
                        <div class="qtx-group" style="flex:1;"><label>Date & Time</label><input type="text" class="qtx-input" id="txTime" value="${new Date().toLocaleString()}"></div>
                        <div class="qtx-group" style="flex:1;"><label>Amount ($)</label><input type="text" class="qtx-input" id="txAmount" value="100.00"></div>
                    </div>
                    <button class="qtx-btn qtx-btn-tx" id="qtxInjectTxBtn">+ Inject Transaction</button>
                </div>

                <button class="qtx-btn" id="qtxApplyBtn">Apply All Changes</button>
            `;
            document.body.appendChild(panel);

            // Analytics Apply Button
            document.getElementById('qtxApplyBtn').addEventListener('click', function() {
                const fmt = val => val.trim().startsWith('$') ? val.trim() : `$${val.trim()}`;

                const newData = {
                    tradesCount: document.getElementById('anTradesCount').value.trim(),
                    tradesPct: parseFloat(document.getElementById('anTradesPct').value) || 0,
                    tradesProfit: fmt(document.getElementById('anTradesProfit').value),
                    winPct: parseFloat(document.getElementById('anWinPct').value) || 0,
                    avgProfit: fmt(document.getElementById('anAvgProfit').value),
                    netTurnover: fmt(document.getElementById('anNetTurnover').value),
                    hedged: fmt(document.getElementById('anHedged').value),
                    minTrade: fmt(document.getElementById('anMinTrade').value),
                    maxTrade: fmt(document.getElementById('anMaxTrade').value),
                    maxProfit: fmt(document.getElementById('anMaxProfit').value)
                };

                if (window.masterSystem) {
                    window.masterSystem.updateAnalyticsData(newData);
                }

                this.textContent = '✔ Saved & Applied!';
                setTimeout(() => { this.textContent = 'Apply All Changes'; }, 1000);
            });

            // Transaction Inject Button
            document.getElementById('qtxInjectTxBtn').addEventListener('click', function() {
                const txData = {
                    id: document.getElementById('txId').value.trim() || Date.now().toString(),
                    status: document.getElementById('txStatus').value,
                    type: document.getElementById('txType').value,
                    method: document.getElementById('txMethod').value.trim() || "Binance Pay",
                    time: document.getElementById('txTime').value.trim() || new Date().toLocaleString(),
                    amount: document.getElementById('txAmount').value.trim()
                };

                let amt = txData.amount;
                if (!amt.startsWith('$') && !amt.startsWith('+$') && !amt.startsWith('-$')) {
                    amt = (txData.type === 'Deposit' ? '+$' : '-$') + amt;
                }
                txData.amount = amt;

                if (window.masterSystem) {
                    const success = window.masterSystem.injectTransaction(txData);
                    if (success) {
                        this.textContent = '✔ Transaction Injected!';
                        setTimeout(() => { this.textContent = '+ Inject Transaction'; }, 1000);
                    } else {
                        alert('ট্রানজেকশন ইনজেক্ট করতে ব্যর্থ! ট্রানজেকশন পেজ খোলা আছে কিনা চেক করুন।');
                    }
                } else {
                    alert('মাস্টার সিস্টেম লোড হয়নি!');
                }
            });

            // Close button
            document.getElementById('qtxCloseBtn').addEventListener('click', function() {
                panel.remove();
                style.remove();
            });
            
            console.log("🎛️ UI প্যানেল সফলভাবে লোড হয়েছে!");
        })();
    }

})();
```
