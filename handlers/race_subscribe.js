if (urlContains('geexek.com/score/pscore')) {
  const predictSwitch = document.querySelector('#predictSwitch');
  var newNode = predictSwitch.cloneNode(false);
  newNode.innerText = '订阅通知';
  predictSwitch.parentNode.insertBefore(newNode, predictSwitch);
  bindClickWithTag(newNode, subscribe_diaglog);
}

if (urlContains('live.utmb.world/')) {
    bindClickWithTag(getElementByXpath(document, '//div[@role="button"]'), subscribe_diaglog)
}

if (urlContains('/coureur.php')) {
    bindClickWithTag(getElementByXpath(document, '//a[@class="nofav"]'), subscribe_diaglog)
}

function subscribe_diaglog() {
	console.log('subscribe click with notify');
    const dialog = document.createElement('dialog');
    dialog.innerHTML = `
      <style>
    .notify-form form {
      display: flex;
      flex-direction: column;
      align-items: start;
      padding: 20px;
      background-color: #f9f9f9;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      width: 500px;
      box-sizing: border-box;
    }
    .notify-form label {
      margin-bottom: 10px;
      font-size: 16px;
      color: #333;
    }
    .notify-form input[type="text"] {
      padding: 8px;
      margin-top: 5px;
      margin-right: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
      width: 250px;
    }
    .notify-form form menu {
      display: flex;
      justify-content: flex-end;
      padding-top: 10px;
      margin: 0;
      width: 100%;
    }
    
    .notify-form form menu button {
      padding: 10px 20px;
      margin-right: 30px;
      border: none;
      border-radius: 4px;
      background-color: #007bff;
      color: white;
      cursor: pointer;
    }
    
    .notify-form button#cancel {
      background-color: #6c757d;
    }
    </style>
      <div class="notify-form">
      <form method="dialog">
        <p><label>Input notify EMAIL: <input type="text" id="email"></label></p>
        <menu>
          <button id="cancel" value="cancel">Cancel</button>
          <button id="submit" value="default">Submit</button>
        </menu>
      </form>
      </div>
    `;
    document.body.appendChild(dialog);
    dialog.showModal();

    dialog.querySelector('#submit').addEventListener('click', () => {
      const email = dialog.querySelector('#email').value;
      console.log('Submitted information:', email);
      if (!email) {
        alert('Please input email');
      }
      subscribe_notify(email);
      dialog.close();
    });

    dialog.querySelector('#cancel').addEventListener('click', () => {
      dialog.close();
    });
}