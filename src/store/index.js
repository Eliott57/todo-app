import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

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
        getPagination: (state, getters) => (pagination) => {
            const numberOfPages = Math.ceil(getters.getTodos.length / DISPLAY_LIMIT);
            const allPages = Array.from({length: numberOfPages}, (_, i) => i + 1);

            if(pagination.length === DISPLAY_LIMIT || (getters.getTodos <= 25 && pagination.length === numberOfPages)) {
                return pagination;
            }else if(!pagination.length){
                pagination.push(getters.getCurrentPage);
                return getters.getPagination(pagination);
            }else{
                const prevPage = pagination[0] - 1;
                const nextPage = pagination.at(-1) + 1;

                (allPages.indexOf(prevPage) > -1 && prevPage > 0) && pagination.unshift(prevPage);
                (allPages.indexOf(nextPage) && nextPage <= numberOfPages) && pagination.push(nextPage);

                return getters.getPagination(pagination);
            }
        },
        getTodos(state){
            return state.todos;
        },
        getTodo: (state) => (id) => {
            return state.todos.filter(todo => todo._id === id)[0];
        },
        getDisplayedTodos(state, getters){
            return DISPLAY_LIMIT ? getters.getTodos.slice((state.currentPage - 1)*5,state.currentPage*DISPLAY_LIMIT) : getters.getTodos;
        },
        getProgress(state){
            return Math.round((state.todos.filter(todo => todo.done).length / state.todos.length)*100);
        },
        getLastTodos(state){
            return state.todos.slice(0, 3);
        },
    },
    mutations: {
        populateTodos(state, todos){
            state.todos = todos.reverse();
        },
        addTodo(state, todo){
            state.todos.unshift(todo);
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
        setCurrentPage(state, page){
            state.currentPage = page;
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