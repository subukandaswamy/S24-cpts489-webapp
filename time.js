function currentTime() {
  const ts = new Date().toLocaleTimeString();
  return `<h2>${ts}</h2>`;
}

module.exports = {
  currentTime,
};
