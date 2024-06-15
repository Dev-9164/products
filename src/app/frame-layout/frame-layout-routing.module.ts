import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { FrameLayoutComponent } from "./frame-layout.component";
import { HomeComponent } from "./home/home.component";

const routes: Route[] = [
    {
        path: '',
        component: FrameLayoutComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent,
            }
        ]
    }

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],

})

export class FrameLayoutRoutingModule { }