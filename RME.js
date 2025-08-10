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

export function Initialize() {
	device.setName(controller.name);

}

export function Render() 
{

}

export function Shutdown() {

}


// -------------------------------------------<( Discovery Service )>--------------------------------------------------

export function DiscoveryService() {
	this.IconUrl = "https://assets.signalrgb.com/brands/custom/lianli/logo.png";

    this.initialized = true;

}

export function ImageUrl()
{
  return "https://assets.signalrgb.com/partners/lian-li/logo.png";
}