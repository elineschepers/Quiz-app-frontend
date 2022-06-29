<template>
  <div>
    <layout-header :title="$metaInfo.title"/>
    <div class="bg-gray-100 py-6">
      <div class="max-w-xl mx-auto sm:px-6 lg:px-8">
        <div class="flex flex-col">
          <div class="-my-2 overflow-x-auto mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div class="shadow overflow-hidden border-b border-gray-200 rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="relative px-6 py-3">
                    </th>
                    <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        v-t="'disabled.name'"/>
                    <th scope="col"
                        class="relative px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        v-t="'disabled.add'"/>
                  </tr>
                  </thead>
                  <tbody x-max="2">

                  <!-- Row -->
                  <tr v-if="apidata.length === 0">
                    <td colspan="3" class="text-center text-lg"><p class="my-4" v-t="'disabled.no_students'"/></td>
                  </tr>
                  <tr v-else class="bg-white" v-for="(student, index) in apidata" :key="student.personId" :class="getClassRow(index)">
                    <td>
                      <div class="flex-shrink-0 h-10 w-10  mx-auto"><img class="h-10 mx-auto rounded-full"
                                                                         :src="student.photoUrl" alt=""></div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {{ student.firstName }} {{ student.lastName }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                      <button type="button" @click.prevent="activateStudent(student)" class="mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" viewBox="0 0 20 20"
                             fill="currentColor">
                          <path
                            d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"/>
                        </svg>
                      </button>
                    </td>
                  </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "disabledstudents",
  middleware: 'auth',

  head() {
    return {
      title: this.$t("disabled.nav"),
      apidata: [],
    }
  },
  methods: {
    async activateStudent(student) {
      await this.$axios.post(`/api/dashboard/student/${student.personId}/enable/`);
      this.apidata.splice(this.apidata.indexOf(student), 1);
    },
    getClassRow(index) {
      if(index % 2 === 0) {
        return 'bg-white';
      }
      return  'bg-gray-50';
    },
  },
  async asyncData({$axios, app}) {
    try {
      const {data: {data}} = await $axios.get(`/api/dashboard/student/disabled/`, {});
      return {
        apidata: data,
      }
    } catch (error) {
      window.location.href = (app.localePath({ name: 'auth-login' }));
    }

  },

}

</script>
