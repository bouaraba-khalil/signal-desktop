import { createRouter, createWebHashHistory } from "vue-router";

import Course from "./app/courses/[id]/index.vue";
import Courses from "./app/courses/index.vue";
import App from "./app/index.vue";
import LearningPath from "./app/learning_path/index.vue";
import Login from "./login/index.vue";
import Test from "./test.vue";

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
        {
          path: "test",
          name: "test-detail",
          component: Test,
        },
      ],
    },
  ],
});

export default router;
