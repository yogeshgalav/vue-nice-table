<template>
	<div>
	  <vue-nice-table
		id="ctable"
		ref="table"
		v-model:sort-by="sortBy"
		v-model:sort-desc="sortDesc"
		hover="hover"
		:striped="false"
		bordered
		:small="small"
		:fields="fields"
		:fixed="fixed"
		responsive="sm"
		:items="items"
		class="text-center"
		:current-page="currentPage"
		:per-page="0"
		no-local-sorting
		:tbody-tr-class="rowClass"
		@row-dblclicked="dbClick"
		@row-clicked="singleClick"
	  >
		<template #head_selected>
		  <b-form-checkbox
			id="checkboxAll"
			v-model="allSelected"
			name="checkboxAll"
			@change="selectAll"
		  />
		</template>
		<template #cell_selected="item">
        <b-form-checkbox
          :id="'checkbox_' + item.index"
          v-model="item.item.selected"
          :name="'checkbox_' + item.index"
          @change.stop="toggleSelectAll"
        />
      </template>
		<template #cell_action="data">
		  <i
			v-if="showEdit"
			class="fa fa-pencil-square-o cursor-pointer"
			aria-hidden="true"
			@click.stop="edit(data)"
		  />
		  <i
			v-if="showDelete"
			class="fa fa-trash cursor-pointer text-danger"
			aria-hidden="true"
			@click.stop="remove(data)"
		  />
		</template>
		<template #empty>
		  <div class="text-center">
			{{ "NORECORDSFOUND" }}
		  </div>
		</template>
	  </vue-nice-table>
	  <nav
		v-show="showPagination"
		v-if="items.length > 0"
	  >
		<b-pagination
		  v-model="currentPage"
		  :total-rows="total"
		  :per-page="perPage"
		  :prev-text="'FORWARD'"
		  :next-text="'NEXT'"
		  hide-goto-end-buttons
		/>
	  </nav>
	</div>
  </template>
  
  <script>
//   import VueNiceTable from "vue-nice-table";
  let defaultValue = false;
  export default {
	  name: "CTable",
	  components: {
		//   VueNiceTable,
	  },
	  inheritAttrs: false,
	  props: {
		  caption: {
			  type: String,
			  default: "Table",
		  },
		  hover: {
			  type: Boolean,
			  default: defaultValue,
		  },
		  striped: {
			  type: Boolean,
			  default: defaultValue,
		  },
		  bordered: {
			  type: Boolean,
			  default: defaultValue,
		  },
		  small: {
			  type: Boolean,
			  default: defaultValue,
		  },
		  fixed: {
			  type: Boolean,
			  default: defaultValue,
		  },
		  tableData: {
			  type: [Array, Function],
			  default: () => [],
		  },
		  fields: {
			  type: [Array, Object],
			  default: () => [],
		  },
		  perPage: {
			  type: Number,
			  default: 5,
		  },
		  dark: {
			  type: Boolean,
			  default: defaultValue,
		  },
		  dbClick: {
			  type: Function,
			  default: () => [],
		  },
		  singleClick: {
			  type: Function,
			  default: () => [],
		  },
		  selectItemsToDelete: {
			  type: Function,
			  default: () => [],
		  },
		  showPreviewPDF: {
			  type: Function,
			  default: () => [],
		  },
		  showPagination: {
			  type: Boolean,
			  default: true,
		  },
		  total: {
			  type: Number,
			  default: 10,
		  },
		  pagination: {
			  type: Function,
			  default: () => [],
		  },
		  showEstimationList: {
			  type: Function,
			  default: () => [],
		  },
		  changePaymentType: {
			  type: Function,
			  default: () => [],
		  },
		  showSenderList: {
			  type: Function,
			  default: () => [],
		  },
		  sortTable: {
			  type: Function,
			  default: () => {},
		  },
		  sortTableAsc: {
			  type: Function,
			  default: () => {},
		  },
		  currentPagination: {
			  type: Number,
			  default: 1,
		  },
		  showEdit: {
			  type: Boolean,
			  default: defaultValue,
		  },
		  showDelete: {
			  type: Boolean,
			  default: defaultValue,
		  },
	  },
	  data: () => {
		  return {
			  currentPage: 1,
			  allSelected: false,
			  items: [],
			  checkedItems: [],
			  sortBy: "",
			  sortDesc: false,
			  editingValue: null,
			  internalValue: "",
		  };
	  },
	  computed: {
		  totalRows: function() {
			  return this.getRowCount();
		  },
		  captions: function() {
			  return this.fields;
		  },
	  },
	  watch: {
		  checkedItems() {},
		  sortBy: function() {
			  this.sortTable(this.sortBy, this.sortDesc ? "desc" : "asc");
			  this.sortTableAsc(this.sortBy, this.sortDesc ? "asc" : "desc");
		  },
		  sortDesc: function() {
			  this.sortTable(this.sortBy, this.sortDesc ? "desc" : "asc");
			  this.sortTableAsc(this.sortBy, this.sortDesc ? "asc" : "desc");
		  },
		  currentPagination: function() {
			  this.currentPage = this.currentPagination;
		  },
		  tableData(value) {
			  this.setItems(value);
		  },
		  currentPage(value, oldValue) {
			  if(value.toString()===oldValue.toString()){
				  return false;
			  }
			  this.allSelected = false;
			  this.pagination(value);
		  }
		  // items: function() {
		  //   this.checkedItems = this.items.filter((item) => item.selected == true);
		  //   if (this.checkedItems == 0) {
		  //     this.allSelected = false;
		  //   }
		  // },
	  },
	  mounted() {
		  this.setItems(this.tableData);
		  this.currentPage = this.currentPagination;
	  },
	  methods: {
		  setItems(tableData){
			  this.items =  tableData.map((currentValue) =>{
			  // if(!this.checkbox){
			  // 	return currentValue;
			  // }
				  currentValue.selected = currentValue.selected ||false;
				  currentValue.trClass = this.rowClass(currentValue, 'row');
				  return currentValue;
			  });
		  },
		  onChange(updatedValue) {
			  this.$emit("inlineEdit", updatedValue);
		  },
		  getBadge(status) {
			  return status === "Active"
				  ? "success"
				  : status === "Inactive"
					  ? "secondary"
					  : status === "Pending"
						  ? "warning"
						  : status === "Banned"
							  ? "danger"
							  : "primary";
		  },
		  getRowCount: function() {
			  return this.items.length;
		  },
		  selectAll() {
			  if (!this.allSelected) {
				  this.items.map(function(currentValue) {
					  currentValue.selected = false;
				  });
				  this.selectItemsToDelete([]);
			  } else {
				  this.items.map(function(currentValue) {
					  currentValue.selected = true;
				  });
				  this.selectItemsToDelete(this.items);
			  }
		  },
		  toggleSelectAll() {
			  this.checkedItems = this.items.filter((item) => item.selected == true);
		this.allSelected = (this.checkedItems.length=== this.items.length);
			  setTimeout(() => {
				  this.selectItemsToDelete(this.checkedItems);
			  }, 0);
		  },
		  edit(item) {
			  this.$emit("onEdit", item);
		  },
		  remove(item) {
			  this.$emit("onDelete", item);
		  },
		  //for the status 配送済み change the background color;
		  rowClass(item , type) {
			  //console.log(this.$route.path);
			  if (!item  || type !== 'row') return '';
			  if (item.status === '配送済み' && (this.$route.path == '/purchase/list' || this.$route.path == '/purchase/instruction/list')) return 'table-success'
			  if (item.delivery_downloaded == 1 && this.$route.path == '/delivery') return 'table-success'
		  },
	  },
  };
  </script>
  <style>
  #ctable thead {
	background: #595959;
	color: #fff;
	cursor: pointer;
  }
  
  /* #ctable thead th:first-child {
     width: 100px;
  } */
  
  #ctable thead th {
	border: 1px solid #dee2e6;
	padding-left: 8px !important;
	padding-right: 8px !important;
	background: #595959;
  }
  #ctable tbody tr td {
	cursor: pointer;
	border: 1px solid #dee2e6;
  }
  input[type="checkbox"].custom-control-input {
	position: absolute;
	z-index: 1;
	opacity: 0.0005;
	width: 20px;
	height: 20px;
  }
  .p-right {
	padding-right: 18px;
  }
  .inherit-display {
	display: block ruby;
  }
  .cursor-pointer {
	cursor: pointer;
  }
  #ctable thead th:focus {
	outline: #4dbd74 auto 1px;
  }
  #ctable tbody tr:focus {
	outline: #4dbd74 auto 1px;
  }
  table .form-check-input:checked {
	  background-color: #4dbd74;
	  border-color: #4dbd74;
  }
  table .form-check-input:focus {
	  box-shadow: 0 0 0 0.1rem rgba(77, 189, 116, 0.7);
  }
  </style>
  