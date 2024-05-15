# Vue Nice Table

Vue nice table is light weight table componet based on bootstrap-vue table. it's only dependency is bootstrap css. It has been used inenterpise level application so feel free to use it. its been created with vue SFC mode in composition API, with Typescrpit, Hence future proof. 


**Here are some usefull links:**

1. [Demo](#)
2. [Documentation](#)
3. [Discord](#)


## Installaton

`npm install vue-nice-table`


## Basic usage


## Probs

|    Prop    |    Type    |    Default    |    Description    |       
|------------|:----------:|:-------------:|------------------:|
|    sortBY     |    String     |    ""       |   The current column key being sorted, or an empty string if not sorting     |       
|    sortDesc   |    Boolean    |   true      |   The current sort direction (true for descending, false for ascending)    |       
|    responsive |[String, Boolean]|   ""      |   Makes the table responsive in width, adding a horizontal scrollbar. Set to true for always responsive or set to one of the breakpoints to switch from responsive to normal: 'sm', 'md', 'lg', 'xl'    |       
|    busy       |    Boolean    |    false    | When set, forces the table into the busy state.Automatically set when an items provider function is being called      |       
|    headVariant|    Boolean    |    false    |Header variant: 'light' or 'dark', or unset. May take precedence over head-row-variant|       
|    hover      |    Boolean    |    false    | Enables hover styling on rows      |       
|    striped    |    Boolean    |    false    |   Applies striping to the tbody rows    |       
|    bordered   |    Boolean    |    false    |Adds borders to all the cells and headers|       
|    small      |    Boolean    |    false    |  Renders the table with smaller cell padding     |       
|    fields     |    Array      |    []       |  Array of field names or array of field definition objects     |       
|    items      |    Array      |     []      |Array of items to display, or an items provider function reference. Refer to the docs for details|       
|    perPage    |    Number     |    10       |Number of rows to show per page. Set to 0 to disable pagination|       
   



## Field prop
|      Key      |      type      | description  |            
|---------------|----------------|--------------|
|      key      |      string    |  The key for selecting data from the record in the items array. Required when setting the fields via an array of objects. The key is also used for generating the custom data rendering and custom header and footer slot names. |
|      label    |      string    |Appears in the columns table header (and footer if foot-clone is set). Defaults to the field's key (in humanized format) if not provided. It's possible to use empty labels by assigning an empty string "" but be sure you also set headerTitle to provide non-sighted users a hint about the column contents.|
|      class    |      string    | Class name (or array of class names) to add to <th> and <td> in the column.  |
|    sortable   |   Boolean      |   Enable sorting on this column. Refer to the Sorting Section for more details.    |       
|     formatter |     (cellItem: any, fieldKey: string, rowItem: any) => any        |  A formatter callback function or name of a method in your component, can be used instead of (or in conjunction with) scoped field slots. The formatter will be called with the syntax formatter(value, key, item). Refer to Custom Data Rendering for more details. |

## Events

|      Events      |      Arguments      | description  |            
|---------------|----------------|--------------|
|      sortChanged      |      ctx - Table state context object. See docs   | Emitted when the sorting on the table has changed  |
|      update:sortby    |      sort_by    |   |
|      update:sortDesc  |      sort_desc      |   |
|      rowDbclicked     |      item - Item data of the row being double clicked, index - Index of the row being double clicked ,event - Native event object      | Emitted when a row is double clicked  |
|      rowClicked       |       item - Item data of the row being clicked, index - Index of the row being clicked, event - Native event object       | Emitted when a row is clicked         |

