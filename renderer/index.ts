function main() {
  const app = document.getElementById('app');
  if (app === null) {
    return;
  }

  const p1 = document.createElement('p');
  p1.innerText = `electron version: ${api.electronVersion}`;
  const p2 = document.createElement('p');
  p2.innerText = `node version: ${api.nodeVersion}`;
  const p3 = document.createElement('p');
  p3.innerText = `chrome version: ${api.chromeVersion}`;

  app.append(p1, p2, p3);
}

main();
