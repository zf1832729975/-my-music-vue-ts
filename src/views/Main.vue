<template>
  <el-container class="site-container">
    <SiteHeader />
    <el-container>
      <!-- <SiteAside />
      <el-main class="site-main">
        <el-button @click="getBanner">/banner</el-button>
      </el-main> -->
      <div>
        <div>
          <h3>测试1</h3>
          <h3>测试2</h3>
          <h3>测试3</h3>
          <h3>测试4</h3>
          <h3>测试5</h3>
          <h3>测试6</h3>
          <h3>测试7</h3>
          <h3>测试8</h3>
          <h3>测试9</h3>
          <h3>测试10</h3>
          <h3>测试11</h3>
          <h3>测试12</h3>
          <h3>测试13</h3>
          <h3>测试14</h3>
          <h3>测试15</h3>
          <h3>测试16</h3>
          <h3>测试17</h3>
          <h3>测试18</h3>
          <h3>测试19</h3>
          <h3>测试20</h3>
          <h3>测试21</h3>
          <h3>测试22</h3>
          <h3>测试23</h3>
          <h3>测试24</h3>
          <h3>测试25</h3>
          <h3>测试26</h3>
          <h3>测试27</h3>
          <h3>测试28</h3>
          <h3>测试29</h3>
          <h3>测试30</h3>
          <h3>测试31</h3>
          <h3>测试32</h3>
          <h3>测试33</h3>
          <h3>测试34</h3>
          <h3>测试35</h3>
          <h3>测试36</h3>
          <h3>测试37</h3>
          <h3>测试38</h3>
          <h3>测试39</h3>
          <h3>测试40</h3>
          <h3>测试41</h3>
          <h3>测试42</h3>
          <h3>测试43</h3>
          <h3>测试44</h3>
          <h3>测试45</h3>
          <h3>测试46</h3>
          <h3>测试47</h3>
          <h3>测试48</h3>
          <h3>测试49</h3>
          <h3>测试50</h3>
          <h3>测试51</h3>
          <h3>测试52</h3>
          <h3>测试53</h3>
          <h3>测试54</h3>
          <h3>测试55</h3>
          <h3>测试56</h3>
          <h3>测试57</h3>
          <h3>测试58</h3>
          <h3>测试59</h3>
          <h3>测试60</h3>
          <h3>测试61</h3>
          <h3>测试62</h3>
          <h3>测试63</h3>
          <h3>测试64</h3>
          <h3>测试65</h3>
          <h3>测试66</h3>
          <h3>测试67</h3>
          <h3>测试68</h3>
          <h3>测试69</h3>
          <h3>测试70</h3>
          <h3>测试71</h3>
          <h3>测试72</h3>
          <h3>测试73</h3>
          <h3>测试74</h3>
          <h3>测试75</h3>
          <h3>测试76</h3>
          <h3>测试77</h3>
          <h3>测试78</h3>
          <h3>测试79</h3>
          <h3>测试80</h3>
        </div>
      </div>
    </el-container>
    <el-footer class="site-footer" height="70px">Footer</el-footer>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { personalized } from '@/api'

import SiteHeader from '@/components/SiteHeader/index.vue'
import SiteAside from '@/components/SiteAside/index.vue'

@Component({
  components: {
    SiteHeader,
    SiteAside
  }
})
export default class Home extends Vue {
  created() {
    this.getBanner()
  }

  getBanner() {
    // @ts-ignore
    this.$http('/banner').then(res => {
      console.log(' res: ', res)
    })

    personalized().then(res => {
      console.log('推荐歌单 res: ', res)
    })
  }
}
</script>

<style lang="scss">
.site-container {
  height: 100vh;
}
.site-footer {
  background: #f7f7f7;
  padding: 0;
}
</style>
