const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
      color: red;
    }

    time {
      font-weight: bold;
    }

    slot {
      display: none;
    }
  </style>
  <slot></slot>
  "<time></time>"
`;

class TimeAgo extends HTMLElement {
  constructor() {
    super();
    console.log("TimeAgo constructor");

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));
    this._timeElement = shadowRoot.querySelector("time");
  }

  connectedCallback() {
    console.log("TimeAgo connected");
    const date = new Date((this.textContent || "").trim());
    this._timeElement.innerText = timeago.format(date);
  }

  disconnectedCallback() {
    console.log("TimeAgo disconnected");
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    console.log(
      `TimeAgo '${attributeName}' attribute changed from '${oldValue}' to '${newValue}'`
    );
  }

  adoptedCallback() {
    console.log("TimeAgo adopted");
  }
}

export default TimeAgo;
