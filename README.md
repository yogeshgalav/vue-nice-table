# Vue Nice Table

## Project setup
```
npm install
```

## Usage
### Basic Usage
```
 <vue-table-component
    :columns="columns_array"
    :rows="rows_array"
    :footer="footer_object"
    :stripe="false"
 />
```
### Props data type 
```
data() {
    return {
        rows_array:[],
        footer_object:{},
        columns: [
				{
					label: 'Full Name',
					field: 'full_name',
                },
                {
					label: 'Email',
					field: 'email',
                    type: 'string',
                },
                {
					label: 'Phone number',
					field: 'phone_number',
                    type: 'number',
                },
                {
					label: 'Password',
					field: 'password',
                    show: false,
                },
                {
					label: 'Score',
					field: 'average_score',
                    type: 'float',
                    decimalPoint: 3,
                },
                {
					labelTop: 'Very Very',
					label: 'Big Name',
					field: 'xyz',
                    type: 'percentage',
                },
        ]
    };
}
```

### Body Slot Scope 
```
<vue-table-component
    :columns="columns"
    :rows="rows"
>
    <template
        slot="table-row"
        slot-scope="props"
    >
        <span v-if="props.column.field==='full_name'">
            <a
                :href="'/profile/'+props.row.user_id"
                class="text-underline"
            >{{ props.row['full_name'] }}</a>
        </span>
        <span v-else>
            <span
                v-if="props.row.average_score<5"
                class="text-warning"
            >{{ props.row[props.column.field] }}</span>
            <span v-else>{{ props.row[props.column.field] }}</span>
        </span>
    </template>
    <template slot="emptystate">
        No data present.
    </template>
</vue-table-component>
```

### Use Api to sort table
```
<vue-table-component
    :columns="columns"
    :rows="rows"
    :sort-by-api="true"
    @sort="sortFunction('custom_argument',...arguments)"
>

</vue-table-component>
```
```
sortSessions(custom_argument,sortBy,sortType){
    Call your api to sort
}
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
