import { createRouter, createWebHashHistory } from "vue-router";

import App from "./app/index.vue";
import LearningPath from "./app/learning_path/index.vue";
import Login from "./login/index.vue";
import Courses from "./app/courses/index.vue";
import Course from "./app/courses/[id]/index.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/app",
      name: "app",
      component: App,
      children: [
        {
          path: "learning-path",
          name: "learning-path",
          component: LearningPath,
        },
        {
          path: "learning-path/:learningPathId",
          name: "courses",
          component: Courses,
        },
        {
          path: "courses/:courseId",
          name: "course-detail",
          component: Course,
        },
      ],
    },
  ],
});

export default router;
