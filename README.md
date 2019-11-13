# deali-month-picker

dealicious 를 위한 컴포넌트


##Usage
```bash
props:{
    minDate: {
      type: Object
    },
    maxDate: {
      type: Object
    }
}
```

### minDate, maxDate 값은 : Date 객체

```bash
<template>
    <div>
        <deali-month :maxDate="nowDate" @clickDate="getDate"></deali-month>
    </div>
</template>

<script>
    import dealiMonth from 'deali-month-picker';


    export default {
        components:{
            dealiMonth
        },
        data(){
          return{
              nowDate : new Date(),
          }
        },
        methods:{
            getDate(payload){
                console.log(payload);
            }
        }

    }
</script>
```