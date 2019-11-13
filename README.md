# vue-month-picker

##Usage
```bash
props:{
    minDate:'',
    maxDate:'',
}
```

minDate, maxDate 값은 : Date 객체(new Date()) or '2019-11' 등등...

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