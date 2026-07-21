async function startSystem() {
    (async function() {
    const LICENSE_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRWyCea8rzU5InezOIaHDmZR7eV1CFYWBJ4c87Pporiu8cpUqf7JfndHelELbcIsldxolYodvYafdEK/pub?output=csv"; 

    async function checkAuth() {
        try {
            const response = await fetch(LICENSE_URL);
            const csvData = await response.text();
            
            // তোমার ডিভাইসের ইউনিক আইডি (যেমন: হার্ডওয়্যার আইডি বা ইউনিক ইমেইল)
            const deviceID = localStorage.getItem("my_app_uid") || prompt("আপনার লাইসেন্স কী দিন:");
            
            if (!deviceID) return false;

            // শিটের ডেটা প্রসেস করা
            const lines = csvData.split("\n");
            for (let line of lines) {
                let [id, status] = line.split(",");
                if (id.trim() === deviceID.trim()) {
                    if (status.trim() === "Active") {
                        localStorage.setItem("my_app_uid", deviceID);
                        return true;
                    } else {
                        alert("আপনার একাউন্ট ব্লকড! সাপোর্টের সাথে যোগাযোগ করুন।");
                        localStorage.removeItem("my_app_uid");
                        return false;
                    }
                }
            }
            alert("ভুল লাইসেন্স কী!");
            return false;
        } catch (e) {
            return false; // ইন্টারনেট না থাকলে অফলাইন মোড বা এরর
        }
    }

    const isAuthorized = await checkAuth();
    if (!isAuthorized) return; // অথোরাইজড না হলে প্যানেল আসবে না

    // --- এখান থেকে তোমার মেইন কোড শুরু ---
   (function() {
    // ১. আগের প্যানেল ও স্টাইল মুছে ফেলা
    const oldPanel = document.getElementById('qtx-ultimate-panel');
    const oldStyle = document.getElementById('qtx-ultimate-style');
    if (oldPanel) oldPanel.remove();
    if (oldStyle) oldStyle.remove();

    // ২. UI CSS Inject
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

    // ৩. UI HTML Construct
    const panel = document.createElement('div');
    panel.id = 'qtx-ultimate-panel';
    panel.innerHTML = `
        <div class="qtx-hdr">
            <h3>🎛️ Ultimate DOM Master Panel</h3>
            <button class="qtx-close" id="qtxCloseBtn">&times;</button>
        </div>

        <!-- 1. Balances -->
        <div class="qtx-sec">
            <div class="qtx-sec-title">1. Accounts Balance</div>
            <div class="qtx-row">
                <div class="qtx-group" style="flex:1;"><label>Live Balance ($)</label><input type="text" class="qtx-input" id="cfgLive" value="5,420.00"></div>
                <div class="qtx-group" style="flex:1;"><label>Demo Balance ($)</label><input type="text" class="qtx-input" id="cfgDemo" value="50,000.00"></div>
            </div>
        </div>

        <!-- 2. Profile Analytics Statistics Control (NEW ADDED) -->
        <div class="qtx-sec">
            <div class="qtx-sec-title">2. Analytics Profile Statistics</div>
            <div class="qtx-row">
                <div class="qtx-group" style="flex:1;"><label>Trades Count</label><input type="number" class="qtx-input" id="anTradesCount" value="150"></div>
                <div class="qtx-group" style="flex:1;"><label>Trades Count Circle %</label><input type="number" class="qtx-input" id="anTradesPct" value="75"></div>
            </div>
            <div class="qtx-row">
                <div class="qtx-group" style="flex:1;"><label>Trades Profit ($)</label><input type="text" class="qtx-input" id="anTradesProfit" value="12,450.00"></div>
                <div class="qtx-group" style="flex:1;"><label>Win Trades (%)</label><input type="number" class="qtx-input" id="anWinPct" value="85"></div>
            </div>
            <div class="qtx-row">
                <div class="qtx-group" style="flex:1;"><label>Average Profit ($)</label><input type="text" class="qtx-input" id="anAvgProfit" value="1,250.00"></div>
                <div class="qtx-group" style="flex:1;"><label>Net Turnover ($)</label><input type="text" class="qtx-input" id="anNetTurnover" value="45,800.00"></div>
            </div>
            <div class="qtx-row">
                <div class="qtx-group" style="flex:1;"><label>Hedged Trades ($)</label><input type="text" class="qtx-input" id="anHedged" value="0.00"></div>
                <div class="qtx-group" style="flex:1;"><label>Min Trade Amount ($)</label><input type="text" class="qtx-input" id="anMinTrade" value="10.00"></div>
            </div>
            <div class="qtx-row">
                <div class="qtx-group" style="flex:1;"><label>Max Trade Amount ($)</label><input type="text" class="qtx-input" id="anMaxTrade" value="1,000.00"></div>
                <div class="qtx-group" style="flex:1;"><label>Max Trade Profit ($)</label><input type="text" class="qtx-input" id="anMaxProfit" value="870.00"></div>
            </div>
        </div>

        <!-- 3. Leaderboard Main -->
        <div class="qtx-sec">
            <div class="qtx-sec-title">3. Leaderboard Main Row</div>
            <div class="qtx-group"><label>My Total Profit ($)</label><input type="text" class="qtx-input" id="cfgMyProfit" value="12,450.00"></div>
            <div class="qtx-row">
                <div class="qtx-group" style="width:30%;"><label>Target Rank</label><input type="number" class="qtx-input" id="cfgRankNum" value="1"></div>
                <div class="qtx-group" style="width:70%;"><label>Rank Name</label><input type="text" class="qtx-input" id="cfgRankName" value="ProTrader_BD"></div>
            </div>
            <div class="qtx-group"><label>Rank Profit ($)</label><input type="text" class="qtx-input" id="cfgRankAmount" value="35,000.00"></div>
        </div>

        <!-- 4. Profile Popup Control -->
        <div class="qtx-sec">
            <div class="qtx-sec-title">4. Leaderboard Profile Popup</div>
            <div class="qtx-row">
                <div class="qtx-group" style="flex:1;"><label>Popup Name</label><input type="text" class="qtx-input" id="popName" value="Harutrades"></div>
                <div class="qtx-group" style="flex:1;"><label>Country</label><input type="text" class="qtx-input" id="popCountry" value="Bangladesh"></div>
            </div>
            <div class="qtx-row">
                <div class="qtx-group" style="flex:1;"><label>Total Trades</label><input type="text" class="qtx-input" id="popTrades" value="15"></div>
                <div class="qtx-group" style="flex:1;"><label>Win Trades</label><input type="text" class="qtx-input" id="popProfitable" value="13"></div>
            </div>
            <div class="qtx-row">
                <div class="qtx-group" style="flex:1;"><label>Trades Profit ($)</label><input type="text" class="qtx-input" id="popProfit" value="17,220.00"></div>
                <div class="qtx-group" style="flex:1;"><label>Avg Profit ($)</label><input type="text" class="qtx-input" id="popAvgProfit" value="1,324.61"></div>
            </div>
            <div class="qtx-row">
                <div class="qtx-group" style="flex:1;"><label>Min Trade ($)</label><input type="text" class="qtx-input" id="popMinTrade" value="100.00"></div>
                <div class="qtx-group" style="flex:1;"><label>Max Trade ($)</label><input type="text" class="qtx-input" id="popMaxTrade" value="3,000.00"></div>
            </div>
        </div>

        <!-- 5. Inject Custom Trade Row -->
        <div class="qtx-sec">
            <div class="qtx-sec-title">5. Add Trade History (Live/Demo)</div>
            <div class="qtx-row">
                <div class="qtx-group" style="flex:1;"><label>Asset Name</label><input type="text" class="qtx-input" id="injAsset" value="AUD/USD"></div>
                <div class="qtx-group" style="flex:1;">
                    <label>Trade Status</label>
                    <select class="qtx-select" id="injStatus">
                        <option value="WIN">WIN (Profit)</option>
                        <option value="LOSS">LOSS (0.00$)</option>
                    </select>
                </div>
            </div>
            <div class="qtx-row">
                <div class="qtx-group" style="flex:1;"><label>Open Quote</label><input type="text" class="qtx-input" id="injOpen" value="0.70101"></div>
                <div class="qtx-group" style="flex:1;"><label>Close Quote</label><input type="text" class="qtx-input" id="injClose" value="0.70150"></div>
            </div>
            <div class="qtx-row">
                <div class="qtx-group" style="flex:1;"><label>Investment ($)</label><input type="text" class="qtx-input" id="injAmount" value="15.00"></div>
                <div class="qtx-group" style="flex:1;"><label>Profit ($)</label><input type="text" class="qtx-input" id="injProfit" value="13.05"></div>
            </div>
            <button class="qtx-btn qtx-btn-inj" id="qtxInjectBtn">+ Inject Trade Row</button>
        </div>

        <!-- 6. Transaction Control -->
        <div class="qtx-sec">
            <div class="qtx-sec-title">6. Add Transaction History</div>
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
                <div class="qtx-group" style="flex:1;"><label>Date & Time</label><input type="text" class="qtx-input" id="txTime" value="27/11/2025, 22:02:27"></div>
                <div class="qtx-group" style="flex:1;"><label>Amount ($)</label><input type="text" class="qtx-input" id="txAmount" value="100.00"></div>
            </div>
            <button class="qtx-btn qtx-btn-tx" id="qtxInjectTxBtn">+ Inject Transaction</button>
        </div>

        <button class="qtx-btn" id="qtxApplyBtn">Apply All Changes</button>
    `;
    document.body.appendChild(panel);

    // ৪. গ্লোবাল ডাটা অবজেক্ট
    let data = {
        live: "$5,420.00",
        demo: "$50,000.00",
        // Analytics Statistics Data
        anTradesCount: "150",
        anTradesPct: 75,
        anTradesProfit: "$12,450.00",
        anWinPct: 85,
        anAvgProfit: "$1,250.00",
        anNetTurnover: "$45,800.00",
        anHedged: "$0.00",
        anMinTrade: "$10.00",
        anMaxTrade: "$1,000.00",
        anMaxProfit: "$870.00",
        // Leaderboard Data
        myProfit: "$12,450.00",
        targetRank: 1,
        rankName: "ProTrader_BD",
        rankAmount: "$35,000.00",
        // Popup Data
        popName: "Harutrades",
        popCountry: "Bangladesh",
        popTrades: "15",
        popProfitable: "13",
        popProfit: "$17,220.00",
        popAvgProfit: "$1,324.61",
        popMinTrade: "$100.00",
        popMaxTrade: "$3,000.00"
    };

    // ৫. DOM আপডেট লুপ
    const interval = setInterval(() => {
        // A. Account Balances
       // ৫. DOM আপডেট লুপ (Dropdown and Re-render Fix)
// ৫. DOM আপডেট লুপ (Live & Demo Balances Realtime Manipulation)
    const manipulateAccountBalances = () => {
        // A. Live Account Text Update
        const liveEl = document.querySelector('.grOBD li.xC7W_ a[href*="/trade"] + b.YnoT0');
        if (liveEl && liveEl.textContent !== data.live) {
            liveEl.textContent = data.live;
        }

        // B. Demo Account Text Update
        const demoEl = document.querySelector('.grOBD li.xC7W_ a[href*="demo-trade"] ~ .WjlOy b.YnoT0');
        if (demoEl && demoEl.textContent !== data.demo) {
            demoEl.textContent = data.demo;
        }

        // C. Demo Input Box Value Update
        const demoInput = document.querySelector('.grOBD .phkwf input.input-control__input');
        const rawDemoVal = data.demo.replace(/[^0-9.]/g, '');
        if (demoInput && demoInput.value !== rawDemoVal && document.activeElement !== demoInput) {
            demoInput.value = rawDemoVal;
        }

        // D. Top Header Main Balance Update ( if visible )
        const topLive = document.querySelector('.zfJUm .Zt1hG');
        if (topLive && topLive.textContent !== data.live) {
            topLive.textContent = data.live;
        }
    };

    // ড্রপডাউন ওপেন হলে যেন সাথে সাথে রিফ্লেক্ট করে (Observer)
    const observer = new MutationObserver(manipulateAccountBalances);
    observer.observe(document.body, { childList: true, subtree: true });

    const interval = setInterval(() => {
        manipulateAccountBalances();
    }, 1000);

    // B. Analytics Profile Statistics Override
    const statsContainer = document.querySelector('.analytics__profile-statistics__container');
        if (statsContainer) {
            // 1. Trades count & Circle Bar
            const tradesCont = statsContainer.querySelector('#trades-svg')?.parentElement;
            if (tradesCont) {
                tradesCont.setAttribute('data-pct', data.anTradesCount);
                const tradesBar = statsContainer.querySelector('#trades-bar');
                if (tradesBar) {
                    const circumference = 150.796;
                    const offset = circumference - (circumference * (Math.min(data.anTradesPct, 100) / 100));
                    tradesBar.style.strokeDashoffset = offset;
                    tradesBar.style.stroke = 'var(--color-green, #00e676)';
                }
            }

            // Helper function to update label money values accurately
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

            // 2. All Money Metrics Update
            updateMoneyByLabel('Trades profit', data.anTradesProfit);
            updateMoneyByLabel('Average profit', data.anAvgProfit);
            updateMoneyByLabel('Net turnover', data.anNetTurnover);
            updateMoneyByLabel('Hedged trades', data.anHedged);
            updateMoneyByLabel('Min trade amount', data.anMinTrade);
            updateMoneyByLabel('Max trade amount', data.anMaxTrade);
            updateMoneyByLabel('Max trade profit', data.anMaxProfit);

            // 3. Profitable trades SVG Circle & Attributes
            const winCont = statsContainer.querySelector('#win-trades-svg')?.parentElement;
            if (winCont) {
                winCont.setAttribute('data-pct', data.anWinPct);
                winCont.setAttribute('data-value', data.anWinPct);
                const winBar = statsContainer.querySelector('#win-trades-bar');
                if (winBar) {
                    const circumference = 150.796;
                    const offset = circumference - (circumference * (Math.min(data.anWinPct, 100) / 100));
                    winBar.style.strokeDashoffset = offset;
                    winBar.style.stroke = 'var(--color-green, #00e676)';
                }
            }

            // 4. Progress indicator bars inside stats
            const progressBars = statsContainer.querySelectorAll('.HOsH5 .RsnIv div');
            progressBars.forEach(bar => {
                bar.style.width = '100%';
                bar.style.backgroundColor = '#00e676';
            });
        }

        // C. Leaderboard Own Profit
        const myProfitEl = document.querySelector('.Bsca8 .ord28');
        if (myProfitEl && myProfitEl.textContent !== data.myProfit) myProfitEl.textContent = data.myProfit;

        // D. Leaderboard Rank Items Override
        const rankItems = document.querySelectorAll('.CYmPX');
        rankItems.forEach(item => {
            const rankNumEl = item.querySelector('.FdU8g');
            if (rankNumEl && parseInt(rankNumEl.textContent) === parseInt(data.targetRank)) {
                const nameEl = item.querySelector('.hKWVz');
                const amountEl = item.querySelector('.ePgNa');

                if (nameEl && nameEl.textContent !== data.rankName) nameEl.textContent = data.rankName;
                if (amountEl && amountEl.textContent !== data.rankAmount) amountEl.textContent = data.rankAmount;
            }
        });

        // E. Profile Popup Override
        const popup = document.querySelector('.lH01n');
        if (popup) {
            const countryEl = popup.querySelector('.B5Vqs');
            if (countryEl && countryEl.textContent !== data.popCountry) countryEl.textContent = data.popCountry;

            const nameEl = popup.querySelector('.CbMCx p');
            if (nameEl && nameEl.textContent !== data.popName) nameEl.textContent = data.popName;

            const stats = popup.querySelectorAll('.w1Sp_ .YL5hN .hN0NY');
            if (stats.length >= 6) {
                if (stats[0].textContent !== data.popTrades) stats[0].textContent = data.popTrades;
                if (stats[1].textContent !== data.popProfitable) stats[1].textContent = data.popProfitable;
                if (stats[2].textContent !== data.popProfit) stats[2].textContent = data.popProfit;
                if (stats[3].textContent !== data.popAvgProfit) stats[3].textContent = data.popAvgProfit;
                if (stats[4].textContent !== data.popMinTrade) stats[4].textContent = data.popMinTrade;
                if (stats[5].textContent !== data.popMaxTrade) stats[5].textContent = data.popMaxTrade;
            }
        }
    }, 50);

    // ৬. Custom Trade Injector
    document.getElementById('qtxInjectBtn').addEventListener('click', function() {
        let container = null;
        const sampleRow = document.querySelector('.bQvOA');
        const emptyState = document.querySelector('.Ah8Om');

        if (sampleRow) {
            container = sampleRow.parentElement;
        } else if (emptyState) {
            container = emptyState.parentElement;
            emptyState.remove();
        } else {
            container = document.querySelector('.rclm9')?.parentElement;
        }

        if (!container) {
            alert('Trade History container not found on screen! Open Trades tab first.');
            return;
        }

        const asset = document.getElementById('injAsset').value.trim() || "AUD/USD";
        const status = document.getElementById('injStatus').value;
        const openQ = document.getElementById('injOpen').value.trim() || "0.70101";
        const closeQ = document.getElementById('injClose').value.trim() || "0.70150";
        
        const fmtDollar = val => val.trim().endsWith('$') ? val.trim() : `${val.trim()}$`;
        const amt = fmtDollar(document.getElementById('injAmount').value);
        const profit = status === 'LOSS' ? '0.00$' : fmtDollar(document.getElementById('injProfit').value);
        const profitClass = status === 'LOSS' ? 'rSpgN' : 'cKYQK';

        const timeStr = new Date().toLocaleTimeString('en-GB');
        const dateStr = new Date().toLocaleDateString('en-GB');

        const tradeRow = document.createElement('div');
        tradeRow.className = 'bQvOA';
        tradeRow.innerHTML = `
            <div class="Z6JNP"><div class="flags tyXSx"><svg class="flag-aud" aria-label="Flag AUD"><use href="/profile/images/flags.svg#flag-aud"></use></svg><svg class="flag-usd" aria-label="Flag USD"><use href="/profile/images/flags.svg#flag-usd"></use></svg></div><b>${asset}</b></div>
            <div class="tA1xK"><div class="wOyXY">87%</div><div class="YHOFT">inj-${Math.floor(Math.random()*100000)}</div></div>
            <div class="PCiEh"><svg class="icon-graph-trades"><use xlink:href="/profile/images/spritemap.svg#icon-graph-trades"></use></svg></div>
            <div class="sDT1M"><div class="rFjCr"><div>${openQ}</div></div><div class="YHOFT">${dateStr}, ${timeStr}</div></div>
            <div class="yaLys"><div>${closeQ}</div><div class="YHOFT">${dateStr}, ${timeStr}</div></div>
            <div class="IbHql"><svg class="flag-world" aria-label="Flag WORLD"><use href="/profile/images/flags.svg#flag-world"></use></svg>—</div>
            <div class="dj8M9 uLCSj cKYQK"><svg class="icon-arrow-up-circle UaXts VtLOq"><use xlink:href="/profile/images/spritemap.svg#icon-arrow-up-circle"></use></svg><b>${amt}</b></div>
            <div class="dj8M9 fTGaJ ${profitClass}"><b>${profit}</b></div>
        `;

        if (sampleRow) {
            sampleRow.parentNode.insertBefore(tradeRow, sampleRow);
        } else {
            container.appendChild(tradeRow);
        }

        this.textContent = '✔ Trade Injected!';
        setTimeout(() => { this.textContent = '+ Inject Trade Row'; }, 1000);
    });

    // ৭. Transaction Injector Event
    document.getElementById('qtxInjectTxBtn').addEventListener('click', function() {
        const txList = document.querySelector('.transactions-list');
        if (!txList) {
            alert('Transactions list container not found! Open Transactions page first.');
            return;
        }

        const id = document.getElementById('txId').value.trim() || "104110858";
        const status = document.getElementById('txStatus').value;
        const type = document.getElementById('txType').value;
        const method = document.getElementById('txMethod').value.trim() || "Binance Pay";
        const time = document.getElementById('txTime').value.trim() || "27/11/2025, 22:02:27";
        
        let amtVal = document.getElementById('txAmount').value.trim();
        if (!amtVal.startsWith('$') && !amtVal.startsWith('+$') && !amtVal.startsWith('-$')) {
            amtVal = (type === 'Deposit' ? '+$' : '-$') + amtVal;
        }

        const successTickSVG = `<span class="qtx-success-icon"><svg viewBox="0 0 10 8"><path d="M1 4L3.5 6.5L9 1"/></svg></span>`;

        const statusHTML = status === 'SUCCESS' 
            ? `${successTickSVG}<span class="VgSqu">Success</span>` 
            : `<div class="UC4rf RDmfy"><svg class="icon-close-tiny"><use xlink:href="/profile/images/spritemap.svg#icon-close-tiny"></use></svg></div><span class="VgSqu gvdfF">Failed</span>`;

        const txRow = document.createElement('div');
        txRow.className = 'vDMA1';
        txRow.innerHTML = `
            <div class="VZvOf">${id}</div>
            <div class="Sf_Tx">${time}</div>
            <div class="_2NHFf"><div class="Aa1Ox">${statusHTML}</div></div>
            <div class="Ed7UM">${type}</div>
            <div class="R1N82">${method}</div>
            <div class="vKozV"><b class="lekbj ${status === 'SUCCESS' ? 'cKYQK' : 'QdPVe'}">${amtVal}</b></div>
        `;

        const header = txList.querySelector('.transactions-list__header');
        if (header && header.nextSibling) {
            txList.insertBefore(txRow, header.nextSibling);
        } else {
            txList.appendChild(txRow);
        }

        this.textContent = '✔ Transaction Injected!';
        setTimeout(() => { this.textContent = '+ Inject Transaction'; }, 1000);
    });

    // ৮. Apply All Settings
    document.getElementById('qtxApplyBtn').addEventListener('click', function() {
        const fmt = val => val.trim().startsWith('$') ? val.trim() : `$${val.trim()}`;

        data.live = fmt(document.getElementById('cfgLive').value);
        data.demo = fmt(document.getElementById('cfgDemo').value);

        // Analytics Data Update
        data.anTradesCount = document.getElementById('anTradesCount').value.trim();
        data.anTradesPct = parseFloat(document.getElementById('anTradesPct').value) || 0;
        data.anTradesProfit = fmt(document.getElementById('anTradesProfit').value);
        data.anWinPct = parseFloat(document.getElementById('anWinPct').value) || 0;
        data.anAvgProfit = fmt(document.getElementById('anAvgProfit').value);
        data.anNetTurnover = fmt(document.getElementById('anNetTurnover').value);
        data.anHedged = fmt(document.getElementById('anHedged').value);
        data.anMinTrade = fmt(document.getElementById('anMinTrade').value);
        data.anMaxTrade = fmt(document.getElementById('anMaxTrade').value);
        data.anMaxProfit = fmt(document.getElementById('anMaxProfit').value);

        // Leaderboard Data Update
        data.myProfit = fmt(document.getElementById('cfgMyProfit').value);
        data.targetRank = parseInt(document.getElementById('cfgRankNum').value) || 1;
        data.rankName = document.getElementById('cfgRankName').value.trim();
        data.rankAmount = fmt(document.getElementById('cfgRankAmount').value);

        // Popup Data Update
        data.popName = document.getElementById('popName').value.trim();
        data.popCountry = document.getElementById('popCountry').value.trim();
        data.popTrades = document.getElementById('popTrades').value.trim();
        data.popProfitable = document.getElementById('popProfitable').value.trim();
        data.popProfit = fmt(document.getElementById('popProfit').value);
        data.popAvgProfit = fmt(document.getElementById('popAvgProfit').value);
        data.popMinTrade = fmt(document.getElementById('popMinTrade').value);
        data.popMaxTrade = fmt(document.getElementById('popMaxTrade').value);

        this.textContent = '✔ Saved & Applied!';
        setTimeout(() => { this.textContent = 'Apply All Changes'; }, 1000);
    });

    // ৯. Close Panel
    document.getElementById('qtxCloseBtn').addEventListener('click', function() {
        clearInterval(interval);
        panel.remove();
        style.remove();
    });
    })();
    })();
}
