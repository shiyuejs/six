import{S,A as P,C as E,m as w}from"./common-ad966008.js";import{D as h,S as L}from"./be-apply-9adbf598.js";const $={WIN_AMOUNT_PER_NUMBER:45,buyerId:0,betItemId:0,currentView:S.get("currentView","ascending"),calculateWinningsFromRecords(e,t=!1){if(e.length===0)return{totalBet:0,numberCounts:{},numberBetAmounts:{},numberWinnings:{},topThree:[],topThreeDetails:[]};const i=t?e.filter(l=>!l.fromPrediction):e;if(i.length===0)return{totalBet:0,numberCounts:{},numberBetAmounts:{},numberWinnings:{},topThree:[],topThreeDetails:[]};const n={},o={};let r=0;i.forEach(l=>{r+=l.total,l.numbers.forEach(m=>{n[m]||(n[m]=0,o[m]=0),n[m]++,o[m]+=l.amount})});const s={};Object.keys(o).forEach(l=>{s[l]=o[l]*this.WIN_AMOUNT_PER_NUMBER});const a=Object.entries(s).sort((l,m)=>m[1]-l[1]).slice(0,3),c=a.map(([l,m])=>{const u=o[l],d=n[l],p=m-r;return{number:l,betCount:d,betAmount:u,winningAmount:m,totalBet:r,profit:p}});return{totalBet:r,numberCounts:n,numberBetAmounts:o,numberWinnings:s,topThree:a,topThreeDetails:c}}},A={renderNumberSelector(e,t,i){return $.currentView==="zodiac"?this.renderZodiacView(e,t,i):this.renderAscendingView(e,t)},renderAscendingView(e,t){return t.map(i=>`<div class="number-item ${i.color}" data-value="${i.value}" onclick="BettingApp.toggleNumber(${e}, '${i.value}', 'manual')">${i.value} ${i.zodiacName}</div>`).join("")},renderZodiacView(e,t,i){return h.getNumbersByZodiac(i).map(o=>`
          <div class="zodiac-column">
            <div class="zodiac-header">
              <div class="zodiac-number">${o.zodiacNumber}</div>
              <div class="zodiac-name">${o.zodiacName}</div>
            </div>
            <div class="zodiac-numbers">
              ${o.numbers.map(r=>`<div class="number-item ${r.color}" data-value="${r.value}" onclick="BettingApp.toggleNumber(${e}, '${r.value}', 'manual')">${r.value}</div>`).join("")}
            </div>
          </div>
        `).join("")},renderPredictionNumberSelector(e){var n;const t=parseInt(((n=document.getElementById("year"))==null?void 0:n.value)||"2026");return h.getAllNumbers(t).map(o=>`<div class="number-item ${o.color}" data-value="${o.value}" onclick="BettingApp.togglePredictionNumber(${e}, '${o.value}')">${o.value} ${o.zodiacName}</div>`).join("")},renderBetItem(e,t,i,n,o=!1){return`
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
                  ${E.ZODIAC_NAMES.map(s=>`<button type="button" class="quick-select-btn" onclick="BettingApp.quickSelectNumbers(${e}, 'zodiac:${s}')">${s}</button>`).join("")}
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
        <div class="number-selector ${$.currentView==="zodiac"?"zodiac-view":""}" id="number-selector-${e}">
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
              ${E.FORECAST_SOURCE_OPTIONS.map(t=>`<option value="${t.value}"${t.isDefault?" selected":""}>${t.name}</option>`).join("")}
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
                ${E.ZODIAC_NAMES.map((t,i)=>`<div class="number-item prediction-item" data-type="zodiac" data-value="${t}" id="pred-zodiac-${e}-${i}" onclick="BettingApp.togglePredictionItem(${e}, 'zodiac', '${t}')">${t}</div>`).join("")}
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
                  ${A.renderPredictionNumberSelector(e)}
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
      `;const r=o?t.records.filter(a=>!a.fromPrediction):t.records;let s=`
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
    `;return r.forEach(a=>{const c=a.id,l=a.fromPrediction||!1;let m="";if(l){const u=a.predictionTier||"",d=u==="1"?"一":u==="2"?"二":u==="3"?"三":"",p=d?`(${d})`:"";m=`<span class="prediction-badge" title="来源于${d||"推断"}推断">推断${p}</span>`}s+=`
        <tr>
          <td>#${c}${m}</td>
          <td>${this.getRegionName(a.region)}</td>
          <td>${a.year}</td>
          <td>${a.period||"-"}</td>
          <td>${a.numbers.join(", ")}</td>
          <td>${a.amount.toFixed(2)}</td>
          <td>${a.numbers.length}</td>
          <td>${a.total.toFixed(2)}</td>
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
    `,s+="</tbody></table>",s+=`<div class="summary-top-three" id="summary-top-three-${t.buyerId}">`,i.topThreeDetails.forEach((a,c)=>{s+=`
        <div class="top-numbers top-numbers-margin" id="top-number-${t.buyerId}-${c}">
          <div class="top-number-title">
            第${c+1}名：数字 ${a.number}
          </div>
          <div class="top-number-item">
            <span class="top-number-label">选号次数：</span>
            <span class="top-number-value">${a.betCount} 次</span>
          </div>
          <div class="top-number-item">
            <span class="top-number-label">选号分量：</span>
            <span class="top-number-value">${a.betAmount.toFixed(2)} 星</span>
          </div>
          <div class="top-number-item">
            <span class="top-number-label">猿份达成分量：</span>
            <span class="top-number-value top-number-winning">${a.winningAmount.toFixed(2)} 星</span>
          </div>
          <div class="buyer-summary buyer-summary-margin">
            <div class="buyer-summary-item highlight">
              <span>最大猿份达成分量：</span>
              <span>${a.winningAmount.toFixed(2)} 星</span>
            </div>
            <div class="buyer-summary-item highlight">
              <span>总选号分量：</span>
              <span>${a.totalBet.toFixed(2)} 星</span>
            </div>
            <div class="buyer-summary-item ${a.profit>=0?"profit":"loss"}">
              <span>可能增加猿份值/猿份值下降：</span>
              <span>${a.profit>=0?"+":""}${a.profit.toFixed(2)} 星</span>
            </div>
          </div>
        </div>
      `}),s+="</div>",s},getRegionName(e){return E.getRegionName?E.getRegionName(e):e==="macau"?"MO":e}},x={currentDimension:"buyer",currentSort:"number",quickSelectState:{},init(){const e=document.getElementById("betting-apply-form"),t=P.hasFormToken&&P.hasFormToken();if(e&&!t){const r=document.createElement("div");r.className="apply-login-hint",r.innerHTML='<p class="apply-login-hint-text">如需提交选号，需登录。</p><a href="../login/index.html" class="">去登录</a>',e.parentNode.insertBefore(r,e)}this.initYearSelect(),this.initPeriodSelect(),this.updateTable(),document.getElementById("region").addEventListener("change",()=>this.updateTable()),document.getElementById("year").addEventListener("change",()=>{this.updateAllNumberSelectors(),this.updateAllPredictionNumberSelectors(),this.updateTable()}),document.getElementById("period").addEventListener("change",()=>this.updateTable()),document.addEventListener("click",r=>{const s=r.target;s.closest&&(s.closest(".quick-panel")||s.closest(".quick-select-btn"))||document.querySelectorAll(".quick-panel.show").forEach(a=>a.classList.remove("show"))});const i=$.currentView,n=document.getElementById("view-ascending"),o=document.getElementById("view-zodiac");n&&o&&(n.classList.toggle("active",i==="ascending"),o.classList.toggle("active",i==="zodiac")),this.addBuyer(),document.addEventListener("blur",r=>{const s=r.target;if(!s.classList||!s.classList.contains("prediction-quick-input"))return;const a=s.getAttribute("data-buyer-id"),c=s.getAttribute("data-type");a!=null&&(c==="special"?this.applyPredictionSpecialInput(a,s.value):this.applyPredictionQuickInput(a,c,s.value))},!0)},switchDimension(e){this.currentDimension=e,document.getElementById("dimension-buyer").classList.toggle("active",e==="buyer"),document.getElementById("dimension-number").classList.toggle("active",e==="number");const t=this.collectBetRecords(),i={};t.forEach(n=>{const o=`${n.buyerId}_${n.buyerName}`;i[o]||(i[o]={buyerId:n.buyerId,buyerName:n.buyerName,records:[]}),i[o].records.push(n)}),this.updateTotalSummary(i)},switchView(e){$.currentView=e,S.set("currentView",e),document.getElementById("view-ascending").classList.toggle("active",e==="ascending"),document.getElementById("view-zodiac").classList.toggle("active",e==="zodiac"),this.updateAllNumberSelectors()},switchSort(e){this.currentSort=e,document.getElementById("sort-number").classList.toggle("active",e==="number"),document.getElementById("sort-winning").classList.toggle("active",e==="winningAmount");const t=this.collectBetRecords(),i={};t.forEach(n=>{const o=`${n.buyerId}_${n.buyerName}`;i[o]||(i[o]={buyerId:n.buyerId,buyerName:n.buyerName,records:[]}),i[o].records.push(n)}),this.updateTotalSummary(i)},initYearSelect(){const e=document.getElementById("year");if(!e||!h.generateYearOptions)return;const t=h.generateYearOptions(),i="2026";e.innerHTML=t.map(n=>`<option value="${n.value}" ${n.value===i?"selected":""}>${n.label}</option>`).join("")},initPeriodSelect(){const e=document.getElementById("period"),t=h.generatePeriodOptions();e.innerHTML=t.map(i=>`<option value="${i}" ${i==="001"?"selected":""}>${i}回</option>`).join("")},addBuyer(){$.buyerId++;const e=$.buyerId,t=document.createElement("div");t.className="buyer-card",t.id=`buyer-${e}`,t.innerHTML=A.renderBuyerCard(e),document.getElementById("buyerList").appendChild(t),this.updatePredictionConfirmButton(e);const i=document.getElementById(`prediction-forecast-source-${e}`);i&&i.addEventListener("change",()=>this.updatePredictionConfirmButton(e));const n=document.getElementById(`buyer-name-${e}`);n&&n.addEventListener("blur",()=>{const o=n.value.trim();o&&this.loadPredictionDataForBuyer(e,o)}),this.addBetItem(e),this.updateAddButtonState(e)},removeBuyer(e){const t=document.getElementById(`buyer-${e}`);if(!t)return;const i=document.getElementById(`buyer-name-${e}`).value.trim()||"该参与人";confirm(`确定要删除"${i}"的所有选号申请吗？此操作不可恢复。`)&&(t.remove(),this.updateTable())},toggleBuyerCard(e){const t=document.getElementById(`buyer-${e}`),i=t.classList.contains("collapsed");if(t.classList.toggle("collapsed"),this.updateAddButtonState(e),document.getElementById(`prediction-block-${e}`)){const o=document.getElementById(`prediction-content-${e}`);if(o&&!i){o.classList.add("collapsed");const r=document.getElementById(`prediction-toggle-${e}`);r&&r.classList.add("collapsed")}}},updateAddButtonState(e){const t=document.getElementById(`buyer-${e}`);if(!t)return;const i=t.querySelector(`button[data-add-bet="${e}"]`);if(!i)return;const n=t.classList.contains("collapsed");i.disabled=n},checkDuplicateBuyerName(e){const t=document.getElementById(`buyer-name-${e}`);if(!t)return;const i=t.value.trim(),n=document.getElementById(`buyer-name-error-${e}`);if(!i){n&&(n.textContent="",n.classList.remove("show"));return}this.loadPredictionDataForBuyer(e,i),Array.from(document.querySelectorAll(".buyer-name-input")).some(s=>s.id!==t.id&&s.value.trim()===i)?n?(n.textContent="已存在相同参与人姓名",n.classList.add("show")):alert("已存在相同参与人姓名"):n&&(n.textContent="",n.classList.remove("show"))},clearBuyerNameError(e){const t=document.getElementById(`buyer-name-error-${e}`);t&&(t.textContent="",t.classList.remove("show"))},toggleSummaryTopThree(e){const t=document.getElementById(`summary-top-three-${e}`),i=document.getElementById(`summary-toggle-${e}`);!t||!i||(t.classList.toggle("collapsed"),i.classList.toggle("collapsed"))},toggleCollapse(e,t){const i=document.getElementById(e),n=document.getElementById(t);!i||!n||(i.classList.toggle("collapsed"),n.classList.toggle("collapsed"))},toggleQuickPanel(e){const t=document.getElementById(`quick-panel-${e}`),i=document.getElementById(`quick-panel-overlay-${e}`);if(!t)return;t.classList.contains("show")?(t.classList.remove("show"),i&&i.classList.remove("show")):(t.classList.add("show"),i&&i.classList.add("show"))},quickSelectNumbers(e,t){const i=this.getNumbersForCriterion(e,t);let n=!0;const o=[];i.forEach(s=>{const a=document.querySelector(`#number-selector-${e} .number-item[data-value="${s}"]`);a&&(o.push(a),a.classList.contains("selected")||(n=!1))});const r=!n;o.forEach(s=>{r?s.classList.contains("selected")||(s.classList.add("selected"),s.dataset.manual="1"):(s.classList.remove("selected"),s.dataset.manual="0")}),this.updateSelectedNumbers(e),this.updateTable()},getNumbersForCriterion(e,t){const i=parseInt(document.getElementById("year").value);if(t.startsWith("zodiac:")){const n=t.split(":")[1];return h.getNumbersByZodiacName(i,n)}if(t.startsWith("color:")){const n=t.split(":")[1];return h.getNumbersByColor(i,n)}return t==="odd"?h.getNumbersByOddEven(i,!0):t==="even"?h.getNumbersByOddEven(i,!1):[]},copyBettingData(e,t){const n=this.collectBetRecords().filter(a=>a.buyerId===e);if(n.length===0){alert("没有可复制的选号申请");return}const o=n.map(a=>{const c=a.numbers.join(","),l=a.amount%1===0?a.amount.toString():a.amount.toFixed(2);return`${c}*${l}`}).join(`
`),r=t?t.target:document.querySelector(`button[onclick*="copyBettingData('${e}')"]`);(a=>{if(navigator.clipboard&&navigator.clipboard.writeText)return navigator.clipboard.writeText(a);{const c=document.createElement("textarea");c.value=a,c.style.position="fixed",c.style.opacity="0",c.style.left="-9999px",document.body.appendChild(c),c.select();try{return document.execCommand("copy"),document.body.removeChild(c),Promise.resolve()}catch(l){return document.body.removeChild(c),Promise.reject(l)}}})(o).then(()=>{if(r){const a=r.textContent;r.textContent="已复制",r.style.background="#27ae60",r.style.color="white",r.style.borderColor="#27ae60",setTimeout(()=>{r.textContent=a,r.style.background="white",r.style.color="#666",r.style.borderColor="#ddd"},2e3)}}).catch(a=>{console.error("复制失败:",a),alert("复制失败，请手动复制")})},buildBettingUniqueId(e,t,i,n,o){const r=(o||"").replace(/[\s|]/g,"_").slice(0,50);return[e,t,i,n,r].join("_").toLocaleLowerCase()},buildSubmitDataFromRecords(e,t,i,n){const o={};return n.forEach(r=>{const s=`${r.buyerId}_${r.buyerName}`;o[s]||(o[s]={buyerId:r.buyerId,buyerName:r.buyerName,betItems:[]}),o[s].betItems.push({numbers:r.numbers,amount:r.amount,total:r.total,fromPrediction:r.fromPrediction,predictionTier:r.predictionTier})}),{basicInfo:{region:e,regionName:A.getRegionName(e),year:t,period:i},buyers:Object.values(o).map(r=>{const s=n.filter(c=>c.buyerId===r.buyerId),a=$.calculateWinningsFromRecords(s);return{buyerId:r.buyerId,buyerName:r.buyerName,betItems:r.betItems,summary:{totalBet:a.totalBet,topThreeDetails:a.topThreeDetails}}})}},saveBettingToLocalStorage(e,t){e.buyers.forEach(i=>{if(i.buyerName){const n={basicInfo:e.basicInfo,buyer:i};S.saveBettingData(i.buyerName,t,n),console.log(`选号数据已保存: ${i.buyerName} - ${t}`)}})},getPredictionForPayload(e,t){const i=S.getPredictionData(e,t);return!i||!i.predictionData&&!i.results?null:{predictionData:i.predictionData,results:i.results,materialId:i.materialId||null,materialLabels:this.MATERIAL_LABELS,forecastSource:i.forecastSource||null}},buildPayloadForBuyer(e,t,i,n,o,r){const s=this.buildBettingUniqueId(n,o,r,i,e.buyerName),a=this.getPredictionForPayload(e.buyerName,i);return{uniqueId:s,buyerName:e.buyerName,date:i,basicInfo:t.basicInfo,betting:{buyerId:e.buyerId,betItems:e.betItems,summary:e.summary},prediction:a}},submitBetting(e,t,i,n,o,r){return L.ready().then(()=>{if(!L.getClient()){alert("Supabase 未配置，无法提交。请在 supabase-config.js 中填写 SUPABASE_URL 与 SUPABASE_ANON_KEY。");return}const s=t.buyers.filter(a=>a.buyerName).map(a=>{const c=this.buildPayloadForBuyer(a,t,r,i,n,o),l=JSON.stringify(c);return L.insertSubmission(e,{unique_id:c.uniqueId,buyer_name:c.buyerName,date:c.date,payload:l})});return Promise.all(s).then(a=>{const c=a.filter(l=>l&&l.error);c.length===0?(alert("选号已提交"),document.querySelectorAll(".buyer-name-input").forEach(l=>{l.value=""}),this.updateTable()):(console.error("Supabase 提交部分失败",c),alert("部分提交失败，请查看控制台。本地已保存。"))}).catch(a=>{console.error("Supabase 提交失败",a),alert("提交到服务器失败："+(a.message||"网络错误")+"。本地已保存。")})})},submitData(){const e=P.getFormToken();if(!e){alert("请先到登录页填写 FORM TOKEN 后再提交选号。");return}const t=document.getElementById("region"),i=document.getElementById("year"),n=document.getElementById("period");if(!t||!i||!n)return;const o=t.value,r=parseInt(i.value,10),s=(n.value||"").trim(),a=this.collectBetRecords();if(!a||a.length===0){alert("暂无选号数据，请先选择猿份号并填写分量。");return}const c=this.buildSubmitDataFromRecords(o,r,s,a);if(!confirm("确定要提交选号数据吗？提交后将保存到服务器。"))return;console.log("提交的选号数据：",JSON.stringify(c,null,2)),console.log("提交的选号数据（对象）：",c);const l=S.getCurrentDate();this.saveBettingToLocalStorage(c,l),this.submitBetting(e,c,o,r,s,l)},handleAmountInput(e){const t=document.getElementById(`bet-amount-${e}`);if(!t)return;const i=t.value;i&&!/^\d+$/.test(i)&&(t.value=i.replace(/\D/g,""));const n=parseInt(t.value,10);!isNaN(n)&&n>99999&&(t.value="99999")},validateAmount(e){const t=document.getElementById(`bet-amount-${e}`),i=document.getElementById(`error-amount-${e}`);if(!t||!i)return;const n=t.value.trim();if(t.classList.remove("error"),i.classList.remove("show"),n==="")return;const o=parseInt(n,10);return isNaN(o)||o<=0||o>=1e5||o!==parseFloat(n)?(t.classList.add("error"),i.classList.add("show"),!1):(this.updateTable(),!0)},addBetItem(e){$.betItemId++;const t=$.betItemId,i=parseInt(document.getElementById("year").value),n=h.getAllNumbers(i),o=document.createElement("div");o.className="bet-item",o.id=`bet-item-${t}`,o.dataset.buyerId=e,o.innerHTML=A.renderBetItem(t,e,n,i),document.getElementById(`bet-items-${e}`).prepend(o),o.classList.add("bet-item-new"),setTimeout(()=>{o.classList.remove("bet-item-new")},2e3),this.updateEmptyState(e)},removeBetItem(e){const t=document.getElementById(`bet-item-${e}`);if(t){const i=t.dataset.buyerId,n=t.querySelectorAll(".number-item.selected").length>0,o=document.getElementById(`bet-amount-${e}`),r=o&&parseFloat(o.value)||0;if((n||r>0)&&!window.confirm("检测到该选号项包含已选择的猿份号或已填写分量，确定要删除吗？"))return;t.remove(),this.updateEmptyState(i),this.updateTable()}},updateEmptyState(e){const t=document.getElementById(`bet-items-${e}`);if(!t)return;const i=t.querySelectorAll(".bet-item").length>0,n=`bet-items-empty-${e}`;let o=document.getElementById(n);i?o&&o.remove():o||(o=document.createElement("div"),o.id=n,o.className="bet-items-empty",o.textContent="暂无选号申请，点击“添加选号”开始。",t.appendChild(o))},toggleNumber(e,t){const i=document.querySelector(`#number-selector-${e} .number-item[data-value="${t}"]`),n=i.classList.contains("selected");i.classList.toggle("selected"),arguments[2]==="manual"&&(n?delete i.dataset.manual:i.dataset.manual="1"),this.updateSelectedNumbers(e),this.updateTable()},updateSelectedNumbers(e){const t=document.querySelectorAll(`#number-selector-${e} .number-item.selected`),i=Array.from(t).map(o=>o.dataset.value),n=document.getElementById(`selected-numbers-${e}`);i.length===0?n.innerHTML='<span class="empty-state-text">未选择任何数字</span>':n.innerHTML=i.map(o=>`<span class="selected-number-tag">${o}</span>`).join("")},updateAllNumberSelectors(){const e=parseInt(document.getElementById("year").value),t=h.getAllNumbers(e);document.querySelectorAll(".bet-item").forEach(n=>{const o=n.id.split("-")[2],r=document.getElementById(`number-selector-${o}`);if(r){const s=Array.from(r.querySelectorAll(".number-item.selected")).map(a=>a.dataset.value);$.currentView==="zodiac"?r.classList.add("zodiac-view"):r.classList.remove("zodiac-view"),r.innerHTML=A.renderNumberSelector(o,t,e),s.forEach(a=>{const c=r.querySelector(`.number-item[data-value="${a}"]`);c&&(c.classList.add("selected"),c.dataset.manual="1")}),this.updateSelectedNumbers(o)}})},updateAllPredictionNumberSelectors(){parseInt(document.getElementById("year").value),document.querySelectorAll(".buyer-card").forEach(t=>{const i=t.id.split("-")[1],n=document.getElementById(`pred-special-selector-${i}`);if(n){const o=Array.from(n.querySelectorAll(".number-item.selected")).map(r=>r.dataset.value);n.innerHTML=A.renderPredictionNumberSelector(i),o.forEach(r=>{const s=n.querySelector(`.number-item[data-value="${r}"]`);s&&s.classList.add("selected")})}})},collectBetRecords(){const e=[],t=document.getElementById("region"),i=document.getElementById("year"),n=document.getElementById("period");if(!t||!i||!n)return e;const o=t.value,r=parseInt(i.value,10),s=(n.value||"").trim();return document.querySelectorAll(".buyer-card").forEach(c=>{const m=(c.id||"").split("-")[1];if(m==null)return;const u=document.getElementById(`buyer-name-${m}`),d=u&&u.value?String(u.value).trim():"";if(!d)return;c.querySelectorAll(".bet-item").forEach(g=>{const f=(g.id||"").split("-")[2];if(f==null)return;const b=document.getElementById(`bet-amount-${f}`);if(!b)return;const k=g.querySelectorAll(".number-item.selected"),y=Array.from(k).map(N=>N.dataset.value).filter(Boolean),B=parseFloat(b.value,10)||0;if(y.length>0&&B>0){const N=g.dataset.fromPrediction==="true",T=g.dataset.predictionTier||null;e.push({id:f,buyerId:m,buyerName:d,region:o,year:r,fromPrediction:N,predictionTier:T,period:s,numbers:y,amount:B,total:y.length*B})}})}),e},updateSubmitButtonState(){const e=document.querySelector(".submit-btn");if(!e)return;const t=this.collectBetRecords();e.disabled=t.length===0},updateTable(){const e=this.collectBetRecords(),t={};e.forEach(n=>{const o=`${n.buyerId}_${n.buyerName}`;t[o]||(t[o]={buyerId:n.buyerId,buyerName:n.buyerName,region:n.region,year:n.year,period:n.period,records:[]}),t[o].records.push(n)}),document.querySelectorAll(".buyer-card").forEach(n=>{const o=n.id.split("-")[1],r=document.getElementById(`buyer-summary-${o}`);if(!r)return;const s=document.getElementById(`summary-top-three-${o}`);document.getElementById(`summary-toggle-${o}`);const a=s&&s.classList.contains("collapsed"),c=Object.keys(t).find(d=>{const p=t[d];return p&&p.buyerId===o});if(!c||t[c].records.length===0){r.classList.add("buyer-summary-hidden");return}const l=t[c],m=l.records,u=$.calculateWinningsFromRecords(m,!1);if(r.innerHTML=A.renderBuyerSummary(l.buyerName,l,u,m,!1),r.classList.remove("buyer-summary-hidden"),a){const d=document.getElementById(`summary-top-three-${o}`),p=document.getElementById(`summary-toggle-${o}`);d&&p&&(d.classList.add("collapsed"),p.classList.add("collapsed"))}}),this.updateTotalSummary(t),this.updateSubmitButtonState()},updateTotalSummary(e){const t=document.getElementById("totalSummary"),i=document.getElementById("totalSummaryContent");if(!t||!i)return;const n=Object.values(e);if(n.length===0){t.classList.remove("show");return}this.currentDimension==="buyer"?this.renderBuyerDimension(n,i):this.renderNumberDimension(n,i),t.classList.add("show")},renderBuyerDimension(e,t){const i=[];let n=0;e.forEach(r=>{const s=r.records,a=r.buyerName||"未命名";let c=0;s.forEach(u=>{c+=u.total});const l={};s.forEach(u=>{u.numbers.forEach(d=>{l[d]||(l[d]={number:d,amount:u.amount,betCount:0,numberBetAmount:0,winningAmount:0,profit:0}),l[d].betCount+=1,l[d].numberBetAmount+=u.amount})});const m=Object.values(l).map(u=>(u.winningAmount=u.numberBetAmount*$.WIN_AMOUNT_PER_NUMBER,u.profit=u.winningAmount-c,u));m.sort((u,d)=>{const p=parseInt(u.number),g=parseInt(d.number);return p-g}),i.push({buyerName:a,buyerTotalCost:c,numbers:m}),n+=c}),i.sort((r,s)=>r.buyerName.localeCompare(s.buyerName));let o=`<div class="summary-top-three" id="total-summary-table">
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
    `,t.innerHTML=o},renderNumberDimension(e,t){const i={};let n=0;e.forEach(s=>{s.records.forEach(c=>{c.numbers.forEach(l=>{i[l]||(i[l]={number:l,totalBetAmount:0,betCount:0,winningAmount:0}),i[l].totalBetAmount+=c.amount,i[l].betCount+=1,n+=c.amount})})}),Object.values(i).forEach(s=>{s.winningAmount=s.totalBetAmount*$.WIN_AMOUNT_PER_NUMBER});let o=Object.values(i);this.currentSort==="number"?o.sort((s,a)=>{const c=parseInt(s.number),l=parseInt(a.number);return c-l}):o.sort((s,a)=>a.winningAmount-s.winningAmount);let r=`<div class="summary-top-three" id="total-summary-table">
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
      `}),o.reduce((s,a)=>s+a.winningAmount,0),r+=`
          </tbody>
        </table>
      </div>
    `,t.innerHTML=r},MATERIAL_LABELS:["命中属相","命中颜色","隐藏","命中首位","命中末尾","36猿份号"],generateMaterialId(e,t,i,n,o){if(!e)return null;const r=E.buildMaterialIdKey?E.buildMaterialIdKey(e,t,i,n,o):null;return r?w(r):null},togglePredictionBlock(e){const t=document.getElementById(`prediction-content-${e}`),i=document.getElementById(`prediction-toggle-${e}`);!t||!i||(t.classList.toggle("collapsed"),i.classList.toggle("collapsed"))},confirmPrediction(e){const t=this.collectPredictionData(e);console.log(`[参与人${e}] 预测资料:`,JSON.stringify(t,null,2));const i=this.calculatePredictionResults(e,t);this.displayPredictionResults(e,i);const n=document.getElementById(`prediction-results-${e}`);n&&n.classList.remove("hidden");const o=document.getElementById(`prediction-copy-btn-${e}`);o&&(o.disabled=!1);const r=document.getElementById(`buyer-name-${e}`),s=r?r.value.trim():"",a=document.getElementById(`prediction-forecast-source-${e}`),c=a?String(a.value||"").trim():"";if(s){const l=S.getCurrentDate(),m=document.getElementById("region"),u=document.getElementById("year"),d=document.getElementById("period"),p=m?m.value:"",g=u?u.value:"",v=d?d.value:"",f=this.generateMaterialId(t,p,g,l,v);S.savePredictionData(s,l,t,i,f,c||null),console.log(`预测数据已保存: ${s} - ${l}`,"materialId",f,"forecastSource",c||"(空)")}},applyPredictionQuickInput(e,t,i){if(!i||typeof i!="string")return;const n=E.normalizePredictionInput?E.normalizePredictionInput(i):i.replace(/[\s,，、]+/g," ").trim(),o=n?n.split(/\s+/).filter(Boolean):[];let r;if(t==="zodiac"){const c=E.ZODIAC_NAMES||[],l=h.getZodiacDisplay?h.getZodiacDisplay():{},m=[];o.forEach(u=>{if(c.includes(u)){m.push(u);return}let d=u;for(;d.length>0;){let p=!1;for(let g=0;g<c.length;g++){const v=c[g];if(d.indexOf(v)===0){m.push(v),d=d.slice(v.length),p=!0;break}}if(!p&&d.length>0){const g=d.charAt(0);m.push(l[g]!=null?l[g]:g),d=d.slice(1)}}}),r=new Set(m)}else if(t==="head"||t==="tail"){const c=[];o.forEach(l=>{l.replace(/\D/g,"").split("").forEach(u=>c.push(u))}),r=new Set(c.filter(l=>/^\d$/.test(l))),t==="head"&&(r=new Set([...r].filter(l=>l>="0"&&l<="4"))),t==="tail"&&(r=new Set([...r].filter(l=>l>="0"&&l<="9")))}else return;const s=document.getElementById(`prediction-block-${e}`);if(!s)return;s.querySelectorAll(`.prediction-item[data-type="${t}"]`).forEach(c=>{const l=c.dataset.value;r.has(l)?c.classList.add("selected"):c.classList.remove("selected")}),this.updatePredictionConfirmButton(e)},applyPredictionSpecialInput(e,t){const i=E.parseSpecialNumbersInput?E.parseSpecialNumbersInput(t):[],n=new Set(i),o=document.getElementById(`pred-special-selector-${e}`);o&&(o.querySelectorAll(".number-item").forEach(r=>{const s=r.dataset.value;n.has(s)?r.classList.add("selected"):r.classList.remove("selected")}),this.updatePredictionConfirmButton(e))},togglePredictionItem(e,t,i){const n=document.querySelector(`#prediction-block-${e} .prediction-item[data-type="${t}"][data-value="${i}"]`);n&&(n.classList.toggle("selected"),this.updatePredictionConfirmButton(e))},togglePredictionNumber(e,t){const i=document.querySelector(`#pred-special-selector-${e} .number-item[data-value="${t}"]`);i&&(i.classList.toggle("selected"),this.updatePredictionConfirmButton(e))},collectPredictionData(e){const t=document.querySelectorAll(`#prediction-block-${e} .prediction-item[data-type="zodiac"].selected`),i=Array.from(t).map(b=>b.dataset.value),n=document.querySelectorAll(`#prediction-block-${e} .prediction-item[data-type="color"].selected`),o=Array.from(n).map(b=>b.dataset.value),r=document.querySelectorAll(`#prediction-block-${e} .prediction-item[data-type="exclude"].selected`),s=Array.from(r).map(b=>b.dataset.value),a=document.querySelectorAll(`#prediction-block-${e} .prediction-item[data-type="head"].selected`),c=Array.from(a).map(b=>b.dataset.value),l=document.querySelectorAll(`#prediction-block-${e} .prediction-item[data-type="tail"].selected`),m=Array.from(l).map(b=>b.dataset.value),u=document.querySelectorAll(`#pred-special-selector-${e} .number-item.selected`),d=Array.from(u).map(b=>b.dataset.value),p=document.querySelectorAll(`#prediction-block-${e} .prediction-item[data-type="priority5"].selected`),g=Array.from(p).map(b=>b.dataset.value),v=document.querySelectorAll(`#prediction-block-${e} .prediction-item[data-type="priority4"].selected`),f=Array.from(v).map(b=>b.dataset.value);return{zodiacs:i,colors:o,excludes:s,heads:c,tails:m,specialNumbers:d,priority5:g,priority4:f}},calculatePredictionResults(e,t){const i=parseInt(document.getElementById("year").value),o=h.getAllNumbers(i).map(c=>c.value),r={};if(t.zodiacs.length>0){const c=new Set;t.zodiacs.forEach(l=>{h.getNumbersByZodiacName(i,l).forEach(u=>c.add(u))}),r.zodiac=c}if(t.colors.length>0){const c=new Set;t.colors.forEach(l=>{h.getNumbersByColor(i,l).forEach(u=>c.add(u))}),r.color=c}if(t.excludes.length>0){const c=new Set;t.excludes.forEach(m=>{const[u,d]=m.split("-"),p=d==="odd",g=h.getNumbersByColor(i,u),v=h.getNumbersByOddEven(i,p);g.forEach(f=>{v.includes(f)&&c.add(f)})});const l=new Set(o);c.forEach(m=>l.delete(m)),r.exclude=l}if(t.heads.length>0){const c=new Set;t.heads.forEach(l=>{const m=parseInt(l,10);if(m===0)for(let u=1;u<=9;u++)c.add(u.toString().padStart(2,"0"));else if(m>=1&&m<=4){const u=m*10,d=m*10+9;for(let p=u;p<=d;p++)c.add(p.toString().padStart(2,"0"))}}),r.head=c}if(t.tails.length>0){const c=new Set;t.tails.forEach(l=>{const m=parseInt(l,10);for(let u=0;u<=4;u++){const d=u*10+m;d>=1&&d<=49&&c.add(d.toString().padStart(2,"0"))}}),r.tail=c}t.specialNumbers.length>0&&(r.special=new Set(t.specialNumbers));const s=Object.keys(r),a={tier1:[],tier2:[],tier3:[]};if(s.length>=6&&(a.tier1=this.intersectSets(Object.values(r))),s.length>=5){const c={...r};t.priority5&&t.priority5.length>0&&t.priority5.forEach(l=>{c[l]&&delete c[l]}),Object.keys(c).length>=5?a.tier2=this.intersectSets(Object.values(c)):Object.keys(c).length>=4&&(a.tier2=this.intersectSets(Object.values(c)))}if(s.length>=4){const c={...r};t.priority4&&t.priority4.length>0&&t.priority4.forEach(l=>{c[l]&&delete c[l]}),Object.keys(c).length>=4&&(a.tier3=this.intersectSets(Object.values(c)))}return a},intersectSets(e){if(e.length===0)return[];if(e.length===1)return Array.from(e[0]);let t=e[0];for(let i=1;i<e.length;i++)t=new Set([...t].filter(n=>e[i].has(n)));return Array.from(t).sort((i,n)=>parseInt(i,10)-parseInt(n,10))},displayPredictionResults(e,t){const i=parseInt(document.getElementById("year").value),n=h.getAllNumbers(i),o={};n.forEach(y=>{o[y.value]=y});const r=document.getElementById(`result-tier1-${e}`),s=t.tier1?t.tier1.length:0,a=new Set(t.tier1||[]);r&&(s>0?r.innerHTML=t.tier1.map(y=>{const B=o[y]||{color:"",zodiacName:""};return`<div class="number-item ${B.color}" data-value="${y}">${y} ${B.zodiacName}</div>`}).join(""):r.innerHTML='<span class="empty-state-text">无结果</span>');const c=document.getElementById(`result-count-1-${e}`);c&&(c.textContent=`（共${s}个）`);const l=document.getElementById(`result-tier2-${e}`),m=t.tier2?t.tier2.length:0,u=new Set(t.tier2||[]),d=[...u].filter(y=>!a.has(y));l&&(m>0?l.innerHTML=t.tier2.map(y=>{const B=o[y]||{color:"",zodiacName:""},N=d.includes(y);return`<div class="number-item ${B.color} ${N?"tier-diff":""}" data-value="${y}">${y} ${B.zodiacName}</div>`}).join(""):l.innerHTML='<span class="empty-state-text">无结果</span>');const p=document.getElementById(`result-count-2-${e}`);p&&(d.length>0?p.innerHTML=`（共${m}个，<span class="tier-diff-text">新增${d.length}个</span>）`:p.innerHTML=`（共${m}个）`);const g=document.getElementById(`result-tier3-${e}`),v=t.tier3?t.tier3.length:0,b=[...new Set(t.tier3||[])].filter(y=>!u.has(y));g&&(v>0?g.innerHTML=t.tier3.map(y=>{const B=o[y]||{color:"",zodiacName:""},N=b.includes(y);return`<div class="number-item ${B.color} ${N?"tier-diff":""}" data-value="${y}">${y} ${B.zodiacName}</div>`}).join(""):g.innerHTML='<span class="empty-state-text">无结果</span>');const k=document.getElementById(`result-count-3-${e}`);k&&(b.length>0?k.innerHTML=`（共${v}个，<span class="tier-diff-text">新增${b.length}个</span>）`:k.innerHTML=`（共${v}个）`)},calculateTailNumbersFromDigits(e){if(!e||e.length===0)return[];const t=[];return e.forEach(i=>{const n=parseInt(i,10);for(let o=0;o<=4;o++){const r=o*10+n;if(r>=1&&r<=49){const s=r.toString().padStart(2,"0");t.push(s)}}}),t.sort((i,n)=>parseInt(i,10)-parseInt(n,10))},selectAllSpecialNumbers(e){const t=document.getElementById(`pred-special-selector-${e}`);if(!t)return;t.querySelectorAll(".number-item").forEach(n=>{n.classList.add("selected")}),this.updatePredictionConfirmButton(e)},deselectAllSpecialNumbers(e){const t=document.getElementById(`pred-special-selector-${e}`);if(!t)return;t.querySelectorAll(".number-item").forEach(n=>{n.classList.remove("selected")}),this.updatePredictionConfirmButton(e)},invertSpecialNumbers(e){const t=document.getElementById(`pred-special-selector-${e}`);if(!t)return;t.querySelectorAll(".number-item").forEach(n=>{n.classList.toggle("selected")}),this.updatePredictionConfirmButton(e)},updatePredictionConfirmButton(e){const t=document.getElementById(`prediction-confirm-btn-${e}`);if(!t)return;const i=document.getElementById(`prediction-forecast-source-${e}`),n=i&&String(i.value||"").trim()!=="",o=document.querySelectorAll(`#prediction-block-${e} .prediction-item[data-type="zodiac"].selected`),r=document.querySelectorAll(`#prediction-block-${e} .prediction-item[data-type="color"].selected`),s=document.querySelectorAll(`#prediction-block-${e} .prediction-item[data-type="exclude"].selected`),a=document.querySelectorAll(`#prediction-block-${e} .prediction-item[data-type="head"].selected`),c=document.querySelectorAll(`#prediction-block-${e} .prediction-item[data-type="tail"].selected`),l=document.querySelectorAll(`#pred-special-selector-${e} .number-item.selected`),m=o.length>0,u=r.length>0,d=s.length>0,p=a.length>0,g=c.length>0,v=l.length>0;n&&m&&u&&d&&p&&g&&v?t.disabled=!1:t.disabled=!0},async copyPredictionData(e,t){t&&t.stopPropagation();const i=this.collectPredictionData(e),n=JSON.stringify(i,null,2),o=t?t.target:document.getElementById(`prediction-copy-btn-${e}`);(s=>{if(navigator.clipboard&&navigator.clipboard.writeText)return navigator.clipboard.writeText(s);{const a=document.createElement("textarea");a.value=s,a.style.position="fixed",a.style.opacity="0",document.body.appendChild(a),a.select();try{return document.execCommand("copy"),Promise.resolve()}catch(c){return Promise.reject(c)}finally{document.body.removeChild(a)}}})(n).then(()=>{if(o){const s=o.textContent;o.textContent="已复制",o.style.background="#27ae60",o.style.color="white",o.style.borderColor="#27ae60",setTimeout(()=>{o.textContent=s,o.style.background="",o.style.color="",o.style.borderColor=""},1500)}}).catch(s=>{alert(`复制失败，请手动复制：
`+n)})},async importPredictionData(e){try{const t=await navigator.clipboard.readText(),i=JSON.parse(t);this.fillPredictionData(e,i),alert("预测资料导入成功"),this.updatePredictionConfirmButton(e)}catch{const i=prompt("请粘贴预测资料（JSON格式）：");if(i)try{const n=JSON.parse(i);this.fillPredictionData(e,n),alert("预测资料导入成功"),this.updatePredictionConfirmButton(e)}catch(n){alert(`导入失败：数据格式错误
`+n.message)}}},fillPredictionData(e,t){document.querySelectorAll(`#prediction-block-${e} .prediction-item.selected`).forEach(i=>{i.classList.remove("selected")}),document.querySelectorAll(`#pred-special-selector-${e} .number-item.selected`).forEach(i=>{i.classList.remove("selected")}),t.zodiacs&&Array.isArray(t.zodiacs)&&t.zodiacs.forEach(i=>{const n=document.querySelector(`#prediction-block-${e} .prediction-item[data-type="zodiac"][data-value="${i}"]`);n&&n.classList.add("selected")}),t.colors&&Array.isArray(t.colors)&&t.colors.forEach(i=>{const n=document.querySelector(`#prediction-block-${e} .prediction-item[data-type="color"][data-value="${i}"]`);n&&n.classList.add("selected")}),t.excludes&&Array.isArray(t.excludes)&&t.excludes.forEach(i=>{const n=document.querySelector(`#prediction-block-${e} .prediction-item[data-type="exclude"][data-value="${i}"]`);n&&n.classList.add("selected")}),t.heads&&Array.isArray(t.heads)&&t.heads.forEach(i=>{const n=document.querySelector(`#prediction-block-${e} .prediction-item[data-type="head"][data-value="${i}"]`);n&&n.classList.add("selected")}),t.tails&&Array.isArray(t.tails)&&t.tails.forEach(i=>{const n=document.querySelector(`#prediction-block-${e} .prediction-item[data-type="tail"][data-value="${i}"]`);n&&n.classList.add("selected")}),t.specialNumbers&&Array.isArray(t.specialNumbers)&&t.specialNumbers.forEach(i=>{const n=document.querySelector(`#pred-special-selector-${e} .number-item[data-value="${i}"]`);n&&n.classList.add("selected")}),t.priority5&&Array.isArray(t.priority5)&&t.priority5.forEach(i=>{const n=document.querySelector(`#prediction-block-${e} .prediction-item[data-type="priority5"][data-value="${i}"]`);n&&n.classList.add("selected")}),t.priority4&&Array.isArray(t.priority4)&&t.priority4.forEach(i=>{const n=document.querySelector(`#prediction-block-${e} .prediction-item[data-type="priority4"][data-value="${i}"]`);n&&n.classList.add("selected")})},addTierToBetting(e,t){const i=document.getElementById(`result-tier${t==="tier1"?"1":t==="tier2"?"2":"3"}-${e}`);if(!i){alert('请先点击"确定推算"计算推断结果');return}const n=i.querySelectorAll(".number-item[data-value]");if(n.length===0){alert("该梯队没有可加入选号的数字");return}const o=Array.from(n).map(d=>d.dataset.value),r=document.getElementById(`bet-items-${e}`);if(!r){alert("找不到选号申请容器");return}const s=Array.from(r.querySelectorAll(".bet-item"));let a=null,c=null;for(const d of s){const p=d.id.replace("bet-item-",""),g=document.getElementById(`number-selector-${p}`);if(g&&g.querySelectorAll(".number-item.selected").length===0){a=p;const f=d.querySelector(".bet-item-title");if(f){const b=f.textContent.match(/#(\d+)/);b&&(c=b[1])}break}}if(!a){this.addBetItem(e);const d=r.querySelectorAll(".bet-item");if(d.length>0){a=d[0].id.replace("bet-item-","");const p=d[0].querySelector(".bet-item-title");if(p){const g=p.textContent.match(/#(\d+)/);g&&(c=g[1])}}else{alert("创建选号申请失败");return}}const l=document.getElementById(`bet-item-${a}`);if(l){const d=t==="tier1"?"1":t==="tier2"?"2":"3";l.dataset.fromPrediction="true",l.dataset.predictionTier=d;const p=l.querySelector(".bet-item-title");if(p&&!p.querySelector(".prediction-badge")){const g=document.createElement("span");g.className="prediction-badge";const v=t==="tier1"?"一":t==="tier2"?"二":"三";g.textContent=`推断(${v})`,g.title=`来源于${v}推断`,p.appendChild(g)}}o.forEach(d=>{const p=document.querySelector(`#number-selector-${a} .number-item[data-value="${d}"]`);p&&!p.classList.contains("selected")&&(p.classList.add("selected"),p.dataset.manual="1")}),this.updateSelectedNumbers(a),this.updateTable();const m=t==="tier1"?"第一梯队":t==="tier2"?"第二梯队":"第三梯队",u=c?`选号申请 #${c}`:"选号申请";alert(`${m}的${o.length}个数字已加入${u}`)},loadPredictionDataForBuyer(e,t){if(!t)return;const i=S.getCurrentDate(),n=S.getPredictionData(t,i);if(n&&n.predictionData&&n.results){this.fillPredictionData(e,n.predictionData);const o=document.getElementById(`prediction-forecast-source-${e}`);o&&n.forecastSource&&(o.value=n.forecastSource),this.displayPredictionResults(e,n.results);const r=document.getElementById(`prediction-results-${e}`);r&&r.classList.remove("hidden");const s=document.getElementById(`prediction-copy-btn-${e}`);s&&(s.disabled=!1),this.updatePredictionConfirmButton(e),console.log(`已自动加载预测数据: ${t} - ${i}`)}},toggleFilterPredictionGlobal(e){var l;const t=document.getElementById(`filter-prediction-global-${e}`);if(!t)return;const i=t.checked,o=this.collectBetRecords().filter(m=>m.buyerId===e),r=$.calculateWinningsFromRecords(o,i),s=document.getElementById(`buyer-summary-${e}`);if(!s)return;const a=((l=document.getElementById(`buyer-name-${e}`))==null?void 0:l.value.trim())||"",c={buyerId:e,buyerName:a,records:o};s.innerHTML=A.renderBuyerSummary(a,c,r,o,i)}};window.BettingApp=x;document.addEventListener("DOMContentLoaded",()=>{x.init()});
