export function Name() { return "RMEdiy"; }
export function Version() { return "1.0.0"; }
export function Type() { return "network"; }
export function Publisher() { return "n00bmax"; }
export function Size() { return [20, 20]; }
export function DefaultPosition() {return [75, 70]; }
export function DefaultScale(){return 1.0;}

export function ControllableParameters(){
  return [
    {"property":"shutdownColor", "group":"lighting", "label":"Shutdown Color", description: "This color is applied to the device when the System, or SignalRGB is shutting down", "min":"0", "max":"360", "type":"color", "default":"#000000"},
		{"property":"LightingMode", "group":"lighting", "label":"Lighting Mode", description: "Determines where the device's RGB comes from. Canvas will pull from the active Effect, while Forced will override it to a specific color", "type":"combobox", "values":["Canvas", "Forced"], "default":"Canvas"},
		{"property":"forcedColor", "group":"lighting", "label":"Forced Color", description: "The color used when 'Forced' Lighting Mode is enabled", "min":"0", "max":"360", "type":"color", "default":"#009bde"},   
  ];
}
/* global
controller:readonly
*/

let streamingAddress = "";
let streamingPort = "";

export function SubdeviceController(){ return true; }


export function Initialize() {
	device.setName(controller.name);

	device.addFeature("udp");

	streamingAddress = "127.0.0.1";
	streamingPort = 61447;

  spawnSubdevices();

}

export function Render() 
{
  if(controller.children.primary !== undefined) {
    grabColors(controller.children.primary);
  }  
}

export function Shutdown() {

}

function spawnSubdevices() {
  if(controller.children.primary !== undefined) {
    spawnSubdevice(controller.children.primary);
  } 
}

function spawnSubdevice(subdevice) {
  device.createSubdevice(subdevice.name);

	device.setSubdeviceName(subdevice.name, `${"LianLi Colordrop"} - ${subdevice.name}`);

	device.setSubdeviceLeds(subdevice.name, subdevice.ledNames, subdevice.ledPositions);

	device.setSubdeviceSize(subdevice.name, subdevice.size[0], subdevice.size[1]);

  device.setSubdeviceImageUrl(subdevice.name, subdevice.image);
}

function grabColors(subdevice, overrideColor) {
	const vLedPositions = subdevice.ledPositions;
  const rgbData = [];

  for(let leds = 0; leds < 400; leds++) {
    let col;

    if(overrideColor) {
      col = hexToRgb(overrideColor);
    } else if (LightingMode === "Forced") {
      col = hexToRgb(forcedColor);
    } else {
      col = device.subdeviceColor(subdevice.name, vLedPositions[leds][0], vLedPositions[leds][1]);
    }

    rgbData[leds * 3] = col[0];
    rgbData[leds * 3 + 1] = col[1];
    rgbData[leds * 3 + 2] = col[2];
  }

  sendZonePacket(subdevice.offset, rgbData);
}

function sendZonePacket(zone, rgbData) {
  udp.send(streamingAddress, streamingPort, [    
    0x1e, //led count
  ].concat(rgbData));
}

// -------------------------------------------<( Discovery Service )>--------------------------------------------------

export function DiscoveryService() {
	this.IconUrl = "https://assets.signalrgb.com/brands/custom/lianli/logo.png";

  // This will eventually poll to get a list of available devices.
  // 127.0.0.1:61337

	this.timeSinceLastReq = 0;
	this.Retries = 5;
	this.RetryCount = 0;
  this.initialized = false;

	this.Initialize = function() {
    
	};


	this.Update = function() {
    // Autodiscover.
    if (!this.initialized){
      this.Discovered();
      this.initialized = true;
    }    
	};

	this.Discovered = function() {
		this.CreateControllerDevice("20000"); //placeholder ID
	};


  this.CreateControllerDevice = function(value){
		const controller = service.getController(value);

		if (controller === undefined) {
      const cont = new LianLiParent(value)

			service.addController(cont);

      service.announceController(cont);
		} else {
			controller.updateWithValue(value);
		}
	};
}

class LianLiParent {
  constructor(id){
		this.updateWithValue(id);
    this.children = {};

    this.populateChildren();
	}

  populateChildren() {    
    this.children.primary = new LianLiSwatch();    
  }

	updateWithValue(id){
		this.id = id;
		this.port = 61447;
		this.ip = "127.0.0.1";
    this.name = "LianLi Colordrop Service";

		service.updateController(this);
	}
}

class LianLiSwatch {
	constructor(value) 
  {
    this.offset = value;
    this.typename = this.offsetToName(this.offset);    
    this.image = this.offsetToImage(this.offset);
		this.name = this.typename; //calc zone here based on offset
    this.generateLeds(400);
	}

  generateLeds(count) {
    const vLedNames = [];
    const vLedPositions = [];
  
    for(let iIdx = 0; iIdx < count; iIdx++) {
      var x = iIdx % 20;
      var y = iIdx / 20;            
      vLedNames.push(`LED ${iIdx + 1}`);
      vLedPositions.push([x, y]);
    }
  
    this.ledNames = vLedNames;
    this.ledPositions = vLedPositions;
    this.size = [20,20];
  }

  offsetToName(offset) {
    return "Primary";
  }

  offsetToImage(offset) {    
      return "https://assets.signalrgb.com/devices/brands/lian-li/fan-controllers/strimmer-controller.png";    
  }
}

export function ImageUrl()
{
  return "https://assets.signalrgb.com/partners/lian-li/logo.png";
}