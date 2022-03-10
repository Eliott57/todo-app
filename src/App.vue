<template>
  <div id="app" class="min-h-screen h-full" style="background: #edf2f7;">
    <div class="flex items-center justify-center">
      <div class="w-full flex items-center justify-center font-sans">
        <div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg overflow-y-auto">

          <div class="mb-4">
            <h1 class="text-3xl text-gray-900">Ma Todo</h1>
            <TodoInput @change="addTask"></TodoInput>
          </div>

          <ProgressBar :progress-bar-value="progressBarValue"></ProgressBar>
          <TaskField class="flex mb-4 items-center flex justify-between" v-for="(task, index) in getCurrentTasks" :key="index" :index="index" :task="task" @done="taskDone" @delete="deleteTask"></TaskField>
          <PaginationBar :total-of-current-tasks="totalOfCurrentTasks"
                         :total-of-tasks="totalOfTasks"
                         :current-page="currentPage"
                         :last-page="lastPage"
                         :get-pagination="getPagination"
                         @previous="previousPage"
                         @next="nextPage"
                         @changeCurrentPage="changeCurrentPage"
          >
          </PaginationBar>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

import TodoInput from "@/components/TodoInput";
import ProgressBar from "@/components/ProgressBar";
import TaskField from "@/components/TaskField";
import PaginationBar from "@/components/PaginationBar";

const PAGE_SIZE = 5;

export default {
  name: 'App',
  components: {PaginationBar, ProgressBar, TodoInput, TaskField},
  data() {
      return{
          tasks: [],
          currentPagination: [1, 2 ,3, 4, 5],
          pagination: [1],
          paginationLimit: 6,
          tasksLimit: 5,
          firstPage: 1,
          lastPage: 1,
          currentPage: 1,
      }
  },
  methods: {
    addTask(todo) {
          if(todo.trim() !== ''){

            if(this.tasks.length){
              if(this.tasks[this.lastPage - 1].length === this.tasksLimit){

                this.tasks.push([{name: todo, done: false, style: 'text-gray-900'}]);
                this.lastPage++;
                this.pagination.push(this.pagination.at(-1) + 1);
              }else{
                this.tasks[this.lastPage - 1].push({name: todo, done: false, style: 'text-gray-900'});
              }
            }else{
              this.tasks.push([{name: todo, done: false, style: 'text-gray-900'}]);
            }
          }
          this.todo = '';
      },
    taskDone(index){
        if(this.tasks[this.currentPage-1][index].done){
          this.tasks[this.currentPage-1][index].style = 'text-gray-900'
          this.tasks[this.currentPage-1][index].done = false;
        }else{
          this.tasks[this.currentPage-1][index].style = 'text-green, line-through'
          this.tasks[this.currentPage-1][index].done = true;
        }
    },
    deleteTask(index){
      this.tasks[this.currentPage-1].splice(index, 1);
      if(!this.tasks[this.currentPage-1].length){
        this.tasks.splice(this.currentPage-1, 1);
        this.lastPage--;
        if(this.currentPage !== 1)
          this.currentPage--;
      }else{
        let flatTasks = this.tasks.flat();
        let compt = 0;
        this.tasks = [];

        this.tasks.push([flatTasks.shift()]);

        for(let task of flatTasks){
          if(this.tasks[compt].length === this.tasksLimit){
            this.tasks.push([task]);
            compt++;
          }else{
            this.tasks[compt].push(task);
          }
        }

        this.lastPage = this.tasks.length;
      }
    },
    nextPage(){
      this.currentPage++;
    },
    previousPage(){
      this.currentPage--;
    },
    changeCurrentPage(page) {
      this.currentPage = page;
    }
  },
  computed: {
      progressBarValue(){

        if(this.tasks.length){
          let numberOfTasksDone = 0;

          for(let tabOfTasks of this.tasks){
            numberOfTasksDone += tabOfTasks.filter(element => element.done).length;
          }

          return (numberOfTasksDone / this.totalOfTasks * 100).toFixed(0).toString();
        }else{
          return '0';
        }
      },
      getCurrentTasks(){
          if(this.tasks.length)
            return this.tasks[this.currentPage-1];
          else
            return [];
      },
      totalOfCurrentTasks(){
        if(this.tasks.length){
          let totalOfCurrentTasks = 0;

          for(let i = 0; i < this.currentPage; i++){
            if(this.tasks[i])
              totalOfCurrentTasks += this.tasks[i].length;
          }
          return totalOfCurrentTasks.toString();
        }
        else
          return '0';
      },
      totalOfTasks(){
          let totalOfTasks = 0;

          for(let tabOfTasks of this.tasks){
              totalOfTasks += tabOfTasks.length;
          }

          return totalOfTasks.toString();
      },
    getPagination(){

        if(this.tasks.length){

          let pagination = [];

          if(this.tasks.length >= PAGE_SIZE){

            pagination.push(this.currentPage);

            if(this.currentPage - 1 > 0){
              pagination.unshift(this.currentPage - 1);

              if(this.currentPage - 2 > 0){
                pagination.unshift(this.currentPage - 2);

                if(this.currentPage + 1 !== this.lastPage){
                  if(this.currentPage === this.lastPage){
                    pagination.unshift(this.currentPage - 3);
                    pagination.unshift(this.currentPage - 4);
                  }else{
                    pagination.push(this.currentPage + 1);
                    pagination.push(this.currentPage + 2);
                  }
                }else{
                  pagination.unshift(this.currentPage - 3);
                  pagination.push(this.currentPage + 1);
                }
              }else{
                for(let i = 1; i <= 3; i++){
                  pagination.push(this.currentPage + i)
                }
              }
            }else{
              for(let i = 1; i <= 4; i++){
                  pagination.push(this.currentPage + i)
              }
            }
          }else{
            let keys = this.tasks.keys();
            pagination = Array.from(keys).map(element => element + 1);
          }

          return pagination;
        }else{
          return [1];
        }
    }
  }
}
</script>