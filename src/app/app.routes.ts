import { Routes } from "@angular/router";

import { AuthGuard } from "./guards/auth.guard";

export const routes: Routes = [
    {
        path: "tasks",
        canActivate: [AuthGuard],
        loadComponent: () => import("./modules/tasks/tasks.component").then((m) => m.TasksComponent),
    },
    {
        path: "login",
        loadComponent: () => import("./modules/auth/login/login.component").then((m) => m.LoginComponent),
    },
    {
        path: "",
        redirectTo: "/tasks",
        pathMatch: "full",
    },
    {
        path: "**",
        redirectTo: "/tasks",
    },
];
