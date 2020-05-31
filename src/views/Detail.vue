<template>
  <Loader v-if="loading"/>
  <p v-else-if="!record" class="center">Invalid record</p>
  <div v-else>
    <div>
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">
          {{'Menu_History'|localize}}
        </router-link>
        <a @click.prevent class="breadcrumb">
          {{ record.type === 'income' ? 'Income' : 'Outcome' | localize }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card"
          :class="{
            'red':record.type==='outcome',
            'green':record.type==='income'
          }"
          >
            <div class="card-content white-text">
              <p>{{'Description'|localize}}: {{record.description}}</p>
              <p>{{'Amount'|localize}}: {{record.amount | currency}}</p>
              <p>{{'Category'|localize}}: {{record.categoryName}}</p>

              <small>{{record.date | date('datetime')}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'detail',
    data: () => ({
      loading: true,
      record: null
    }),
    metaInfo(){
      return {
        title: this.$title('Detail_Title')
      }
    },
    async mounted() {
      const id = this.$route.params.id
      const record = await this.$store.dispatch('fetchRecordById', id)
      const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)
      this.record = {
        ...record,
        categoryName: category.title
      }
      this.loading = false
    }
  }
</script>