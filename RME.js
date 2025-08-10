export function Name() { return "RMEdiy"; }
export function Version() { return "1.0.0"; }
export function Type() { return "network"; }
export function Publisher() { return "n00bmax"; }
export function Size() { return [20, 20]; }
export function DefaultPosition() {return [75, 70]; }
export function DefaultScale(){return 1.0;}



export function ImageUrl()
{
  return "https://assets.signalrgb.com/partners/lian-li/logo.png";
}



export function ControllableParameters() {
  return [
    {
      property: "colorInput",
      label: "Select Color",
      type: "color",
      default: "#FF0000",
      group: "settings",
    },
  ];
}

let lastColor = null;

export function Initialize() {
  service.log("HTTP Color Sender Addon initialized");
  lastColor = controller.colorInput;
  sendColorRequest(lastColor);
}

export function oncolorInputChanged() {
  if (controller.colorInput !== lastColor) {
    lastColor = controller.colorInput;
    service.log(`Color changed to ${lastColor}, sending HTTP request...`);
    sendColorRequest(lastColor);
  }
}

function sendColorRequest(colorHex) {
  // Change this URL to your target endpoint
  const url = `http://localhost:3333/metercolor/1`;

  XmlHttp.Get(url, (xhr) => {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        service.log(`HTTP request successful: ${url}`);
      } else {
        service.log(`HTTP request failed: ${xhr.status} ${xhr.statusText}`);
      }
    }
  });
}

// Simple XMLHttpRequest helper
class XmlHttp {
  static Get(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = () => callback(xhr);
    xhr.send();
  }
}

export function Shutdown() {
  service.log("HTTP Color Sender Addon shutting down");
}

export function ImageUrl() {
  return "https://assets.signalrgb.com/brands/srgbmods/logo.jpg";
}
