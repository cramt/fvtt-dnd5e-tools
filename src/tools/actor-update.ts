import { MODULE_NAME } from ".";
import { libwrapper } from "./libwrapper";
import { ProfType, ToolData } from "./model";
import { standardTools } from "./standard-tools";

export const updateActor = async () => {
  (await libwrapper()).register(
    MODULE_NAME,
    "CONFIG.Actor.entityClass.prototype.prepareData",
    function (this: Actor, wrapper) {
      wrapper();
      let joat = !!this.getFlag("dnd5e", "jackOfAllTrades");
      let toolData: ToolData;
      if (joat) {
        toolData = Object.assign(
          Object.fromEntries(
            Object.entries(standardTools).map((x) => {
              const [type, tools] = x;
              return [
                type,
                tools.map((x) => ({
                  name: x,
                  prof: ProfType.HalfProficiency,
                })),
              ];
            })
          ),
          this.data.data.toolData
        );
      } else {
        toolData = {
          Vehicles: [],
          "Playing Sets": [],
          "Artisans Tools": [],
          Instruments: [],
        };
      }
      this.data.data.toolData = toolData;
    },
    "WRAPPER"
  );
};
