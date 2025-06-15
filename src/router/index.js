import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import BoardList from "@/views/board/BoardList.vue";
import BoardWrite from "@/views/board/BoardWrite.vue";
import BoardDetail from "@/views/board/BoardDetail.vue";
import Login from "@/views/user/LoginPage.vue";
import Register from "@/views/user/RegisterPage.vue";

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
  },
  {
    path: "/board/list",
    name: "BoardList",
    component: BoardList,
  },
  {
    path: "/board/write",
    name: "BoardWrite",
    component: BoardWrite,
  },
  {
    path: "/board/detail",
    name: "BoardDetail",
    component: BoardDetail,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
