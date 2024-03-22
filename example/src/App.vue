<template>
	<div>
		<c-table
		:table-data="items"
		:fields="fields"
		></c-table>
	</div>
</template>
<script setup>
import CTable from './Table.vue';
import { reactive } from 'vue';
const fields= reactive([
			{
				'key': 'age',
				'label': 'Age',
				'sortable': true,
			},
			{
				'key': 'first_name',
				'label': 'first_name',
				'sortable': true,
			},
			{
				'key': 'last_name',
				'label': 'last_name',
				'sortable': true,
			}
]);

const items= reactive([
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { age: 38, first_name: 'Jami', last_name: 'Carney' }
        ]);
</script>