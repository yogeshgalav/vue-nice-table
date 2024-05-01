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
|    sortDesc   |    Boolean    |   true   |    Description    |       
|    sortable    |   Boolean    |    false    |    Description    |       
|    responsive    |    [String, Boolean]    |   ""   |    Description    |       
|    busy    |    Boolean   |    false    |    Description    |       
|    headVariant   |    Boolean    |    false    |    Description    |       
|    hover   |    Boolean    |    false    |    Description    |       
|    striped   |    Boolean    |    false    |    Description    |       
|    bordered    |    Boolean    |    false    |    Description    |       
|    small    |    Boolean    |    false    |    Description    |       
|    fields   |    Array as PropType<TField[]>    |    () => []    |    Description    |       
|    items    |    Array as PropType<Array<Record<string, any>>>    |     () => []    |    Description    |       
|    perPage    |    Number    |    10    |    Description    |       
|        |    Type    |    Default    |    Description    |       
|     



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

