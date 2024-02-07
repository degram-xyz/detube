(() => {
    const url = 'http://localhost:10003';
    const container = document.querySelector('#deplan_signup');
    const logoSrc = 'data:image/png;base64,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';
  
    const style = document.createElement('style');
    style.textContent = `
    @import url('https://fonts.cdnfonts.com/css/sf-pro-display');
  
    .deplan_signup-btn {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 290px;
      font-family: 'SF Pro Display', sans-serif;
      font-size: 16px;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 20px;
      background: #15233C;
      color: #fff;
      text-align: center;
    }
  
    .deplan_signup-logo {
      width: 28px;
      flex: 0;
    }
  
    .deplan_signup-text {
      flex: 1;
      line-height: 1.4;
    }
  
    .deplan_signup-sub {
      font-size: 14px;
    }
  
    .deplan_signup-price {
      border-radius: 30px;
      background: #fff;
      color: #15233C;
      padding: 3px;
    }
  `;
    document.head.append(style);
  
    const btn = document.createElement('a');
    btn.href = '#';
    btn.classList.add('deplan_signup-btn');
    btn.innerHTML = `
    <img class="deplan_signup-logo" src="${logoSrc}" />
    <div class="deplan_signup-text">
      Use Product with DePlan<br>
      <span class="deplan_signup-sub">just for <span class="deplan_signup-price">$0.05 /hr</span></span>
    </div>
  `;
    btn.onclick = function (event) {
      event.preventDefault();
      window.parent.postMessage({
        method: 'getAccount'
      }, url);
    };
    container.append(btn);
    window.addEventListener('message', ({ data, origin }) => {
      if (!origin.startsWith(url)) {
        return;
      }
      const message = JSON.parse(data);
      console.log('message:', message);
    });
  })();