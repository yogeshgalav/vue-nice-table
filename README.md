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
|    sortBY    |    String    |    ""    |        |       
|    sortDesc   |    Boolean    |   true   |       |       
|    sortable    |   Boolean    |    false    |       |       
|    responsive    |    [String, Boolean]    |   ""   |       |       
|    busy    |    Boolean   |    false    |       |       
|    headVariant   |    Boolean    |    false    |       |       
|    hover   |    Boolean    |    false    |       |       
|    striped   |    Boolean    |    false    |       |       
|    bordered    |    Boolean    |    false    |       |       
|    small    |    Boolean    |    false    |       |       
|    fields   |    Array as PropType<TField[]>    |    []    |       |       
|    items    |    Array as PropType<Array<Record<string, any>>>    |     []    |       |       
|    perPage    |    Number    |    10    |       |       
   



## Field prop
|      Key      |      type      | description  |            
|---------------|----------------|--------------|
|      key      |      string    |   |
|      label      |      string    |   |
|      class    |      string      |   |
|      sortable      |      boolean      |   |
|      formatter      |     (cellItem: any, fieldKey: string, rowItem: any) => any        |   |

## Events

|      Events      |      parameteres      | description  |            
|---------------|----------------|--------------|
|      sortChanged      |      sort_by, sort_desc    |   |
|      update:sortby      |      sort_by    |   |
|      update:sortDesc    |      sort_desc      |   |
|      rowDbclicked      |      row_item      |   |
|      rowClicked      |      row_item        |   |

