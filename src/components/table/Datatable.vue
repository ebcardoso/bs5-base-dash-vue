<template>
  <div class="row g-3 mb-4 align-items-center justify-content-between">
    <div class="col-auto">
      <div class="page-utilities">
        <div class="row g-2 justify-content-start justify-content-md-end align-items-center">
          <div class="col-auto">
            <form @submit.prevent="search" class="table-search-form row gx-1 align-items-center">
              <div class="col-auto">
                <input type="text" v-model="searchKey" id="search-orders" name="searchorders" class="form-control search-orders" placeholder="Search">
              </div>
              <div class="col-auto">
                <button type="submit" class="btn app-btn-secondary">Search</button>
              </div>
            </form> 
          </div><!--//col-->
        </div><!--//row-->
      </div><!--//table-utilities-->
    </div><!--//col-auto-->
  </div> <!--//row-->
  
  <div class="tab-content" id="orders-table-tab-content">
    <div class="tab-pane fade show active" id="orders-all" role="tabpanel" aria-labelledby="orders-all-tab">
      <div class="app-card app-card-orders-table shadow-sm mb-5">
        <div class="app-card-body">
          <div class="table-responsive">
            <table class="table app-table-hover mb-0 text-left">
              <thead>
                <tr>
                  <th class="cell" v-for="(column, index) in datatable?.columns" :key="index"><center>{{column}}</center></th>
                  <th class="cell" v-if="datatable?.canShowOptions"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(model, index) in datatable?.tableContent" :key="index">
                  <td class="cell" v-for="(field, index2) in model" :key="index2">{{field}}</td>
                  <td class="cell" v-if="datatable?.canShowOptions"> 
                    <center>
                      <div class="dropdown">
                        <div class="dropdown-toggle no-toggle-arrow" data-bs-toggle="dropdown" aria-expanded="false">
                          <button class="btn-sm app-btn-secondary">Options</button>
                        </div>
                        <!--//dropdown-toggle-->
                        <ul class="dropdown-menu">
                          <li v-for="(option, index3) in datatable?.optionsContent[index]" :key="index3">
                            <router-link :to="option[1]" class="dropdown-item" v-if="option[2] == 0">
                              {{option[0]}}
                            </router-link>
                            <button class="dropdown-item" @click="deleteItem(option[1])" v-else>
                              {{option[0]}}
                            </button>
                          </li>
                        </ul>
                      </div>
                      <!--//dropdown-->
                    </center>
                  </td>
                </tr>
              </tbody>
            </table>
          </div><!--//table-responsive-->
        </div><!--//app-card-body-->		
      </div><!--//app-card-->

      <nav class="app-pagination">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="[button_previous_active() ? '' : 'disabled']">
            <button class="page-link" @click="previous_page">Previous</button>
          </li>

          <li class="page-item" v-if="(currentPage-2 > 0) && (currentPage-2 <= datatable?.numberOfpages) && !button_next_active()"><button class="page-link" @click="go_to_page(currentPage-2)">{{currentPage-2}}</button></li>
          <li class="page-item" v-if="(currentPage-1 > 0)"><button class="page-link" @click="go_to_page(currentPage-1)">{{currentPage-1}}</button></li>
          <li class="page-item active" v-if="(datatable?.numberOfpages >= 1)"><button class="page-link" @click="go_to_page(currentPage)">{{currentPage}}</button></li>
          <li class="page-item" v-if="(currentPage+1 <= datatable?.numberOfpages)"><button class="page-link" @click="go_to_page(currentPage+1)">{{currentPage+1}}</button></li>
          <li class="page-item" v-if="(currentPage+2 <= datatable?.numberOfpages) && !button_previous_active()"><button class="page-link" @click="go_to_page(currentPage+2)">{{currentPage+2}}</button></li>

          <li class="page-item" :class="[button_next_active() ? '' : 'disabled']">
            <button class="page-link" @click="next_page">Next</button>
          </li>
        </ul>
      </nav><!--//app-pagination-->
    </div><!--//tab-pane-->
  </div><!--//tab-content-->
</template>

<script lang="ts">
  import { defineComponent } from 'vue'; 

  export default defineComponent({
    name: "Datatable",
    props: {
      viewmodel:Object,
      alerts:Array
    },
    data() {
      return {
        datatable: this.viewmodel?.getDatatable(),
        searchKey: '',
        currentPage: 1,
      }
    },
    mounted() {
      this.search();
    },
    methods: {
      search():void {
        this.datatable?.filterItems(this.searchKey, 1);
        this.currentPage = 1;
      },
      go_to_page(page:number) {
        this.currentPage = page;
        this.datatable?.filterItems(this.searchKey, this.currentPage);
      },
      previous_page():void {
        if (this.currentPage != 1) {
          this.currentPage-=1;
          this.datatable?.filterItems(this.searchKey, this.currentPage);
        }
      },
      next_page():void {
        if (this.currentPage < this.datatable?.numberOfpages) {
          this.currentPage+=1;
          this.datatable?.filterItems(this.searchKey, this.currentPage);
        }
      },
      button_previous_active():boolean {
        if (this.currentPage == 1) {
          return false;
        }
        return true;
      },
      button_next_active():boolean {
        if (this.currentPage == this.datatable?.numberOfpages) {
          return false;
        }
        return true;
      },
      async deleteItem(id:string) {
        if (confirm("Are you sure?") == true) {
          await this.datatable?.deleteItem(id).then(() => {
            this.viewmodel?.createAlert(
              this.alerts,
              'success',
              '',
              'Team deleted successfully.'
            );
            this.datatable?.filterItems(this.searchKey, this.currentPage);
          }).catch(() => {
            this.viewmodel?.createAlert(
              this.alerts,
              'danger',
              'Failure: ',
              'Error to delete team'
            );
          });
        }
      },
    },
  })
</script>
