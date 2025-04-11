<template>
  <div>
    <div
      class="bg-success w-100 position-relative overflow-hidden mb-4 py-5 d-flex align-items-center"
      style="
        background-image: url('');
        background-size: cover;
        background-position: center;
        min-height: 400px;
      "
    >
      <div class="position-absolute top-0 start-0 w-100 h-100 bg-success opacity-50"></div>

      <div class="container-fluid position-relative z-1">
        <div class="row justify-content-center text-center">
          <div class="col-lg-8 col-xl-7">
            <h1 class="display-4 fw-bold text-white mb-4">
              Your One-Stop Stone Shop
              <br class="d-none d-lg-block" />
              Premium Granite & Quartz for Every Style!
            </h1>
            <div class="input-group mt-3 mx-auto shadow-lg rounded-4" style="max-width: 700px">
              <input
                type="text"
                class="form-control border-0 py-3 px-4 fs-5"
                placeholder="Search your favorite product..."
                v-model="searchValue"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="product-list" class="container">
      <h2 class="mb-5 text-center display-6">Discover Our Collection</h2>

      <div class="row g-3 mb-4 align-items-center">
        <div class="col-md-auto">
          <div class="d-flex flex-wrap gap-3">
            <button
              @click="selectedCategory = category"
              v-for="(category, index) in categoryList"
              :key="index"
              class="btn px-4 py-2"
              :class="{
                'btn-success text-white': category === selectedCategory,
                'btn-outline-success': category !== selectedCategory,
              }"
            >
              {{ category }}
            </button>
          </div>
        </div>
        <div class="col-md-auto ms-md-auto">
          <div class="dropdown">
            <button
              class="btn btn-outline-secondary d-flex align-items-center gap-2 px-4 py-2"
              type="button"
              data-bs-toggle="dropdown"
            >
              <i class="bi bi-sort-down"></i>
              <span class="text-capitalize">{{ selectedOptions }}</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end shadow-sm">
              <li v-for="(option, index) in SORT_OPTIONS" :key="index">
                <button
                  class="dropdown-item py-2 d-flex align-items-center gap-2"
                  @click="selectedOptions = option"
                >
                  <i class="bi"></i>
                  <span class="text-capitalize">{{ option }}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <div v-if="filterProductList.length > 0" class="row g-4 pb-4">
          <ProductCard v-for="product in filterProductList" :key="product.id" :product="product">
          </ProductCard>
        </div>
        <div class="" v-else>
          <h3>No products found</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import productService from '@/services/productService.js'
import { reactive, ref, onMounted, computed } from 'vue'
import { useSwal } from '@/utility/useSwal'
import { useRoute, useRouter } from 'vue-router'
import { APP_ROUTE_NAMES } from '@/constants/routeNames'
import {
  PRODUCT_CATEGORIES,
  SORT_PRICE_LOW_HIGH,
  SORT_PRICE_HIGH_LOW,
  SORT_NAME_A_Z,
  SORT_NAME_Z_A,
  SORT_OPTIONS,
} from '@/constants/appconstants'
import ProductCard from '@/components/Product/ProductCard.vue'

const selectedCategory = ref('ALL')
const categoryList = ref(['ALL', ...PRODUCT_CATEGORIES])
const products = ref([])
const searchValue = ref('')
const selectedOptions = ref(SORT_OPTIONS[0])
const loading = ref(false)
onMounted(() => {
  fetchProducst()
})

const fetchProducst = async () => {
  try {
    products.value = await productService.getProducts()
    loading.value = true
    await new Promise((resolve) => setTimeout(resolve, 2000))
  } catch (ex) {
    console.log(ex.message)
  } finally {
    loading.value = false
  }
}
const filterProductList = computed(() => {
  let tempArray =
    selectedCategory.value === 'ALL'
      ? [...products.value]
      : products.value.filter(
          (item) => item.category.toUpperCase() === selectedCategory.value.toUpperCase(),
        )
  if (searchValue.value) {
    tempArray = tempArray.filter((item) =>
      item.name.toUpperCase().includes(searchValue.value.toUpperCase()),
    )
  }
  if (selectedOptions.value === SORT_PRICE_LOW_HIGH) {
    tempArray = tempArray.sort((a, b) => a.price - b.price)
  } else if (selectedOptions.value === SORT_PRICE_HIGH_LOW) {
    tempArray = tempArray.sort((a, b) => b.price - a.price)
  } else if (selectedOptions.value === SORT_NAME_A_Z) {
    tempArray = tempArray.sort((a, b) => a.name.localeCompare(b.name))
  } else if (selectedOptions.value === SORT_NAME_Z_A) {
    tempArray = tempArray.sort((a, b) => b.name.localeCompare(a.name))
  }
  return tempArray
})
</script>
