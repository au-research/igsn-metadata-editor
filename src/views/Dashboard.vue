<template>
  <div>
    <div v-if="!isLoggedIn">
      <h1>You are not Logged In. Click here to login</h1>
    </div>

    <div class="flex flex-col" v-if="result">
      <div class="flex items-center mb-6">
        <div class="pt-2 relative lg:w-1/4 md:w-1/2 sm:w-full text-gray-600">
          <input
            class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            v-model="query"
            @keyup.enter="search()"
            @change="onQueryChange()"
            type="search"
            name="search"
            placeholder="Search"
          />
          <button type="submit" class="absolute right-0 top-0 mt-5 mr-4" @click.prevent="search()">
            <svg
              class="text-gray-600 h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
              style="enable-background:new 0 0 56.966 56.966;"
              xml:space="preserve"
              width="512px"
              height="512px"
            >
              <path
                d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
              />
            </svg>
          </button>
        </div>
        <div class="pt-2 ml-2" v-if="loading">
          <i class="text-lg fas fa-spinner fa-spin"></i>
        </div>
      </div>

      <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div
          class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200"
        >
          <table class="table-fixed min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th
                  class="w-3/4 px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                >Title</th>
                <th
                  class="w-1/8 px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                >Public</th>
                <th class="w-1/8 px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="record in result.content" :key="record.id">
                <td class="px-6 py-4 border-b border-gray-200">
                  <div class="text-sm leading-5 font-medium text-gray-900">
                    <a
                      class="hover:text-blue-500"
                      target="_blank"
                      v-bind:href="record.portalUrl"
                    >{{ record.title }}</a>
                  </div>
                  <div class="text-sm leading-5 text-gray-500">{{ record.igsn }}</div>
                </td>
                <td class="px-6 py-4 border-b border-gray-200">
                  <span
                    v-if="record.public"
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                  >Public</span>
                  <span
                    v-if="!record.public"
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
                  >Private</span>
                </td>
                <td
                  class="px-6 py-4 text-right border-b border-gray-200 text-sm leading-5 font-medium"
                >
                  <router-link
                    :to="{ name: 'edit', query: { identifier: record.igsn }}"
                    class="text-indigo-600 hover:text-indigo-900"
                  ><i class="fas fa-edit"></i> Edit</router-link>
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
                  <span class="font-medium">{{ result.totalPages}}</span>
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
                  >{{ result.number + 1}}</a>

                  <!-- 1 after -->
                  <a
                    v-if="!(result.number + 2 >= result.totalPages)"
                    @click.prevent="goToPage(result.number + 1)"
                    href="#"
                    class="hidden md:inline-flex -ml-px relative items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                  >{{ result.number +2 }}</a>

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

    <hr class="my-6" />

    <pre>{{ user | pretty }}</pre>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  computed: {
    user() {
      return this.$store.getters["auth/user"];
    },
    isLoggedIn() {
      return this.$store.getters["auth/isLoggedIn"];
    },
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
      if (this.page == "") {
        this.search();
      }
    },
  },
  mounted() {
    this.getRecords();
  },
  filters: {
    pretty(value) {
      return JSON.stringify(value, null, 2);
    },
  },
};
</script>