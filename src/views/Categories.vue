<template>
    <div>
        <div class="page-title">
            <h3>{{'Categories'|localize}}</h3>
        </div>
        <section>
            <Loader v-if="loading"/>
            <div v-else class="row">
                <CategoryCreate @created="addNewCategory"/>
                <CategoryEdit
                  v-if="categories.length"
                  :categories="categories"
                  :key="categories.length+updateCount"
                  @update="updateCategory"
                />
                <p v-else class="center">{{'NoCategories'|localize}}</p>
            </div>
        </section>
    </div>
</template>

<script>
    import CategoryCreate from '@/components/CategoryCreate'
    import CategoryEdit from '@/components/CategoryEdit'

    export default {
        name: 'categories',
        components: {
            CategoryCreate, CategoryEdit
        },
        metaInfo(){
            return {
                title: this.$title('Menu_Categories')
            }
        },
        data: () => ({
            categories: [],
            loading: true,
            updateCount: 0
        }),
        async mounted() {
            this.categories = await this.$store.dispatch('fetchCategories')
            this.loading = false
        },
        methods: {
            addNewCategory(category) {
                this.categories.push(category)
            },
            updateCategory(category) {
                const ind = this.categories.findIndex(c => c.id === category.id)
                this.categories[ind].title = category.title
                this.categories[ind].limit = category.limit
                this.updateCount++
            }
        }
    }
</script>