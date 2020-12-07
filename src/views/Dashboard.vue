<template>
  <div>

    <div class="flex flex-col">
      <div class="flex items-center mb-6">
        <div class="flex w-full justify-between">
          <div class="flex flex-row items-center">
            <div class="pt-2 relative text-gray-600">
              <input
                  class="border-2 w-64 border-gray-300 h-10 bg-white px-2 pl-10 rounded-lg text-sm focus:outline-none"
                  v-model="query"
                  @keyup.enter="search()"
                  @change="onQueryChange()"
                  type="search"
                  name="search"
                  placeholder="Title Search"
              />
              <button type="submit" class="absolute left-0 top-0 mt-4 ml-4" @click.prevent="search()">
                <i class="fas fa-search"></i>
              </button>
            </div>
            <div class="pt-2 ml-2" v-if="loading">
              <i class="text-lg fas fa-spinner fa-spin"></i> Loading...
            </div>
          </div>

          <div class="pt-2">
            <router-link
                :to="{ name: 'CreateIGSN', params: { schema: 'ardc-igsn-desc-1.0' }}"
                class="btn btn-blue"
            ><i class="fas fa-plus"></i> Create Resource
            </router-link>
          </div>
        </div>
      </div>

      <div v-if="result && result.totalElements === 0">
        There are no records to be displayed!
      </div>

      <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
           v-if="result && result.totalElements > 0">
        <div
            class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200"
        >
          <table class="table">
            <thead>
            <tr>
              <th>IGSN</th>
              <th>Status</th>
              <th>Updated</th>
              <th>Visibility</th>
              <th>Owner</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-500">
            <tr v-for="record in result.content" :key="record.id">
              <td>
                <div class="text-sm leading-5 font-medium text-gray-900">
                  <a
                      class="hover:text-blue-500"
                      target="_blank"
                      v-bind:href="getPortalUrl(record)"
                  >{{ record.title }}</a>
                  <p></p>
                  <span class="text-gray-700 text-sm">{{ record.igsn.value }}</span>
                </div>
              </td>
              <td class="text-sm text-center">
                <p>
                  {{ record.status }}
                </p>
              </td>
              <td class="whitespace-no-wrap text-sm text-center">
                {{ record.modifiedAt | formatDate }}
              </td>
              <td class="whitespace-no-wrap text-center">
                <p class="text-sm">
                    <span v-if="record.embargoDate" class="tag tag-yellow">
                      Under Embargo
                    </span>
                </p>
                <span
                    v-if="record.visible"
                    class="tag tag-green"
                >Public</span>
                <span
                    v-if="!record.visible && !record.embargoDate"
                    class="tag tag-red"
                >Private</span>
              </td>
              <td class="text-sm text-center">
                <span v-if="record.ownerType === 'User'">Me</span>
                <span v-if="record.ownerType === 'DataCenter'">{{ record.ownerID | dataCenterName(user) }}</span>
              </td>
              <td
                  class="text-sm font-medium text-center"
              >
                <router-link
                    :to="{
                        name: 'EditByIGSN',
                        params: {
                          schema: 'ardc-igsn-desc-1.0',
                          prefix: getIGSNStructure(record).prefix,
                          igsn: getIGSNStructure(record).igsn
                        }
                      }"
                    class="btn btn-blue"
                ><i class="fas fa-edit"></i> Edit
                </router-link>
              </td>
            </tr>
            </tbody>
          </table>

          <div
              class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
          >
            <div class="flex-1 flex justify-between sm:hidden">
              <a
                  href="#"
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
              >Previous</a>
              <a
                  href="#"
                  class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
              >Next</a>
            </div>
            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between" v-if="result">
              <div>
                <p class="text-sm leading-5 text-gray-700">
                  Page
                  <span class="font-medium">{{ result.number + 1 }}</span>
                  of
                  <span class="font-medium">{{ result.totalPages }}</span>
                </p>
              </div>
              <div>
                <nav class="relative z-0 inline-flex shadow-sm">
                  <!-- previous -->
                  <a
                      @click.prevent="goToPage(result.number - 1)"
                      href="#"
                      class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                      aria-label="Previous"
                  >
                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                          fill-rule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                      />
                    </svg>
                  </a>

                  <!-- first page -->
                  <a
                      v-if="!result.first"
                      @click.prevent="goToPage(0)"
                      href="#"
                      class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                  >1</a>

                  <!-- dot dot -->
                  <span
                      v-if="result.number > 2"
                      class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700"
                  >...</span>

                  <!-- 1 before -->
                  <a
                      v-if="result.number - 1 > 0"
                      @click.prevent="goToPage(result.number - 1)"
                      href="#"
                      class="hidden md:inline-flex -ml-px relative items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                  >{{ result.number }}</a>

                  <!-- current page -->
                  <a
                      @click.prevent="goToPage(result.number + 1)"
                      href="#"
                      class="hidden md:inline-flex -ml-px relative items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                  >{{ result.number + 1 }}</a>

                  <!-- 1 after -->
                  <a
                      v-if="!(result.number + 2 >= result.totalPages)"
                      @click.prevent="goToPage(result.number + 1)"
                      href="#"
                      class="hidden md:inline-flex -ml-px relative items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                  >{{ result.number + 2 }}</a>

                  <!-- dot dot -->
                  <span
                      v-if="result.number < result.totalPages - 2"
                      class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700"
                  >...</span>

                  <!-- last -->
                  <a
                      v-if="!result.last"
                      @click.prevent="goToPage(result.totalPages-1)"
                      href="#"
                      class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                  >{{ result.totalPages }}</a>

                  <!-- next -->
                  <a
                      @click.prevent="goToPage(result.number + 1)"
                      href="#"
                      class="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                      aria-label="Next"
                  >
                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export default {
  name: "Dashboard",
  computed: {
    user() {
      return this.$store.getters["auth/user"];
    },
    isLoggedIn() {
      return this.$store.getters["auth/isLoggedIn"];
    },
    portalUrl() {
      return this.$registryService.getPortalUrl()
    }
  },
  data() {
    return {
      result: null,
      page: 0,
      size: 10,
      query: "",
      loading: false,
    };
  },
  methods: {
    getPortalUrl(record) {
      if (record.igsn) {
        return `${this.portalUrl}view/${record.igsn.value}`
      }
      return ""
    },
    getIGSNStructure(record) {
      return {
        prefix: record.igsn.value.split('/')[0],
        igsn: record.igsn.value.split('/')[1]
      }
    },
    getRecords() {
      this.loading = true;
      this.$registryService
          .getUserIGSNRecords(this.page, this.size, this.query)
          .then((data) => {
            this.result = data;
            this.loading = false;
          });
    },
    goToPage(num) {
      this.page = num;
      this.getRecords();
    },
    search() {
      this.page = 0;
      this.getRecords();
    },
    onQueryChange() {
      if (this.query === "") {
        this.search();
      }
    },
  },
  mounted() {
    this.getRecords();
  },
  filters: {
    formatDate(date) {
      return dayjs(date).fromNow()
    },
    dataCenterName(dataCenterID, user) {
      let dataCenter = user.dataCenters.find((dataCenter) => {
        return dataCenter.id === dataCenterID
      })

      if (!dataCenter) {
        return "DataCenter: " + dataCenterID
      }

      return dataCenter.name
    }
  },
};
</script>