<template>
  <div class="container">
    <div class="row border p-4 my-5 rounded">
      <div class="col-9">
        <form v-on:submit.prevent="HandleSubmit">
          <div class="h2 text-center text-success">
            {{ productIdForUpdate ? 'Update' : 'Create' }} Product
          </div>
          <hr />
          <div v-if="errorList.length > 0" class="alert alert-danger pb-0">
            Please fix the following errors:
            <ul>
              <li v-for="error in errorList" :key="error">{{ error }}</li>
            </ul>
          </div>

          <div class="mt-3">
            <span class="text-muted">Name</span>
            <input type="text" class="form-control" v-model.trim="productObj.name" />
          </div>
          <div class="mt-3">
            <span class="text-muted">Description</span>
            <textarea
              type="text"
              class="form-control"
              v-model.trim="productObj.description"
            ></textarea>
          </div>
          <div class="mt-3">
            <span class="text-muted">Price</span>
            <input type="number" class="form-control" v-model.number="productObj.price" />
          </div>

          <div class="mt-3">
            <span class="text-muted">Sale Price</span>
            <input type="number" class="form-control" v-model.number="productObj.salePrice" />
          </div>
          <div class="mt-3">
            <span class="text-muted">Tags (comma-seperated)</span>
            <input
              type="text"
              class="form-control"
              placeholder="e.g., modern, classic, luxury"
              v-model="productObj.tags"
            />
          </div>
          <div class="form-check form-switch pt-3">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              v-model="productObj.isBestSeller"
            />

            <label class="form-check-label" for="bestseller"> Bestseller </label>
          </div>
          <div class="mt-3">
            <label class="text-muted">Category</label>
            <select class="form-select" v-model="productObj.category">
              <option v-for="option in PRODUCT_CATEGORIES" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">Image</label>
            <div class="input-group">
              <input type="file" class="form-control" />
            </div>
          </div>
          <div class="pt-3">
            <button class="btn btn-success m-2 w-25" :disabled="loading">
              <span v-if="loading == true" class="spinner-border spinner-border-sm me-2"></span
              >Submit
            </button>
            <router-link
              :to="{ name: APP_ROUTE_NAMES.PRODUCT_LIST }"
              class="btn btn-secondary m-2 w-25"
            >
              Cancel
            </router-link>
          </div>
        </form>
      </div>
      <div class="col-3">
        <img
          :src="`https://placehold.co/600x400`"
          class="img-fluid w-100 m-3 p-3 rounded"
          alt="Product
        preview"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { PRODUCT_CATEGORIES } from '@/constants/appconstants'
import { useSwal } from '@/utility/useSwal'
import productService from '@/services/productService.js'
import { APP_ROUTE_NAMES } from '@/constants/routeNames'

const { showSuccess, showError, showConfirm } = useSwal()
const router = useRouter()
const route = useRoute()
const productIdForUpdate = route.params.id
const loading = ref(false)
const errorList = reactive([])
const productObj = reactive({
  name: '',
  description: '',
  price: 0,
  salePrice: 0,
  tags: [],
  isBestSeller: false,
  category: '',
  image: 'https://placehold.co/600x400',
})

async function HandleSubmit() {
  try {
    loading.value = true
    new Promise((resolve) => setTimeout(resolve, 2000))
    errorList.length = 0
    //vali
    if (productObj.name.length < 3) {
      errorList.push('Product name must be at least 3 characters long')
    }
    if (productObj.price <= 0) {
      errorList.push('Price must me greater than 0')
    }
    if (productObj.category <= 0) {
      errorList.push('Please select a category')
    }
    if (productObj.tags <= 0) {
      errorList.push('Please select a tag')
    }
    if (errorList.length == 0) {
      const productData = {
        ...productObj,
        price: Number(productObj.price),
        salePrice: productObj.salePrice ? Number(productObj.salePrice) : null,
        tags: productObj.tags.split(',').map((tag) => tag.trim()),
        bestSeller: Boolean(productObj.isBestSeller),
      }
      if (productIdForUpdate) {
        await productService.updateProduct(productIdForUpdate, productData)
        showSuccess('Product updated successfully!')
      } else {
        await productService.createProduct(productData)
        showSuccess('Product created successfully!')
      }

      await new Promise((resolve) => setTimeout(resolve, 2000))

      router.push(APP_ROUTE_NAMES.PRODUCT_LIST)
    } else {
      showError('Error, please insert the product righty!')
    }
  } catch (error) {
    console.log(error.message)
  } finally {
    loading.value = false
  }
  console.log(productObj)
}

onMounted(async () => {
  if (!productIdForUpdate) {
    return
  }
  loading.value = true
  try {
    const product = await productService.getProductById(productIdForUpdate)
    Object.assign(productObj, { ...product, tags: product.tags.join(',') })
  } catch (error) {
    console.log(error.message)
  } finally {
    loading.value = false
  }
})
</script>
