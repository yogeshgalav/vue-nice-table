<template>
	<div :class="['text-center', tableResponsiveClass]">
		<table :class="tableClasses">
			<thead class="thead-dark">
				<tr>
					<th
						v-for="(field, colindex) in tableFields"
						:key="field.key"
						:class="field.class"
						role="columnheader"
						scope="col"
						tabindex="0"
						:aria-colindex="colindex"
						:aria-sort="ariaSort[field.key]"
						@click="sortTable(field.key)"
					>
						<slot :name="'head_' + field.key" :label="field.label">
							{{ String(field.label) }}
						</slot>
					</th>
				</tr>
			</thead>
			<tbody v-if="busy">
				<tr>
					<td :colspan="fields.length">
						<slot name="table-busy" />
					</td>
				</tr>
			</tbody>
			<tbody v-else-if="!items.length">
				<tr>
					<td :colspan="fields.length">
						<slot name="empty" />
					</td>
				</tr>
			</tbody>
			<transition-group v-if="!busy" name="fade" tag="tbody">
				<tr
					v-for="(item, item_key) in tableItems"
					:key="item_key"
					:class="item.trClass"
					@dblclick="dbRowClicked($event, item)"
					@click="rowClicked($event, item)"
				>
					<td
						v-for="field in fields"
						:key="field.key"
						:class="field.class"
					>
						<slot
							:name="'cell_' + field.key"
							:item="item"
							:index="item_key"
							:value="
								field.formatter
									? field.formatter(
											item[field.key],
											field.key,
											item,
										)
									: item[field.key]
							"
							:unformatted="item[field.key]"
							:field="field"
							:row-selected="false"
						>
							{{
								field.formatter
									? field.formatter(
											item[field.key],
											field.key,
											item,
										)
									: item[field.key]
							}}
						</slot>
					</td>
				</tr>
			</transition-group>
		</table>
	</div>
</template>

<script setup lang="ts">
import { PropType, computed } from "vue";
type TField = {
	key: string;
	label?: string;
	class?: string;
	sortable?: boolean;
	formatter?: (cellItem: any, fieldKey: string, rowItem: any) => any;
};
let props = defineProps({
	sortBy: {
		type: String,
		default: "",
	},
	sortDesc: {
		type: Boolean,
		default: true,
	},
	sortable: {
		type: Boolean,
		default: false,
	},
	responsive: {
		type: [String, Boolean],
		default: "",
	},
	busy: {
		type: Boolean,
		default: false,
	},
	headVariant: {
		type: Boolean,
		default: false,
	},
	hover: {
		type: Boolean,
		default: false,
	},
	striped: {
		type: Boolean,
		default: false,
	},
	bordered: {
		type: Boolean,
		default: false,
	},
	small: {
		type: Boolean,
		default: false,
	},
	fields: {
		type: Array as PropType<TField[]>,
		default: () => [],
	},
	items: {
		type: Array as PropType<Array<Record<string, any>>>,
		default: () => [],
	},
	perPage: {
		type: Number,
		default: 10,
	},
});

let emits = defineEmits([
	"sortChanged",
	"update:sortBy",
	"update:sortDesc",
	"rowDbClicked",
	"rowClicked",
]);

type TAriaSort = "none" | "desc" | "asc" | null;
// Record<string, TAriaSort>
let ariaSort = computed<Record<string, TAriaSort>>(() => {
	return props.fields.reduce(
		(result: Record<string, TAriaSort>, field: any) => {
			let aria_sort: TAriaSort = "none";
			if (!field.sortable) {
				aria_sort = null;
			}
			if (field.key == props.sortBy) {
				aria_sort = props.sortDesc ? "desc" : "asc";
			}
			result[field.key] = aria_sort;
			return result;
		},
		{},
	);
});

let tableClasses = computed<string>(() => {
	let class_str = "table b-table table-hover table-borderless";
	if (props.striped) class_str += " table-striped";
	if (props.hover) class_str += " table-hover";
	if (props.bordered) class_str += " border";
	if (props.small) class_str += " table-sm";
	return class_str;
});

let tableItems = computed(() => {
	if (!props.sortable) {
		return props.items;
	}

	return sortItems();
});
function sortItems() {
	return props.items;
}
let tableFields = computed(() => {
	if (!props.fields.length && props.items[0]) {
		return Object.keys(props.items[0]).map((el) => {
			return {
				key: el,
				label: el,
				sortable: true,
			};
		});
	}
	return props.fields;
});
let tableResponsiveClass = computed<string>(() => {
	let class_str = "";
	if (!props.responsive) {
		return class_str;
	}
	switch (props.responsive) {
		case "sm":
			class_str = "table-responsive-sm";
			break;
		case "md":
			class_str = "table-responsive-md";
			break;
		case "lg":
			class_str = "table-responsive-lg";
			break;
		case "xl":
			class_str = "table-responsive-xl";
			break;
		default:
			class_str = "table-responsive";
			break;
	}
	return class_str;
});

function sortTable(key: string) {
	if (ariaSort.value[key] == null) {
		return false;
	}
	let sort_by = key;
	let sort_desc = ["none", "asc"].includes(ariaSort.value[key])
		? true
		: false;
	emits("sortChanged", sort_by, sort_desc);
	emits("update:sortBy", sort_by);
	emits("update:sortDesc", sort_desc);
}

function rowClicked(e: Event, item: Record<string, any>) {
	const target = e.target as HTMLInputElement;
	if (target.nodeName == "INPUT") {
		return false;
	}
	emits("rowClicked", item);
}
function dbRowClicked(e: Event, item: Record<string, any>) {
	const target = e.target as HTMLInputElement;
	if (target.nodeName == "INPUT") {
		return false;
	}
	emits("rowDbClicked", item);
}
</script>

<style scoped>
.table.b-table > thead > tr > [aria-sort],
.table.b-table > tfoot > tr > [aria-sort] {
	cursor: pointer;
	background-image: none;
	background-repeat: no-repeat;
	background-size: 0.65em 1em;
}

.table thead th {
	vertical-align: bottom;
}

.table.b-table.table-sm > thead > tr > [aria-sort]:not(.b-table-sort-icon-left),
.table.b-table.table-sm
	> tfoot
	> tr
	> [aria-sort]:not(.b-table-sort-icon-left) {
	background-position: right 0.15rem center;
	padding-right: calc(0.3rem + 0.65em);
}

.table.b-table > thead > tr > th[aria-sort]:before,
.table.b-table > tfoot > tr > th[aria-sort]:before {
	display: inline-block;
	float: right;
	margin-left: 0.5em;
	width: 0.5em;
	font-size: inherit;
	line-height: inherit;
	opacity: 0.4;
	content: "\2195";
	speak: none;
}

.table.b-table > thead > tr > th[aria-sort="asc"]:before,
.table.b-table > tfoot > tr > th[aria-sort="asc"]:before {
	opacity: 1;
	content: "\2193";
}

.table.b-table > thead > tr > th[aria-sort="desc"]:before,
.table.b-table > tfoot > tr > th[aria-sort="desc"]:before {
	opacity: 1;
	content: "\2191";
}
</style>
