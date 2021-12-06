import VueNiceTable from "./VueNiceTable.vue";

function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component("vue-nice-table", VueNiceTable);
}

const plugin = {
  install
};

let GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

VueNiceTable.install = install;

export default VueNiceTable;