module.exports = (url, {
    tabs = "result",
    height = "300",
    theme = "dark",
    preview = "true",
    user= "kkern",
    style="box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;",
    title=""
  } = {}) => {
      const path = new URL(url).pathname;
      const id = path.split('/')[3];
      return `<p class="codepen" data-user="${user}" data-height="${height}" data-theme-id="${theme}" data-default-tab="${tabs}" data-preview="${preview}" data-slug-hash="${id}" style="${style}" data-pen-title="${title}">
      <span><a href="${url}">See the Pen </a></p>
    <script async src="https://static.codepen.io/assets/embed/ei.js"></script>`;
  };