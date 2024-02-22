class DePlan {
  connect() {
    return new Promise(resolve => {
      function onConnect(event) {
        resolve(event.data);
        window.removeEventListener('message', onConnect);
      };
      window.addEventListener('message', onConnect);
      window.parent.postMessage({ method: 'connect' }, 'https://app.deplan.xyz');
    });
  }
  disconnect() { }
  signAndSendTransaction() { }
  signTransaction() { }
  signAllTransactions() { }
  signMessage() { }
  signIn() { }
  on() { }
  off() { }
}

Object.defineProperty(window, 'deplan', { value: new DePlan() });