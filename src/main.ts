import { FreeAtHome } from '@busch-jaeger/free-at-home';

const freeAtHome = new FreeAtHome();
freeAtHome.activateSignalHandling();

async function main() {
  {
    const channel = await freeAtHome.createSplitUnitDevice("mySplitUniteId", "SplitUnite");
    channel.setAutoKeepAlive(true);

    channel.setAutoConfirm(true); // use this for devices without feedback

    // use to set state from your device to free at home (for devices with feedback)
    channel.setOn(true);
    channel.setModeHeating();
    channel.sendSetPointTemperature(20);

    // react on events from free at home
    channel.on("isOnChanged", (value: boolean) => {
        console.log("set ", value ? "on" : "off");
    });

    channel.on("setPointTemperatureChanged", (value: number) => {
        console.log("setTemperature:", value);
    });

    channel.on("setModeCooling", () => {
      console.log("set cooling");
    });

    channel.on("setModeHeating", () => {
        console.log("set heating");
    });

    channel.on("setModeAuto", () => {
        console.log("set auto");
    });
  }
}

main();