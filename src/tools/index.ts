import { updateActor } from "./actor-update";
import { updateSheet } from "./sheet-update";

updateSheet();
updateActor();

Handlebars.registerHelper("math", function (lvalue, operator, rvalue, options) {
  if (arguments.length < 4) {
    // Operator omitted, assuming "+"
    options = rvalue;
    rvalue = operator;
    operator = "+";
  }

  lvalue = parseFloat(lvalue);
  rvalue = parseFloat(rvalue);
  //@ts-ignore
  return {
    "+": lvalue + rvalue,
    "-": lvalue - rvalue,
    "*": lvalue * rvalue,
    "/": lvalue / rvalue,
    "%": lvalue % rvalue,
  }[operator];
});

Handlebars.registerHelper(
  "ifEquals",
  function (this: any, arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  }
);

export const MODULE_NAME = "fvtt-dnd5e-tools";
