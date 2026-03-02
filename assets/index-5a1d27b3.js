import"./common-a1690455.js";import{i as N}from"./business-wasm-9bc874d6.js";const h={WIN_AMOUNT_PER_NUMBER:45,buyerId:0,betItemId:0,currentView:StorageManager.get("currentView","ascending"),calculateWinningsFromRecords(e,t=!1){if(e.length===0)return{totalBet:0,numberCounts:{},numberBetAmounts:{},numberWinnings:{},topThree:[],topThreeDetails:[]};const i=t?e.filter(l=>!l.fromPrediction):e;if(i.length===0)return{totalBet:0,numberCounts:{},numberBetAmounts:{},numberWinnings:{},topThree:[],topThreeDetails:[]};const n={},o={};let r=0;i.forEach(l=>{r+=l.total,l.numbers.forEach(d=>{n[d]||(n[d]=0,o[d]=0),n[d]++,o[d]+=l.amount})});const s={};Object.keys(o).forEach(l=>{s[l]=o[l]*this.WIN_AMOUNT_PER_NUMBER});const c=Object.entries(s).sort((l,d)=>d[1]-l[1]).slice(0,3),a=c.map(([l,d])=>{const m=o[l],u=n[l],p=d-r;return{number:l,betCount:u,betAmount:m,winningAmount:d,totalBet:r,profit:p}});return{totalBet:r,numberCounts:n,numberBetAmounts:o,numberWinnings:s,topThree:c,topThreeDetails:a}}},B={renderNumberSelector(e,t,i){return h.currentView==="zodiac"?this.renderZodiacView(e,t,i):this.renderAscendingView(e,t)},renderAscendingView(e,t){return t.map(i=>`<div class="number-item ${i.color}" data-value="${i.value}" onclick="BettingApp.toggleNumber(${e}, '${i.value}', 'manual')">${i.value} ${i.zodiacName}</div>`).join("")},renderZodiacView(e,t,i){return DataReader.getNumbersByZodiac(i).map(o=>`
          <div class="zodiac-column">
            <div class="zodiac-header">
              <div class="zodiac-number">${o.zodiacNumber}</div>
              <div class="zodiac-name">${o.zodiacName}</div>
            </div>
            <div class="zodiac-numbers">
              ${o.numbers.map(r=>`<div class="number-item ${r.color}" data-value="${r.value}" onclick="BettingApp.toggleNumber(${e}, '${r.value}', 'manual')">${r.value}</div>`).join("")}
            </div>
          </div>
        `).join("")},renderPredictionNumberSelector(e){var n;const t=parseInt(((n=document.getElementById("year"))==null?void 0:n.value)||"2026");return DataReader.getAllNumbers(t).map(o=>`<div class="number-item ${o.color}" data-value="${o.value}" onclick="BettingApp.togglePredictionNumber(${e}, '${o.value}')">${o.value} ${o.zodiacName}</div>`).join("")},renderBetItem(e,t,i,n,o=!1){return`
      <div class="bet-item-header">
        <div class="bet-item-title">选号申请 #${e}${o?'<span class="prediction-badge" title="来源于推断">推断</span>':""}</div>
        <button class="btn btn-danger" onclick="BettingApp.removeBetItem(${e})">删除</button>
      </div>
      <div class="form-group">
        <div class="bet-item-label">
          <div>猿份号数字（多选）</div>
          <span class="quick-select-wrap">
            <button type="button" class="quick-select-btn" onclick="BettingApp.toggleQuickPanel(${e})">快捷选择 ▾</button>
            <div class="quick-panel-overlay" id="quick-panel-overlay-${e}" onclick="BettingApp.toggleQuickPanel(${e})"></div>
            <div class="quick-panel" id="quick-panel-${e}">
              <div class="group">
                <div style="font-weight:600;margin-bottom:6px;">属相</div>
                <div class="zodiac-buttons">
                  ${Common.ZODIAC_NAMES.map(s=>`<button type="button" class="quick-select-btn" onclick="BettingApp.quickSelectNumbers(${e}, 'zodiac:${s}')">${s}</button>`).join("")}
                </div>
                <hr />
                <div style="font-weight:600;margin-bottom:6px;">颜色</div>
                <div class="color-buttons">
                  <button type="button" class="quick-select-btn" onclick="BettingApp.quickSelectNumbers(${e}, 'color:red')">RED</button>
                  <button type="button" class="quick-select-btn" onclick="BettingApp.quickSelectNumbers(${e}, 'color:green')">GREEN</button>
                  <button type="button" class="quick-select-btn" onclick="BettingApp.quickSelectNumbers(${e}, 'color:blue')">BLUE</button>
                </div>
                <hr />
                <div style="font-weight:600;margin-bottom:6px;">单双</div>
                <div class="odd-even-buttons">
                  <button type="button" class="quick-select-btn" onclick="BettingApp.quickSelectNumbers(${e}, 'odd')">单数</button>
                  <button type="button" class="quick-select-btn" onclick="BettingApp.quickSelectNumbers(${e}, 'even')">双数</button>
                </div>
              </div>
              <div class="actions">
                <button type="button" class="quick-select-btn" onclick="BettingApp.toggleQuickPanel(${e})">关闭</button>
              </div>
            </div>
          </span>
        
        </div>
        <div class="number-selector ${h.currentView==="zodiac"?"zodiac-view":""}" id="number-selector-${e}">
          ${this.renderNumberSelector(e,i,n)}
        </div>
        <div class="selected-numbers" id="selected-numbers-${e}"></div>
      </div>
      <div class="form-group">
        <label>猿份号分量</label>
        <input type="number" id="bet-amount-${e}" placeholder="请输入分量" min="1" max="99999" step="1" oninput="BettingApp.handleAmountInput(${e})" onblur="BettingApp.validateAmount(${e})" onchange="BettingApp.updateTable()" />
        <div class="error-message" id="error-amount-${e}">请输入1-99999之间的正整数</div>
      </div>
    `},renderBuyerCard(e){return`
      <div class="buyer-badge" aria-hidden="true">${e}</div>
      <div class="buyer-card-header">
        <div class="buyer-card-title">
          <button class="common-collapse" onclick="event.stopPropagation(); BettingApp.toggleBuyerCard(${e})" aria-label="切换折叠"></button>
          <input type="text" class="buyer-name-input" id="buyer-name-${e}" placeholder="请输入参与人姓名" onclick="event.stopPropagation()" onblur="BettingApp.checkDuplicateBuyerName(${e})" oninput="BettingApp.clearBuyerNameError(${e}); BettingApp.updateTable()" />
          <div class="error-message" id="buyer-name-error-${e}"></div>
        </div>
        <div class="buyer-card-header-actions" onclick="event.stopPropagation()">
          <button class="btn btn-primary" data-add-bet="${e}" onclick="BettingApp.addBetItem(${e})">添加选号项</button>
          <button class="btn btn-danger" onclick="BettingApp.removeBuyer(${e})">删除参与人</button>
        </div>
      </div>
      ${this.renderPredictionBlock(e)}
      <div class="buyer-card-content">
        <div id="bet-items-${e}"></div>
        <div id="buyer-summary-${e}" class="buyer-summary buyer-summary-hidden"></div>
      </div>
    `},renderPredictionBlock(e){return`
      <div class="prediction-block" id="prediction-block-${e}">
        <div class="prediction-header">
          <h3 class="prediction-title">预测结果</h3>
          <div class="prediction-header-actions">
            <select class="prediction-forecast-source-select" id="prediction-forecast-source-${e}" title="预测资料来源（用于趋势验证区分）">
              <option value="">选择来源</option>
              ${Common.FORECAST_SOURCE_OPTIONS.map(t=>`<option value="${t.value}"${t.isDefault?" selected":""}>${t.name}</option>`).join("")}
            </select>
            <button class="btn btn-sm prediction-import-btn" onclick="BettingApp.importPredictionData(${e})" title="导入预测资料">导入选项</button>
            <button class="prediction-toggle-btn" onclick="BettingApp.togglePredictionBlock(${e})" id="prediction-toggle-${e}"></button>
          </div>
        </div>
        <div class="prediction-content" id="prediction-content-${e}">
          <!-- 资料选择表单 -->
          <div class="prediction-form">
            <div class="prediction-form-group">
              <label>1. 命中属相（多选）</label>
              <input type="text" class="prediction-quick-input" data-buyer-id="${e}" data-type="zodiac" placeholder="输入十二属相或者别名，失焦后自动勾选" />
              <div class="prediction-number-selector">
                ${Common.ZODIAC_NAMES.map((t,i)=>`<div class="number-item prediction-item" data-type="zodiac" data-value="${t}" id="pred-zodiac-${e}-${i}" onclick="BettingApp.togglePredictionItem(${e}, 'zodiac', '${t}')">${t}</div>`).join("")}
              </div>
            </div>
            
            <div class="prediction-form-group">
              <label>2. 命中颜色（多选）</label>
              <div class="prediction-number-selector">
                <div class="number-item red prediction-item" data-type="color" data-value="red" id="pred-color-${e}-red" onclick="BettingApp.togglePredictionItem(${e}, 'color', 'red')">RED</div>
                <div class="number-item green prediction-item" data-type="color" data-value="green" id="pred-color-${e}-green" onclick="BettingApp.togglePredictionItem(${e}, 'color', 'green')">GREEN</div>
                <div class="number-item blue prediction-item" data-type="color" data-value="blue" id="pred-color-${e}-blue" onclick="BettingApp.togglePredictionItem(${e}, 'color', 'blue')">BLUE</div>
              </div>
            </div>

            <div class="prediction-form-group">
              <label>3. 隐藏颜色组（单选）</label>
              <div class="prediction-number-selector">
                <div class="number-item red prediction-item" data-type="exclude" data-value="red-odd" id="pred-exclude-${e}-red-odd" onclick="BettingApp.togglePredictionItem(${e}, 'exclude', 'red-odd')">RO</div>
                <div class="number-item red prediction-item" data-type="exclude" data-value="red-even" id="pred-exclude-${e}-red-even" onclick="BettingApp.togglePredictionItem(${e}, 'exclude', 'red-even')">RE</div>
                <div class="number-item green prediction-item" data-type="exclude" data-value="green-odd" id="pred-exclude-${e}-green-odd" onclick="BettingApp.togglePredictionItem(${e}, 'exclude', 'green-odd')">GO</div>
                <div class="number-item green prediction-item" data-type="exclude" data-value="green-even" id="pred-exclude-${e}-green-even" onclick="BettingApp.togglePredictionItem(${e}, 'exclude', 'green-even')">GE</div>
                <div class="number-item blue prediction-item" data-type="exclude" data-value="blue-odd" id="pred-exclude-${e}-blue-odd" onclick="BettingApp.togglePredictionItem(${e}, 'exclude', 'blue-odd')">BO</div>
                <div class="number-item blue prediction-item" data-type="exclude" data-value="blue-even" id="pred-exclude-${e}-blue-even" onclick="BettingApp.togglePredictionItem(${e}, 'exclude', 'blue-even')">BE</div>
              </div>
            </div>

            <div class="prediction-form-group">
              <label>4. 命中首位（多选）</label>
              <input type="text" class="prediction-quick-input" data-buyer-id="${e}" data-type="head" placeholder="输入首位 0-4，如 0 1 2，失焦后自动勾选" />
              <div class="prediction-number-selector prediction-head-selector">
                <div class="number-item prediction-item" data-type="head" data-value="0" id="pred-head-${e}-0" onclick="BettingApp.togglePredictionItem(${e}, 'head', '0')">0(1-9)</div>
                <div class="number-item prediction-item" data-type="head" data-value="1" id="pred-head-${e}-1" onclick="BettingApp.togglePredictionItem(${e}, 'head', '1')">1(10-19)</div>
                <div class="number-item prediction-item" data-type="head" data-value="2" id="pred-head-${e}-2" onclick="BettingApp.togglePredictionItem(${e}, 'head', '2')">2(20-29)</div>
                <div class="number-item prediction-item" data-type="head" data-value="3" id="pred-head-${e}-3" onclick="BettingApp.togglePredictionItem(${e}, 'head', '3')">3(30-39)</div>
                <div class="number-item prediction-item" data-type="head" data-value="4" id="pred-head-${e}-4" onclick="BettingApp.togglePredictionItem(${e}, 'head', '4')">4(40-49)</div>
              </div>
            </div>

            <div class="prediction-form-group">
              <label>5. 命中末尾（多选）</label>
              <input type="text" class="prediction-quick-input" data-buyer-id="${e}" data-type="tail" placeholder="输入末尾 0-9，如 1 3 5，失焦后自动勾选" />
              <div class="prediction-number-selector prediction-tail-selector">
                ${[0,1,2,3,4,5,6,7,8,9].map(t=>`<div class="number-item prediction-item" data-type="tail" data-value="${t}" id="pred-tail-${e}-${t}" onclick="BettingApp.togglePredictionItem(${e}, 'tail', '${t}')">${t}</div>`).join("")}
              </div>
            </div>

            <div class="prediction-form-group">
              <label>6. 36猿份号（多选）</label>
              <textarea class="prediction-quick-input prediction-quick-input-special" data-buyer-id="${e}" data-type="special" rows="3" placeholder="粘贴号码如 《18.37.44.25》《24.49.05》 等，失焦后自动勾选"></textarea>
              <div class="special-number-controls">
                <div class="special-number-actions">
                  <button type="button" class="btn btn-sm" onclick="BettingApp.selectAllSpecialNumbers(${e})">全选</button>
                  <button type="button" class="btn btn-sm" onclick="BettingApp.deselectAllSpecialNumbers(${e})">全不选</button>
                  <button type="button" class="btn btn-sm" onclick="BettingApp.invertSpecialNumbers(${e})">反选</button>
                </div>
                <div class="number-selector" id="pred-special-selector-${e}">
                  ${B.renderPredictionNumberSelector(e)}
                </div>
              </div>
            </div>

            <div class="prediction-form-group">
              <label>推断条件优先级设置（用于第二梯队和第三梯队交集计算）</label>
              <div class="condition-priority">
                <div class="priority-item">
                  <label class="priority-label">第二梯队舍去：</label>
                  <div class="prediction-number-selector priority-selector">
                    <div class="number-item prediction-item" data-type="priority5" data-value="zodiac" id="pred-priority-5-${e}-zodiac" onclick="BettingApp.togglePredictionItem(${e}, 'priority5', 'zodiac')">命中属相</div>
                    <div class="number-item prediction-item" data-type="priority5" data-value="color" id="pred-priority-5-${e}-color" onclick="BettingApp.togglePredictionItem(${e}, 'priority5', 'color')">命中颜色</div>
                    <div class="number-item prediction-item" data-type="priority5" data-value="exclude" id="pred-priority-5-${e}-exclude" onclick="BettingApp.togglePredictionItem(${e}, 'priority5', 'exclude')">隐藏颜色组</div>
                    <div class="number-item prediction-item" data-type="priority5" data-value="head" id="pred-priority-5-${e}-head" onclick="BettingApp.togglePredictionItem(${e}, 'priority5', 'head')">命中首位</div>
                    <div class="number-item prediction-item" data-type="priority5" data-value="tail" id="pred-priority-5-${e}-tail" onclick="BettingApp.togglePredictionItem(${e}, 'priority5', 'tail')">命中末尾</div>
                    <div class="number-item prediction-item" data-type="priority5" data-value="special" id="pred-priority-5-${e}-special" onclick="BettingApp.togglePredictionItem(${e}, 'priority5', 'special')">36猿份号</div>
                  </div>
                </div>
                <div class="priority-item">
                  <label class="priority-label">第三梯队舍去：</label>
                  <div class="prediction-number-selector priority-selector">
                    <div class="number-item prediction-item" data-type="priority4" data-value="zodiac" id="pred-priority-4-${e}-zodiac" onclick="BettingApp.togglePredictionItem(${e}, 'priority4', 'zodiac')">命中属相</div>
                    <div class="number-item prediction-item" data-type="priority4" data-value="color" id="pred-priority-4-${e}-color" onclick="BettingApp.togglePredictionItem(${e}, 'priority4', 'color')">命中颜色</div>
                    <div class="number-item prediction-item" data-type="priority4" data-value="exclude" id="pred-priority-4-${e}-exclude" onclick="BettingApp.togglePredictionItem(${e}, 'priority4', 'exclude')">隐藏颜色组</div>
                    <div class="number-item prediction-item" data-type="priority4" data-value="head" id="pred-priority-4-${e}-head" onclick="BettingApp.togglePredictionItem(${e}, 'priority4', 'head')">命中首位</div>
                    <div class="number-item prediction-item" data-type="priority4" data-value="tail" id="pred-priority-4-${e}-tail" onclick="BettingApp.togglePredictionItem(${e}, 'priority4', 'tail')">命中末尾</div>
                    <div class="number-item prediction-item" data-type="priority4" data-value="special" id="pred-priority-4-${e}-special" onclick="BettingApp.togglePredictionItem(${e}, 'priority4', 'special')">36猿份号</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="prediction-actions">
              <button class="copy-btn" id="prediction-copy-btn-${e}" onclick="BettingApp.copyPredictionData(${e}, event)" title="复制预测资料" disabled>复制选项</button>
              <button class="btn btn-primary" id="prediction-confirm-btn-${e}" onclick="BettingApp.confirmPrediction(${e})" disabled>确定推算</button>
            </div>
          </div>

          <!-- 预测结果展示 -->
          <div class="prediction-results hidden" id="prediction-results-${e}">
            <div class="prediction-results-header">
              <h4 class="prediction-results-title">推断结果（仅供参考）</h4>
            </div>
            <div class="prediction-result-section">
              <div class="result-section-title">
                <span>第一梯队（6 ∩ 6）</span>
                <span class="result-count" id="result-count-1-${e}"></span>
                <button class="btn btn-sm add-to-bet-btn" onclick="BettingApp.addTierToBetting(${e}, 'tier1')" title="加入选号">加入选号</button>
              </div>
              <div class="number-selector result-number-selector" id="result-tier1-${e}">
                <span class="empty-state-text">待计算</span>
              </div>
            </div>
            <div class="prediction-result-section">
              <div class="result-section-title">
                <span>第二梯队（5 ∩ 6）</span>
                <span class="result-count" id="result-count-2-${e}"></span>
                <button class="btn btn-sm add-to-bet-btn" onclick="BettingApp.addTierToBetting(${e}, 'tier2')" title="加入选号">加入选号</button>
              </div>
              <div class="number-selector result-number-selector" id="result-tier2-${e}">
                <span class="empty-state-text">待计算</span>
              </div>
            </div>
            <div class="prediction-result-section">
              <div class="result-section-title">
                <span>第三梯队（4 ∩ 6）</span>
                <span class="result-count" id="result-count-3-${e}"></span>
                <button class="btn btn-sm add-to-bet-btn" onclick="BettingApp.addTierToBetting(${e}, 'tier3')" title="加入选号">加入选号</button>
              </div>
              <div class="number-selector result-number-selector" id="result-tier3-${e}">
                <span class="empty-state-text">待计算</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `},renderBuyerSummary(e,t,i,n=null,o=!1){if(i.topThreeDetails.length===0)return`
        <div class="buyer-summary">
          <div class="buyer-summary-item highlight">
            <span>总选号分量：</span>
            <span>${i.totalBet.toFixed(2)} 星</span>
          </div>
        </div>
      `;const r=o?t.records.filter(c=>!c.fromPrediction):t.records;let s=`
      <div class="summary-header">
        <h3>${e} 选号汇总</h3>
        <div class="summary-header-actions">
          <label class="filter-prediction-checkbox">
            <input type="checkbox" id="filter-prediction-global-${t.buyerId}" ${o?"checked":""} onchange="BettingApp.toggleFilterPredictionGlobal('${t.buyerId}')">
            <span>隐藏推断选号</span>
          </label>
          <button class="summary-toggle-btn" onclick="BettingApp.toggleSummaryTopThree('${t.buyerId}')" id="summary-toggle-${t.buyerId}"></button>
        </div>
      </div>
      <table class="table-margin-bottom">
        <thead>
          <tr>
            <th>选号申请序号</th>
            <th>区域</th>
            <th>年份</th>
            <th>回数</th>
            <th>猿份号数字</th>
            <th>一格价值</th>
            <th>个数</th>
            <th>小计</th>
          </tr>
        </thead>
        <tbody>
    `;return r.forEach(c=>{const a=c.id,l=c.fromPrediction||!1;let d="";if(l){const m=c.predictionTier||"",u=m==="1"?"一":m==="2"?"二":m==="3"?"三":"",p=u?`(${u})`:"";d=`<span class="prediction-badge" title="来源于${u||"推断"}推断">推断${p}</span>`}s+=`
        <tr>
          <td>#${a}${d}</td>
          <td>${this.getRegionName(c.region)}</td>
          <td>${c.year}</td>
          <td>${c.period||"-"}</td>
          <td>${c.numbers.join(", ")}</td>
          <td>${c.amount.toFixed(2)}</td>
          <td>${c.numbers.length}</td>
          <td>${c.total.toFixed(2)}</td>
        </tr>
      `}),s+=`
      <tr class="table-total-row">
        <td colspan="7" class="table-total-cell">
          <div class="summary-total-row">
            <button class="copy-btn" onclick="BettingApp.copyBettingData('${t.buyerId}', event)" title="复制选号数据">复制</button>
            <span>总选号分量：</span>
          </div>
        </td>
        <td>${i.totalBet.toFixed(2)}</td>
      </tr>
    `,s+="</tbody></table>",s+=`<div class="summary-top-three" id="summary-top-three-${t.buyerId}">`,i.topThreeDetails.forEach((c,a)=>{s+=`
        <div class="top-numbers top-numbers-margin" id="top-number-${t.buyerId}-${a}">
          <div class="top-number-title">
            第${a+1}名：数字 ${c.number}
          </div>
          <div class="top-number-item">
            <span class="top-number-label">选号次数：</span>
            <span class="top-number-value">${c.betCount} 次</span>
          </div>
          <div class="top-number-item">
            <span class="top-number-label">选号分量：</span>
            <span class="top-number-value">${c.betAmount.toFixed(2)} 星</span>
          </div>
          <div class="top-number-item">
            <span class="top-number-label">猿份达成分量：</span>
            <span class="top-number-value top-number-winning">${c.winningAmount.toFixed(2)} 星</span>
          </div>
          <div class="buyer-summary buyer-summary-margin">
            <div class="buyer-summary-item highlight">
              <span>最大猿份达成分量：</span>
              <span>${c.winningAmount.toFixed(2)} 星</span>
            </div>
            <div class="buyer-summary-item highlight">
              <span>总选号分量：</span>
              <span>${c.totalBet.toFixed(2)} 星</span>
            </div>
            <div class="buyer-summary-item ${c.profit>=0?"profit":"loss"}">
              <span>可能增加猿份值/猿份值下降：</span>
              <span>${c.profit>=0?"+":""}${c.profit.toFixed(2)} 星</span>
            </div>
          </div>
        </div>
      `}),s+="</div>",s},getRegionName(e){return typeof Common<"u"&&Common.getRegionName?Common.getRegionName(e):e==="macau"?"MO":e}},k={currentDimension:"buyer",currentSort:"number",quickSelectState:{},init(){const e=document.getElementById("betting-apply-form"),t=typeof Auth<"u"&&Auth.hasFormToken&&Auth.hasFormToken();if(e&&!t){const r=document.createElement("div");r.className="apply-login-hint",r.innerHTML='<p class="apply-login-hint-text">如需提交选号，需登录。</p><a href="../login/index.html" class="">去登录</a>',e.parentNode.insertBefore(r,e)}this.initYearSelect(),this.initPeriodSelect(),this.updateTable(),document.getElementById("region").addEventListener("change",()=>this.updateTable()),document.getElementById("year").addEventListener("change",()=>{this.updateAllNumberSelectors(),this.updateAllPredictionNumberSelectors(),this.updateTable()}),document.getElementById("period").addEventListener("change",()=>this.updateTable()),document.addEventListener("click",r=>{const s=r.target;s.closest&&(s.closest(".quick-panel")||s.closest(".quick-select-btn"))||document.querySelectorAll(".quick-panel.show").forEach(c=>c.classList.remove("show"))});const i=h.currentView,n=document.getElementById("view-ascending"),o=document.getElementById("view-zodiac");n&&o&&(n.classList.toggle("active",i==="ascending"),o.classList.toggle("active",i==="zodiac")),this.addBuyer(),document.addEventListener("blur",r=>{const s=r.target;if(!s.classList||!s.classList.contains("prediction-quick-input"))return;const c=s.getAttribute("data-buyer-id"),a=s.getAttribute("data-type");c!=null&&(a==="special"?this.applyPredictionSpecialInput(c,s.value):this.applyPredictionQuickInput(c,a,s.value))},!0)},switchDimension(e){this.currentDimension=e,document.getElementById("dimension-buyer").classList.toggle("active",e==="buyer"),document.getElementById("dimension-number").classList.toggle("active",e==="number");const t=this.collectBetRecords(),i={};t.forEach(n=>{const o=`${n.buyerId}_${n.buyerName}`;i[o]||(i[o]={buyerId:n.buyerId,buyerName:n.buyerName,records:[]}),i[o].records.push(n)}),this.updateTotalSummary(i)},switchView(e){h.currentView=e,StorageManager.set("currentView",e),document.getElementById("view-ascending").classList.toggle("active",e==="ascending"),document.getElementById("view-zodiac").classList.toggle("active",e==="zodiac"),this.updateAllNumberSelectors()},switchSort(e){this.currentSort=e,document.getElementById("sort-number").classList.toggle("active",e==="number"),document.getElementById("sort-winning").classList.toggle("active",e==="winningAmount");const t=this.collectBetRecords(),i={};t.forEach(n=>{const o=`${n.buyerId}_${n.buyerName}`;i[o]||(i[o]={buyerId:n.buyerId,buyerName:n.buyerName,records:[]}),i[o].records.push(n)}),this.updateTotalSummary(i)},initYearSelect(){const e=document.getElementById("year");if(!e||typeof DataReader>"u"||!DataReader.generateYearOptions)return;const t=DataReader.generateYearOptions(),i="2026";e.innerHTML=t.map(n=>`<option value="${n.value}" ${n.value===i?"selected":""}>${n.label}</option>`).join("")},initPeriodSelect(){const e=document.getElementById("period"),t=DataReader.generatePeriodOptions();e.innerHTML=t.map(i=>`<option value="${i}" ${i==="001"?"selected":""}>${i}回</option>`).join("")},addBuyer(){h.buyerId++;const e=h.buyerId,t=document.createElement("div");t.className="buyer-card",t.id=`buyer-${e}`,t.innerHTML=B.renderBuyerCard(e),document.getElementById("buyerList").appendChild(t),this.updatePredictionConfirmButton(e);const i=document.getElementById(`prediction-forecast-source-${e}`);i&&i.addEventListener("change",()=>this.updatePredictionConfirmButton(e));const n=document.getElementById(`buyer-name-${e}`);n&&n.addEventListener("blur",()=>{const o=n.value.trim();o&&this.loadPredictionDataForBuyer(e,o)}),this.addBetItem(e),this.updateAddButtonState(e)},removeBuyer(e){const t=document.getElementById(`buyer-${e}`);if(!t)return;const i=document.getElementById(`buyer-name-${e}`).value.trim()||"该参与人";confirm(`确定要删除"${i}"的所有选号申请吗？此操作不可恢复。`)&&(t.remove(),this.updateTable())},toggleBuyerCard(e){const t=document.getElementById(`buyer-${e}`),i=t.classList.contains("collapsed");if(t.classList.toggle("collapsed"),this.updateAddButtonState(e),document.getElementById(`prediction-block-${e}`)){const o=document.getElementById(`prediction-content-${e}`);if(o&&!i){o.classList.add("collapsed");const r=document.getElementById(`prediction-toggle-${e}`);r&&r.classList.add("collapsed")}}},updateAddButtonState(e){const t=document.getElementById(`buyer-${e}`);if(!t)return;const i=t.querySelector(`button[data-add-bet="${e}"]`);if(!i)return;const n=t.classList.contains("collapsed");i.disabled=n},checkDuplicateBuyerName(e){const t=document.getElementById(`buyer-name-${e}`);if(!t)return;const i=t.value.trim(),n=document.getElementById(`buyer-name-error-${e}`);if(!i){n&&(n.textContent="",n.classList.remove("show"));return}this.loadPredictionDataForBuyer(e,i),Array.from(document.querySelectorAll(".buyer-name-input")).some(s=>s.id!==t.id&&s.value.trim()===i)?n?(n.textContent="已存在相同参与人姓名",n.classList.add("show")):alert("已存在相同参与人姓名"):n&&(n.textContent="",n.classList.remove("show"))},clearBuyerNameError(e){const t=document.getElementById(`buyer-name-error-${e}`);t&&(t.textContent="",t.classList.remove("show"))},toggleSummaryTopThree(e){const t=document.getElementById(`summary-top-three-${e}`),i=document.getElementById(`summary-toggle-${e}`);!t||!i||(t.classList.toggle("collapsed"),i.classList.toggle("collapsed"))},toggleCollapse(e,t){const i=document.getElementById(e),n=document.getElementById(t);!i||!n||(i.classList.toggle("collapsed"),n.classList.toggle("collapsed"))},toggleQuickPanel(e){const t=document.getElementById(`quick-panel-${e}`),i=document.getElementById(`quick-panel-overlay-${e}`);if(!t)return;t.classList.contains("show")?(t.classList.remove("show"),i&&i.classList.remove("show")):(t.classList.add("show"),i&&i.classList.add("show"))},quickSelectNumbers(e,t){const i=this.getNumbersForCriterion(e,t);let n=!0;const o=[];i.forEach(s=>{const c=document.querySelector(`#number-selector-${e} .number-item[data-value="${s}"]`);c&&(o.push(c),c.classList.contains("selected")||(n=!1))});const r=!n;o.forEach(s=>{r?s.classList.contains("selected")||(s.classList.add("selected"),s.dataset.manual="1"):(s.classList.remove("selected"),s.dataset.manual="0")}),this.updateSelectedNumbers(e),this.updateTable()},getNumbersForCriterion(e,t){const i=parseInt(document.getElementById("year").value);if(t.startsWith("zodiac:")){const n=t.split(":")[1];return DataReader.getNumbersByZodiacName(i,n)}if(t.startsWith("color:")){const n=t.split(":")[1];return DataReader.getNumbersByColor(i,n)}return t==="odd"?DataReader.getNumbersByOddEven(i,!0):t==="even"?DataReader.getNumbersByOddEven(i,!1):[]},copyBettingData(e,t){const n=this.collectBetRecords().filter(c=>c.buyerId===e);if(n.length===0){alert("没有可复制的选号申请");return}const o=n.map(c=>{const a=c.numbers.join(","),l=c.amount%1===0?c.amount.toString():c.amount.toFixed(2);return`${a}*${l}`}).join(`
`),r=t?t.target:document.querySelector(`button[onclick*="copyBettingData('${e}')"]`);(c=>{if(navigator.clipboard&&navigator.clipboard.writeText)return navigator.clipboard.writeText(c);{const a=document.createElement("textarea");a.value=c,a.style.position="fixed",a.style.opacity="0",a.style.left="-9999px",document.body.appendChild(a),a.select();try{return document.execCommand("copy"),document.body.removeChild(a),Promise.resolve()}catch(l){return document.body.removeChild(a),Promise.reject(l)}}})(o).then(()=>{if(r){const c=r.textContent;r.textContent="已复制",r.style.background="#27ae60",r.style.color="white",r.style.borderColor="#27ae60",setTimeout(()=>{r.textContent=c,r.style.background="white",r.style.color="#666",r.style.borderColor="#ddd"},2e3)}}).catch(c=>{console.error("复制失败:",c),alert("复制失败，请手动复制")})},buildBettingUniqueId(e,t,i,n,o){const r=(o||"").replace(/[\s|]/g,"_").slice(0,50);return[e,t,i,n,r].join("_").toLocaleLowerCase()},buildSubmitDataFromRecords(e,t,i,n){const o={};return n.forEach(r=>{const s=`${r.buyerId}_${r.buyerName}`;o[s]||(o[s]={buyerId:r.buyerId,buyerName:r.buyerName,betItems:[]}),o[s].betItems.push({numbers:r.numbers,amount:r.amount,total:r.total,fromPrediction:r.fromPrediction,predictionTier:r.predictionTier})}),{basicInfo:{region:e,regionName:B.getRegionName(e),year:t,period:i},buyers:Object.values(o).map(r=>{const s=n.filter(a=>a.buyerId===r.buyerId),c=h.calculateWinningsFromRecords(s);return{buyerId:r.buyerId,buyerName:r.buyerName,betItems:r.betItems,summary:{totalBet:c.totalBet,topThreeDetails:c.topThreeDetails}}})}},saveBettingToLocalStorage(e,t){e.buyers.forEach(i=>{if(i.buyerName){const n={basicInfo:e.basicInfo,buyer:i};StorageManager.saveBettingData(i.buyerName,t,n),console.log(`选号数据已保存: ${i.buyerName} - ${t}`)}})},getPredictionForPayload(e,t){const i=StorageManager.getPredictionData(e,t);return!i||!i.predictionData&&!i.results?null:{predictionData:i.predictionData,results:i.results,materialId:i.materialId||null,materialLabels:this.MATERIAL_LABELS,forecastSource:i.forecastSource||null}},buildPayloadForBuyer(e,t,i,n,o,r){const s=this.buildBettingUniqueId(n,o,r,i,e.buyerName),c=this.getPredictionForPayload(e.buyerName,i);return{uniqueId:s,buyerName:e.buyerName,date:i,basicInfo:t.basicInfo,betting:{buyerId:e.buyerId,betItems:e.betItems,summary:e.summary},prediction:c}},submitBetting(e,t,i,n,o,r){const s=typeof window<"u"?window.SupabaseDb:null;return s?s.ready().then(()=>{if(!s.getClient()){alert("Supabase 未配置，无法提交。请在 supabase-config.js 中填写 SUPABASE_URL 与 SUPABASE_ANON_KEY。");return}const c=t.buyers.filter(a=>a.buyerName).map(a=>{const l=this.buildPayloadForBuyer(a,t,r,i,n,o),d=JSON.stringify(l);return s.insertSubmission(e,{unique_id:l.uniqueId,buyer_name:l.buyerName,date:l.date,payload:d})});return Promise.all(c).then(a=>{const l=a.filter(d=>d&&d.error);l.length===0?(alert("选号已提交"),document.querySelectorAll(".buyer-name-input").forEach(d=>{d.value=""}),this.updateTable()):(console.error("Supabase 提交部分失败",l),alert("部分提交失败，请查看控制台。本地已保存。"))}).catch(a=>{console.error("Supabase 提交失败",a),alert("提交到服务器失败："+(a.message||"网络错误")+"。本地已保存。")})}):Promise.resolve()},submitData(){const e=typeof Auth<"u"?Auth.getFormToken():null;if(!e){alert("请先到登录页填写 FORM TOKEN 后再提交选号。");return}const t=document.getElementById("region"),i=document.getElementById("year"),n=document.getElementById("period");if(!t||!i||!n)return;const o=t.value,r=parseInt(i.value,10),s=(n.value||"").trim(),c=this.collectBetRecords();if(!c||c.length===0){alert("暂无选号数据，请先选择猿份号并填写分量。");return}const a=this.buildSubmitDataFromRecords(o,r,s,c);if(!confirm("确定要提交选号数据吗？提交后将保存到服务器。"))return;console.log("提交的选号数据：",JSON.stringify(a,null,2)),console.log("提交的选号数据（对象）：",a);const l=StorageManager.getCurrentDate();this.saveBettingToLocalStorage(a,l),this.submitBetting(e,a,o,r,s,l)},handleAmountInput(e){const t=document.getElementById(`bet-amount-${e}`);if(!t)return;const i=t.value;i&&!/^\d+$/.test(i)&&(t.value=i.replace(/\D/g,""));const n=parseInt(t.value,10);!isNaN(n)&&n>99999&&(t.value="99999")},validateAmount(e){const t=document.getElementById(`bet-amount-${e}`),i=document.getElementById(`error-amount-${e}`);if(!t||!i)return;const n=t.value.trim();if(t.classList.remove("error"),i.classList.remove("show"),n==="")return;const o=parseInt(n,10);return isNaN(o)||o<=0||o>=1e5||o!==parseFloat(n)?(t.classList.add("error"),i.classList.add("show"),!1):(this.updateTable(),!0)},addBetItem(e){h.betItemId++;const t=h.betItemId,i=parseInt(document.getElementById("year").value),n=DataReader.getAllNumbers(i),o=document.createElement("div");o.className="bet-item",o.id=`bet-item-${t}`,o.dataset.buyerId=e,o.innerHTML=B.renderBetItem(t,e,n,i),document.getElementById(`bet-items-${e}`).prepend(o),o.classList.add("bet-item-new"),setTimeout(()=>{o.classList.remove("bet-item-new")},2e3),this.updateEmptyState(e)},removeBetItem(e){const t=document.getElementById(`bet-item-${e}`);if(t){const i=t.dataset.buyerId,n=t.querySelectorAll(".number-item.selected").length>0,o=document.getElementById(`bet-amount-${e}`),r=o&&parseFloat(o.value)||0;if((n||r>0)&&!window.confirm("检测到该选号项包含已选择的猿份号或已填写分量，确定要删除吗？"))return;t.remove(),this.updateEmptyState(i),this.updateTable()}},updateEmptyState(e){const t=document.getElementById(`bet-items-${e}`);if(!t)return;const i=t.querySelectorAll(".bet-item").length>0,n=`bet-items-empty-${e}`;let o=document.getElementById(n);i?o&&o.remove():o||(o=document.createElement("div"),o.id=n,o.className="bet-items-empty",o.textContent="暂无选号申请，点击“添加选号”开始。",t.appendChild(o))},toggleNumber(e,t){const i=document.querySelector(`#number-selector-${e} .number-item[data-value="${t}"]`),n=i.classList.contains("selected");i.classList.toggle("selected"),arguments[2]==="manual"&&(n?delete i.dataset.manual:i.dataset.manual="1"),this.updateSelectedNumbers(e),this.updateTable()},updateSelectedNumbers(e){const t=document.querySelectorAll(`#number-selector-${e} .number-item.selected`),i=Array.from(t).map(o=>o.dataset.value),n=document.getElementById(`selected-numbers-${e}`);i.length===0?n.innerHTML='<span class="empty-state-text">未选择任何数字</span>':n.innerHTML=i.map(o=>`<span class="selected-number-tag">${o}</span>`).join("")},updateAllNumberSelectors(){const e=parseInt(document.getElementById("year").value),t=DataReader.getAllNumbers(e);document.querySelectorAll(".bet-item").forEach(n=>{const o=n.id.split("-")[2],r=document.getElementById(`number-selector-${o}`);if(r){const s=Array.from(r.querySelectorAll(".number-item.selected")).map(c=>c.dataset.value);h.currentView==="zodiac"?r.classList.add("zodiac-view"):r.classList.remove("zodiac-view"),r.innerHTML=B.renderNumberSelector(o,t,e),s.forEach(c=>{const a=r.querySelector(`.number-item[data-value="${c}"]`);a&&(a.classList.add("selected"),a.dataset.manual="1")}),this.updateSelectedNumbers(o)}})},updateAllPredictionNumberSelectors(){parseInt(document.getElementById("year").value),document.querySelectorAll(".buyer-card").forEach(t=>{const i=t.id.split("-")[1],n=document.getElementById(`pred-special-selector-${i}`);if(n){const o=Array.from(n.querySelectorAll(".number-item.selected")).map(r=>r.dataset.value);n.innerHTML=B.renderPredictionNumberSelector(i),o.forEach(r=>{const s=n.querySelector(`.number-item[data-value="${r}"]`);s&&s.classList.add("selected")})}})},collectBetRecords(){const e=[],t=document.getElementById("region"),i=document.getElementById("year"),n=document.getElementById("period");if(!t||!i||!n)return e;const o=t.value,r=parseInt(i.value,10),s=(n.value||"").trim();return document.querySelectorAll(".buyer-card").forEach(a=>{const d=(a.id||"").split("-")[1];if(d==null)return;const m=document.getElementById(`buyer-name-${d}`),u=m&&m.value?String(m.value).trim():"";if(!u)return;a.querySelectorAll(".bet-item").forEach(g=>{const f=(g.id||"").split("-")[2];if(f==null)return;const b=document.getElementById(`bet-amount-${f}`);if(!b)return;const S=g.querySelectorAll(".number-item.selected"),y=Array.from(S).map(E=>E.dataset.value).filter(Boolean),$=parseFloat(b.value,10)||0;if(y.length>0&&$>0){const E=g.dataset.fromPrediction==="true",A=g.dataset.predictionTier||null;e.push({id:f,buyerId:d,buyerName:u,region:o,year:r,fromPrediction:E,predictionTier:A,period:s,numbers:y,amount:$,total:y.length*$})}})}),e},updateSubmitButtonState(){const e=document.querySelector(".submit-btn");if(!e)return;const t=this.collectBetRecords();e.disabled=t.length===0},updateTable(){const e=this.collectBetRecords(),t={};e.forEach(n=>{const o=`${n.buyerId}_${n.buyerName}`;t[o]||(t[o]={buyerId:n.buyerId,buyerName:n.buyerName,region:n.region,year:n.year,period:n.period,records:[]}),t[o].records.push(n)}),document.querySelectorAll(".buyer-card").forEach(n=>{const o=n.id.split("-")[1],r=document.getElementById(`buyer-summary-${o}`);if(!r)return;const s=document.getElementById(`summary-top-three-${o}`);document.getElementById(`summary-toggle-${o}`);const c=s&&s.classList.contains("collapsed"),a=Object.keys(t).find(u=>{const p=t[u];return p&&p.buyerId===o});if(!a||t[a].records.length===0){r.classList.add("buyer-summary-hidden");return}const l=t[a],d=l.records,m=h.calculateWinningsFromRecords(d,!1);if(r.innerHTML=B.renderBuyerSummary(l.buyerName,l,m,d,!1),r.classList.remove("buyer-summary-hidden"),c){const u=document.getElementById(`summary-top-three-${o}`),p=document.getElementById(`summary-toggle-${o}`);u&&p&&(u.classList.add("collapsed"),p.classList.add("collapsed"))}}),this.updateTotalSummary(t),this.updateSubmitButtonState()},updateTotalSummary(e){const t=document.getElementById("totalSummary"),i=document.getElementById("totalSummaryContent");if(!t||!i)return;const n=Object.values(e);if(n.length===0){t.classList.remove("show");return}this.currentDimension==="buyer"?this.renderBuyerDimension(n,i):this.renderNumberDimension(n,i),t.classList.add("show")},renderBuyerDimension(e,t){const i=[];let n=0;e.forEach(r=>{const s=r.records,c=r.buyerName||"未命名";let a=0;s.forEach(m=>{a+=m.total});const l={};s.forEach(m=>{m.numbers.forEach(u=>{l[u]||(l[u]={number:u,amount:m.amount,betCount:0,numberBetAmount:0,winningAmount:0,profit:0}),l[u].betCount+=1,l[u].numberBetAmount+=m.amount})});const d=Object.values(l).map(m=>(m.winningAmount=m.numberBetAmount*h.WIN_AMOUNT_PER_NUMBER,m.profit=m.winningAmount-a,m));d.sort((m,u)=>{const p=parseInt(m.number),g=parseInt(u.number);return p-g}),i.push({buyerName:c,buyerTotalCost:a,numbers:d}),n+=a}),i.sort((r,s)=>r.buyerName.localeCompare(s.buyerName));let o=`<div class="summary-top-three" id="total-summary-table">
        <table class="table-margin-bottom">
          <thead>
            <tr>
              <th>参与人</th>
              <th>猿份号数字</th>
              <th>选号分量</th>
              <th>个数</th>
              <th>分量总成本</th>
              <th>猿份达成分量</th>
              <th>赚取分量</th>
            </tr>
          </thead>
          <tbody>
    `;i.forEach(r=>{r.numbers.forEach(s=>{o+=`
          <tr>
            <td>${r.buyerName}</td>
            <td>${s.number}</td>
            <td>${s.numberBetAmount.toFixed(2)}</td>
            <td>${s.betCount}</td>
            <td>${r.buyerTotalCost.toFixed(2)}</td>
            <td>${s.winningAmount.toFixed(2)}</td>
            <td class="${s.profit>=0?"table-amount-cell":"table-loss-amount"}">${s.profit>=0?"+":""}${s.profit.toFixed(2)}</td>
          </tr>
        `})}),o+=`
          </tbody>
          <tfoot>
            <tr class="table-total-row">
              <td colspan="4">合计：</td>
              <td>${n.toFixed(2)}</td>
              <td colspan="2"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    `,t.innerHTML=o},renderNumberDimension(e,t){const i={};let n=0;e.forEach(s=>{s.records.forEach(a=>{a.numbers.forEach(l=>{i[l]||(i[l]={number:l,totalBetAmount:0,betCount:0,winningAmount:0}),i[l].totalBetAmount+=a.amount,i[l].betCount+=1,n+=a.amount})})}),Object.values(i).forEach(s=>{s.winningAmount=s.totalBetAmount*h.WIN_AMOUNT_PER_NUMBER});let o=Object.values(i);this.currentSort==="number"?o.sort((s,c)=>{const a=parseInt(s.number),l=parseInt(c.number);return a-l}):o.sort((s,c)=>c.winningAmount-s.winningAmount);let r=`<div class="summary-top-three" id="total-summary-table">
        <div class="sort-controls" style="margin-bottom: 10px;">
          <span>排序：</span>
          <button class="sort-btn ${this.currentSort==="number"?"active":""}" onclick="BettingApp.switchSort('number')" id="sort-number">猿份号数字</button>
          <button class="sort-btn ${this.currentSort==="winningAmount"?"active":""}" onclick="BettingApp.switchSort('winningAmount')" id="sort-winning">猿份达成分量</button>
        </div>
        <table class="table-margin-bottom">
          <thead>
            <tr>
              <th>猿份号数字</th>
              <th>选号分量</th>
              <th>个数</th>
              <th>猿份达成分量</th>
            </tr>
          </thead>
          <tbody>
    `;o.forEach(s=>{r+=`
        <tr>
          <td>${s.number}</td>
          <td>${s.totalBetAmount.toFixed(2)}</td>
          <td>${s.betCount}</td>
          <td>${s.winningAmount.toFixed(2)}</td>
        </tr>
      `}),o.reduce((s,c)=>s+c.winningAmount,0),r+=`
          </tbody>
        </table>
      </div>
    `,t.innerHTML=r},MATERIAL_LABELS:["命中属相","命中颜色","隐藏","命中首位","命中末尾","36猿份号"],generateMaterialId(e,t,i,n,o){if(typeof md5!="function"||!e)return null;const r=typeof Common<"u"&&Common.buildMaterialIdKey?Common.buildMaterialIdKey(e,t,i,n,o):null;return r?md5(r):null},togglePredictionBlock(e){const t=document.getElementById(`prediction-content-${e}`),i=document.getElementById(`prediction-toggle-${e}`);!t||!i||(t.classList.toggle("collapsed"),i.classList.toggle("collapsed"))},confirmPrediction(e){const t=this.collectPredictionData(e);console.log(`[参与人${e}] 预测资料:`,JSON.stringify(t,null,2));const i=this.calculatePredictionResults(e,t);this.displayPredictionResults(e,i);const n=document.getElementById(`prediction-results-${e}`);n&&n.classList.remove("hidden");const o=document.getElementById(`prediction-copy-btn-${e}`);o&&(o.disabled=!1);const r=document.getElementById(`buyer-name-${e}`),s=r?r.value.trim():"",c=document.getElementById(`prediction-forecast-source-${e}`),a=c?String(c.value||"").trim():"";if(s){const l=StorageManager.getCurrentDate(),d=document.getElementById("region"),m=document.getElementById("year"),u=document.getElementById("period"),p=d?d.value:"",g=m?m.value:"",v=u?u.value:"",f=this.generateMaterialId(t,p,g,l,v);StorageManager.savePredictionData(s,l,t,i,f,a||null),console.log(`预测数据已保存: ${s} - ${l}`,"materialId",f,"forecastSource",a||"(空)")}},applyPredictionQuickInput(e,t,i){if(!i||typeof i!="string")return;const n=typeof Common<"u"&&Common.normalizePredictionInput?Common.normalizePredictionInput(i):i.replace(/[\s,，、]+/g," ").trim(),o=n?n.split(/\s+/).filter(Boolean):[];let r;if(t==="zodiac"){const a=typeof Common<"u"&&Common.ZODIAC_NAMES||[],l=typeof DataReader<"u"&&DataReader.getZodiacDisplay?DataReader.getZodiacDisplay():{},d=[];o.forEach(m=>{if(a.includes(m)){d.push(m);return}let u=m;for(;u.length>0;){let p=!1;for(let g=0;g<a.length;g++){const v=a[g];if(u.indexOf(v)===0){d.push(v),u=u.slice(v.length),p=!0;break}}if(!p&&u.length>0){const g=u.charAt(0);d.push(l[g]!=null?l[g]:g),u=u.slice(1)}}}),r=new Set(d)}else if(t==="head"||t==="tail"){const a=[];o.forEach(l=>{l.replace(/\D/g,"").split("").forEach(m=>a.push(m))}),r=new Set(a.filter(l=>/^\d$/.test(l))),t==="head"&&(r=new Set([...r].filter(l=>l>="0"&&l<="4"))),t==="tail"&&(r=new Set([...r].filter(l=>l>="0"&&l<="9")))}else return;const s=document.getElementById(`prediction-block-${e}`);if(!s)return;s.querySelectorAll(`.prediction-item[data-type="${t}"]`).forEach(a=>{const l=a.dataset.value;r.has(l)?a.classList.add("selected"):a.classList.remove("selected")}),this.updatePredictionConfirmButton(e)},applyPredictionSpecialInput(e,t){const i=typeof Common<"u"&&Common.parseSpecialNumbersInput?Common.parseSpecialNumbersInput(t):[],n=new Set(i),o=document.getElementById(`pred-special-selector-${e}`);o&&(o.querySelectorAll(".number-item").forEach(r=>{const s=r.dataset.value;n.has(s)?r.classList.add("selected"):r.classList.remove("selected")}),this.updatePredictionConfirmButton(e))},togglePredictionItem(e,t,i){const n=document.querySelector(`#prediction-block-${e} .prediction-item[data-type="${t}"][data-value="${i}"]`);n&&(n.classList.toggle("selected"),this.updatePredictionConfirmButton(e))},togglePredictionNumber(e,t){const i=document.querySelector(`#pred-special-selector-${e} .number-item[data-value="${t}"]`);i&&(i.classList.toggle("selected"),this.updatePredictionConfirmButton(e))},collectPredictionData(e){const t=document.querySelectorAll(`#prediction-block-${e} .prediction-item[data-type="zodiac"].selected`),i=Array.from(t).map(b=>b.dataset.value),n=document.querySelectorAll(`#prediction-block-${e} .prediction-item[data-type="color"].selected`),o=Array.from(n).map(b=>b.dataset.value),r=document.querySelectorAll(`#prediction-block-${e} .prediction-item[data-type="exclude"].selected`),s=Array.from(r).map(b=>b.dataset.value),c=document.querySelectorAll(`#prediction-block-${e} .prediction-item[data-type="head"].selected`),a=Array.from(c).map(b=>b.dataset.value),l=document.querySelectorAll(`#prediction-block-${e} .prediction-item[data-type="tail"].selected`),d=Array.from(l).map(b=>b.dataset.value),m=document.querySelectorAll(`#pred-special-selector-${e} .number-item.selected`),u=Array.from(m).map(b=>b.dataset.value),p=document.querySelectorAll(`#prediction-block-${e} .prediction-item[data-type="priority5"].selected`),g=Array.from(p).map(b=>b.dataset.value),v=document.querySelectorAll(`#prediction-block-${e} .prediction-item[data-type="priority4"].selected`),f=Array.from(v).map(b=>b.dataset.value);return{zodiacs:i,colors:o,excludes:s,heads:a,tails:d,specialNumbers:u,priority5:g,priority4:f}},calculatePredictionResults(e,t){const i=parseInt(document.getElementById("year").value),o=DataReader.getAllNumbers(i).map(a=>a.value),r={};if(t.zodiacs.length>0){const a=new Set;t.zodiacs.forEach(l=>{DataReader.getNumbersByZodiacName(i,l).forEach(m=>a.add(m))}),r.zodiac=a}if(t.colors.length>0){const a=new Set;t.colors.forEach(l=>{DataReader.getNumbersByColor(i,l).forEach(m=>a.add(m))}),r.color=a}if(t.excludes.length>0){const a=new Set;t.excludes.forEach(d=>{const[m,u]=d.split("-"),p=u==="odd",g=DataReader.getNumbersByColor(i,m),v=DataReader.getNumbersByOddEven(i,p);g.forEach(f=>{v.includes(f)&&a.add(f)})});const l=new Set(o);a.forEach(d=>l.delete(d)),r.exclude=l}if(t.heads.length>0){const a=new Set;t.heads.forEach(l=>{const d=parseInt(l,10);if(d===0)for(let m=1;m<=9;m++)a.add(m.toString().padStart(2,"0"));else if(d>=1&&d<=4){const m=d*10,u=d*10+9;for(let p=m;p<=u;p++)a.add(p.toString().padStart(2,"0"))}}),r.head=a}if(t.tails.length>0){const a=new Set;t.tails.forEach(l=>{const d=parseInt(l,10);for(let m=0;m<=4;m++){const u=m*10+d;u>=1&&u<=49&&a.add(u.toString().padStart(2,"0"))}}),r.tail=a}t.specialNumbers.length>0&&(r.special=new Set(t.specialNumbers));const s=Object.keys(r),c={tier1:[],tier2:[],tier3:[]};if(s.length>=6&&(c.tier1=this.intersectSets(Object.values(r))),s.length>=5){const a={...r};t.priority5&&t.priority5.length>0&&t.priority5.forEach(l=>{a[l]&&delete a[l]}),Object.keys(a).length>=5?c.tier2=this.intersectSets(Object.values(a)):Object.keys(a).length>=4&&(c.tier2=this.intersectSets(Object.values(a)))}if(s.length>=4){const a={...r};t.priority4&&t.priority4.length>0&&t.priority4.forEach(l=>{a[l]&&delete a[l]}),Object.keys(a).length>=4&&(c.tier3=this.intersectSets(Object.values(a)))}return c},intersectSets(e){if(e.length===0)return[];if(e.length===1)return Array.from(e[0]);let t=e[0];for(let i=1;i<e.length;i++)t=new Set([...t].filter(n=>e[i].has(n)));return Array.from(t).sort((i,n)=>parseInt(i,10)-parseInt(n,10))},displayPredictionResults(e,t){const i=parseInt(document.getElementById("year").value),n=DataReader.getAllNumbers(i),o={};n.forEach(y=>{o[y.value]=y});const r=document.getElementById(`result-tier1-${e}`),s=t.tier1?t.tier1.length:0,c=new Set(t.tier1||[]);r&&(s>0?r.innerHTML=t.tier1.map(y=>{const $=o[y]||{color:"",zodiacName:""};return`<div class="number-item ${$.color}" data-value="${y}">${y} ${$.zodiacName}</div>`}).join(""):r.innerHTML='<span class="empty-state-text">无结果</span>');const a=document.getElementById(`result-count-1-${e}`);a&&(a.textContent=`（共${s}个）`);const l=document.getElementById(`result-tier2-${e}`),d=t.tier2?t.tier2.length:0,m=new Set(t.tier2||[]),u=[...m].filter(y=>!c.has(y));l&&(d>0?l.innerHTML=t.tier2.map(y=>{const $=o[y]||{color:"",zodiacName:""},E=u.includes(y);return`<div class="number-item ${$.color} ${E?"tier-diff":""}" data-value="${y}">${y} ${$.zodiacName}</div>`}).join(""):l.innerHTML='<span class="empty-state-text">无结果</span>');const p=document.getElementById(`result-count-2-${e}`);p&&(u.length>0?p.innerHTML=`（共${d}个，<span class="tier-diff-text">新增${u.length}个</span>）`:p.innerHTML=`（共${d}个）`);const g=document.getElementById(`result-tier3-${e}`),v=t.tier3?t.tier3.length:0,b=[...new Set(t.tier3||[])].filter(y=>!m.has(y));g&&(v>0?g.innerHTML=t.tier3.map(y=>{const $=o[y]||{color:"",zodiacName:""},E=b.includes(y);return`<div class="number-item ${$.color} ${E?"tier-diff":""}" data-value="${y}">${y} ${$.zodiacName}</div>`}).join(""):g.innerHTML='<span class="empty-state-text">无结果</span>');const S=document.getElementById(`result-count-3-${e}`);S&&(b.length>0?S.innerHTML=`（共${v}个，<span class="tier-diff-text">新增${b.length}个</span>）`:S.innerHTML=`（共${v}个）`)},calculateTailNumbersFromDigits(e){if(!e||e.length===0)return[];const t=[];return e.forEach(i=>{const n=parseInt(i,10);for(let o=0;o<=4;o++){const r=o*10+n;if(r>=1&&r<=49){const s=r.toString().padStart(2,"0");t.push(s)}}}),t.sort((i,n)=>parseInt(i,10)-parseInt(n,10))},selectAllSpecialNumbers(e){const t=document.getElementById(`pred-special-selector-${e}`);if(!t)return;t.querySelectorAll(".number-item").forEach(n=>{n.classList.add("selected")}),this.updatePredictionConfirmButton(e)},deselectAllSpecialNumbers(e){const t=document.getElementById(`pred-special-selector-${e}`);if(!t)return;t.querySelectorAll(".number-item").forEach(n=>{n.classList.remove("selected")}),this.updatePredictionConfirmButton(e)},invertSpecialNumbers(e){const t=document.getElementById(`pred-special-selector-${e}`);if(!t)return;t.querySelectorAll(".number-item").forEach(n=>{n.classList.toggle("selected")}),this.updatePredictionConfirmButton(e)},updatePredictionConfirmButton(e){const t=document.getElementById(`prediction-confirm-btn-${e}`);if(!t)return;const i=document.getElementById(`prediction-forecast-source-${e}`),n=i&&String(i.value||"").trim()!=="",o=document.querySelectorAll(`#prediction-block-${e} .prediction-item[data-type="zodiac"].selected`),r=document.querySelectorAll(`#prediction-block-${e} .prediction-item[data-type="color"].selected`),s=document.querySelectorAll(`#prediction-block-${e} .prediction-item[data-type="exclude"].selected`),c=document.querySelectorAll(`#prediction-block-${e} .prediction-item[data-type="head"].selected`),a=document.querySelectorAll(`#prediction-block-${e} .prediction-item[data-type="tail"].selected`),l=document.querySelectorAll(`#pred-special-selector-${e} .number-item.selected`),d=o.length>0,m=r.length>0,u=s.length>0,p=c.length>0,g=a.length>0,v=l.length>0;n&&d&&m&&u&&p&&g&&v?t.disabled=!1:t.disabled=!0},async copyPredictionData(e,t){t&&t.stopPropagation();const i=this.collectPredictionData(e),n=JSON.stringify(i,null,2),o=t?t.target:document.getElementById(`prediction-copy-btn-${e}`);(s=>{if(navigator.clipboard&&navigator.clipboard.writeText)return navigator.clipboard.writeText(s);{const c=document.createElement("textarea");c.value=s,c.style.position="fixed",c.style.opacity="0",document.body.appendChild(c),c.select();try{return document.execCommand("copy"),Promise.resolve()}catch(a){return Promise.reject(a)}finally{document.body.removeChild(c)}}})(n).then(()=>{if(o){const s=o.textContent;o.textContent="已复制",o.style.background="#27ae60",o.style.color="white",o.style.borderColor="#27ae60",setTimeout(()=>{o.textContent=s,o.style.background="",o.style.color="",o.style.borderColor=""},1500)}}).catch(s=>{alert(`复制失败，请手动复制：
`+n)})},async importPredictionData(e){try{const t=await navigator.clipboard.readText(),i=JSON.parse(t);this.fillPredictionData(e,i),alert("预测资料导入成功"),this.updatePredictionConfirmButton(e)}catch{const i=prompt("请粘贴预测资料（JSON格式）：");if(i)try{const n=JSON.parse(i);this.fillPredictionData(e,n),alert("预测资料导入成功"),this.updatePredictionConfirmButton(e)}catch(n){alert(`导入失败：数据格式错误
`+n.message)}}},fillPredictionData(e,t){document.querySelectorAll(`#prediction-block-${e} .prediction-item.selected`).forEach(i=>{i.classList.remove("selected")}),document.querySelectorAll(`#pred-special-selector-${e} .number-item.selected`).forEach(i=>{i.classList.remove("selected")}),t.zodiacs&&Array.isArray(t.zodiacs)&&t.zodiacs.forEach(i=>{const n=document.querySelector(`#prediction-block-${e} .prediction-item[data-type="zodiac"][data-value="${i}"]`);n&&n.classList.add("selected")}),t.colors&&Array.isArray(t.colors)&&t.colors.forEach(i=>{const n=document.querySelector(`#prediction-block-${e} .prediction-item[data-type="color"][data-value="${i}"]`);n&&n.classList.add("selected")}),t.excludes&&Array.isArray(t.excludes)&&t.excludes.forEach(i=>{const n=document.querySelector(`#prediction-block-${e} .prediction-item[data-type="exclude"][data-value="${i}"]`);n&&n.classList.add("selected")}),t.heads&&Array.isArray(t.heads)&&t.heads.forEach(i=>{const n=document.querySelector(`#prediction-block-${e} .prediction-item[data-type="head"][data-value="${i}"]`);n&&n.classList.add("selected")}),t.tails&&Array.isArray(t.tails)&&t.tails.forEach(i=>{const n=document.querySelector(`#prediction-block-${e} .prediction-item[data-type="tail"][data-value="${i}"]`);n&&n.classList.add("selected")}),t.specialNumbers&&Array.isArray(t.specialNumbers)&&t.specialNumbers.forEach(i=>{const n=document.querySelector(`#pred-special-selector-${e} .number-item[data-value="${i}"]`);n&&n.classList.add("selected")}),t.priority5&&Array.isArray(t.priority5)&&t.priority5.forEach(i=>{const n=document.querySelector(`#prediction-block-${e} .prediction-item[data-type="priority5"][data-value="${i}"]`);n&&n.classList.add("selected")}),t.priority4&&Array.isArray(t.priority4)&&t.priority4.forEach(i=>{const n=document.querySelector(`#prediction-block-${e} .prediction-item[data-type="priority4"][data-value="${i}"]`);n&&n.classList.add("selected")})},addTierToBetting(e,t){const i=document.getElementById(`result-tier${t==="tier1"?"1":t==="tier2"?"2":"3"}-${e}`);if(!i){alert('请先点击"确定推算"计算推断结果');return}const n=i.querySelectorAll(".number-item[data-value]");if(n.length===0){alert("该梯队没有可加入选号的数字");return}const o=Array.from(n).map(u=>u.dataset.value),r=document.getElementById(`bet-items-${e}`);if(!r){alert("找不到选号申请容器");return}const s=Array.from(r.querySelectorAll(".bet-item"));let c=null,a=null;for(const u of s){const p=u.id.replace("bet-item-",""),g=document.getElementById(`number-selector-${p}`);if(g&&g.querySelectorAll(".number-item.selected").length===0){c=p;const f=u.querySelector(".bet-item-title");if(f){const b=f.textContent.match(/#(\d+)/);b&&(a=b[1])}break}}if(!c){this.addBetItem(e);const u=r.querySelectorAll(".bet-item");if(u.length>0){c=u[0].id.replace("bet-item-","");const p=u[0].querySelector(".bet-item-title");if(p){const g=p.textContent.match(/#(\d+)/);g&&(a=g[1])}}else{alert("创建选号申请失败");return}}const l=document.getElementById(`bet-item-${c}`);if(l){const u=t==="tier1"?"1":t==="tier2"?"2":"3";l.dataset.fromPrediction="true",l.dataset.predictionTier=u;const p=l.querySelector(".bet-item-title");if(p&&!p.querySelector(".prediction-badge")){const g=document.createElement("span");g.className="prediction-badge";const v=t==="tier1"?"一":t==="tier2"?"二":"三";g.textContent=`推断(${v})`,g.title=`来源于${v}推断`,p.appendChild(g)}}o.forEach(u=>{const p=document.querySelector(`#number-selector-${c} .number-item[data-value="${u}"]`);p&&!p.classList.contains("selected")&&(p.classList.add("selected"),p.dataset.manual="1")}),this.updateSelectedNumbers(c),this.updateTable();const d=t==="tier1"?"第一梯队":t==="tier2"?"第二梯队":"第三梯队",m=a?`选号申请 #${a}`:"选号申请";alert(`${d}的${o.length}个数字已加入${m}`)},loadPredictionDataForBuyer(e,t){if(!t)return;const i=StorageManager.getCurrentDate(),n=StorageManager.getPredictionData(t,i);if(n&&n.predictionData&&n.results){this.fillPredictionData(e,n.predictionData);const o=document.getElementById(`prediction-forecast-source-${e}`);o&&n.forecastSource&&(o.value=n.forecastSource),this.displayPredictionResults(e,n.results);const r=document.getElementById(`prediction-results-${e}`);r&&r.classList.remove("hidden");const s=document.getElementById(`prediction-copy-btn-${e}`);s&&(s.disabled=!1),this.updatePredictionConfirmButton(e),console.log(`已自动加载预测数据: ${t} - ${i}`)}},toggleFilterPredictionGlobal(e){var l;const t=document.getElementById(`filter-prediction-global-${e}`);if(!t)return;const i=t.checked,o=this.collectBetRecords().filter(d=>d.buyerId===e),r=h.calculateWinningsFromRecords(o,i),s=document.getElementById(`buyer-summary-${e}`);if(!s)return;const c=((l=document.getElementById(`buyer-name-${e}`))==null?void 0:l.value.trim())||"",a={buyerId:e,buyerName:c,records:o};s.innerHTML=B.renderBuyerSummary(c,a,r,o,i)}};typeof window<"u"&&(window.BettingApp=k);document.addEventListener("DOMContentLoaded",()=>{N().then(()=>{typeof BettingApp<"u"&&BettingApp.init()})});
