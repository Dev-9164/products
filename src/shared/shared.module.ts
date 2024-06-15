import { NgModule } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { PaginatorModule } from "primeng/paginator";
import { RatingModule } from "primeng/rating";
import { TableModule } from "primeng/table";
import { TagModule } from "primeng/tag";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { UtilitiesService } from "./utlities/utilities.service";
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogService } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClientModule } from "@angular/common/http";
import { ProductDialogModule } from "./dialog/product-dialog.module";
import { TooltipModule } from 'primeng/tooltip';
import { NgxChartsModule } from "@swimlane/ngx-charts";

const externalModules = [
    TableModule,
    ButtonModule,
    TagModule,
    RatingModule,
    PaginatorModule,
    ToastModule,
    ProgressSpinnerModule,
    InputTextModule,
    TooltipModule,
    NgxChartsModule,
]
@NgModule({
    declarations: [],
    imports: [...externalModules, HttpClientModule, ProductDialogModule],
    exports: [...externalModules],
    providers: [MessageService, UtilitiesService, DialogService]
})

export class SharedModule { }