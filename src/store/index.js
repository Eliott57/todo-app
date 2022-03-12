import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const PAGE_SIZE = 5;
const DISPLAY_LIMIT = 5;

export default new Vuex.Store({
    state: {
        todos: [],
        currentPage: 1,
    },
    getters: {
        getCurrentPage(state){
            return state.currentPage;
        },
        getPagination(state){

            if(state.todos.length){

                let pagination = [];

                if(state.todos.length >= PAGE_SIZE){

                    pagination.push(state.currentPage);

                    if(state.currentPage - 1 > 0){
                        pagination.unshift(state.currentPage - 1);

                        if(state.currentPage - 2 > 0){
                            pagination.unshift(state.currentPage - 2);

                            if(state.currentPage + 1 !== state.lastPage){
                                if(state.currentPage === state.lastPage){
                                    pagination.unshift(state.currentPage - 3);
                                    pagination.unshift(state.currentPage - 4);
                                }else{
                                    pagination.push(state.currentPage + 1);
                                    pagination.push(state.currentPage + 2);
                                }
                            }else{
                                pagination.unshift(state.currentPage - 3);
                                pagination.push(state.currentPage + 1);
                            }
                        }else{
                            for(let i = 1; i <= 3; i++){
                                pagination.push(state.currentPage + i)
                            }
                        }
                    }else{
                        for(let i = 1; i <= 4; i++){
                            pagination.push(state.currentPage + i)
                        }
                    }
                }else{
                    let keys = state.todos.keys();
                    pagination = Array.from(keys).map(element => element + 1);
                }

                return pagination;
            }else{
                return [1];
            }
        },
        getTodos(state){
            return state.todos;
        },
        getDisplayedTodos(state, getters){
            return DISPLAY_LIMIT ? getters.getTodos.slice((state.currentPage - 1)*5,state.currentPage*DISPLAY_LIMIT) : getters.getTodos;
        },
        getProgress(state){
            return Math.round((state.todos.filter(todo => todo.done).length / state.todos.length)*100);
        },
    },
    mutations: {
        populateTodos(state, todos){
            state.todos = todos;
        },
        addTodo(state, todo){
            state.todos.push(todo);
        },
        deleteTodo(state, id){
            state.todos = state.todos.filter(todo => todo._id !== id);
        },
        editTodo(state, todo){
            state.todos.find(currentTodo => currentTodo._id === todo._id &&
                (currentTodo.description = todo.description, true) &&
                (currentTodo.done = todo.done, true)
            );
        },
        incrementCurrentPage(state){
            state.currentPage++;
        },
        decrementCurrentPage(state){
            state.currentPage--;
        },
        setCurrentPage(state, payload){
            state.currentPage = payload.page;
        },
    },
    actions: {
        populateTodos({commit}, todos){
            commit('populateTodos', todos.todos)
        },
        addTodo({commit}, todo){
            commit('addTodo', todo.todo);
        },
        deleteTodo({commit}, id){
            commit('deleteTodo', id.id)
        },
        editTodo({commit}, todo){
            commit('editTodo', todo.todo);
        }
    }
})