export interface Libwrapper {
  register(
    module: string,
    target: string,
    fn: (...args: any[]) => any,
    type?: "WRAPPER" | "MIXED" | "OVERRIDE"
  ): void;
}

let hooks: ((value: Libwrapper) => void)[] = [];

let internal_libwrapper: Libwrapper | undefined;

Hooks.once("init", () => {
  if (!game.modules.get("lib-wrapper")?.active) {
    ui.notifications?.error(
      "Tools for the DnD5e character sheet requires lib-wrapper"
    );
    return;
  }
  // @ts-ignore
  internal_libwrapper = globalThis.libWrapper;
  hooks.forEach((x) => x(internal_libwrapper!));
});

export const libwrapper = () =>
  new Promise<Libwrapper>((resolve, reject) => {
    if (internal_libwrapper === undefined) {
      hooks.push(resolve);
    } else {
      resolve(internal_libwrapper);
    }
  });
