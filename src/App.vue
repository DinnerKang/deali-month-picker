<template>
  <div id="deali-month-picker">
      <div class="month_picker_container">
          <div class="year_select_area">
            <img :src="arrowIcon" class="right_arrow arrow" v-on:click="clickYear(0)" />
            <div class="now_year">{{nowYear}}</div>
            <img :src="arrowIcon" class="arrow" v-on:click="clickYear(1)" />
          </div>
          <div class="month_select_area">
            <ul class="month_list_area">
              <li v-for="list in month" class="month_list" v-on:click="clickMonth(list)"
                  :key="list" :class="{ active_month: list===activeMonth, disable_month: checkDisAble(list)}">
                  {{list}}
              </li>
            </ul>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'deali-month-picker',
  props:{
    minDate:{
      type: Object,
    },
    maxDate: {
      type: Object,
    }
  },
  data(){
    return{
      nowYear : new Date().getFullYear(),
      arrowIcon: require('./assets/ic-arrow-left-gray-50-24-n.svg'),
      month: [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      activeMonth: '',
    }
  },
  methods:{
    clickYear(status){
      if(status===0) this.nowYear--;
      if(status===1) this.nowYear++;

      if(this.activeMonth){
        const data = this.checkDate(this.activeMonth);
        this.$emit('clickDate', data);
      }
    },
    clickMonth(list){
      if(this.activeMonth === list) return;
      if(this.checkDisAble(list)) return;
      this.activeMonth = list;
      const data = this.checkDate(list);
      this.$emit('clickDate', data);
    },

    checkDate(list){
      const month = list.split('월');
      const day = this.nowYear+ '-' + month[0];
      const DATE = new Date(day);
      return DATE;
    },
    checkDisAble(list){
      const data = this.checkDate(list);
      const now = new Date(data);
      if(now > this.maxDate){
        return true;
      }
      if( now < this.minDate){
        return true;
      }
    }
  }
}
</script>

<style scoped>
  ul, li{
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .month_picker_container{
    width: 308px;
    height: 184px;
    border-radius: 4px;
    border: solid 2px #efefef;
    background-color: #ffffff;
    box-sizing: border-box;
    padding: 24px;
  }
  .year_select_area{
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 0 0 16px 0;
  }
  .now_year{
    font-weight: bold;
    margin:0 90px;
  }
  .arrow{
    cursor: pointer;
  }
  .right_arrow{
    transform: rotate(180deg);
  }
  .month_list_area{
    height: 100%;
  }
  .month_list{
    border-radius: 50%;
    width: 40px;
    height: 40px; 
    display: inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: space-around;
    cursor: pointer;
    background-color: #fff;
    margin-bottom: 16px;
    text-align: center;
    font-size:14px;
    color: #222;
  }
  .month_list:hover{
    background-color: #f6f6f6;
  }
  .active_month{
    color: #fff;
    background-color: #ff7f7a;
  }
  .active_month:hover{
    background-color: #ff7f7a;
  }
  .disable_month{
    cursor:not-allowed;
    color: #fff;
    background-color: #f6f6f6;
  }
</style>