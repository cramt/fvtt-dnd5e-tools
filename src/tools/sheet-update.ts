import { MODULE_NAME } from ".";
import { libwrapper } from "./libwrapper";
import { ProfType, ToolData } from "./model";
import toolTab from "./tool-tab.hbs";

export const updateSheet = async () => {
  (await libwrapper()).register(
    MODULE_NAME,
    "game.dnd5e.applications.ActorSheet5eCharacter.prototype._renderInner",
    async function (this: ActorSheet, wrapper, data, options) {
      const html = await wrapper(data, options);
      // @ts-ignore
      window.a = this;
      await injectHtml(html, this.object.data.data.toolData, this.object);
      return html;
    },
    "WRAPPER"
  );
};

const injectHtml = async (html: JQuery, data: ToolData, actor: Actor) => {
  const tabSelector = html.find("nav.tabs");
  const toolTabString =
    '<a class="item" data-group="primary" data-tab="toolsProficiencies">Tools</a>';
  tabSelector.append($(toolTabString));
  const sheetContainer = html.find(`.sheet-body`);
  const tabContainer = $(
    '<div class="tab" data-group="primary" data-tab="toolsProficiencies"></div>'
  );
  sheetContainer.append(tabContainer);
  let template = await renderTemplate(toolTab, {
    // @ts-ignore
    abilities: CONFIG.DND5E.abilities,
    proficiencyLevels: {
      "Half Proficiency": ProfType.HalfProficiency,
      Proficiency: ProfType.Proficiency,
      Expertise: ProfType.Expertise,
    },
    data,
    isTidy5e: false,
    owner: actor.owner,
    MODULE_NAME,
    profMod: actor.data.data.attributes.prof,
  });
  console.log(template);
  tabContainer.append(template);
};
