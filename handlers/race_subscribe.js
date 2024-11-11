bindClickWithTag(getElementByXpath(document, '//div[@role="button"]'), function() {
	console.log('subscribe click with notify');
    const dialog = document.createElement('dialog');
    dialog.innerHTML = `
      <form method="dialog" style="width: 400px;">
        <p><label>Input notify EMAIL: <input style="width: 200px;" type="text" id="email"></label></p>
        <menu>
          <button id="cancel" value="cancel">Cancel</button>
          <button id="submit" value="default">Submit</button>
        </menu>
      </form>
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
})