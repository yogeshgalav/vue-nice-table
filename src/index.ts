import { App } from "vue";
import VueNiceTable from "./VueNiceTable.vue";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const VnTable = VueNiceTable;

export default {
	install(app: App): void {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		app.component("VnTable", VueNiceTable);
	},
};
