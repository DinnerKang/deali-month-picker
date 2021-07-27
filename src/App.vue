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
                  :key="list"
                  :class="{
                    active_month: checkActiveMonth(list),
                    disable_month: checkDisAble(list),
                    }">
                  <span>{{list}}</span>
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
    minDate: {
      type: Date,
      default: () =>  new Date('2020-01-01'),
    },
    maxDate: {
      type: Date,
      default: () =>  new Date(),
    },
    checkedDate: {
      type: [Date, String],
      default: '',
    },
  },
  data(){
    return{
      nowYear : this.checkedDate ? this.checkedDate.getFullYear() : new Date().getFullYear(),
      arrowIcon: require('./assets/ic-arrow-left-gray-50-24-n.svg'),
      month: [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      activeMonth: this.checkedDate,
    }
  },
  methods:{
    clickYear(status){
      if(status===0 && this.minDate.getFullYear() < this.nowYear) this.nowYear--;
      if(status===1 && this.maxDate.getFullYear() > this.nowYear) this.nowYear++;

      this.activeMonth = '';
    },
    clickMonth(list){
      if(this.activeMonth === list) return;
      if(this.checkDisAble(list)) return;
      this.activeMonth = list;
      const data = this.checkDate(list);
      this.$emit('clickDate', data);
    },
    checkActiveMonth(list) {
      if (this.checkedDate === '') return false;

      const date = String(this.checkDate(list).getFullYear()) + String(this.checkDate(list).getMonth());
      const checked = String(this.checkedDate.getFullYear()) + String(this.checkedDate.getMonth());

      if (date === checked) {
        return true;
      }
      return false;
    },
    checkDate(list){
      const month = list.split('월');
      if (Number(month[0]) < 10){
        month[0] = 0 + month[0];
      }
      const day = this.nowYear+ '-' + month[0];
      const DATE = new Date(day);
      return DATE;
    },
    // 사용 금지 체크
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
    display:flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .month_list{
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: #fff;
    text-align: center;
    font-size:14px;
    color: #222;
  }
  .month_list:hover{
    background-color: #f6f6f6;
  }
  .active_month{
    color: #fff;
    background-color: #fb4760;
  }
  .active_month:hover{
    background-color: #c8384c;
  }
  .disable_month{
    cursor:not-allowed;
    color: #f6f6f6;
    background-color: #fff;
  }
</style>
